import { calculImpot } from "./calculImpot"

export const calculMontantDeclaration = employes => {

    return employes.reduce(( accumulateur, employeCourant ) => {

        const revenuBrut = Number( employeCourant.remunerationBrute ) + Number( employeCourant.avantageEnNature)

        const impotBrute = calculImpot( revenuBrut )

        const reductionPourPersonneAcharge = Number( employeCourant.personneAcharge ) * 2000

        const impotNet = impotBrute - reductionPourPersonneAcharge

        return accumulateur + impotNet

    }, 0 )
}