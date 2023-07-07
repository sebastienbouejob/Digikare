import {SexeEnum} from "../../enum/SexeEnum";
import {TypeUtilisateurEnum} from "../../enum/TypeUtilisateurEnum";

export interface Utilisateur {
    identifiant: string;
    nom: string;
    prenom: string;
    email: string;
    login: string;
    sexe: string;
    type: string;
}