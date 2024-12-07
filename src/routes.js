import React from 'react'

const Professor = React.lazy(() => import( './views/professor/Professor'))
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Student = React.lazy(() => import('./views/student/Student'))
const Subject = React.lazy(() => import('./views/subject/Subject'))
const SchoolFees = React.lazy(() => import('./views/school-fees/SchoolFees'))
const PrintSchoolFees = React.lazy(() => import('./views/school-fees/PrintPayment'))
const Schedule = React.lazy(() => import('./views/schedule/Schedule'))
const ScheduleInsight = React.lazy(() => import('./views/schedule/ScheduleInsight'))

const routes = ( userType ) => {
  return [
    { path: 'dashboard', name: 'Dashboard', element: Dashboard, exact: true },
    { path: 'student', name: 'Etudiant', element: Student, exact: true },
    { path: 'professor', name: 'Enseignant', element: Professor, exact: true },
    { path: 'subject', name: 'Matière', element: Subject, exact: true },
    { path: 'schedule', name: 'Horaire', element: Schedule, exact: true },
    { path: 'schedule/insight', name: 'Aperçu', element: ScheduleInsight, exact: true },
    { path: 'school-fees', name: 'Ecolage', element: SchoolFees, exact: true },
    { path: 'school-fees/print/:schoolFeesId', name: 'Reçu', element: PrintSchoolFees, exact: true },
  ]
}

export default routes