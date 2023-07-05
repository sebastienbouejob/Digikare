import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {PersistGate} from 'redux-persist/integration/react'
import {store, storePersisted} from './redux/store'
import ProviderWrapper from "./ProviderWrapper";
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import LoginComponent from './component/login/login.component'
import ProfessionelSanteComponent
    from "./component/suivi-interventions/professionel-sante/professionel-sante.component";
import PatientComponent from "./component/suivi-interventions/patient/patient.component";
import CreationInterventionComponent
    from "./component/suivi-interventions/intervention/creation-intervention/creation-intervention.component";


ReactDOM.render(
    <ProviderWrapper store={store}>
        <PersistGate loading={null} persistor={storePersisted}>
            <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<LoginComponent/>}/>
                        <Route path="/login" element={<LoginComponent/>}/>
                        <Route path="/professionnel-sante" element={<ProfessionelSanteComponent/>}/>
                        <Route path="/patient" element={<PatientComponent/>}/>
                        <Route path="/intervention/creer" element={<CreationInterventionComponent/>}/>
                    </Routes>
            </BrowserRouter>
        </PersistGate>
    </ProviderWrapper>,
    document.getElementById('root')
);

reportWebVitals();
