export const utilisateurActionsTypes = {
    ENREGISTRER_UTILISATEUR: 'RECHERCHER_UTILISATEUR',
    SUPPRIMER_UTILISATEUR: 'SUPPRIMER_UTILISATEUR',
}

function supprimerUtilisateur() {
    return {type: utilisateurActionsTypes.ENREGISTRER_UTILISATEUR};
}

const utilisateurActions = {
    supprimerUtilisateur,
}

export default utilisateurActions;