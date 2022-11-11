import { createContext, useContext } from 'react';
import { AuthService } from './auth.service';

const AuthContext = createContext(null);

export function AuthProvider(props) {
    const authService = props.authService || new AuthService();
    return (
        <AuthContext.Provider value={authService}>
            {props.children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
