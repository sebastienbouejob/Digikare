import {utilisateurActionsTypes} from "../../../redux/utilisateur/utilisateur-actions";
import {Utilisateur} from "../../../model/front/Utilisateur";
import {UtilisateurMapper} from "../../../mapper/utilisateur/utilisateur.mapper";

const URL = "http://localhost:8000/users";

function rechercherUtilisateur(login: string, dispatch: (arg0: { type: string; utilisateur: Utilisateur; }) => void) {
    const url = `${URL}?login=${login}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            const utilisateur: Utilisateur = UtilisateurMapper.construireUtilisateur(data[0]);
            dispatch({type: utilisateurActionsTypes.ENREGISTRER_UTILISATEUR, utilisateur});
        })
        .catch((erreur) => {
            console.log(erreur);
        });
}

const utilisateurService = {
    rechercherUtilisateur
}

export default utilisateurService;