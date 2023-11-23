import React, { useState } from "react";
import { View, Image } from "native-base";
import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { BellSimple } from "phosphor-react-native";
import logo from '../../assets/logo.png';
import { Button as Btn } from 'native-base';
import { useAuth } from "@contexts/AuthContext";
import axios from "axios";
import { Camera } from 'phosphor-react-native';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export interface EditProfileProps {
  closeModal: () => void;
}

export function EditProfile({ closeModal }: EditProfileProps) {
  const { authState } = useAuth();
  const user = authState.user!;
  const [editedUser, setEditedUser] = useState({ ...user });

  const [file, setFiles] = useState<ImagePicker.ImagePickerAsset | null>();
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

  const handleSaveChanges = () => {

    // axios.patch('/api/user/').then((response) => console.log(response.data));
    closeModal();
  };

  return (
    <View zIndex={999} bg={'green.100'} w={"full"} h={"full"}>
      <View px={2} justifyContent={"space-between"} flexDirection={'row'} mt={8} >
        <Image source={logo} alt="Campus Connect logo" />
        <BellSimple size={32} color="#F2AC29" />
      </View>

      <View flex={0} flexDirection={"row"} justifyContent={"center"} w={"full"}>
        <Image
          source={{ uri: file?.uri || `${API_URL}/api/file/${user.profilePicture}` }}
          alt={'user'}
          w={40}
          h={40}
          rounded={'full'}
          borderWidth={2} borderColor={'yellow.100'}
        />
      </View>
      <View mt={8} marginX={5} >
        <View margin={"auto"} marginBottom={8}>
          <Btn onPress={pickDocument} w={20} h={20} bg={'transparent'} borderWidth={1} borderColor={'yellow.100'} bgColor={'green.200'} _pressed={{
            bg: 'yellow.100',
          }}>
            <Camera color='#BFA288' size={48} />
          </Btn>
        </View>

        <Input
          placeholder="Name"
          value={editedUser.name}
          onChangeText={(value) => setEditedUser({ ...editedUser, name: value })}
        />
        <Input
          placeholder="Username"
          value={editedUser.username}
          onChangeText={(value) => setEditedUser({ ...editedUser, username: value })}
        />
        <Input
          placeholder="Sobre"
          value={editedUser.about}
          onChangeText={(value) => setEditedUser({ ...editedUser, about: value })}
        />

        <View mb={2}>
          <Button w={40} marginX={"auto"} marginTop={10} title="Salvar" onPress={handleSaveChanges} />

        </View>
      </View>

    </View >
  );
}
