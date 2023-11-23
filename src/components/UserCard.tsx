import React from 'react';
import { Image, Text, View } from 'native-base';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export interface UserCardProps {
    name: string;
    username: string;
    showEntryBadge: boolean;
    entryBadge: string;
    profilePicture: string;
}

export function UserCard({ name, username, showEntryBadge, entryBadge, profilePicture }: UserCardProps) {
    return (
        <View flexDirection={'row'} borderBottomWidth={1} borderBottomColor={'green.200'} pb={4}>
            <View rounded={'full'} w={16} h={16}>
                <Image
                    source={{ uri: `${API_URL}/api/file/${profilePicture}` }}
                    alt={'user'}
                    w={16}
                    h={16}
                    rounded={'full'}
                />
            </View>

            <View justifyContent={'flex-start'} alignItems={'flex-start'}>
                <View flexDirection={'row'} alignItems={'flex-start'}>
                    <Text color={'yellow.100'} fontSize={'lg'} ml={4} fontFamily={'heading'} maxWidth={36} overflow={'hidden'} numberOfLines={1}>
                        {name}
                    </Text>
                    <Text color={'yellow.100'} fontSize={'md'} ml={2} maxWidth={24} numberOfLines={1}>
                        @{username}
                    </Text>
                </View>

                {showEntryBadge && (
                    <View bgColor={'red.400'} p={'0.5'} px={2} ml={4} mt={1} mb={2} rounded={'md'}>
                        <Text color={'yellow.100'} fontSize={'md'}>
                            {entryBadge}
                        </Text>
                    </View>
                )}
            </View>
        </View>
    );
}
