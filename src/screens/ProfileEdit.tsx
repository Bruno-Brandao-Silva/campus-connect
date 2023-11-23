import React, { useState } from "react";
import { View, Image, Text, Modal, Spinner } from "native-base";
import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { ArrowLeft, BellSimple } from "phosphor-react-native";
import logo from '../../assets/logo.png';
import { Button as Btn } from 'native-base';
import { useAuth } from "@contexts/AuthContext";
import axios from "axios";
import { Camera } from 'phosphor-react-native';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import { TouchableOpacity } from "react-native";
import { TextArea } from "native-base";


const API_URL = process.env.EXPO_PUBLIC_API_URL;

export interface EditProfileProps {
  closeModal: () => void;
}

export function EditProfile({ closeModal }: EditProfileProps) {
  const { authState, updateUser } = useAuth();
  const user = authState.user!;
  const [editedUser, setEditedUser] = useState({ ...user });
  const [showModal, setShowModal] = useState(false);

  const [file, setFiles] = useState<ImagePicker.ImagePickerAsset | null>();
  const pickDocument = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: false, quality: 1,
        videoQuality: ImagePicker.UIImagePickerControllerQualityType.Medium,
        base64: false,
      });
      setFiles(result!.assets![0]);
    } catch (error) {

    }
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

  const handleSaveChanges = async () => {
    setShowModal(true);
    if (!file) {
      await axios.patch('/api/user/', editedUser);
    }

    const oldfile = user.profilePicture;
    const mediaId = await uploadFiles(file)
    await axios.patch('/api/user/', { ...editedUser, profilePicture: mediaId });
    await axios.delete(`/api/file/${oldfile}`);
    await updateUser();

    setShowModal(false);
    closeModal();
  };

  return (
    <View zIndex={999} bg={'green.100'} w={"full"} h={"full"}>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} >
        <Spinner color={"yellow.600"} size={"lg"} />
      </Modal>

      <View px={4} mt={8} >
        <TouchableOpacity onPress={closeModal}>
          <ArrowLeft color="#BFA288" size={24} />
        </TouchableOpacity>
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
        <Btn
          rounded={'full'}
          position={'absolute'}
          bottom={-4}
          right={32}
          onPress={pickDocument}
          w={12}
          h={12}
          bg={'transparent'}
          borderWidth={1}
          borderColor={'yellow.100'}
          bgColor={'green.200'}
          _pressed={{
            bg: 'yellow.100',
          }}>
          <Camera color='#BFA288' size={24} />
        </Btn>
      </View>
      <View mt={8} marginX={4} >

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

        <TextArea
          autoCompleteType={true}
          placeholder="Sobre"
          value={editedUser.about}
          onChangeText={(value) => setEditedUser({ ...editedUser, about: value })}
          borderColor={'yellow.100'}
          color={'yellow.100'}
          placeholderTextColor={'yellow.100'}
          mb={4}
          _focus={{
            borderColor: 'yellow.200',
            bg: 'transparent'
          }}
        />


        <Button title="Salvar" w={'full'} onPress={handleSaveChanges} />
      </View>

    </View >
  );
}
