import { Center, Image, ScrollView, Text, View } from "native-base";

export interface PostProps {
  avatar: string;

  username: string;
  userAt: string;
  createdAt: string;

  universityPeriod: string;

  description: string;
}

export function Post() {
  return (
    <View flex={1} backgroundColor={'green.100'} p={4} py={8}>
      <View flexDirection={'row'} borderBottomWidth={1} borderBottomColor={'green.200'} pb={4}>
        <View rounded={'full'} w={16} h={16}>
          {/* MOCKED SOURCE */}
          <Image
            source={{ uri: 'https://www.github.com/Busolin.png' }}
            alt={'user'}
            w={16}
            h={16}
            rounded={'full'}
          />
        </View>

        <View justifyContent={"flex-start"} alignItems={"flex-start"}>
          <View flexDirection={"row"} alignItems={"flex-start"}>
            <Text color={'yellow.100'} fontSize={'lg'} ml={4} fontFamily={"heading"} maxWidth={36} overflow={"hidden"} numberOfLines={1}>Victor Busolin hasiudhuiashdiuash</Text>
            <Text color={'yellow.100'} fontSize={'md'} ml={2} maxWidth={24} numberOfLines={1}>@Busolinkz</Text>
            <Text color={'yellow.100'} fontSize={'md'} ml={2}>• 1h</Text>
          </View>

          <View bgColor={'red.400'} p={"0.5"} px={2} ml={4} mt={1} mb={2} rounded={"md"}>
            <Text color={'yellow.100'} fontSize={'md'}>2020.1</Text>
          </View>

          <ScrollView h={18}>
            <Text color={'yellow.100'} fontSize={'md'} ml={4} mr={4} maxW={'72'} >
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Placeat rem, iste ratione impedit non dolor quam at numquam optio debitis.
              Molestias animi alias voluptas fugiat dolorem corrupti repudiandae accusamus, aliquam officia numquam!
            </Text>
          </ScrollView>
        </View>

      </View>

    </View>
  )
}