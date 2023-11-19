import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

interface AuthProps {
    authState: {
        token: string | null;
        authenticated: boolean | null;
        firstAccess: boolean | null;
    };
    signIn: (ra: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
    setFirstAccess: (firstAccess: boolean) => void;
}

const TOKEN_KEY = "CCS-AUTH-TOKEN"

export const AuthContext = createContext<AuthProps>({
    authState: {
        token: null,
        authenticated: null,
        firstAccess: null
    },
    signIn: () => Promise.resolve(),
    signOut: () => Promise.resolve(),
    setFirstAccess: () => { }
});

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }: { children: React.JSX.Element }) => {
    const [authState, setAuthState] = useState<{
        token: string | null,
        authenticated: boolean | null,
        firstAccess: boolean | null
    }>({
        token: null,
        authenticated: null,
        firstAccess: null
    });

    useEffect(() => {
        SecureStore.getItemAsync(TOKEN_KEY).then((token) => {
            if (token) {
                setAuthState({
                    token,
                    authenticated: true,
                    firstAccess: false
                });

                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            } else {
                setAuthState({
                    token: null,
                    authenticated: false,
                    firstAccess: null
                });
            }
        });
    }, []);

    const signIn = async (ra: string, password: string) => {
        const response = await axios.post(`/api/auth/login`, {
            academicRegistration: ('a' + ra),
            password
        });
        const { token, firstAccess } = response.data;

        await SecureStore.setItemAsync(TOKEN_KEY, token);

        setAuthState({
            token,
            authenticated: true,
            firstAccess
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
            firstAccess: null
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
        setFirstAccess
    }
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
