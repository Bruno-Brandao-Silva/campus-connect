import { useFonts } from 'expo-font';
import { StatusBar } from 'react-native';
import { Montserrat_400Regular, Montserrat_600SemiBold, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import { OpenSans_600SemiBold } from '@expo-google-fonts/open-sans';
import { NativeBaseProvider } from 'native-base';
import { Loading } from '@components/Loading';
import { THEME } from './src/theme';
import { Login } from '@screens/Login';
import { Onboarding } from '@screens/Onboarding';
import { AuthProvider, useAuth } from '@contexts/AuthContext';
import axios from 'axios';
import { PostForm } from './src/screens/PostForm';
import { Feed } from '@screens/Feed';
import { Profile } from '@screens/Profie';

axios.defaults.baseURL = process.env.EXPO_PUBLIC_API_URL;

export default function App() {
  return (
    <AuthProvider>
      <Layout />
    </AuthProvider>
  );
}

const Layout = () => {
  let opc = 2;
  const { authState } = useAuth();
  const [fontsLoaded] = useFonts({
    Montserrat_400Regular, Montserrat_600SemiBold, Montserrat_700Bold, OpenSans_600SemiBold
  })
  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar barStyle={'light-content'} translucent backgroundColor="transparent" />
      {fontsLoaded ?
        (authState.authenticated ?
          (authState.firstAccess ?
            <Onboarding /> :
            (() => {
              switch (opc) {
                case 0: return <Feed />;
                case 1: return <PostForm />;
                case 2: return <Profile />;
              }
            })()) :
          <Login />) :
        <Loading />}
    </NativeBaseProvider>
  )
}


