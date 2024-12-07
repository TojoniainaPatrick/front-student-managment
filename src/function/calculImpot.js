export const calculImpot = revenu => {
    if( revenu <= 350000 ) return 0
    else if( revenu > 350000 && revenu <= 400000) return Number( revenu ) * 0.05
    else if( revenu > 400000 && revenu <= 500000) return Number( revenu ) * 0.1
    else if( revenu > 500000 && revenu <= 600000) return Number( revenu ) * 0.15
    else if( revenu > 600000 ) return Number( revenu ) * 0.2
}