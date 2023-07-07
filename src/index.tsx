import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {PersistGate} from 'redux-persist/integration/react'
import {store, storePersisted} from './redux/store'
import ProviderWrapper from "./ProviderWrapper";
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import LoginComponent from './component/login/login.component'
import SuiviInterventionsProfessionelSanteComponent
    from "./component/suivi-interventions/suivi-interventions-professionel-sante/suivi-interventions-professionel-sante.component";
import SuiviInterventionsPatientComponent from "./component/suivi-interventions/suivi-interventions-patient/suivi-interventions-patient.component";
import CreationInterventionComponent
    from "./component/suivi-interventions/intervention/creation/creation-intervention.component";
import App from "./App";


ReactDOM.render(
    <ProviderWrapper store={store}>
        <PersistGate loading={null} persistor={storePersisted}>
            <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<App/>}/>
                        <Route path="/login" element={<LoginComponent/>}/>
                        <Route path="/professionnel-sante" element={<SuiviInterventionsProfessionelSanteComponent/>}/>
                        <Route path="/patient" element={<SuiviInterventionsPatientComponent/>}/>
                        <Route path="/intervention/creer" element={<CreationInterventionComponent/>}/>
                    </Routes>
            </BrowserRouter>
        </PersistGate>
    </ProviderWrapper>,
    document.getElementById('root')
);

reportWebVitals();
