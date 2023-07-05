import {Grid} from "@mui/material";
import React, {useEffect} from 'react';
import {RootStateOrAny, useDispatch, useSelector} from "react-redux";
import interventionService from "../../../services/intervention/intervention.service";
import BandeauNavigationComponent from "../../commun/bandeau-navigation/bandeau-navigation.component";
import TableauSuiviInterventionsComponent from "../tableau-suivi-interventions/tableau-suivi-interventions.component";

const PatientComponent = () => {

    const dispatch = useDispatch();
    const utilisateurState = useSelector((state: RootStateOrAny) => state.utilisateurReducer.utilisateur);

    useEffect(() => {
        if (utilisateurState) {
            interventionService. rechercherInterventionsPatient(utilisateurState.identifiant, dispatch);
        }
    }, [utilisateurState])

    return (
        <BandeauNavigationComponent>
            <Grid
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '100vw',
                    height: '90vh',
                    paddingTop: '10vh',
                    background: '#F5F7FA'
                }}
            >
                <Grid>
                    <TableauSuiviInterventionsComponent/>
                </Grid>
            </Grid>
        </BandeauNavigationComponent>
    );
}

export default PatientComponent;