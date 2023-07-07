import {UtilisateurApi} from "../../model/back/UtilisateurApi";
import {UtilisateurMapper} from "./utilisateur.mapper";
import {Utilisateur} from "../../model/front/Utilisateur";


const construireUtilisateurAPI = (): UtilisateurApi => {

    const utilisateurApi: UtilisateurApi = {
        id: "user1",
        lastname: "Le Huec",
        firstname: "Jean-Charles",
        sex: "MALE",
        email: "jclehuec@gmail.com",
        type: "PS",
        login: "jclehuec"
    }

    return utilisateurApi;

}

const construireUtilisateur = (): Utilisateur => {

    const utilisateur: Utilisateur = {

        email: "jclehuec@gmail.com",
        identifiant: "user1",
        login: "jclehuec",
        nom: "Le Huec",
        prenom: "Jean-Charles",
        sexe: "MASCULIN",
        type: "PS"
    }

    return utilisateur;

}
describe('Le mapper utilisateur', () => {
    test('converti un UtilisateurApi en Utilisateur', () => {
        const utilisateurAPI: UtilisateurApi = construireUtilisateurAPI();
        const utilisateur: Utilisateur = construireUtilisateur();
        expect(UtilisateurMapper.construireUtilisateur(utilisateurAPI)).toEqual(utilisateur);
    })
})