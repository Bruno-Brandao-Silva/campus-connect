
import * as ImagePicker from 'expo-image-picker';
import { Center, Image, ScrollView, Text, View } from "native-base";

export interface PostProps {
  id?: string;

  avatar: string;

  username: string;
  userAt: string;
  createdAt: string;

  universityPeriod: string;

  description: string;
  file?: ImagePicker.ImagePickerAsset | null;
}

export function Post({ avatar, username, userAt, createdAt, universityPeriod, description, file }: PostProps) {
  return (
    <View flex={1} backgroundColor={'green.100'} p={2}>
      <View flexDirection={'row'} borderBottomWidth={1} borderBottomColor={'green.200'} pb={4}>
        <View rounded={'full'} w={16} h={16}>
          {/* MOCKED SOURCE */}
          <Image
            source={{ uri: avatar }}
            alt={'user'}
            w={16}
            h={16}
            rounded={'full'}
          />
        </View>

        <View justifyContent={"flex-start"} alignItems={"flex-start"}>
          <View flexDirection={"row"} alignItems={"flex-start"}>
            <Text color={'yellow.100'} fontSize={'lg'} ml={4} fontFamily={"heading"} maxWidth={36} overflow={"hidden"} numberOfLines={1}>{username}</Text>
            <Text color={'yellow.100'} fontSize={'md'} ml={2} maxWidth={24} numberOfLines={1}>@{userAt}</Text>
            <Text color={'yellow.100'} fontSize={'md'} ml={2}>• {createdAt}</Text>
          </View>

          <View bgColor={'red.400'} p={"0.5"} px={2} ml={4} mt={1} mb={2} rounded={"md"}>
            <Text color={'yellow.100'} fontSize={'md'}>{universityPeriod}</Text>
          </View>

          <ScrollView h={18}>
            <Text color={'yellow.100'} fontSize={'md'} ml={4} mr={4} maxW={'72'} >
              {description}

              {file && (
                <View
                  rounded={'md'}
                  mt={4}
                >
                  <Image
                    source={{ uri: file.uri }}
                    alt={file.uri.split("/").pop() || "undefined"}
                    w={'full'}
                    h={'3/4'}
                  />
                </View>

              )}
            </Text>
          </ScrollView>
        </View>

      </View>

    </View>
  )
}