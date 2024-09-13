import React, {useState} from 'react'

const AuthContext = React.createContext();

function AuthProvider({children}) {
    const [user, setUser] = useState(null);
    const [password, setPassword] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);

    const login = (signUpData) => {
        setUser(signUpData.document)
        setIsAdmin(signUpData.role === 'admin')
        setPassword(signUpData.password)
    }

    const logout = () => {
        setUser(null);
        setPassword(null);
    }

    const auth = {user, password, isAdmin, login, logout};

    return (
        <AuthContext.Provider value={auth}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth() {
    const auth = React.useContext(AuthContext);
    return auth;
}

export {
    AuthProvider,
    useAuth
};
