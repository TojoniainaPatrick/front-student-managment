import { cilLockLocked, cilUser } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { CButton, CCardBody, CCol, CForm, CFormInput, CInputGroup, CInputGroupText, CRow } from "@coreui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useCustomContext from "../../../hooks/useCustomContext";
import Swal from "sweetalert2";
import axios from "../../../api/axios";

export default function CentreLogin(){

    const {
        setUser
    } = useCustomContext()
    
    const [ centre, setCentre ] = useState({
        emailCentreFiscal: '',
        motDePasseCentreFiscal: ''
    })
    
    const navigate = useNavigate()
    
    const authenticateCenter = async _ => {
        if( !centre.emailCentreFiscal ){
            Swal.fire({
                title: 'Authentification',
                text: 'Veuillez saisir votre adresse e-mail',
                icon: 'warning'
            })
        }
        else if( !centre.motDePasseCentreFiscal ){
            Swal.fire({
                title: 'Authentification',
                text: 'Veuillez saisir votre mot de passe',
                icon: 'warning'
            })
        }
        else{
            await axios.post('/centre-fiscal/authentification', centre )
            .then( res =>
                {
                const userFullData = res.data.data
                const userDataWithouPassword = Object
                    .entries( userFullData )
                    .reduce(( accumulateur, [ key, value ]) => {
                    if( key != 'motDePasseCentreFiscal') accumulateur[key] = value
                    return accumulateur
                    }, {})
        
                localStorage.setItem('user', JSON.stringify(userDataWithouPassword))
                setUser( userDataWithouPassword )
        
                navigate('/app/dashboard')
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

    return(
        <CCardBody>
            <CForm>
                <h3 className="text-primary text-center">Authentification</h3>
                <p className="text-body-secondary">Espace centre fiscal</p>

                <CInputGroup className="mb-3">
                    <CInputGroupText>
                    <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                        type='email'
                        placeholder="Adresse e-mail"
                        onChange = { e => setCentre({ ...centre, emailCentreFiscal: e.target.value }) }
                    />
                </CInputGroup>

                <CInputGroup className="mb-4">
                    <CInputGroupText>
                    <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                        type="password"
                        placeholder="Mot de passe"
                        onChange = { e => setCentre({ ...centre, motDePasseCentreFiscal: e.target.value }) } 
                    />
                </CInputGroup>

                <CRow>

                    <CCol xs={6}>
                        <CButton color="primary" className="px-4" onClick = { authenticateCenter }>
                            Se connecter
                        </CButton>
                    </CCol>

                </CRow>

            </CForm>
        </CCardBody>
    )
}