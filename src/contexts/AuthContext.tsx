import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

interface AuthProps {
    authState: {
        token: string | null;
        authenticated: boolean | null;
        firstAccess: boolean | null;
        user: UserProps | null;
    };
    signIn: (login: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
    setFirstAccess: (firstAccess: boolean) => void;
    updateUser: () => Promise<void>;
    tokenHandler: () => void;
}

export interface UserProps {
    _id: string;
    name: string;
    username: string;
    academicRegistration: string;
    about: string;
    academicSchedule: [string];
    profilePicture: string;
    showEntryBadge: boolean;
    entryBadge: string;
    following: [string];
    followers: [string];
    createdAt: string;
    updatedAt: string;
}

const TOKEN_KEY = "CCS-AUTH-TOKEN"

export const AuthContext = createContext<AuthProps>({
    authState: {
        token: null,
        authenticated: null,
        firstAccess: null,
        user: null
    },
    signIn: () => Promise.resolve(),
    signOut: () => Promise.resolve(),
    setFirstAccess: () => { },
    updateUser: () => Promise.resolve(),
    tokenHandler: () => { }
});

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }: { children: React.JSX.Element }) => {
    const [authState, setAuthState] = useState<{
        token: string | null,
        authenticated: boolean | null,
        firstAccess: boolean | null,
        user: UserProps | null
    }>({
        token: null,
        authenticated: null,
        firstAccess: null,
        user: null
    });
    const tokenHandler = () => {
        SecureStore.getItemAsync(TOKEN_KEY).then((token) => {
            if (token) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                axios.get('/api/user').then((response) => {
                    setAuthState({
                        token,
                        authenticated: true,
                        firstAccess: false,
                        user: response.data
                    });
                }).catch((error) => {
                    axios.defaults.headers.common['Authorization'] = undefined;
                    setAuthState({
                        token: null,
                        authenticated: false,
                        firstAccess: null,
                        user: null
                    });
                    SecureStore.deleteItemAsync(TOKEN_KEY);
                });
            } else {
                setAuthState({
                    token: null,
                    authenticated: false,
                    firstAccess: null,
                    user: null
                });
            }
        });
    }
    useEffect(() => {
        tokenHandler();
    }, []);

    const signIn = async (login: string, password: string) => {
        const response = await axios.post(`/api/auth/login`, {
            login,
            password
        });
        const { token, firstAccess } = response.data;
        const user = (await axios.get(`/api/user/`)).data as UserProps;
        await SecureStore.setItemAsync(TOKEN_KEY, token);
        setAuthState({
            token,
            authenticated: true,
            firstAccess,
            user: user as UserProps
        });
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        await SecureStore.setItemAsync(TOKEN_KEY, token);
    }

    const signOut = async () => {
        await SecureStore.deleteItemAsync(TOKEN_KEY);

        axios.defaults.headers.common['Authorization'] = undefined;

        setAuthState({
            token: null,
            authenticated: false,
            firstAccess: null,
            user: null
        });
    }
    const updateUser = async () => {
        const user = (await axios.get(`/api/user/`)).data as UserProps;
        setAuthState({
            ...authState,
            user: user as UserProps
        });
    }

    const setFirstAccess = (firstAccess: boolean) => {
        setAuthState({
            ...authState,
            firstAccess
        });
    }

    const value = {
        authState,
        signIn,
        signOut,
        setFirstAccess,
        updateUser,
        tokenHandler
    }
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
