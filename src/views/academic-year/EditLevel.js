import { CFormInput } from "@coreui/react";
import { Modal } from "antd";
import { useEffect } from "react";
import useCustomContext from "../../hooks/useCustomContext";
import Swal from "sweetalert2";
import axios from "../../api/axios";
import { levelInitialState } from "../../types/ObjectInitialState";

export default function EditLevel({ open, setOpen }){

    const {
        getLastYear,
        currentLevel,
        setCurrentLevel
    } = useCustomContext()


    useEffect(() => {
        getLastYear()
    }, [])


    const closeModal = _=> {
        setOpen( false )
        setCurrentLevel( levelInitialState )
    }

    const confirm = async _=> {
        if( !currentLevel.levelDesignation ){
            Swal.fire({
                position: "center",
                icon: "warning",
                title: "Veuillez indiquer la désignation du niveau!",
                timer: 5000
            });
        }
        else if( !currentLevel.monthlySchoolFees ){
            Swal.fire({
                position: "center",
                icon: "warning",
                title: "Veuillez indiquer l'écolage mensuel!",
                timer: 5000
            });
        }
        else{
            await axios.put(`/level/edit/${ currentLevel.levelId }`, currentLevel )
            .then( _ => {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Opération effectuée avec succès!",
                    showConfirmButton: false,
                    timer: 2000
                });
                getLastYear()
                closeModal()
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

    const handleInputChange = e => {
        const { id, value } = e.target
        setCurrentLevel({ ...currentLevel, [ id ]: value })
    }

    return(
        <>

            <Modal
                open = { open }
                title = 'Modification'
                okText = 'Modifier'
                cancelText = 'Annuler'
                onCancel = { closeModal }
                onOk = { confirm }
                zIndex={1050}
                centered
                style={{ margin: '20px auto'}}
            >

                <CFormInput
                    type="text"
                    id="levelDesignation"
                    floatingClassName="mb-3"
                    floatingLabel="Désignation"
                    placeholder="Désignation"
                    onChange = { handleInputChange }
                    value = { currentLevel.levelDesignation }
                />

                <CFormInput
                    type="text"
                    disabled
                    id="monthlySchoolFees"
                    floatingClassName="mb-3"
                    floatingLabel="Ecolage mensuel"
                    placeholder="Ecolage mensuel"
                    onChange = { handleInputChange }
                    value = { currentLevel.monthlySchoolFees }
                />

            </Modal>
        </>
    )
}