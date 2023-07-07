import {Grid, MenuItem, Select, TextField} from "@mui/material";
import React, {useRef} from 'react';
import '../../../../../App.css'
import '../creation-intervention.scss'
import {SexeEnum} from "../../../../../enum/SexeEnum";
import {InformationsPatient} from "../../../../../model/front/intervention/InformationsPatient";

type Props = {
    onChange: (informations: InformationsPatient) => void
}
const InformationsPatientComponent = (props: Props) => {

    const nomRef = useRef<string | undefined>();
    const prenomRef = useRef<string | undefined>();
    const sexRef = useRef<string | undefined>();
    const emailRef = useRef<string | undefined>();

    const construireInformationsPatient = (): InformationsPatient => {
        const information: InformationsPatient = {
            nom: nomRef.current || '',
            prenom: prenomRef.current|| '',
            sexe: sexRef.current|| '',
            email: emailRef.current|| '',
            idPatient: '',
        }
        return information;
    }

    const executerChangerNom = (nom: string) => {
        nomRef.current = nom;
        props.onChange(construireInformationsPatient());
    }

    const executerChangerPrenom = (prenom: string) => {
        prenomRef.current = prenom;
        props.onChange(construireInformationsPatient());
    }

    const executerChangerEmail = (email: string) => {
        emailRef.current = email;
        props.onChange(construireInformationsPatient());
    }
    const executerChangerSex = (sex: string) => {
        sexRef.current = sex;
        props.onChange(construireInformationsPatient());
    }

    return (

        <Grid>
            <Grid className="intervention-section patient">
                Informations patient
            </Grid>
            <Grid style={{
                display: 'flex',
                justifyContent: 'space-between'
            }}>
                <Grid className="conteneur-champs">
                    <Grid>Nom</Grid>
                    <TextField className="textfield-digikare"
                               id="nom"
                               required
                               onChange={(event) => executerChangerNom(event.target.value)}
                    />
                </Grid>
                <Grid className="conteneur-champs">
                    <Grid>Prénom</Grid>
                    <TextField className="textfield-digikare"
                               id="prenom"
                               required
                               onChange={(event) => executerChangerPrenom(event.target.value)}
                    />
                </Grid>

            </Grid>
            <Grid style={{
                display: 'flex',
                justifyContent: 'space-between'
            }}>
                <Grid className="conteneur-champs">
                    <Grid>Sex</Grid>
                    <Select
                        className="textfield-digikare"
                        id="sex-select"
                        value={sexRef.current}
                        onChange={(event) => executerChangerSex(event.target.value)}
                    >
                        <MenuItem value={SexeEnum.MASCULIN}>Masculin</MenuItem>
                        <MenuItem value={SexeEnum.FEMININ}>Féminin</MenuItem>
                    </Select>
                </Grid>
                <Grid className="conteneur-champs">
                    <Grid>Email</Grid>
                    <TextField className="textfield-digikare"
                               type={"email"}
                               id="email"
                               required
                               onChange={(event) => executerChangerEmail(event.target.value)}
                    />
                </Grid>

            </Grid>
        </Grid>


    );
}

export default InformationsPatientComponent;