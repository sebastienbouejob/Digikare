import {TypeUtilisateurEnum} from "../../enum/TypeUtilisateurEnum";
import {SexeEnum} from "../../enum/SexeEnum";
import {Intervention} from "../../model/front/intervention/Intervention";
import {Operation} from "../../model/front/Operation";
import {InformationsPatient} from "../../model/front/intervention/InformationsPatient";
import {InformationsIntervention} from "../../model/front/intervention/InformationsIntervention";
import {TypeInterventionEnum} from "../../enum/TypeInterventionEnum";
import {OperationApi} from "../../model/back/OperationApi";
import {InterventionApi} from "../../model/back/InterventionApi";
import {PatientApi} from "../../model/back/PatientApi";
import dateService, {
    FORMAT_DATE_YYYY_MM_DD_HH_mm
} from "../../services/util/date/date.service";

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
        idPatient: interventionApi.patient.id
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

const construirePatientApi = (informationsPatient: InformationsPatient): PatientApi => {

    const indiceSex = Object.keys(SexeEnum).indexOf(informationsPatient.sexe);
    const sex = Object.values(SexeEnum)[indiceSex] === SexeEnum.MASCULIN ? 'MALE' : 'FEMALE';

    return {
        id: informationsPatient.idPatient,
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

        informationPatient.idPatient = `user${(Math.random() * 11).toString()}`;

        const interventionApi: InterventionApi = {
            id: `track${(Math.random() * 11).toString()}`,
            idPs: informationIntervention.idPs,
            operation: construireOperationApi(informationIntervention.interventionType ? informationIntervention.interventionType : ''),
            patient: construirePatientApi(informationPatient),
            interventionDate: dateService.formatterDate(informationIntervention.interventionDate,FORMAT_DATE_YYYY_MM_DD_HH_mm) || dateService.formatterDate((new Date()),FORMAT_DATE_YYYY_MM_DD_HH_mm)
        }

        return interventionApi;
    }
}