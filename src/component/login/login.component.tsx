import {Button, Grid, TextField} from "@mui/material";
import React, {useEffect, useState} from 'react';
import {RootStateOrAny, useDispatch, useSelector} from "react-redux";
import utilisateurService from "../../services/utilisateur/utilisateur.service";
import {useNavigate} from "react-router-dom";
import {TypeUtilisateurEnum} from "../../enum/TypeUtilisateurEnum";
import "../../App.css";

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
        <Grid
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100vw',
                height: '100vh',
                background: '#dadff5'
            }}
        >
            <form>
                <Grid style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid #40486C',
                    width: '30vw',
                    height: '20vh',
                    background: '#000B3A',
                    color: 'white',
                    borderRadius: '10px',
                }}
                >
                    <Grid style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 'max-content',
                        marginRight: '24px'
                    }}>
                        <Grid
                            style={{
                                width: '25%'
                            }}
                        >Login</Grid>
                        <TextField
                            id="login"
                            style={{
                                backgroundColor: 'white',
                                borderRadius: '5px',
                                width: '100%'
                            }}
                            required
                            onChange={(event) => executerChangerLogin(event.target.value)}
                        />
                    </Grid>
                    <Grid
                        style={{
                            display: 'flex',
                            justifyContent: 'end'
                        }}
                    >
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