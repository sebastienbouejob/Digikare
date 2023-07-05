import * as React from 'react';
import {useEffect, useState} from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid} from '@mui/material';
import '../../../App.css'
import {Intervention} from '../../../modeles/front/intervention/Intervention';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import EmailIcon from '@mui/icons-material/Email';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import dayjs from "dayjs";

type Props = {
    onClickQuitter: () => void,
    ouvrirDetail: boolean,
    intervention: Intervention
}

const DetailsInterventionComponent = (props: Props) => {

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

    const formatterDate = (date: Date) : string => {
        return dayjs(date).format("MM/DD/YYYY HH:mm");
    }


    return (

        <Dialog
            open={ouvrirDetail}
            keepMounted
        >
            <DialogTitle
                style={{
                    background: '#000B3A'
                }}
            >
                <Grid
                    style={{
                        display: 'flex',
                        color: 'white'
                    }}
                >
                    <Grid>{intervention.informationPatient?.sexe === 'MASCULIN' ?
                        (<MaleIcon style={{color: '#55a4f1', fontSize: '32px', margin: '5px'}}/>) :
                        (<FemaleIcon style={{color: '#da89ee', fontSize: '32px', margin: '5px'}}/>)}
                    </Grid>
                    <Grid style={{margin: '5px'}}>{intervention.informationPatient?.nom} </Grid>
                    <Grid style={{margin: '5px'}}>{intervention.informationPatient?.prenom} </Grid>
                </Grid>
            </DialogTitle>
            <DialogContent
                style={{
                    width: '25vw'
                }}
            >
                <Grid>
                    <Grid
                        style={{
                            display: 'flex',
                            marginTop: '24px',
                            paddingBottom: '24px',
                            borderBottom: '1px solid #c2c3c5',
                        }}
                    >
                        <EmailIcon style={{color: '#000B3A', marginRight: '24px'}}/>
                        <Grid>{intervention.informationPatient?.email}</Grid>
                    </Grid>
                    <Grid
                        style={{
                            display: 'flex',
                            marginTop: '24px',
                            paddingBottom: '24px',
                            borderBottom: '1px solid #c2c3c5',
                        }}
                    >
                        <MonitorHeartIcon style={{color: '#000B3A', marginRight: '24px'}}/>
                        <Grid
                            style={{
                                display: 'flex',
                                flexDirection: 'column'
                            }}
                        >
                            <Grid>{intervention.operation?.libelle}</Grid>
                            <Grid
                                style={{
                                    display: 'flex',
                                }}
                            >
                                <Grid>le</Grid>
                                <Grid>{(formatterDate(intervention.informationIntervention?.interventionDate))}</Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button className={"bouton-digikare"} onClick={() => executerOnClikQuitter()}>Quitter</Button>
            </DialogActions>
        </Dialog>

    );
}
export default DetailsInterventionComponent;
