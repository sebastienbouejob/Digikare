import {InterventionsMapper} from "../../../mapper/interventions/interventions.mapper";
import {Intervention} from "../../../model/front/intervention/Intervention";
import {suiviInterventionsActionsTypes} from "../../../redux/suivi-interventions/suivi-interventions-actions";
import {InformationsPatient} from "../../../model/front/intervention/InformationsPatient";
import {InformationsIntervention} from "../../../model/front/intervention/InformationsIntervention";

const URL = "http://localhost:8000/";

function rechercherInterventionsPS(identifiantPS: string, dispatch: (arg0: {
    type: string;
    suiviInterventions: Array<Intervention>;
}) => void) {
    const url = `${URL}careTraks?idPS=${identifiantPS}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            const suiviInterventions: Array<Intervention> = InterventionsMapper.construireInterventions(data);
            dispatch({type: suiviInterventionsActionsTypes.ENREGISTRER_SUIVI_INTERVENTIONS, suiviInterventions});
        })
        .catch((erreur) => {
            console.log(erreur);
        });
}

function rechercherInterventionsPatient(identifiantPatient: string, dispatch: (arg0: {
    type: string;
    suiviInterventions: Array<Intervention>;
}) => void) {
    const url = `${URL}careTraks?idPatient=${identifiantPatient}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            const suiviInterventions: Array<Intervention> = InterventionsMapper.construireInterventions(data);
            dispatch({type: suiviInterventionsActionsTypes.ENREGISTRER_SUIVI_INTERVENTIONS, suiviInterventions});
        })
        .catch((erreur) => {
            console.log(erreur);
        });
}

function enregistrerIntervention(informationsPatient: InformationsPatient, informationsIntervention: InformationsIntervention, dispatch: any){
    const url = `${URL}careTraks`;
    const parametres =InterventionsMapper.construireInterventionApi(informationsPatient, informationsIntervention);
    fetch(url,
        {
            method:'POST',
            headers:{
                'Content-type': 'application/json'
            },
            body: JSON.stringify(parametres)
        }
        )
        .then(res => res.json())
        .then(data => {
            rechercherInterventionsPS(informationsIntervention.idPs, dispatch);
            console.log(data);
        })
        .catch((erreur) => {
            console.log(erreur);
        });
}

function supprimerIntervention(idIntervention: string,idPs: string, dispatch: any){
    const url = `${URL}careTraks/${idIntervention}`;
    fetch(url,
        {
            method:'DELETE',
            headers:{
                'Content-type': 'application/json'
            }
        }
    )
        .then(res => res.json())
        .then(data => {
            rechercherInterventionsPS(idPs, dispatch);
            console.log(data);
        })
        .catch((erreur) => {
            console.log(erreur);
        });
}

const interventionService = {
    rechercherInterventionsPS,
    rechercherInterventionsPatient,
    enregistrerIntervention,
    supprimerIntervention,
}

export default interventionService;