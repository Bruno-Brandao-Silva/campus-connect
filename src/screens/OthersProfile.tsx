import { FlatList, Image, Text, View } from "native-base";
import { BellSimple, GraduationCap } from "phosphor-react-native";
import logo from '../../assets/logo.png';
import { Button as ButtonNativeBase } from 'native-base';
import { Post, PostProps } from "@components/Post";
import React, { useState } from "react";
import axios from "axios";
import { Loading } from "@components/Loading";
import { useAuth } from "@contexts/AuthContext";
import { useFocusEffect } from "@react-navigation/native";

const API_URL = process.env.EXPO_PUBLIC_API_URL
export interface OthersProfileProps {
  _id: string;
  resetId: () => void;
}

export function OtherProfile({ _id, resetId }: OthersProfileProps) {
  const { authState } = useAuth();
  const [loading, setLoading] = useState<boolean>(true);
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [user, setUser] = useState<any>({});
  const [following, setFollowing] = useState<boolean>(false);

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        try {
          const [userResponse, postResponse] = await Promise.all([
            axios.get(`/api/user/${_id}`),
            axios.get(`/api/post/${_id}`),
          ]);

          if (userResponse.data.followers.includes(authState.user?._id)) {
            setFollowing(true);
          }

          setUser(userResponse.data);
          setPosts(postResponse.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }, [_id, authState.user?._id])
  );

  const exitHandler = () => {
    setLoading(true);
    resetId();
  }
  return (<>
    {
      loading ? <Loading /> :
        <View zIndex={999} flex={1} bg={'green.100'} >
          <View height={48} bg={'green.200'} borderBottomWidth={2} borderBottomColor={'yellow.100'}>
            <View px={4} justifyContent={"space-between"} flexDirection={'row'} mt={8} >
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
                onPress={() => {
                  if (following) {
                    axios.patch(`/api/user/unfollow/${_id}`).then(() => {
                      setFollowing(false)
                    });
                  } else {
                    axios.patch(`/api/user/follow/${_id}`).then(() => {
                      setFollowing(true)
                    });
                  }
                }}
                _pressed={{
                  bg: 'yellow.100'
                }}
              >
                <Text
                  fontSize="md"
                  color={'yellow.100'}
                >
                  {following ? 'Seguindo' : 'Seguir'}
                </Text>
              </ButtonNativeBase>
            </View>

            <View position={"absolute"} bottom={-36} left={2} w={20} h={20}>
              <Image
                source={{ uri: `${API_URL}/api/file/${user?.profilePicture}` }}
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
                {`${user?.followers?.length}  `}
              </Text>
              seguidores
            </Text>

            <Text color={'yellow.100'} ml={4}>
              <Text fontWeight={"bold"}>
                {`${user?.following?.length}  `}
              </Text>

              seguindo
            </Text>
          </View>

          <View mt={4} ml={2} justifyContent={"space-between"} flexDirection={"row"}>
            <Text color={"yellow.100"} fontFamily={"heading"} fontSize={"lg"} numberOfLines={1} maxW={40}> {user?.name}</Text>

            <View justifyContent={"center"} alignItems={"center"} flexDirection={"row"} mr={4}>
              <GraduationCap size={16} color="#BFA288" />
              <Text color={"yellow.100"} fontSize={"sm"} ml={1} >
                {user?.academicSchedule[0]}
              </Text>
            </View>
          </View>
          <View flexDirection={'row'} justifyContent={"space-between"} alignItems={"center"} mt={1}>
            <Text ml={4} color={'yellow.100'}>{`@${user?.username}`}</Text>
            {user?.showEntryBadge &&
              <Text mr={4} bg={'red.400'} px={"1.5"} py={0.5} color={"yellow.100"} fontFamily={"heading"} rounded={"md"}>{user?.entryBadge}</Text>}
          </View>
          <View>
            <Text ml={4} color={'yellow.100'}>
              {user?.about || "Sobre mim..."}
            </Text>
          </View>
          <View borderBottomColor={'yellow.50'} borderBottomWidth={1} mb={2}>
            <Text color={"yellow.100"} ml={4} mt={4} fontFamily={"heading"} borderBottomColor={'yellow.100'} pl={1} borderBottomWidth={1} w={24}>Publicações</Text>
          </View>

          {posts.length > 0 && <FlatList data={posts} renderItem={({ item }) => <Post {...item} />} />}
          <ButtonNativeBase onPress={exitHandler} position={"absolute"} bottom={50} right={50} w={50} h={50} bgColor={"#aa5555"} >
            <Text color={"white"} fontSize={20} fontWeight={700}>X</Text>
          </ButtonNativeBase>
        </View >
    }
  </>)
}