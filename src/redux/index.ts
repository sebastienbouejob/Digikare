import {combineReducers} from "redux";
import referentielReducer from "./referentiel/referentiel-reducer";
import utilisateurReducer from "./utilisateur/utilisateur-reducer";
import suiviInterventionReducer from "./suivi-interventions/suivi-interventions-reducer";


const appReducer = combineReducers({
    referentielReducer,
    utilisateurReducer,
    suiviInterventionReducer
});

const rootReducer = (state: any, action: any) => {

    return appReducer(state, action);
}

export default rootReducer;