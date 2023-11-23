
import { Center, Image, ScrollView, Text, View } from "native-base";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export interface PostProps {
  id?: string;

  avatar: string;

  username: string;
  userAt: string;
  createdAt: string;

  showEntryBadge: boolean;
  entryBadge: string;

  description?: string;
  file?: string;
}

export function Post({ avatar, username, userAt, createdAt, showEntryBadge, entryBadge, description, file }: PostProps) {
  function formatTimeDifference(createdAt: string) {
    const currentDate = new Date();
    const createdDate = new Date(createdAt);
    const timeDifference = currentDate.getTime() - createdDate.getTime();

    const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const weeksDifference = Math.floor(daysDifference / 7);

    if (hoursDifference < 24) {
      return `${hoursDifference}h`;
    } else if (daysDifference < 7) {
      return `${daysDifference}d`;
    } else {
      return `${weeksDifference} semanas`;
    }
  }

  return (
    <View flex={1} backgroundColor={'green.100'} p={2}>
      <View flexDirection={'row'} borderBottomWidth={1} borderBottomColor={'green.200'} pb={4}>
        <View rounded={'full'} w={16} h={16}>
          <Image
            source={{ uri: `${API_URL}/api/file/${avatar}` }}
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
            <Text color={'yellow.100'} fontSize={'md'} ml={2}>• {formatTimeDifference(createdAt)}</Text>
          </View>

          {showEntryBadge && <View bgColor={'red.400'} p={"0.5"} px={2} ml={4} mt={1} mb={2} rounded={"md"}>
            <Text color={'yellow.100'} fontSize={'md'}>{entryBadge}</Text>
          </View>}

          <ScrollView>
           {description && <Text color={'yellow.100'} fontSize={'md'} ml={4} mr={4} maxW={'72'} >
              {description}
            </Text>}
            {file && (
              <View
                rounded={'md'}
                mt={4}
              >
                <Image
                  source={{ uri: `${API_URL}/api/file/${file}` }}
                  alt={"mediaFile"}
                  w={300}
                  h={200}
                  resizeMode={'contain'}

                />
              </View>

            )}
          </ScrollView>
        </View>

      </View>

    </View>
  )
}