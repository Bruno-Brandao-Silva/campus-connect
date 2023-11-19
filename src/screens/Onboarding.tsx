import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { Center, Checkbox, Heading, Image, ScrollView, Text, VStack, View } from "native-base";
import CAMPUSCONNECT from "../../assets/CAMPUSCONNECT.png";
import { useEffect, useState } from "react";
import { useAuth } from "@contexts/AuthContext";
import axios from "axios";

export function Onboarding() {
  const [currentStep, setCurrentStep] = useState(1);
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [showEntryBadge, setShowEntryBadge] = useState(true);

  useEffect(() => {
    axios.get('/api/user/').then((response) => {
      setName(response.data.name);
      setUsername(response.data.username);
    });
  }, [])

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const { setFirstAccess } = useAuth();

  const saveInfoHandler = () => {
    axios.patch('/api/user/', { name, username, showEntryBadge })
      .then(() => {
        setFirstAccess(false);
      });
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
      <VStack flex={1} bg={"green.100"}>
        {currentStep === 1 && (
          <Center flex={1} px={8} display={'flex'}>
            <View w={"full"}>
              <Text color={"yellow.100"} fontFamily={"body"} fontSize={"2xl"} textAlign={'center'} my={16}>
                Seja muito bem vindo ao <Text color={'yellow.600'} fontWeight={"bold"}>CAMPUSCONNECT!</Text>
              </Text>

              <Text color={"yellow.100"} fontFamily={"body"} fontSize={"md"} mt={4} textAlign={'justify'}>
                Antes de começar a utilizar nosso aplicativo,
                precisamos que você confirme alguma das suas informações e inclua
                como gostaria de ser exibido para os outros usuários.
              </Text>

              <Text color={"yellow.100"} fontFamily={"body"} fontSize={"md"} mb={16} textAlign={'justify'}>
                Gostaríamos de explicar a funcionalidade da exibição do ano de matrícula,
                que possibilita visualizar o ano de matrícula de outros usuários e torna visível
                o seu ano de egresso para os demais.
              </Text>


              <Button title="Próximo" variant="solid" my={4} onPress={handleNextStep} />
            </View>
          </Center>
        )}

        {currentStep === 2 && (
          <>
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
                <Text color={"yellow.100"} fontFamily={"body"} fontSize={"xl"}>Nome</Text>
                <Input placeholder="Seu nome para os outros usuários" keyboardType="number-pad" my={4} value={name} onChangeText={setName} />
              </View>

              <View w={"full"}>
                <Text color={"yellow.100"} fontFamily={"body"} fontSize={"xl"}>Como deseja ser exibido? (@)</Text>
                <Input placeholder="Seu @ para os outros usuários" keyboardType="number-pad" my={4} value={username} onChangeText={setUsername} />
              </View>

              <View w={"full"}>
                <Checkbox
                  value="registrationYear"
                  accessibilityLabel="Checkbox de exibição de ano de matrícula"
                  colorScheme='yellow'
                  mb={4}
                  isChecked={showEntryBadge}
                  onChange={setShowEntryBadge}
                >
                  <Text color={'yellow.100'} fontSize={"md"}>
                    Exibir seu ano de matrícula?
                  </Text>
                </Checkbox>
              </View>

              <Button title="Salvar informações" variant="solid" my={4} onPress={saveInfoHandler} />
            </Center>
          </>
        )}
      </VStack>
    </ScrollView>
  )
}