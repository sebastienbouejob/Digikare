import {Utilisateur} from "../../model/front/Utilisateur";
import {utilisateurActionsTypes} from "./utilisateur-actions";


export const initialState = {
    utilisateur: {} as Utilisateur
}

export default function utilisateurReducer(state = initialState, action: any ){

    switch (action.type){
        case utilisateurActionsTypes.ENREGISTRER_UTILISATEUR:
            return {
                ...state,
                utilisateur: action.utilisateur
            };
            case utilisateurActionsTypes.SUPPRIMER_UTILISATEUR:
            return {
                ...state,
                utilisateur: {}
            };
        default:
            return state;
    }

}