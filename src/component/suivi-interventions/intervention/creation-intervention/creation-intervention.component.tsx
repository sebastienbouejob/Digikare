import {Button, Grid} from "@mui/material";
import React, {useRef, useState} from 'react';
import {RootStateOrAny, useDispatch, useSelector} from "react-redux";
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import BandeauNavigationComponent from "../../../commun/bandeau-navigation/bandeau-navigation.component";
import '../../../../App.css'
import './creation-intervention.scss'
import {useNavigate} from "react-router-dom";
import InformationsPatientComponent from "./informations-patient/informations-patient.component";
import InformationsInterventionComponent from "./informations-intervention/informations-intervention.component";
import {InformationsIntervention} from "../../../../modeles/front/intervention/InformationsIntervention";
import {InformationsPatient} from "../../../../modeles/front/intervention/InformationsPatient";
import interventionService from "../../../../services/intervention/intervention.service";

const CreationInterventionComponent = () => {

    const naviguer = useNavigate();
    const dispatch = useDispatch();

    const utilisateurState = useSelector((state: RootStateOrAny) => state.utilisateurReducer.utilisateur);

    const [activerBoutonAjouter, setActiverBoutonAjouter] = useState(false);

    const informationsInterventionValides = useRef(false);
    const informationsPatientValides = useRef(false);
    const informationsIntervention = useRef({} as InformationsIntervention);
    const informationsPatient = useRef({} as InformationsPatient);

    const executerAjouter = () => {
        informationsIntervention.current = {...informationsIntervention.current, idPs: utilisateurState.identifiant}
        interventionService.enregistrerIntervention(informationsPatient.current, informationsIntervention.current, dispatch);
        naviguer('/professionnel-sante')
    }

    const executerAnnuler = (event: any) => {
        naviguer(-1)
    }
    const executerOnChangeInfoIntervention = (information: InformationsIntervention) => {
        const infoInterValides = information.interventionDate !== undefined && information.interventionType !== undefined;
        informationsInterventionValides.current = infoInterValides;
        informationsIntervention.current = information;
        setActiverBoutonAjouter(infoInterValides && informationsPatientValides.current);
    }

    const executerChangeInfoPatient = (information: InformationsPatient) => {
        let infoPatientValides = false;

        if (information.nom && information.prenom && information.email && information.sexe) {
            infoPatientValides = true;
        }

        informationsPatientValides.current = infoPatientValides;
        informationsPatient.current = information;
        setActiverBoutonAjouter(infoPatientValides && informationsInterventionValides.current);
    }

    return (
        <BandeauNavigationComponent>
            <Grid className="conteneur-intervention">
                <form className="formulaire-intervention">
                    <InformationsPatientComponent
                        onChange={(information) => executerChangeInfoPatient(information)}></InformationsPatientComponent>
                    <InformationsInterventionComponent
                        onChange={(information) => executerOnChangeInfoIntervention(information)}></InformationsInterventionComponent>
                    <Grid
                        style={{
                            width: '50vw',
                            display: 'flex',
                            justifyContent: 'end',
                            padding: '24px'
                        }}
                    >
                        <Button
                            className={"bouton-digikare secondaire"}
                            startIcon={(<ControlPointIcon/>)}
                            type="submit" onClick={(event) => executerAnnuler(event)}>Annuler</Button>
                        <Button
                            disabled={!activerBoutonAjouter}
                            className={!activerBoutonAjouter ? "bouton-digikare desactive" : "bouton-digikare"}
                            startIcon={(<ControlPointIcon/>)}
                            type="submit" onClick={(event) => executerAjouter()}>Valider</Button>
                    </Grid>
                </form>
            </Grid>
        </BandeauNavigationComponent>
    );
}
export default CreationInterventionComponent;