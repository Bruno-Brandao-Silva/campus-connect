import { Input } from "@components/Input";
import { UserCard } from "@components/UserCard";
import { View, Image, FlatList, Button } from "native-base";
import logo from '../../assets/logo.png';
import { BellSimple } from "phosphor-react-native";
import { useEffect, useState } from "react";
import { UserProps } from "@contexts/AuthContext";
import { OtherProfile } from "./OthersProfile";
import axios from "axios";

export function Search() {
    const [input, setInput] = useState<string>('');
    const [users, setUsers] = useState<UserProps[]>([]);
    const [id, setId] = useState<string>('');

    useEffect(() => {
        let timeoutId: NodeJS.Timeout = null!;

        const fetchData = async () => {
            try {
                const response = await axios.get(`/api/user/search/${input}`);
                setUsers(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        clearTimeout(timeoutId);

        timeoutId = setTimeout(() => {
            if (input.length > 0) {
                fetchData();
            } else {
                setUsers([]);
            }
        }, 250);

        return () => clearTimeout(timeoutId);
    }, [input]);
    if (id != '') {
        return (<OtherProfile _id={id} resetId={() => setId('')} />)
    } else {
        return (
            <View flex={1} bg={'green.100'} >
                <View px={2} justifyContent={"space-between"} flexDirection={'row'} mt={8} >
                    <Image source={logo} alt="Campus Connect logo" />
                    <BellSimple size={32} color="#F2AC29" />
                </View>
                <Input placeholder={'Pesquisar'} value={input} onChangeText={setInput} />
                <FlatList data={users} renderItem={({ item }) => (
                    <Button bgColor={"#00000000"} w={"full"} onPress={() => {
                        setId(item._id);
                    }}>
                        <UserCard {...item} />
                    </Button>
                )} />
            </View>
        );
    }
}