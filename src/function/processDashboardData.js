const initialData = {
    Novembre: 0,
    Décembre: 0,
    Janvier: 0,
    Février: 0,
    Mars: 0,
    Avril: 0,
    Mai: 0,
    Juin: 0,
    Juillet: 0,
    Août: 0
}

// Exemple de manipulation des données pour l'année courante

export const processData = (data) => {
    // Filtrer les données pour l'année courante
    const filteredData = data.filter(
        (item) => item.Month.AcademicYear.currentYear === true
    );

    // Calculer les totaux par niveau
    const totalsByLevel = filteredData.reduce((acc, item) => {
        const level = item.Student.Level.levelDesignation;
        const isPaid = item.schoolFeesStatus === "Payé";

        if (!acc[level]) {
            acc[level] = { paid: 0, unpaid: 0 };
        }

        if (isPaid) {
            acc[level].paid += 1;
        } else {
            acc[level].unpaid += 1;
        }

        return acc;
    }, {});

    // Regrouper les paiements par mois
    const paymentsByMonth = filteredData.reduce((acc, item) => {
        const month = item.Month.monthName;
        const totalPaid = item.PaymentInstallments.reduce(
            (sum, installment) => sum + installment.paymentInstallMentAmount,
            0
        );

        if (!acc[month]) {
            acc[month] = 0;
        }

        acc[month] += totalPaid;

        return acc;
    }, initialData );

    return { totalsByLevel, paymentsByMonth };
};