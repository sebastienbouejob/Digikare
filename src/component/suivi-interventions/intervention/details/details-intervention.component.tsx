import * as React from 'react';
import {useEffect, useState} from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid} from '@mui/material';
import '../../../../App.css'
import {Intervention} from '../../../../model/front/intervention/Intervention';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import EmailIcon from '@mui/icons-material/Email';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import './details-intervention.scss'
import {ReactJSXElement} from "@emotion/react/types/jsx-namespace";
import dateService, {FORMAT_DATE_MMDDYYYHHmm} from "../../../../services/util/date/date.service";

type Props = {
    onClickQuitter: () => void,
    ouvrirDetail: boolean,
    intervention: Intervention
}
const DetailsInterventionComponent = (props: Props): ReactJSXElement => {

    const [ouvrirDetail, setOuvrirDetail] = useState(false);
    const [intervention, setIntervention] = useState(props.intervention)

    useEffect(() => {
        setOuvrirDetail(props.ouvrirDetail)
    }, [props.ouvrirDetail])

    useEffect(() => {
        setOuvrirDetail(props.ouvrirDetail)
    }, [props.ouvrirDetail])

    useEffect(() => {
        setIntervention(props.intervention)
    }, [props.intervention])

    const executerOnClikQuitter = () => {
        props.onClickQuitter();
    }

    const construireEntete = (): ReactJSXElement => {
        return (<DialogTitle className={"entete-conteneur"}>
            <Grid className={"entete"}>
                <Grid>{intervention.informationPatient?.sexe === 'MASCULIN' ?
                    (<MaleIcon className={"icone-sex masculin"}/>) :
                    (<FemaleIcon className={"icone-sex feminin"}/>)}
                </Grid>
                <Grid style={{margin: '5px'}}>{intervention.informationPatient?.nom} </Grid>
                <Grid style={{margin: '5px'}}>{intervention.informationPatient?.prenom} </Grid>
            </Grid>
        </DialogTitle>)
    };

    const construireContenu = (): ReactJSXElement => {
        return (<DialogContent className="contenu-detail"
        >
            <Grid className="conteneur-detail-email">
                <EmailIcon className="icone"/>
                <Grid>{intervention.informationPatient?.email}</Grid>
            </Grid>
            <Grid className="conteneur-detail-intervention">
                <MonitorHeartIcon className="icone"/>
                <Grid className="conteneur-libelle">
                    <Grid>{intervention.operation?.libelle}</Grid>
                    <Grid className="date-intervention-conteneur">
                        <Grid className="text-le">le</Grid>
                        <Grid>{(dateService.formatterDate(intervention.informationIntervention?.interventionDate, FORMAT_DATE_MMDDYYYHHmm))}</Grid>
                    </Grid>
                </Grid>
            </Grid>
        </DialogContent>)
    };

    const construireBasDePage = (): ReactJSXElement => {
        return (
            <DialogActions>
                <Button className={"bouton-digikare"} onClick={() => executerOnClikQuitter()}>Quitter</Button>
            </DialogActions>
        )
    };

    return (

        <Dialog
            open={ouvrirDetail}
            keepMounted
            className="details-intervention-conteneur"
        >
            {construireEntete()}
            {construireContenu()}
            {construireBasDePage()}
        </Dialog>

    );
}
export default DetailsInterventionComponent;
