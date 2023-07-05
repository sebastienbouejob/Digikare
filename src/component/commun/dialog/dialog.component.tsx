import * as React from 'react';
import {useEffect, useState} from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@mui/material';
import '../../../App.css'
import './dialog.scss'

type Props = {
    ouvrirDialogue: boolean,
    libelle: string,
    titre: string,
    onClickValider: () => void,
    onClickAnnuler: () => void
}

const DialogComponent = (props: Props) => {

    const [ouvrirDialogue, setOuvrirDialogue] = useState(props.ouvrirDialogue);

    useEffect(() => {
        setOuvrirDialogue(props.ouvrirDialogue)
    }, [props.ouvrirDialogue])

    const executerOnClikValider = () => {
        props.onClickValider();
    }
    const executerOnClikAnnuler = () => {
        props.onClickAnnuler();
    }

    return (

        <Dialog
            open={ouvrirDialogue}
            keepMounted
        >
            <DialogTitle>{props.titre}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    {props.libelle}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button className={"bouton-digikare secondaire"}
                        onClick={() => executerOnClikAnnuler()}>Annuler</Button>
                <Button className={"bouton-digikare"} onClick={() => executerOnClikValider()}>Valider</Button>
            </DialogActions>
        </Dialog>

    );
}
export default DialogComponent;
