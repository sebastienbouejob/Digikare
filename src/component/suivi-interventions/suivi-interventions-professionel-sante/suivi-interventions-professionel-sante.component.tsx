import {Button, Grid} from "@mui/material";
import React, {useEffect} from 'react';
import {RootStateOrAny, useDispatch, useSelector} from "react-redux";
import interventionService from "../../../services/http/intervention/intervention.service";
import TableauSuiviInterventionsComponent from "../tableau-suivi-interventions/tableau-suivi-interventions.component";
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import BandeauNavigationComponent from "../../commun/bandeau-navigation/bandeau-navigation.component";
import {useNavigate} from "react-router-dom";
import '../../../App.css'
import './suivi-interventions-professionnel-sante.scss'

const SuiviInterventionsProfessionelSanteComponent = () => {

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
            <Grid className="suivi-interventions-professionnel-sante-conteneur">
                <TableauSuiviInterventionsComponent/>
                <Grid className="conteneur-bouton-ajout-intervention">
                    <Button
                        className={"bouton-digikare"}
                        startIcon={(<ControlPointIcon/>)}
                        type="submit" onClick={(event) => executerAjouter(event)}>Ajouter une intervention</Button>
                </Grid>
            </Grid>
        </BandeauNavigationComponent>
    );
}
export default SuiviInterventionsProfessionelSanteComponent;