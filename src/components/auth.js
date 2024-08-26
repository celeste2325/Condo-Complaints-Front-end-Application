import React, {useState} from 'react'

const AuthContext = React.createContext();

function AuthProvider({children}) {
    const [user, setUser] = useState(null);
    const [contrasenia, setContrasenia] = useState(null);

    const login = (userDocumento, contrasenia) => {
        setUser(userDocumento);
        setContrasenia(contrasenia)
    }

    const logout = () => {
        setUser(null);
        setContrasenia(null);
    }

    const auth = {user, contrasenia, login, logout};

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
