import {Utilisateur} from "../modeles/front/Utilisateur";
import {UtilisateurApi} from "../modeles/api/UtilisateurApi";
import {TypeUtilisateurEnum} from "../enum/TypeUtilisateurEnum";
import {SexeEnum} from "../enum/SexeEnum";


const buildType = (type: string): string => {
    if (type === TypeUtilisateurEnum.PS.toString()) {
        return TypeUtilisateurEnum.PS.toString();
    } else {
        return TypeUtilisateurEnum.P.toString();
    }
}

const buildSex = (sex: string): string => {
    if (sex === 'FEMALE') {
        return SexeEnum.FEMININ.toString();
    } else {
        return SexeEnum.MASCULIN.toString();
    }
}


export class UtilisateurMapper {
    static construireUtilisateur = (utilisateurApi: UtilisateurApi): Utilisateur => {
        const utilisateur: Utilisateur = {
            identifiant: utilisateurApi.id,
            nom: utilisateurApi.lastname,
            prenom: utilisateurApi.firstname,
            type: buildType(utilisateurApi.type),
            sexe: buildSex(utilisateurApi.sex),
            email: utilisateurApi.email,
            login: utilisateurApi.login,
        }

        return utilisateur;
    }
}