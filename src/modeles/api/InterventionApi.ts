import {OperationApi} from "./OperationApi";
import {PatientApi} from "./PatientApi";

export interface InterventionApi {
    idPs: string;
    idPatient: string;
    id: string;
    operation: OperationApi;
    patient: PatientApi;
    interventionDate: string;
}