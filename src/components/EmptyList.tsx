import { Text, View } from "native-base";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


export function EmptyList() {
  return (
    <View flex={1} justifyContent={'center'} alignItems={'center'} >
      <Text color={'yellow.100'} fontSize={'2xl'}>Não há posts para exibir</Text>
      <Text color={'yellow.100'} fontSize={'md'}>Que tal adicionar um novo post?
        Para isso, basta clicar no ícone na barra de navegação

      </Text>
      <MaterialCommunityIcons name="plus-box-multiple-outline" color={'#BFA288'} size={16}
      />
    </View >
  )
}