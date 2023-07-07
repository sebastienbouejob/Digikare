import {InterventionsMapper} from "./interventions.mapper";
import {InterventionApi} from "../../model/back/InterventionApi";
import {Intervention} from "../../model/front/intervention/Intervention";
import dateService, {FORMAT_DATE_YYYY_MM_DD_HH_mm} from "../../services/util/date/date.service";


const construireInterventionsAPI = (): Array<InterventionApi> => {

    const interventionsApi = new Array<InterventionApi>();

    interventionsApi.push(
        {
            id: "track01",
            idPs: "user1",
            operation: {
                id: "ptg",
                title: "Prothèse de genou"
            },
            patient: {
                id: "user2",
                lastname: "Boué",
                firstname: "Sébastien",
                sex: "MALE",
                email: "sebastienboue@gmail.com"
            },
            interventionDate: "2017-04-25 08:45"
        },
        {
            id: "track03",
            idPs: "user1",
            operation: {
                id: "lca",
                title: "Ligament croisé Antérieur"
            },
            patient: {
                id: "user2",
                lastname: "Boué",
                firstname: "Sébastien",
                sex: "MALE",
                email: "sebastienboue@gmail.com"
            },
            interventionDate: "2017-12-25 19:52"
        }
    )

    return interventionsApi;

}
const construireInterventions = (): Array<Intervention> => {

    const interventions = new Array<Intervention>();

    const dateInter1 = new Date("2017-04-25 08:45");
    const dateInter2 = new Date("2017-12-25 19:52");
    interventions.push(
        {
            identifiant: "track01",
            informationIntervention: {
                idPs: "user1",
                interventionDate: dateInter1,
                interventionType: "ptg"
            },
            informationPatient: {
                email: "sebastienboue@gmail.com",
                idPatient: "user2",
                nom: "Boué",
                prenom: "Sébastien",
                sexe: "MASCULIN"
            },
            operation: {
                libelle: "Prothèse de genou",
                operationId: "ptg"
            }
        },
        {
            identifiant: "track03",
            informationIntervention: {
                idPs: "user1",
                interventionDate: dateInter2,
                interventionType: "lca"
            },
            informationPatient: {
                email: "sebastienboue@gmail.com",
                idPatient: "user2",
                nom: "Boué",
                prenom: "Sébastien",
                sexe: "MASCULIN"
            },
            operation: {
                libelle: "Ligament croisé Antérieur",
                operationId: "lca"
            }
        }
    )

    return interventions;

}

describe('Le mapper interevention', () => {
    test('converti un tableau d\'InterventionApi en tableau d\'Intervention', () => {
        const interventionsApis: Array<InterventionApi> = construireInterventionsAPI();
        const interventions: Array<Intervention> = construireInterventions();
        expect(InterventionsMapper.construireInterventions(interventionsApis)).toEqual(interventions);
    })

    test('converti une Intervention en InterventionApi', () => {
        const interventions: Array<Intervention> = construireInterventions();
        const interventionApi: InterventionApi = InterventionsMapper.construireInterventionApi(interventions[0].informationPatient,interventions[0].informationIntervention);
        expect(interventions[0].informationIntervention.idPs).toEqual(interventionApi.idPs);
        expect(dateService.formatterDate(interventions[0].informationIntervention.interventionDate, FORMAT_DATE_YYYY_MM_DD_HH_mm)).toEqual(interventionApi.interventionDate);
        expect(interventions[0].operation.operationId).toEqual(interventionApi.operation.id);
        expect(interventions[0].operation.libelle).toEqual(interventionApi.operation.title);
        expect(interventions[0].informationPatient.email).toEqual(interventionApi.patient.email);
        expect(interventions[0].informationPatient.nom).toEqual(interventionApi.patient.lastname);
        expect(interventions[0].informationPatient.prenom).toEqual(interventionApi.patient.firstname);
    })
})
