import {Grid} from "@mui/material";
import React, {useEffect} from 'react';
import {RootStateOrAny, useDispatch, useSelector} from "react-redux";
import interventionService from "../../../services/http/intervention/intervention.service";
import BandeauNavigationComponent from "../../commun/bandeau-navigation/bandeau-navigation.component";
import TableauSuiviInterventionsComponent from "../tableau-suivi-interventions/tableau-suivi-interventions.component";
import './suivi-interventions-patient.scss'

const SuiviInterventionsPatientComponent = () => {

    const dispatch = useDispatch();
    const utilisateurState = useSelector((state: RootStateOrAny) => state.utilisateurReducer.utilisateur);

    useEffect(() => {
        if (utilisateurState) {
            interventionService.rechercherInterventionsPatient(utilisateurState.identifiant, dispatch);
        }
    }, [utilisateurState])

    return (
        <BandeauNavigationComponent>
            <Grid className="suivi-interventions-patient-conteneur">
                <Grid>
                    <TableauSuiviInterventionsComponent/>
                </Grid>
            </Grid>
        </BandeauNavigationComponent>
    );
}

export default SuiviInterventionsPatientComponent;