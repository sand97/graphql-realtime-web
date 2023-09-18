import React, {useState, useMemo} from "react";
import SecureLS from 'secure-ls';
import {LoginResponse} from "__generated__/graphql";

const ls = new SecureLS({encodingType: 'aes'});

export interface UserContextType {
    auth?: {
        token: string
        user: LoginResponse['user']
    }
    login: (auth: UserContextType['auth']) => void
    logout: () => void
}

export const UserContext = React.createContext<UserContextType | null>(null);

interface UserContextProviderProps {
    children: React.ReactNode
}

export const UserContextProvider = ({children}: UserContextProviderProps) => {

    const user = useMemo(() => {
        try {
            return !!ls.get('user') ? ls.get('user') : undefined;
        } catch (error) {
            return undefined
        }
    }, []);

    const token = useMemo(() => {
        try {
            return !!ls.get('token') ? ls.get('token') : undefined;
        } catch (error) {
            return undefined
        }
    }, []);

    let initialAuth = (user && token) ? { user, token } : undefined

    const [auth, setAuth] = useState<UserContextType['auth']>(initialAuth);

    const login: UserContextType['login'] = (auth) => {
        setAuth(auth);
        ls.set('token', auth?.token);
        ls.set('user', auth?.user);
    }

    const logout = () => {
        setAuth(undefined);
        ls.remove('token');
        ls.remove('user');
    }

    return <UserContext.Provider value={{
        auth,
        login,
        logout
    }}>
        {children}
    </UserContext.Provider>

}