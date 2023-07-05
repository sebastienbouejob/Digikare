import {Intervention} from "../../modeles/front/intervention/Intervention";

export const suiviInterventionsActionsTypes = {
    ENREGISTRER_SUIVI_INTERVENTIONS: 'ENREGISTRER_SUIVI_INTERVENTIONS',
}

function enregistrerSuiviInterventions(suiviInterventions: Array<Intervention>) {
    return {type: suiviInterventionsActionsTypes.ENREGISTRER_SUIVI_INTERVENTIONS, suiviInterventions};
}

const suiviInterventionsActions = {
    enregistrerSuiviInterventions
}

export default suiviInterventionsActions;