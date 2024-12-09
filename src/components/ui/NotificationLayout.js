import { cilBell } from "@coreui/icons"
import CIcon from "@coreui/icons-react"
import { CBadge, CButton, CCloseButton, COffcanvas, COffcanvasBody, COffcanvasHeader, COffcanvasTitle } from "@coreui/react"
import { useState } from "react"
import { FaBell, FaRegBell } from "react-icons/fa"

export default function NotificationLayout(){

    const [visible, setVisible] = useState(false)
    
    return (
        <>
            <span onClick={() => setVisible(true)} className="position-relative mt-2 me-2">
                <CIcon icon={cilBell} size="xl" />
                {/* <CBadge color="danger" position="top-end" shape="rounded-pill"> 0 </CBadge> */}
            </span>

            <COffcanvas placement="end" scroll={true} visible={visible} onHide={() => setVisible(false)}>

                <COffcanvasHeader className="d-flex align-items-center justify-content-between border-bottom">

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