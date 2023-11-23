import { FlatList, Image, Text, View } from "native-base";
import { BellSimple, GraduationCap } from "phosphor-react-native";
import logo from '../../assets/logo.png';
import { Button as ButtonNativeBase } from 'native-base';
import { Post, PostProps } from "@components/Post";
import { useAuth } from "@contexts/AuthContext";
import { useState } from "react";
import axios from "axios";
import { EditProfile } from "./ProfileEdit";
import { useFocusEffect } from "@react-navigation/native";
import { EmptyList } from "@components/EmptyList";

const API_URL = process.env.EXPO_PUBLIC_API_URL
export interface ProfileProps { }

export function Profile({ }: ProfileProps) {
  const [modal, setModal] = useState<boolean>(false);
  const { authState } = useAuth();
  const user = authState.user!;
  const [myPosts, setMyPosts] = useState<PostProps[]>([]);

  useFocusEffect(() => {
    axios.get(`/api/post/`).then((response) => {
      setMyPosts(response.data)
    });
  });
  if (modal) {
    return (<EditProfile closeModal={() => setModal(false)} />);
  } else {
    return (
      <View flex={1} bg={'green.100'} >
        <View height={48} bg={'green.200'} borderBottomWidth={2} borderBottomColor={'yellow.100'}>
          <View px={2} justifyContent={"space-between"} flexDirection={'row'} mt={8} >
            <Image source={logo} alt="Campus Connect logo" />
            <BellSimple size={32} color="#F2AC29" />
          </View>

          <View alignSelf={"flex-end"} mt={'auto'} mb={4} mr={4}>
            <ButtonNativeBase
              w={32}
              h={8}
              bg={'transparent'}
              borderWidth={1}
              borderColor="yellow.100"
              rounded="sm"
              p={0}
              onPress={() => setModal(true)}
              _pressed={{
                bg: 'yellow.100'
              }}
            >
              <Text
                fontSize="md"
                color={'yellow.100'}
              >
                Editar Perfil
              </Text>
            </ButtonNativeBase>
          </View>

          <View position={"absolute"} bottom={-36} left={2} w={20} h={20}>
            <Image
              source={{ uri: `${API_URL}/api/file/${user.profilePicture}` }}
              alt={'user'}
              w={20}
              h={20}
              rounded={'full'}
              borderWidth={2} borderColor={'yellow.100'}
            />
          </View>
        </View>

        <View justifyContent={"flex-end"} flexDirection={'row'} mr={4} mt={2}>
          <Text color={'yellow.100'}>
            <Text fontWeight={'bold'}>
              {`${user.followers.length}  `}
            </Text>
            seguidores
          </Text>

          <Text color={'yellow.100'} ml={4}>
            <Text fontWeight={"bold"}>
              {`${user.following.length}  `}
            </Text>

            seguindo
          </Text>
        </View>

        <View mt={4} ml={2} justifyContent={"space-between"} flexDirection={"row"}>
          <Text color={"yellow.100"} fontFamily={"heading"} fontSize={"lg"} numberOfLines={1} maxW={40}> {user.name}</Text>

          <View justifyContent={"center"} alignItems={"center"} flexDirection={"row"} mr={4}>
            <GraduationCap size={16} color="#BFA288" />
            <Text color={"yellow.100"} fontSize={"sm"} ml={1} >
              {user.academicSchedule[0]}
            </Text>
          </View>
        </View>
        <View flexDirection={'row'} justifyContent={"space-between"} alignItems={"center"} mt={1}>
          <Text ml={4} color={'yellow.100'}>{`@${user.username}`}</Text>
          <Text mr={4} bg={'red.400'} px={"1.5"} py={0.5} color={"yellow.100"} fontFamily={"heading"} rounded={"md"}>{user.entryBadge}</Text>
        </View>
        <View>
          <Text ml={4} color={'yellow.100'}>
            {user.about || "Sobre mim..."}
          </Text>
        </View>
        <View borderBottomColor={'yellow.50'} borderBottomWidth={1} mb={2}>
          <Text color={"yellow.100"} ml={4} mt={4} fontFamily={"heading"} borderBottomColor={'yellow.100'} pl={1} borderBottomWidth={1} w={24}>Publicações</Text>
        </View>

        <FlatList data={myPosts} renderItem={({ item }) => <Post {...item} />}
          ListEmptyComponent={() => (
            <View h={80} justifyContent={'center'} alignItems={'center'} px={2}>
              <EmptyList />
            </View>
          )
          }
        />
      </View>)
  }
}