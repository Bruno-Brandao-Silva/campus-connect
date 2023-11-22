import { Post, PostProps } from "@components/Post";
import { FlatList, Image, Text, View } from "native-base";
import { BellSimple } from "phosphor-react-native";
import logo from '../../assets/logo.png';

export function Feed() {
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

  function handleRefresh() {
    console.log('Refreshed');
  }

  return (
    <View flex={1} bg={'green.100'} py={8} px={2}>
      <View px={2} justifyContent={"space-between"} flexDirection={'row'} mb={4}>
        <Image source={logo} alt="Campus Connect logo" />
        <BellSimple size={32} color="#F2AC29" />
      </View>
      <FlatList
        data={mockedData}
        renderItem={({ item }) => <Post {...item} />}
        showsVerticalScrollIndicator={false}
        onRefresh={handleRefresh}
        refreshing={false}
      />
    </View>
  );
}
