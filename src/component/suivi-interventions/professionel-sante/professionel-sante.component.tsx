import {Button, Grid} from "@mui/material";
import React, {useEffect} from 'react';
import {RootStateOrAny, useDispatch, useSelector} from "react-redux";
import interventionService from "../../../services/intervention/intervention.service";
import TableauSuiviInterventionsComponent from "../tableau-suivi-interventions/tableau-suivi-interventions.component";
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import BandeauNavigationComponent from "../../commun/bandeau-navigation/bandeau-navigation.component";
import '../../../App.css'
import {useNavigate} from "react-router-dom";
const ProfessionelSanteComponent = () => {

    const dispatch = useDispatch();
    const naviguer = useNavigate();
    const utilisateurState = useSelector((state: RootStateOrAny) => state.utilisateurReducer.utilisateur);

    const executerAjouter = (event: any) => {
        naviguer('/intervention/creer')
    }

    useEffect(() => {
        if (utilisateurState) {
            interventionService.rechercherInterventionsPS(utilisateurState.identifiant, dispatch);
        }
    }, [utilisateurState])

    return (
        <BandeauNavigationComponent>
            <Grid
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    paddingTop: '10vh',
                    width: '100vw',
                    height: '90vh',
                    background: '#F5F7FA'
                }}
            >
                <Grid
                    style={{
                        width: '50vw'
                    }}
                >
                    <TableauSuiviInterventionsComponent/>
                </Grid>
                <Grid
                    style={{
                        width: '50vw',
                        display: 'flex',
                        justifyContent: 'end',
                        padding: '24px'
                    }}
                >
                    <Button
                        className={"bouton-digikare"}
                        startIcon={(<ControlPointIcon />)}
                        type="submit" onClick={(event) => executerAjouter(event)}>Ajouter une intervention</Button>
                </Grid>
            </Grid>
        </BandeauNavigationComponent>

    );
}

export default ProfessionelSanteComponent;