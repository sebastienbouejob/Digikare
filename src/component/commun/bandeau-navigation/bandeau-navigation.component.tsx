import React from 'react';
import {Button, Grid} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import utilisateurActions from "../../../redux/utilisateur/utilisateur-actions";
import LogoutIcon from '@mui/icons-material/Logout';
import '../../../App.css'
import './bandeau-navigation.scss'

type Props = {
    children: any
}
const BandeauNavigationComponent = (props: Props) => {

    const dispatch = useDispatch();
    const dispatchSupprimerUtilisateur = () => {
        dispatch(utilisateurActions.supprimerUtilisateur())
    };
    const naviguer = useNavigate();
    const executerClick = () => {
        dispatchSupprimerUtilisateur();
        naviguer('/login');
    }

    return (
        <Grid>
            <Grid
                className={"bandeau-navigation-conteneur"}
            >
                <Button
                    className={"bouton-digikare"}
                    style={{
                        marginRight: '2%'
                    }}
                    startIcon={(<LogoutIcon/>)}
                    type="submit" onClick={() => executerClick()}>Quitter</Button>
            </Grid>
            <Grid>
                {props.children}
            </Grid>
        </Grid>
    );
}

export default BandeauNavigationComponent;