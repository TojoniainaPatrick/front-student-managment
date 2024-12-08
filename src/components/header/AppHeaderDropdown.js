import React from 'react'
import {
  CAvatar,
  CDropdown,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'

import avatar8 from './../../assets/images/avatars/default_user.jpg'
import { useNavigate } from 'react-router-dom'
import { MdLogout, MdPerson } from 'react-icons/md'

const AppHeaderDropdown = () => {

  const navigate = useNavigate()

  const handleLogOut = () => {
    navigate('/')
    localStorage.removeItem('user')
  }

  const goToProfil = () => {
    navigate('/app/profile')
  }

  return (
    <CDropdown variant="nav-item">

      <CDropdownToggle placement="bottom-end" className="py-0 pe-0" caret={false}>
        <CAvatar src={avatar8} size="md" />
      </CDropdownToggle>

      <CDropdownMenu className="pt-0" placement="bottom-end">

        <CDropdownHeader className="bg-body-secondary fw-semibold mb-2">Compte</CDropdownHeader>

        <CDropdownItem onClick = { goToProfil }>
          <MdPerson />
          <span style={{ cursor: 'pointer', marginLeft: 5 }}> Profil </span>
        </CDropdownItem>

        <CDropdownItem onClick = { handleLogOut }>
          <MdLogout />
          <span style={{ cursor: 'pointer', marginLeft: 5 }}> Se déconnecter </span>
        </CDropdownItem>
        
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
