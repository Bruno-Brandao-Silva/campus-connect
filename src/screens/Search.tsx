import { UserCard } from "@components/UserCard";
import { View, Image, FlatList, Button, Text, Input } from "native-base";
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
    }

    return (
        <View flex={1} bg={'green.100'} py={6} px={2}>
            <View flexDirection={'row'}>
                <View px={2} justifyContent={"center"} alignItems={"center"} flexDirection={'row'} mb={4} >
                    <Image source={logo} alt="Campus Connect logo" />

                    <Input placeholder="Pesquisar por usuário" onChangeText={(text) => setInput(text)} w={"3/4"} mx={2}
                        h={10}
                        px={4}
                        borderWidth={1}
                        borderColor={'yellow.100'}
                        fontSize="md"
                        color="yellow.100"
                        fontFamily="body"
                        placeholderTextColor="yellow.100"
                        _focus={{
                            bg: 'transparent',
                            borderColor: 'yellow.200'
                        }}

                    />

                    <BellSimple size={32} color="#F2AC29" />
                </View>
            </View>

            <FlatList data={users} renderItem={({ item }) => (
                <Button bg={"transparent"} w={"full"} onPress={() => {
                    setId(item._id);
                }}>
                    <UserCard {...item} />
                </Button>
            )} />
        </View>
    );
}