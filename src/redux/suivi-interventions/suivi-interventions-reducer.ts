import {suiviInterventionsActionsTypes} from "./suivi-interventions-actions";
import {Intervention} from "../../model/front/intervention/Intervention";


export const initialState = {
    suiviInterventions: Array<Intervention>()
}

export default function suiviInterventionReducer(state = initialState, action: any) {

    switch (action.type) {
        case suiviInterventionsActionsTypes.ENREGISTRER_SUIVI_INTERVENTIONS:
            return {
                ...state,
                suiviInterventions: action.suiviInterventions
            };
        default:
            return state;
    }

}