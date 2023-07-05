import {Operation} from "../Operation";
import {InformationsPatient} from "./InformationsPatient";
import {InformationsIntervention} from "./InformationsIntervention";

export interface Intervention {
    identifiant: string;
    operation: Operation;
    informationPatient: InformationsPatient;
    informationIntervention: InformationsIntervention;
}