import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilNotes,
  cilSpeedometer,
  cilBank,
  cilWarning,
  cilMoney
} from '@coreui/icons'
import { CNavItem } from '@coreui/react'
import { MdOutlineHomeWork } from "react-icons/md"
import { FaUsersBetweenLines } from "react-icons/fa6";

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
        icon: <CIcon icon={cilBank} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Enseignant',
        to: '/app/professor',
        icon: <MdOutlineHomeWork className="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Matière',
        to: '/app/subject',
        icon: <FaUsersBetweenLines className="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Etudiant',
        to: '/app/student',
        icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Ecolage',
        to: '/app/school-fees',
        icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />
      },
      {
        component: CNavItem,
        name: 'Emploi du temps',
        to: '/app/schedule',
        icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />
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
        icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />
      },
      {
        component: CNavItem,
        name: 'Emploi du temps',
        to: '/app/schedule',
        icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />
      }
    ]

  return userRoutes
}

export default _nav