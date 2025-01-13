export const centreTableColumns = [
    {
      title: 'Nom',
      dataIndex: 'nomCentreFiscal',
      width: 100,
    },
    {
      title: 'Siège',
      dataIndex: 'siegeCentreFiscal',
      width: 100,
    },
    {
      title: 'Adresse e-mail',
      dataIndex: 'emailCentreFiscal',
      width: 100,
    },
    {
      title: '',
      dataIndex: 'action',
      width: 40,
    }
]

export const contribuableTableColumns = [
  {
    title: 'NIF',
    dataIndex: 'nifContribuable',
    width: 60,
  },
  {
    title: 'Raison sociale',
    dataIndex: 'raisonSociale',
    width: 140,
  },
  {
    title: 'Siège',
    dataIndex: 'siegeContribuable',
    width: 100,
  },
  {
    title: 'Activité',
    dataIndex: 'activiteContribuable',
    width: 100,
  },
  {
    title: 'Adresse e-mail',
    dataIndex: 'emailContribuable',
    width: 100,
  },
  {
    title: '',
    dataIndex: 'action',
    width: 40,
  }
]

export const declarationTableColumns = [
  {
    title: 'Référence',
    dataIndex: 'idDeclaration',
    width: 40,
  },
  {
    title: 'Montant',
    dataIndex: 'montantDeclaration',
    width: 60,
  },
  {
    title: 'Reste',
    dataIndex: 'resteDeclaration',
    width: 60,
  },
  {
    title: 'Statut',
    dataIndex: 'statutDeclaration',
    width: 50,
  },
  {
    title: 'Période',
    dataIndex: 'periode',
    width: 60,
  },
  {
    title: 'Action',
    dataIndex: 'action',
    width: 100,
    align: 'right'
  }
]

export const penaliteTableColumns = [
  {
    title: 'Référence',
    dataIndex: 'idPenalite',
    width: 60,
  },
  {
    title: 'Montant',
    dataIndex: 'montantPenalite',
    width: 60,
  },
  {
    title: 'Reste',
    dataIndex: 'restePenalite',
    width: 60,
  },
  {
    title: 'Déclaration',
    dataIndex: 'declaration',
    width: 200,
  },
  {
    title: 'Date',
    dataIndex: 'date',
    width: 100,
  },
  {
    title: 'Action',
    dataIndex: 'action',
    width: 100,
    align: 'right'
  }
]

export const paiementTableColumns = [
  {
    title: 'Mode de paiement',
    dataIndex: 'modePaiement',
    width: 90,
  },
  {
    title: 'Banque / Opérateur',
    dataIndex: 'banqueOuOperateur',
    width: 90,
  },
  {
    title: 'Numéro( Compte / Téléphone )',
    dataIndex: 'numeroCompte',
    width: 130,
  },
  {
    title: 'Montant',
    dataIndex: 'montantPaiement',
    width: 60,
  },
  {
    title: 'Statut',
    dataIndex: 'statutPaiement',
    width: 60,
  },
  {
    title: 'Action',
    dataIndex: 'action',
    width: 150,
    align: 'right'
  }
]

export const declarationsTableColumn = [
  {
    title: 'Référence',
    dataIndex: 'idDeclaration',
    width: 100,
  },
  {
    title: 'Reste',
    dataIndex: 'resteDeclaration',
    width: 150,
  },
  {
    title: 'Montant à payer',
    dataIndex: 'montantPayer',
    width: 150,
  },
]

export const penalitesTableColumn = [
  {
    title: 'Référence',
    dataIndex: 'idPenalite',
    width: 100,
  },
  {
    title: 'Reste',
    dataIndex: 'restePenalite',
    width: 150,
  },
  {
    title: 'Montant à payer',
    dataIndex: 'montantPayer',
    width: 150,
  },
]

export const studentTableColumns = [
  {
    title: 'Numéro matricule',
    dataIndex: 'studentInscriptionNumber',
    width: 180,
  },
  {
    title: 'Nom',
    dataIndex: 'studentName',
    width: 180,
  },
  {
    title: 'E-mail',
    dataIndex: 'studentEmail',
    width: 120,
  },
  {
    title: 'Niveau',
    dataIndex: 'studentLevel',
    width: 100,
  },
  {
    title: 'Addresse',
    dataIndex: 'studentAddress',
    width: 100,
  },
  {
    title: 'Actions',
    dataIndex: 'action',
    width: 80,
  }
]

export const professorTableColumns = [
  {
    title: 'Nom',
    dataIndex: 'professorName',
    width: 180,
  },
  {
    title: 'Adresse e-mail',
    dataIndex: 'professorEmail',
    width: 180,
  },
  {
    title: 'Adresse du domicile',
    dataIndex: 'professorAddress',
    width: 120,
  },
  {
    title: 'Actions',
    dataIndex: 'action',
    width: 80,
  }
]

export const subjectTableColumns = [
  {
    title: 'Designation',
    dataIndex: 'subjectName',
    width: 180,
  },
  {
    title: 'Enseignant',
    dataIndex: 'professorName',
    width: 180,
  },
  {
    title: 'Niveau',
    dataIndex: 'levelDesignation',
    width: 120,
  },
  {
    title: 'Actions',
    dataIndex: 'action',
    width: 80,
  }
]

export const schoolFeesTableColumns = [
  {
    title: 'Etudiant',
    dataIndex: 'studentName',
    width: 150,
  },
  {
    title: 'Montant',
    dataIndex: 'schoolFeesAmount',
    width: 80,
  },
  {
    title: 'Reste',
    dataIndex: 'schoolFeesRemainder',
    width: 80,
  },
  {
    title: 'Mois',
    dataIndex: 'schoolFeesMonth',
    width: 90,
  },
  {
    title: 'Statut',
    dataIndex: 'badgeSchoolFeeStatus',
    width: 90,
  },
  {
    title: 'Paiement',
    dataIndex: 'paymentInstallments',
    width: 300,
  },
  {
    title: 'Actions',
    dataIndex: 'action',
    width: 80,
    centered: true
  }
]

export const scheduleTableColumns = [
  {
    title: 'Jour',
    dataIndex: 'scheduleItemDay',
    width: 80,
  },
  {
    title: 'Heure',
    dataIndex: 'scheduleItemHour',
    width: 80,
  },
  {
    title: 'Matière',
    dataIndex: 'subjectName',
    width: 150,
  },
  {
    title: 'Enseignant',
    dataIndex: 'professorName',
    width: 120,
  },
  {
    title: 'Niveau',
    dataIndex: 'levelDesignation',
    width: 50,
  },
  {
    title: 'Actions',
    dataIndex: 'action',
    width: 80
  }
]

export const scheduleInsightTableColumns = [
  {
    title: 'Heure',
    dataIndex: 'hour',
    width: 80,
  },
  {
    title: 'Lundi',
    dataIndex: 'scheduleItemHour',
    width: 80,
  },
  {
    title: 'Mardi',
    dataIndex: 'subjectName',
    width: 150,
  },
  {
    title: 'Mercredi',
    dataIndex: 'professorName',
    width: 120,
  },
  {
    title: 'Jeudi',
    dataIndex: 'levelDesignation',
    width: 50,
  },
  {
    title: 'Vendredi',
    dataIndex: 'action',
    width: 80
  },
  {
    title: 'Samedi',
    dataIndex: 'action',
    width: 80
  }
]