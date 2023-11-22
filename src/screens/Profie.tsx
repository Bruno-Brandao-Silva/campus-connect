import { FlatList, Image, Text, View } from "native-base";
import { BellSimple, GraduationCap } from "phosphor-react-native";
import logo from '../../assets/logo.png';
import { Button as ButtonNativeBase, IButtonProps } from 'native-base';
import { Button } from "@components/Button";
import { Post, PostProps } from "@components/Post";


export interface ProfileProps { }

export function Profile({ }: ProfileProps) {
  const mockedData: PostProps[] = [
    {
      id: '1',
      avatar: 'https://avatars.githubusercontent.com/u/60005589?v=4',
      username: 'Doe John',
      userAt: 'DoeJohn',
      createdAt: '12h',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
      universityPeriod: '2018.1',
    },
    {
      id: '2',
      avatar: 'https://avatars.githubusercontent.com/u/600055?v=4',
      username: 'John doe',
      userAt: 'JohnDoe',
      createdAt: '12h',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
      universityPeriod: '2023.1',
    }
  ];

  return (
    <View flex={1} bg={'green.100'}>
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
          {/* MOCKED SOURCE */}
          <Image
            source={{ uri: 'https://avatars.githubusercontent.com/u/60005589?v=4' }}
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
            128 {' '}
          </Text>
          seguidores
        </Text>

        <Text color={'yellow.100'} ml={4}>
          <Text fontWeight={"bold"}>
            128 {' '}
          </Text>

          seguindo
        </Text>
      </View>

      <View mt={4} ml={2} justifyContent={"space-between"} flexDirection={"row"}>
        <Text color={"yellow.100"} fontFamily={"heading"} fontSize={"lg"} numberOfLines={1} maxW={40}> Victor Busolin</Text>

        <View justifyContent={"center"} alignItems={"center"} flexDirection={"row"} mr={4}>
          <GraduationCap size={16} color="#BFA288" />
          <Text color={"yellow.100"} fontSize={"sm"} ml={1} >
            Engenharia de Computação
          </Text>
        </View>
      </View>
      <View flexDirection={'row'} justifyContent={"space-between"} alignItems={"center"} mt={1}>
        <Text ml={4} color={'yellow.100'}>@busolinkz</Text>
        <Text mr={4} bg={'red.400'} px={"1.5"} py={0.5} color={"yellow.100"} fontFamily={"heading"} rounded={"md"}>2019.1</Text>
      </View>

      <View borderBottomColor={'yellow.50'} borderBottomWidth={1} mb={2}>
        <Text color={"yellow.100"} ml={4} mt={4} fontFamily={"heading"} borderBottomColor={'yellow.100'} pl={1} borderBottomWidth={1} w={24}>Publicações</Text>
      </View>

      <FlatList data={mockedData} renderItem={({ item }) => <Post {...item} />} />
    </View>
  )
}