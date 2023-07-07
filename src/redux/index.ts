import {combineReducers} from "redux";
import utilisateurReducer from "./utilisateur/utilisateur-reducer";
import suiviInterventionReducer from "./suivi-interventions/suivi-interventions-reducer";

const appReducer = combineReducers({
    utilisateurReducer,
    suiviInterventionReducer
});

const rootReducer = (state: any, action: any) => {

    return appReducer(state, action);
}

export default rootReducer;