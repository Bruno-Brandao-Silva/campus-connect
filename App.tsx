import { useFonts } from 'expo-font';
import { Text, View, StatusBar } from 'react-native';
import { Montserrat_400Regular, Montserrat_600SemiBold, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import { OpenSans_600SemiBold } from '@expo-google-fonts/open-sans';

export default function App() {
  const [fontsLoaded] = useFonts({
    Montserrat_400Regular, Montserrat_600SemiBold, Montserrat_700Bold, OpenSans_600SemiBold
  })

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <StatusBar barStyle={'light-content'} translucent backgroundColor="transparent" />
      {fontsLoaded ? <Text>Hello world</Text> : <View />}
    </View>
  );
}


