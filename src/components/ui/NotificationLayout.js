import { cilBell } from "@coreui/icons"
import CIcon from "@coreui/icons-react"
import { CButton, CCloseButton, COffcanvas, COffcanvasBody, COffcanvasHeader, COffcanvasTitle } from "@coreui/react"
import { useState } from "react"
import { FaBell, FaRegBell } from "react-icons/fa"

export default function NotificationLayout(){

    const [visible, setVisible] = useState(false)
    
    return (
        <>
            <CButton onClick={() => setVisible(true)}>
                <CIcon icon={cilBell} size="xl" />
            </CButton>

            <COffcanvas placement="end" scroll={true} visible={visible} onHide={() => setVisible(false)}>

                <COffcanvasHeader className="d-flex align-items-center justify-content-between">

                    <COffcanvasTitle>Notification</COffcanvasTitle>
                    <CCloseButton className="text-reset" onClick={() => setVisible(false)} />
                        
                </COffcanvasHeader>

                <COffcanvasBody>
                    Liste vide
                </COffcanvasBody>

            </COffcanvas>
        </>
    )
}