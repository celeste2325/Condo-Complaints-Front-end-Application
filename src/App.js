import React from 'react'
import {Home} from './components/Home';
import {Login} from './components/Login'
import {HashRouter, Route, Routes, useLocation} from 'react-router-dom';
import {CreateComplaint} from './components/CreateComplaint';
import {Complaint} from './components/Complaint'
import {Logout} from './components/Logout';
import {CreateBuilding} from './components/CreateBuilding'
import {SignUp} from "./components/SignUp";
import {NavBar} from "./components/NavBar";
import {AuthProvider} from "./components/auth";
import ModalMessages from "./components/ModalMessages";


function App() {
    const location = useLocation();
    const hideNavBarRoutes = ['/', '/login', '/logout', '/signUp'];

    return (
        <>
            {!hideNavBarRoutes.includes(location.pathname) && <NavBar/>}
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/home" element={<Home/>}/>
                <Route path="/signUp" element={<SignUp/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/create-complaint" element={< CreateComplaint/>}/>
                <Route path="/consultar-reclamos" element={<Complaint/>}/>
                <Route path="/create-building" element={<CreateBuilding/>}/>
                <Route path="/logout" element={<Logout/>}/>
                <Route path="/modal" element={<ModalMessages/>}/>
            </Routes>
        </>
    );
}

const RootApp = () => {
    return (
        <HashRouter>
            <AuthProvider>
                <App/>
            </AuthProvider>
        </HashRouter>
    )
}

export default RootApp;
