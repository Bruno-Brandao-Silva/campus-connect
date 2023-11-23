import { Input } from "@components/Input";
import { UserCard } from "@components/UserCard";
import { View, Image } from "native-base";
import logo from '../../assets/logo.png';
import { BellSimple } from "phosphor-react-native";

export function Search() {
    let usr = {
        name: 'Bruno Brandão Silva',
        username: 'bruno.bs',
        showEntryBadge: true,
        entryBadge: '2019.1',
        profilePicture: '655e567c854c1d888aaa7968'

    }
    return (
        <View flex={1} bg={'green.100'} >
            <View px={2} justifyContent={"space-between"} flexDirection={'row'} mt={8} >
                <Image source={logo} alt="Campus Connect logo" />
                <BellSimple size={32} color="#F2AC29" />
            </View>
            <Input placeholder={'Pesquisar'} />

            <UserCard {...usr} />

        </View>

    )
}