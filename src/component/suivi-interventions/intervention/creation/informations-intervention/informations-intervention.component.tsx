import {Grid, MenuItem, Select} from "@mui/material";
import React, {useRef, useState} from 'react';
import '../../../../../App.css'
import '../creation-intervention.scss'
import {DateTimePicker} from "@mui/x-date-pickers";
import {InformationsIntervention} from "../../../../../model/front/intervention/InformationsIntervention";

type Props = {
    onChange: (information: InformationsIntervention) => void;
}
const InformationsInterventionComponent = (props: Props) => {

    const typeIntervention = useRef();
    const dateIntervention = useRef();

    const construireInformationIntervention = (): InformationsIntervention => {
        const information: InformationsIntervention = {
            interventionDate: dateIntervention.current || new Date(),
            interventionType: typeIntervention.current || '',
            idPs: ''
        }
        return information;
    }

    const executerChangerTypeIntervention = (typeInter: any) => {
        typeIntervention.current = typeInter;
        props.onChange(construireInformationIntervention());
    }

    const executerChangerDate = (date: any) => {
        dateIntervention.current = date;
        props.onChange(construireInformationIntervention());
    }

    return (

        <form>
            <Grid className="intervention-section">
                Informations intervention
            </Grid>
            <Grid style={{
                display: 'flex',
                justifyContent: 'space-between'
            }}>
                <Grid className="conteneur-champs">
                    <Grid>Type d&apos;intervention</Grid>
                    <Select
                        className="textfield-digikare"
                        id="type-inter-select"
                        value={typeIntervention.current}
                        onChange={(event) => executerChangerTypeIntervention(event.target.value)}
                    >
                        <MenuItem value={'ptg'}>Prothèse de genou</MenuItem>
                        <MenuItem value={'pth'}>Prothèse de hanche</MenuItem>
                        <MenuItem value={'lca'}>Ligament croisé Antérieur</MenuItem>
                    </Select>
                </Grid>
                <Grid className="conteneur-champs">
                    <Grid>Date d&apos;intervention</Grid>
                    <DateTimePicker className="textfield-digikare"
                                    slotProps={{
                                        textField: {
                                            required: true,
                                        },
                                    }}
                                    onChange={(valeur) => executerChangerDate(valeur)}
                    />
                </Grid>

            </Grid>
        </form>


    );
}

export default InformationsInterventionComponent;