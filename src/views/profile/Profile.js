import { CButton, CCard, CCardBody, CCardHeader, CCol, CFormInput, CRow } from "@coreui/react";
import useCustomContext from "../../hooks/useCustomContext";
import { MdEditSquare, MdLock, MdPerson } from "react-icons/md";
import ChangeStudentPassword from "./ChangeStudentPassword";
import ChangeAdminPassword from "./ChangeAdminPassword";
import Swal from "sweetalert2";
import axios from "../../api/axios";

export default function Profile(){

    const {
        user,
        setUser
    } = useCustomContext()

    const handleChange = event => {
        const { id, value } = event.target
        setUser({ ...user, [ id ]: value })
    }

    const handleSubmit = async () => {
        if( user?.type == "admin"){
            if( !user.adminName ){
                Swal.fire({
                    position: "center",
                    icon: "warning",
                    title: "Veuillez saisir votre nom!",
                    timer: 5000
                });
            }
            else if( !user.adminEmail ){
                Swal.fire({
                    position: "center",
                    icon: "warning",
                    title: "Veuillez saisir votre adresse e-mail!",
                    timer: 5000
                });
            }
            else{
                await axios.put(`/admin/edit/${ user.adminId }`, user )
                .then( _ => {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Opération effectuée avec succès!",
                        showConfirmButton: false,
                        timer: 2000
                    });
                    localStorage.setItem("user", JSON.stringify( user ))
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
        else if ( user?.type == "student"){
            if( !user.studentName ){
                Swal.fire({
                    position: "center",
                    icon: "warning",
                    title: "Veuillez saisir votre nom!",
                    timer: 5000
                });
            }
            else if( !user.studentEmail ){
                Swal.fire({
                    position: "center",
                    icon: "warning",
                    title: "Veuillez saisir votre adresse e-mail!",
                    timer: 5000
                });
            }
            else if( !user.studentAddress ){
                Swal.fire({
                    position: "center",
                    icon: "warning",
                    title: "Veuillez saisir votre adresse!",
                    timer: 5000
                });
            }
            else{
                await axios.put(`/student/edit/${ user.studentId }`, user )
                .then( _ => {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Opération effectuée avec succès!",
                        showConfirmButton: false,
                        timer: 2000
                    });
                    localStorage.setItem("user", JSON.stringify( user ))
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
    }

    return(
        <CRow>
            <CCol xs = { 12 }>

                <CCard className="m-4 print">

                    <CCardHeader className="d-flex justify-content-center align-items-center">
                        <MdPerson size = { 24 } />
                        <h5 className="ms-4"> Profil </h5>
                    </CCardHeader>

                    <CCardBody className="text-end">
                        
                        {
                            user?.studentName &&
                            <CFormInput
                                type="text"
                                id="studentName"
                                floatingClassName="mb-3"
                                floatingLabel="Nom et prénom"
                                placeholder="Nom et prénom"
                                onChange = { handleChange }
                                value = { user.studentName }
                                readOnly
                            />
                        }
                        
                        {
                            user?.studentEmail &&
                            <CFormInput
                                type="text"
                                id="studentEmail"
                                floatingClassName="mb-3"
                                floatingLabel="Adresse e-mail"
                                placeholder="Adresse e-mail"
                                onChange = { handleChange }
                                value = { user.studentEmail }
                            />
                        }
                        
                        {
                            user?.studentAddress &&
                            <CFormInput
                                type="text"
                                id="studentAddress"
                                floatingClassName="mb-3"
                                floatingLabel="Adresse du domicile"
                                placeholder="Adresse du domicile"
                                onChange = { handleChange }
                                value = { user.studentAddress }
                            />
                        }
                        
                        {
                            user?.adminName &&
                            <CFormInput
                                type="text"
                                id="adminName"
                                floatingClassName="mb-3"
                                floatingLabel="Nom et prénom"
                                placeholder="Nom et prénom"
                                onChange = { handleChange }
                                value = { user.adminName }
                            />
                        }
                        
                        {
                            user?.adminEmail &&
                            <CFormInput
                                type="text"
                                id="adminEmail"
                                floatingClassName="mb-3"
                                floatingLabel="Adresse e-mail"
                                placeholder="Adresse e-mail"
                                onChange = { handleChange }
                                value = { user.adminEmail }
                            />
                        }

                        <CButton color="primary" onClick = { handleSubmit }>
                            <MdEditSquare />
                            <span className="ms-2"> Modifier mon profil </span>
                        </CButton>

                    </CCardBody>

                </CCard>

            </CCol>

            {
                user?.type == 'student'
                ? <ChangeStudentPassword />
                : <ChangeAdminPassword />
            }


        </CRow>
    )
}