export const referentielActionsTypes ={
    CHARGER: 'CHARGER',
}

function charger(referentiel: any) {
    return {type: referentielActionsTypes.CHARGER, referentiel };
}

const referentielActions = {
    charger,
}
 export default referentielActions;