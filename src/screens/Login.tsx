import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { useAuth } from "@contexts/AuthContext";
import { Center, Image, Modal, ScrollView, Spinner, Text, Toast, VStack, View } from "native-base";
import { useState } from "react";
import CAMPUSCONNECT from "../../assets/CAMPUSCONNECT.png";

export function Login() {
  const { signIn, authState, signOut } = useAuth();
  const [ra, setRa] = useState('');
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(false);

  const loginHandler = async () => {
    try {
      await signIn(ra, password);
    } catch (error) {
      Toast.show({
        title: "Erro ao fazer login",
        description: "RA ou senha incorretos",
        duration: 3000,
      })
    }
    finally {
      setShowModal(false);
    }
  }
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} >
        <Spinner color={"yellow.600"} size={"lg"} />
      </Modal>

      <VStack flex={1} bg={"green.100"}>
        <Image
          source={CAMPUSCONNECT}
          alt="CAMPUSCONNECT"
          mt={24}
          w={'4/5'}
          resizeMode="center"
          alignSelf="center"
        />

        <Center mt={16} flex={1} px={8} display={'flex'}>
          <View w={"full"}>
            <Text color={"yellow.100"} fontFamily={"body"} fontSize={"xl"}>Login</Text>
            <Input placeholder="Identificação de usuário (R.A.)" keyboardType="number-pad" my={4} value={ra} onChangeText={setRa} />
          </View>

          <View w={"full"}>
            <Text color={"yellow.100"} fontFamily={"body"} fontSize={"xl"}>Senha</Text>
            <Input placeholder="Senha" secureTextEntry my={4} value={password} onChangeText={setPassword} />
          </View>
          <Button title="Acessar conta" variant="solid" my={4} onPress={() => { loginHandler(); setShowModal(true); }} />
        </Center>

        <Text my={12} color={'yellow.100'} mx={8} textAlign={'center'} fontSize={'md'}>
          Somente para alunos da UTFPR
        </Text>
      </VStack>
    </ScrollView>
  )
}