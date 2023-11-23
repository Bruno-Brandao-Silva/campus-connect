import { Post, PostProps } from "@components/Post";
import { FlatList, Image, Text, View } from "native-base";
import { BellSimple } from "phosphor-react-native";
import logo from '../../assets/logo.png';
import { useEffect, useState } from "react";
import axios from "axios";
import { EmptyList } from "@components/EmptyList";

export function Feed() {
  const [posts, setPosts] = useState<PostProps[]>([]);
  useEffect(() => {
    axios.get(`/api/timeline/`).then((response) => {
      setPosts(response.data)
    });
  }, []);

  function handleRefresh() {
    axios.get(`/api/timeline/`).then((response) => {
      setPosts(response.data)
    });
  }

  return (
    <View flex={1} bg={'green.100'} py={8} px={2}>
      <View px={2} justifyContent={"space-between"} flexDirection={'row'} mb={4}>
        <Image source={logo} alt="Campus Connect logo" />
        <BellSimple size={32} color="#F2AC29" />
      </View>
      <FlatList
        data={posts}
        renderItem={({ item }) => <Post {...item} />}
        showsVerticalScrollIndicator={false}
        onRefresh={handleRefresh}
        refreshing={false}
        ListEmptyComponent={() => (
          <View h={'xl'}>
            <EmptyList />
          </View>
        )}
      />
    </View>
  );
}
