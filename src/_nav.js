import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilNotes,
  cilSpeedometer,
  cilBank,
  cilWarning,
  cilMoney,
  cilCalendar,
  cilCreditCard,
  cilAvTimer,
  cilWatch
} from '@coreui/icons'
import { CNavItem } from '@coreui/react'
import { MdOutlineHomeWork } from "react-icons/md"
import { FaUsersBetweenLines, FaUserTie } from "react-icons/fa6";

const _nav = userType => {

  const userRoutes = userType == 'admin'
  ? [
      {
        component: CNavItem,
        name: 'Dashboard',
        to: '/app/dashboard',
        icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />
      },
      {
        component: CNavItem,
        name: 'Année universitaire',
        to: '/app/academic-year',
        icon: <CIcon icon={cilCalendar} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Enseignant',
        to: '/app/professor',
        icon: <FaUserTie className="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Matière',
        to: '/app/subject',
        icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Etudiant',
        to: '/app/student',
        icon: <FaUsersBetweenLines className="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Ecolage',
        to: '/app/school-fees',
        icon: <CIcon icon={cilCreditCard} customClassName="nav-icon" />
      },
      {
        component: CNavItem,
        name: 'Emploi du temps',
        to: '/app/schedule',
        icon: <CIcon icon={cilWatch} customClassName="nav-icon" />
      }
    ]
  : 
    [
      {
        component: CNavItem,
        name: 'Dashboard',
        to: '/app/dashboard',
        icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />
      },
      {
        component: CNavItem,
        name: 'Ecolage',
        to: '/app/school-fees',
        icon: <CIcon icon={cilCreditCard} customClassName="nav-icon" />
      },
      {
        component: CNavItem,
        name: 'Emploi du temps',
        to: '/app/schedule',
        icon: <CIcon icon={cilWatch} customClassName="nav-icon" />
      }
    ]

  return userRoutes
}

export default _nav