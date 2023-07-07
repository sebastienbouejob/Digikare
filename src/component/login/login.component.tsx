import {Button, Grid, TextField} from "@mui/material";
import React, {useEffect, useState} from 'react';
import {RootStateOrAny, useDispatch, useSelector} from "react-redux";
import utilisateurService from "../../services/http/utilisateur/utilisateur.service";
import {useNavigate} from "react-router-dom";
import {TypeUtilisateurEnum} from "../../enum/TypeUtilisateurEnum";
import "../../App.css";
import "./login.scss"

const LoginComponent = () => {

    const naviguer = useNavigate();
    const dispatch = useDispatch();

    const [login, setLogin] = useState('');
    const [activerBoutonValider, setactiverBoutonValider] = useState(false);
    const utilisateurState = useSelector((state: RootStateOrAny) => state.utilisateurReducer.utilisateur);


    useEffect(() => {
        if (utilisateurState) {
            if (utilisateurState.type === TypeUtilisateurEnum.PS) {
                naviguer('/professionnel-sante');
            }
            if (utilisateurState.type === TypeUtilisateurEnum.P) {
                naviguer('/patient');
            }
        }

    }, [utilisateurState]);

    const executerClick = (event: any) => {
        utilisateurService.rechercherUtilisateur(login, dispatch);
        event.preventDefault()
    }

    const executerChangerLogin = (login: string) => {
        setLogin(login);
    }

    useEffect(() => {
        setactiverBoutonValider(login !== '')
    }, [login])

    return (
        <Grid className="conteneur-login-component">
            <form>
                <Grid className="conteneur-formulaire">
                    <Grid className="conteneur-login">
                        <Grid style={{width: '25%'}}>Login</Grid>
                        <TextField
                            id="login"
                            className="champs-saisie-login"
                            required
                            onChange={(event) => executerChangerLogin(event.target.value)}
                        />
                    </Grid>
                    <Grid className="conteneur-bouton">
                        <Button
                            disabled={!activerBoutonValider}
                            style={{
                                marginRight: '15%'
                            }}
                            className={!activerBoutonValider ? "bouton-digikare desactive" : "bouton-digikare"}
                            type="submit" onClick={(event) => executerClick(event)}>Valider</Button>
                    </Grid>
                </Grid>
            </form>
        </Grid>
    );
}
export default LoginComponent;