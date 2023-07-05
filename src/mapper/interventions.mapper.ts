import {TypeUtilisateurEnum} from "../enum/TypeUtilisateurEnum";
import {SexeEnum} from "../enum/SexeEnum";
import {Intervention} from "../modeles/front/intervention/Intervention";
import {InterventionApi} from "../modeles/api/InterventionApi";
import {Operation} from "../modeles/front/Operation";
import {OperationApi} from "../modeles/api/OperationApi";
import {InformationsPatient} from "../modeles/front/intervention/InformationsPatient";
import {InformationsIntervention} from "../modeles/front/intervention/InformationsIntervention";
import {TypeInterventionEnum} from "../enum/TypeInterventionEnum";
import {PatientApi} from "../modeles/api/PatientApi";


const buildType = (type: string): TypeUtilisateurEnum => {
    if (type === TypeUtilisateurEnum.PS.toString()) {
        return TypeUtilisateurEnum.PS;
    } else {
        return TypeUtilisateurEnum.P;
    }
}

const construireSex = (sex: string): string => {
    if (sex === 'FEMALE') {
        return SexeEnum.FEMININ.toString();
    } else {
        return SexeEnum.MASCULIN.toString();
    }
}


const construireOperation = (operationApi: OperationApi): Operation => {

    return {
        operationId: operationApi.id,
        libelle: operationApi.title
    };
}
const construireInformationPatient = (interventionApi: InterventionApi): InformationsPatient => {

    return {
        nom: interventionApi.patient.lastname,
        prenom: interventionApi.patient.firstname,
        sexe: construireSex(interventionApi.patient.sex),
        email: interventionApi.patient.email,
        idPatient: interventionApi.idPatient
    };
}
const construireInformationIntervention = (interventionApi: InterventionApi): InformationsIntervention => {

    return {
        idPs: interventionApi.idPs,
        interventionDate: new Date(interventionApi.interventionDate),
        interventionType: interventionApi.operation.id
    };
}

const construireOperationApi = (interventionType: string): OperationApi => {

    const indiceTypeIntervention = Object.keys(TypeInterventionEnum).indexOf(interventionType);
    const titre = Object.values(TypeInterventionEnum)[indiceTypeIntervention];

    return {
        title: titre,
        id: interventionType
    }
}

const construirePatientApi = (informationsPatient: InformationsPatient, idPatient: string): PatientApi => {

    const indiceSex = Object.keys(SexeEnum).indexOf(informationsPatient.sexe);
    const sex = Object.values(SexeEnum)[indiceSex] === SexeEnum.MASCULIN ? 'MALE' : 'FEMALE';

    return {
        id: idPatient,
        sex: sex,
        lastname: informationsPatient.nom,
        firstname: informationsPatient.prenom,
        email: informationsPatient.email
    }
}

export class InterventionsMapper {
    static construireInterventions = (interventionsApi: Array<InterventionApi>): Array<Intervention> => {

        const suiviInterventions = new Array<Intervention>();

        interventionsApi.forEach((interventionApi) => {
            const intervention: Intervention = {
                identifiant: interventionApi.id,
                informationIntervention: construireInformationIntervention(interventionApi),
                informationPatient: construireInformationPatient(interventionApi),
                operation: construireOperation(interventionApi.operation)
            }
            suiviInterventions.push(intervention);
        })

        return suiviInterventions;
    }

    static construireInterventionApi = (informationPatient: InformationsPatient, informationIntervention: InformationsIntervention): InterventionApi => {

        const idPatient = `user${(Math.random() * 11).toString()}`;

        const interventionApi: InterventionApi = {
            id: `track${(Math.random() * 11).toString()}`,
            idPs: informationIntervention.idPs,
            idPatient: idPatient,
            operation: construireOperationApi(informationIntervention.interventionType ? informationIntervention.interventionType : ''),
            patient: construirePatientApi(informationPatient, idPatient),
            interventionDate: informationIntervention.interventionDate?.toDateString() || (new Date()).toDateString(),
        }

        return interventionApi;
    }
}