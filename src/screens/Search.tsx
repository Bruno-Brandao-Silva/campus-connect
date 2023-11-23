import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { UserCard } from "@components/UserCard";
import { View } from "native-base";

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
            <Input placeholder={'Pesquisar'} />

            <UserCard {...usr} />

        </View>

    )
}