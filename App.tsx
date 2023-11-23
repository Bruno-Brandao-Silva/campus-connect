import { StatusBar } from 'react-native';
import { NativeBaseProvider } from 'native-base';
import { THEME } from './src/theme';
import { AuthProvider } from '@contexts/AuthContext';
import axios from 'axios';
import { Main } from '@screens/Main';

axios.defaults.baseURL = process.env.EXPO_PUBLIC_API_URL;

export default function App() {
  return (
    <AuthProvider>
      <NativeBaseProvider theme={THEME}>
        <StatusBar barStyle={'light-content'} translucent backgroundColor="transparent" />
        <Main/>
      </NativeBaseProvider>
    </AuthProvider>
  );
}