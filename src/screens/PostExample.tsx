import { Button } from '@components/Button';
import { FlatList, Image, Text, View } from 'native-base';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { useState } from 'react';
import { Input } from '@components/Input';
import { useAuth } from '@contexts/AuthContext';
import axios from 'axios';

const API_URL = process.env.EXPO_PUBLIC_API_URL;
export function PostExample() {
    const { signOut, authState } = useAuth();
    const [file, setFiles] = useState<ImagePicker.ImagePickerAsset>();
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
        <View flex={1}>
            <Text marginTop={10} fontSize={18} textAlign={'center'} fontWeight={700}>
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
            )}
        </View>
    );
}
