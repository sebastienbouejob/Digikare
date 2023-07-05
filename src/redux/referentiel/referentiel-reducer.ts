import {referentielActionsTypes} from "./referentiel-actions";


export const initialState = {
    referentiel: undefined
}

export default function referentielReducer(state = initialState, action: any ){

    switch (action.type){
        case referentielActionsTypes.CHARGER:
            return {
                ...state,
                referentiel: action.data.referentiel
            };
        default:
            return state;
    }

}