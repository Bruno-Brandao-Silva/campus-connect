import { Button } from '@components/Button';
import { useAuth } from '@contexts/AuthContext';
import axios from 'axios';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import { Image, TextArea, View, Button as Btn } from 'native-base';
import { Camera, XSquare } from 'phosphor-react-native';
import { useState } from 'react';

const API_URL = process.env.EXPO_PUBLIC_API_URL;
export function PostExample() {
    const { signOut, authState } = useAuth();
    const [file, setFiles] = useState<ImagePicker.ImagePickerAsset | null>();
    const [titleInput, setTitleInput] = useState<string>('');
    const pickDocument = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: false, quality: 1,
            videoQuality: ImagePicker.UIImagePickerControllerQualityType.Medium,
            base64: false,
        });
        setFiles(result!.assets![0]);
    }

    const uploadFiles = async (file: ImagePicker.ImagePickerAsset) => {
        return await FileSystem.uploadAsync(`${API_URL}/api/file/`, file.uri, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${authState.token}`,
            },
            fieldName: 'file',
            httpMethod: 'POST',
            uploadType: FileSystem.FileSystemUploadType.MULTIPART,
        }).then((response) => JSON.parse(response.body));
    }

    const postHandler = async () => {
        if (titleInput.trim().length == 0 && !file) {
            return;
        }
        let mediaId: string | undefined = file ? await uploadFiles(file) : undefined;
        let title: string | undefined = titleInput.length > 0 ? titleInput : undefined;
        axios.post('/api/post/', { title, mediaId, context: 'public' }).then((response) => console.log(response.data));
    }

    return (
        <View flex={1} backgroundColor={'green.100'} p={8}>
            {/* <Text marginTop={10} fontSize={18} textAlign={'center'} fontWeight={700}>
                Post Example
            </Text>
            <Input placeholder={'Digite seu post'} value={titleInput} onChangeText={setTitleInput} />
            <Button title="Pick files" onPress={pickDocument} />
            <Button title="Make post" onPress={postHandler} />
            <Button title="signOut" onPress={signOut} />

            {file && (
                <View>
                    <Image
                        source={{ uri: file.uri }}
                        alt={file.uri.split("/").pop() || "undefined"}
                        w={'90%'}
                        h={200}
                        margin={2}
                        mx={'auto'}
                    />
                </View>
            )} */}
            <View flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'} mb={4}>
                <XSquare color="#BFA288" size={32} />
                <Button title="Publicar" variant={'outline'} w={32} h={9} py={0} onPress={postHandler} />
            </View>

            <View flexDirection={'row'} >
                <View rounded={'full'} w={14} h={14} >
                    {/* MOCKED SOURCE */}
                    <Image
                        source={{ uri: 'https://www.github.com/Busolin.png' }}
                        alt={'user'}
                        w={14}
                        h={14}
                        rounded={'full'}
                        borderWidth={'1'} borderColor={'yellow.100'}
                    />
                </View>

                <TextArea autoCompleteType={true} onChangeText={setTitleInput}
                    h={'full'}
                    ml={3}
                    placeholder="Qual a novidade para comentar hoje?"
                    w={'4/5'}
                    borderWidth={0}
                    bg={'transparent'}
                    fontSize={'md'}
                    color={'yellow.100'}
                />
            </View>

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

                    <Btn position={'absolute'} right={-24} top={-24} background={'yellow.100'} rounded={'full'} p={2} onPress={() => setFiles(null)}>
                        <XSquare color="#012626" size={32} />
                    </Btn>
                </View>

            )}

            <View flex={1} justifyContent={'center'}>
                <Btn onPress={pickDocument} w={24} h={24} bg={'transparent'} borderWidth={1} borderColor={'yellow.100'} bgColor={'green.200'} _pressed={{
                    bg: 'yellow.100',
                }}>
                    <Camera color='#BFA288' size={48} />
                </Btn>
            </View>
        </View>
    );
}
