import React from 'react'
import {Home} from './components/Home';
import {Login} from './components/Login'
import {HashRouter, Route, Routes} from 'react-router-dom';
import {CreateComplaint} from './components/CreateComplaint';
import {Reclamo} from './components/Reclamo'
import Edificio from './components/Edificio';
import Persona from './components/Persona';
import {Logout} from './components/Logout';
import {AuthProvider} from './components/auth'
import {CrearEdificio} from './components/CrearEdificio'

function App() {
    return (
        <HashRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<Login/>}/>
                    <Route path="/home" element={<Home/>}/>
                    <Route path="/create-complaint" element={< CreateComplaint/>}/>
                    <Route path="/consultar-reclamos" element={<Reclamo/>}/>
                    <Route path="/administrar-edificios" element={<Edificio/>}/>
                    <Route path="/crear-edificio" element={<CrearEdificio/>}/>
                    <Route path="/administrar-personas" element={<Persona/>}/>
                    <Route path="/logout" element={<Logout/>}/>
                </Routes>
            </AuthProvider>
        </HashRouter>
    );
}

export default App;
