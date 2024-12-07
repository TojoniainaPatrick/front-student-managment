import React from 'react'
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import {
  cilBell,
  cilCreditCard,
  cilCommentSquare,
  cilEnvelopeOpen,
  cilFile,
  cilLockLocked,
  cilSettings,
  cilTask,
  cilUser,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import avatar8 from './../../assets/images/avatars/default_user.jpg'
import { useNavigate } from 'react-router-dom'
import { CiLogout } from 'react-icons/ci'

const AppHeaderDropdown = () => {

  const navigate = useNavigate()

  const handleLogOut = () => {
    navigate('/')
    localStorage.removeItem('user')
  }

  return (
    <CDropdown variant="nav-item">

      <CDropdownToggle placement="bottom-end" className="py-0 pe-0" caret={false}>
        <CAvatar src={avatar8} size="md" />
      </CDropdownToggle>

      <CDropdownMenu className="pt-0" placement="bottom-end">

        <CDropdownHeader className="bg-body-secondary fw-semibold mb-2">Compte</CDropdownHeader>

        <CDropdownItem onClick = { handleLogOut }>
          <span style={{ cursor: 'pointer'}}> Se déconnecter </span>
        </CDropdownItem>
        
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
