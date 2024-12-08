import { CButton, CCard, CCardBody, CCardHeader, CCol, CFormInput } from "@coreui/react"
import { useState } from "react"
import { MdLock } from "react-icons/md"
import useCustomContext from "../../hooks/useCustomContext"
import axios from "../../api/axios"
import Swal from "sweetalert2"

export default function ChangeAdminPassword(){

    const {
        user
    } = useCustomContext()

    const [ adminPassword, setAdminPassowrd ] = useState({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: ""
    })

    const handleChange = event => {
        const { id, value } = event.target
        setAdminPassowrd({ ...adminPassword, [ id ]: value })
    }

    const handleSubmit = async _=> {

        if( !adminPassword.currentPassword ){
            Swal.fire({
                position: "center",
                icon: "warning",
                title: "Veuillez saisir le mot de passe actuel!",
                timer: 5000
            });
        }
        else if( !adminPassword.newPassword ){
            Swal.fire({
                position: "center",
                icon: "warning",
                title: "Veuillez saisir le nouveau mot de passe!",
                timer: 5000
            });
        }
        else if( !adminPassword.confirmNewPassword ){
            Swal.fire({
                position: "center",
                icon: "warning",
                title: "Veuillez confirmer le nouveau mot de passe!",
                timer: 5000
            });
        }
        else if( adminPassword.newPassword != adminPassword.confirmNewPassword ){
            Swal.fire({
                position: "center",
                icon: "warning",
                title: "La confirmation du mot de passe est incorrecte!",
                timer: 5000
            });
        }
        else{
            await axios.put('/admin/edit-password', {
                ...adminPassword,
                mail: user?.adminEmail
            } )
            .then( _ => {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Opération effectuée avec succès!",
                    showConfirmButton: false,
                    timer: 2000
                });
                setAdminPassowrd({
                    currentPassword: "",
                    newPassword: "",
                    confirmNewPassword: ""
                })
            })
            .catch( error => {
                if( error?.response?.data?.message ){
                    Swal.fire({
                        position: "center",
                        icon: "error",
                        title: error?.response?.data?.message,
                    });
                }
                else{
                    Swal.fire({
                        position: "center",
                        icon: "error",
                        title: error.message,
                    });
                }
                console.log( error )
            })
        }

    }


    return(
        
        <CCol xs = { 12 }>

            <CCard className="m-4 print">

                <CCardHeader className="d-flex justify-content-center align-items-center">
                    <MdLock size = { 24 } />
                    <h6 className="ms-4"> Mot de passe </h6>
                </CCardHeader>

                <CCardBody className="text-end">
                    
                    <CFormInput
                        type="password"
                        id="currentPassword"
                        floatingClassName="mb-3"
                        floatingLabel="Mot de passe actuel"
                        placeholder="Mot de passe actuel"
                        onChange = { handleChange }
                        value = { adminPassword.currentPassword }
                    />
                    
                    <CFormInput
                        type="password"
                        id="newPassword"
                        floatingClassName="mb-3"
                        floatingLabel="Nouveau mot de passe"
                        placeholder="Nouveau mot de passe"
                        onChange = { handleChange }
                        value = { adminPassword.newPassword }
                    />
                    
                    <CFormInput
                        type="password"
                        id="confirmNewPassword"
                        floatingClassName="mb-3"
                        floatingLabel="Confirmation du nouveau mot de passe"
                        placeholder="Confirmation du nouveau mot de passe"
                        onChange = { handleChange }
                        value = { adminPassword.confirmNewPassword }
                    />

                    <CButton color="primary" onClick = { handleSubmit }>
                        <MdLock />
                        <span className="ms-2"> Changer mon mot de passe </span>
                    </CButton>

                </CCardBody>

            </CCard>

        </CCol>
    )
}