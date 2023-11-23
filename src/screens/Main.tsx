import { NavBar } from "@components/NavBar";
import { useAuth } from "@contexts/AuthContext";
import { Login } from "./Login";
import { useFonts } from 'expo-font';
import { Montserrat_400Regular, Montserrat_600SemiBold, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import { OpenSans_600SemiBold } from '@expo-google-fonts/open-sans';
import { Onboarding } from "./Onboarding";
import { Loading } from "@components/Loading";

export function Main() {
    const { authState } = useAuth();
    const [fontsLoaded] = useFonts({
        Montserrat_400Regular, Montserrat_600SemiBold, Montserrat_700Bold, OpenSans_600SemiBold
    })
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