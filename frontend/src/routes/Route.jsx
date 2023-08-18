import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from '../components/Other_component/Home/Home'
import HomeAdmin from '../components/Administrateur/HomeAdmin/HomeAdmin'
import Login from '../components/Authentification/Login/Login'
import HomeUser from '../components/User/HomeUser/HomeUser'
import ErrorPage from '../components/Other_component/ErrorPage/ErrorPage'
import ForgotPasswordForm from '../components/Authentification/ForgotPasswordForm/ForgotPasswordForm'
import ResetPasswordForm from '../components/Authentification/ResetPasswordForm/ResetPasswordForm'
import PageDepartement from '../components/Administrateur/Departement/departement'
import PagePoste from '../components/Administrateur/Poste/Poste'

import AjoutCollaborateur from '../components/Administrateur/Collaborateur/AjoutCollaborateur/AjoutCollaborateur'
import ListeCollaborateur from '../components/Administrateur/Collaborateur/ListeCollaborateur/ListeCollaborateur'
import Profil from '../components/ProfilUser/PageProfil/Profil'
import ProfilParametre from '../components/ProfilUser/ProfilParametre/ProfilParametre'
import ListeCollaborateurFront from '../components/User/Collaborateur /ListeCollaborateur/ListeCollaborateurFront'

function AppRoute(){
    return (
        <BrowserRouter>
            <Routes>
                {/* Routes pour toutes les pages */}
                <Route path="/" element={<Login/>}/>
                <Route path="/home" element={<Home/>}/>
                <Route path="/user/profile" element={<Profil/>}/>
                <Route path="/user/accountSetting" element={<ProfilParametre/>}/>
                <Route path="/error" element={<ErrorPage/>}/>

                <Route path="/password/reset_request/" element={<ForgotPasswordForm/>}/>
                <Route path="/reset-password/:token" element={<ResetPasswordForm/>}/>

                {/* Routes pour le backOffice du module Gestion des collaborateurs */}
                <Route path="/admin/departement" element={<PageDepartement/>}/>
                <Route path="/admin/poste" element={<PagePoste/>}/>
                
                <Route path="/admin/collaborateur/add" element={<AjoutCollaborateur/>}/>
                <Route path="/admin/collaborateur/liste" element={<ListeCollaborateur/>}/>
                <Route path="/admin/home" element={<HomeAdmin/>}/>

                {/* Routes pour le frontOffice du module Gestion des collaborateur */}
                <Route path="/user/home" element={<HomeUser/>}/>
                <Route path="/collaborateur/list" element={<ListeCollaborateurFront/>}/>

              

            </Routes>
        </BrowserRouter>
    )
}

export default AppRoute;
