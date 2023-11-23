import { NavBar } from "@components/NavBar";
import { useAuth } from "@contexts/AuthContext";
import { Login } from "./Login";
import { useFonts } from 'expo-font';
import { Montserrat_400Regular, Montserrat_600SemiBold, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import { OpenSans_600SemiBold } from '@expo-google-fonts/open-sans';
import { Onboarding } from "./Onboarding";
import { Loading } from "@components/Loading";
import { useEffect } from "react";
import axios from "axios";

export function Main() {
    const { authState, tokenHandler } = useAuth();
    const [fontsLoaded] = useFonts({
        Montserrat_400Regular, Montserrat_600SemiBold, Montserrat_700Bold, OpenSans_600SemiBold
    })
    useEffect(() => {
        axios.interceptors.response.use(response => {
            return response;
          }, error => {
            if (error && error.response && error.response.status === 403) {
              tokenHandler();
            } 
            return Promise.reject(error);
          });
      }, []);
    if (fontsLoaded) {
        if (authState.authenticated) {
            if (authState.firstAccess) {
                return <Onboarding />
            } else {
                return <NavBar />
            }
        } else {
            return <Login />
        }
    } else {
        return <Loading />
    }
}