import {Utilisateur} from "../../modeles/front/Utilisateur";

export const utilisateurActionsTypes = {
    ENREGISTRER_UTILISATEUR: 'RECHERCHER_UTILISATEUR',
    SUPPRIMER_UTILISATEUR: 'SUPPRIMER_UTILISATEUR',
}

function enregistrerUtilisateur(utilisateur: Utilisateur) {
    return {type: utilisateurActionsTypes.ENREGISTRER_UTILISATEUR, utilisateur};
}

function supprimerUtilisateur() {
    return {type: utilisateurActionsTypes.ENREGISTRER_UTILISATEUR};
}

const utilisateurActions = {
    enregistrerUtilisateur,
    supprimerUtilisateur,
}

export default utilisateurActions;