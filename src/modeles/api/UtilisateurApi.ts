import {SexeEnum} from "../../enum/SexeEnum";
import {TypeUtilisateurEnum} from "../../enum/TypeUtilisateurEnum";

export interface UtilisateurApi {
    id:string;
    lastname: string;
    firstname: string;
    sex: string;
    email: string;
    type: string;
    login: string;
}