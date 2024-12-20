import React from 'react'

const AcademicYear = React.lazy(() => import('./views/academic-year/AcademicYear'))
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const PrintSchoolFees = React.lazy(() => import('./views/school-fees/PrintPayment'))
const Professor = React.lazy(() => import( './views/professor/Professor'))
const Profile = React.lazy(() => import( './views/profile/Profile'))
const Schedule = React.lazy(() => import('./views/schedule/Schedule'))
const ScheduleInsight = React.lazy(() => import('./views/schedule/ScheduleInsight'))
const Student = React.lazy(() => import('./views/student/Student'))
const Subject = React.lazy(() => import('./views/subject/Subject'))
const SchoolFees = React.lazy(() => import('./views/school-fees/SchoolFees'))

const routes = ( userType ) => {
  return [
    { path: 'academic-year', name: 'Année', element: AcademicYear, exact: true },
    { path: 'dashboard', name: 'Dashboard', element: Dashboard, exact: true },
    { path: 'professor', name: 'Enseignant', element: Professor, exact: true },
    { path: 'profile', name: 'Profil', element: Profile, exact: true },
    { path: 'schedule', name: 'Horaire', element: Schedule, exact: true },
    { path: 'schedule/insight', name: 'Aperçu', element: ScheduleInsight, exact: true },
    { path: 'school-fees', name: 'Ecolage', element: SchoolFees, exact: true },
    { path: 'school-fees/print/:schoolFeesId', name: 'Reçu', element: PrintSchoolFees, exact: true },
    { path: 'student', name: 'Etudiant', element: Student, exact: true },
    { path: 'subject', name: 'Matière', element: Subject, exact: true },
  ]
}

export default routes