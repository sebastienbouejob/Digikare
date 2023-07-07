import * as React from 'react';
import {useEffect, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Intervention} from "../../../model/front/intervention/Intervention";
import TableCell from '@mui/material/TableCell';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import dayjs from "dayjs";
import {Grid, Tooltip} from '@mui/material';
import {Utilisateur} from "../../../model/front/Utilisateur";
import {RootStateOrAny, useDispatch, useSelector} from "react-redux";
import {TypeUtilisateurEnum} from "../../../enum/TypeUtilisateurEnum";
import '../../../App.css'
import './tableau-suivi-interventions.scss'
import interventionService from "../../../services/http/intervention/intervention.service";
import DialogComponent from "../../commun/dialog/dialog.component";
import DetailsInterventionComponent from "../intervention/details/details-intervention.component";
import {ReactJSXElement} from "@emotion/react/types/jsx-namespace";
import dateService from "../../../services/util/date/date.service";

const TableauSuiviInterventionsComponent = () => {

    const dispatch = useDispatch();

    const suiviInterventionsState = useSelector((state: RootStateOrAny) => state.suiviInterventionReducer.suiviInterventions);
    const utilisateurState = useSelector((state: RootStateOrAny) => state.utilisateurReducer.utilisateur);

    const [suiviInterventions, setSuiviInterventions] = useState(suiviInterventionsState);
    const [utilisateur, setUtilisateur] = useState({} as Utilisateur);
    const [utilisateurEstPS, setUtilisateurEstPS] = useState(true);
    const [ouvrirDialogue, setOuvrirDialogue] = useState(false);
    const [ouvrirDetails, setOuvrirDetails] = useState(false);
    const [interventionSelectionnee, setinterventionSelectionnee] = useState({} as Intervention);

    useEffect(() => {
        if (suiviInterventionsState && suiviInterventionsState.length > 0) {
            setSuiviInterventions(suiviInterventionsState);
        }
    }, [suiviInterventionsState]);

    useEffect(() => {
        if (utilisateurState) {
            setUtilisateur(utilisateurState);
            setUtilisateurEstPS(utilisateurState.type === TypeUtilisateurEnum.PS.toString())
        }
    }, [utilisateurState])

    const construireDate = (date: Date): string => {
        return dayjs(date).format("MM/DD/YYYY HH:mm:ss");
    }

    const executerSupprimerIntervention = () => {
        setOuvrirDialogue(false);
        interventionService.supprimerIntervention(interventionSelectionnee.identifiant, interventionSelectionnee.informationIntervention.idPs, dispatch)
    }

    const executerClickSurBoutonSupprimer = (intervention: Intervention) => {
        setinterventionSelectionnee(intervention);
        setOuvrirDialogue(true);
    }

    const executerClickSurBoutonDetail = (intervention: Intervention) => {
        setinterventionSelectionnee(intervention);
        setOuvrirDetails(true);
    }
    const executerFermerDetails = () => {
        setOuvrirDetails(false);
    }


    const construireDialogueSupprimer = (): ReactJSXElement => {
        return (
            <div>
                <DialogComponent
                    titre={"Suppression de l'intervention"}
                    libelle={"Voulez-vous vraiement supprimer cette intervention ?"}
                    ouvrirDialogue={ouvrirDialogue}
                    onClickValider={() => executerSupprimerIntervention()}
                    onClickAnnuler={() => setOuvrirDialogue(false)}
                />
            </div>
        );
    }
    const construireDialogueDetails = (): ReactJSXElement => {
        return (
            <div>
                <DetailsInterventionComponent
                    intervention={interventionSelectionnee}
                    ouvrirDetail={ouvrirDetails}
                    onClickQuitter={() => executerFermerDetails()}
                />
            </div>
        );
    }

    const construireEnteteTableau = (): ReactJSXElement => {
        return (
            <TableHead>
                <TableRow style={{backgroundColor: "#000B3A"}}>
                    <TableCell align="left" style={{color: 'white'}}>Intervention</TableCell>
                    <TableCell align="left" style={{color: 'white'}}>Date</TableCell>
                    <TableCell align="left" style={{color: 'white'}}> </TableCell>
                    <TableCell align="left" style={{color: 'white'}}> </TableCell>
                </TableRow>
            </TableHead>
        );
    }

    const construireContenuTableau = (): ReactJSXElement => {
        return (
            <TableBody>
                {Object.keys(suiviInterventions).length > 0 && suiviInterventions.map((intervention: Intervention) => (
                    <TableRow key={intervention.identifiant}>
                        <TableCell component="th" scope="row">
                            {intervention.operation.libelle}
                        </TableCell>
                        <TableCell
                            align="left">{construireDate(intervention.informationIntervention.interventionDate)}
                        </TableCell>
                        <TableCell align="left">
                            <Tooltip title="Détails de l'intervention">
                                <VisibilityOutlinedIcon style={{cursor: 'pointer', color: '#000B3A'}}
                                                        onClick={() => executerClickSurBoutonDetail(intervention)}/>
                            </Tooltip>
                        </TableCell>
                        {utilisateurEstPS &&
                            (
                                <TableCell align="left">
                                    {dateService.dateEstPosterieureOuEgaleADateDuJour(intervention.informationIntervention.interventionDate) && (
                                        <Tooltip title="Supprimer intervention">
                                            <DeleteOutlinedIcon
                                                style={{cursor: 'pointer', color: '#FF0266'}}
                                                onClick={() => executerClickSurBoutonSupprimer(intervention)}
                                            />
                                        </Tooltip>)}
                                </TableCell>
                            )
                        }
                    </TableRow>
                ))}
            </TableBody>
        );
    }

    return (

        <Grid className={"conteneur-suivi-interventions"}>
            <Grid className={"titre-tableau"}>
                Suivi des interventions de {utilisateur.prenom} {utilisateur.nom}
            </Grid>
            <Grid></Grid>
            <TableContainer component={Paper}>
                <Table aria-label="customized table" style={{borderRadius: "10px", minWidth: "700px"}}>
                    {construireEnteteTableau()}
                    {construireContenuTableau()}
                </Table>
            </TableContainer>
            {construireDialogueSupprimer()}
            {construireDialogueDetails()}
        </Grid>
    );

}
export default TableauSuiviInterventionsComponent;
