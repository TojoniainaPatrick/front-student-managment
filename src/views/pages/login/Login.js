import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CImage,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import { useNavigate } from 'react-router-dom'
import useCustomContext from '../../../hooks/useCustomContext'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import axios from '../../../api/axios'
import Swal from 'sweetalert2'
import logo from '../../../assets/brand/logo.jpg'

const Login = () => {

  const {
    setUser
  } = useCustomContext()

  const navigate = useNavigate()

  const [ userCredentials, setUserCredentials ] = useState({
    mail: '',
    password: ''
  })

  const authenticate = async _ => {
    if( !userCredentials.mail ){
      Swal.fire({
        title: 'Authentification',
        text: 'Veuillez saisir votre adresse e-mail',
        icon: 'warning'
      })
    }
    else if( !userCredentials.password ){
      Swal.fire({
        title: 'Authentification',
        text: 'Veuillez saisir votre mot de passe',
        icon: 'warning'
      })
    }
    else{
      await axios.post('/authentication', userCredentials )
      .then( res =>
        {
          const userFullData = res.data.data
          const userDataWithouPassword = Object
              .entries( userFullData )
              .reduce(( accumulateur, [ key, value ]) => {
              if( ![ "adminPassword", "studentPassword" ].includes( key ) ) accumulateur[key] = value
              return accumulateur
              }, {})
  
          localStorage.setItem('user', JSON.stringify(userDataWithouPassword))
          setUser( userDataWithouPassword )
  
          if( userFullData?.type?.toString().toLowerCase() === 'admin' ) navigate('/app/dashboard')
          else navigate('/app/school-fees')
        }
      )
      .catch( error => {
        if( error?.response?.data?.message ){
          Swal.fire({
            title: 'Authentification',
            text: error?.response?.data?.message,
            icon: 'error'
          })
        }
        else {
          Swal.fire({
            title: 'Authentification',
            text: error.message,
            icon: 'error'
          })
        }
      })
    }
}


  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>

        <CRow className="justify-content-center">

          <CCol md = { 4 } sm = { 10 } xs = { 12 }>

            <CCardGroup>

              <CCard className="p-4 text-center">

                <CCardBody>

                  <CImage src = { logo } width = { 150 } />

                  <CForm className='mt-3'>

                      <h3 className="text-primary text-center mb-4">Authentification</h3>

                      <CInputGroup className="mb-3">

                        <CInputGroupText>
                          <CIcon icon={cilUser} />
                        </CInputGroupText>

                        <CFormInput
                            type='email'
                            placeholder="Adresse e-mail"
                            onChange = { e => setUserCredentials({ ...userCredentials, mail: e.target.value }) }
                        />

                      </CInputGroup>

                      <CInputGroup className="mb-4">

                        <CInputGroupText>
                          <CIcon icon={cilLockLocked} />
                        </CInputGroupText>

                        <CFormInput
                          type="password"
                          placeholder="Mot de passe"
                          onChange = { e => setUserCredentials({ ...userCredentials, password: e.target.value }) } 
                        />

                      </CInputGroup>

                      <CRow>

                        <CCol xs={6}>
                          <CButton color="primary" className="px-4" onClick = { authenticate }>
                            Se connecter
                          </CButton>
                        </CCol>

                      </CRow>

                  </CForm>
                </CCardBody>

              </CCard>

            </CCardGroup>

          </CCol>

        </CRow>

      </CContainer>
    </div>
  )
}

export default Login
