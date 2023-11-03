import {lazy} from 'react'; 

const Formations = lazy(() => import('./Formations'))
const DemandeFormations = lazy(()=>import('./demandeFormation'))
const VoirPlusFormation = lazy(()=>import('../VoirPlus/VoirPlusFormation'))
const AjoutFormation = lazy(()=>import('../../FormationUser/Formateur/AjoutFormation/AjoutFormations'))
const AjoutModule = lazy(()=>import('../../FormationUser/Formateur/AjoutModule/AjoutModule'))
const CalendarForm = lazy(() => import('../../CalendarSeance/calendrierForm/CalendarForm'))
const Discussions = lazy(()=>import('../discussionFormation/discussionFormation'))

const FormationConfig = {
    routes: [
                {
                    path: 'dashboards/listeFormation',
                    element: <Formations />,
                },
                {
                    path: 'dashboards/demandeFormation',
                    element: <DemandeFormations />,
                },
                {
                    path: 'admin/formation/:id',
                    element: <VoirPlusFormation />,
                },
                {
                    path:'formateur/addFormation',
                    element: <AjoutFormation/>
                },
                {
                    path:'/addSeance/:id',
                    element:<CalendarForm/>
                },
                {
                    path:'/addModule/:id',
                    element:<AjoutModule/>
                },
                {
                    path:'formation/addModule',
                    element: <AjoutModule/>
                },
                {
                    path:'/discussion/formation/:id',
                    element:<Discussions/>
                }
            ],
};

export default FormationConfig;