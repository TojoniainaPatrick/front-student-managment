import { CButton, CCard, CCardBody, CCardHeader, CCol, CRow } from "@coreui/react";
import { Table, Input, Space } from 'antd'
import { AiOutlineFilePdf, AiFillPayCircle } from "react-icons/ai"
import { MdPayment } from "react-icons/md"
import { schoolFeesTableColumns } from "../../constant/tableColumns";
import useCustomContext from "../../hooks/useCustomContext";
import { useEffect, useState } from "react";
const { Search } = Input
import PaymentInstallments from "./PaymentInstallments";
import NewPayment from "./NewPayment";
import { useNavigate } from "react-router-dom";

export default function SchoolFees(){

    const {
        schoolFees,
        getSchoolFees,
        setCurrentSchoolFees,
        user
    } = useCustomContext()

    const [ search, setSearch ] = useState('')
    const [ openPayment, setOpenPayment ] = useState( false )

    useEffect(() => {
        getSchoolFees()
    }, [])

    const onSearch = (value, _e, info) => set(info?.source, value)

    const searchedData = schoolFees.filter( schoolFeesItem =>
        schoolFeesItem.Student?.studentName?.toString().toLowerCase().includes( search.toString().toLowerCase()) ||
        schoolFeesItem.Student?.Level?.levelDesignation?.toString().toLowerCase().includes( search.toString().toLowerCase()) ||
        schoolFeesItem.schoolFeesAmount?.toString().toLowerCase().includes( search.toString().toLowerCase()) || 
        schoolFeesItem.schoolFeesStatus?.toString().toLowerCase().includes( search.toString().toLowerCase()) || 
        schoolFeesItem.Month?.monthName?.toString().toLowerCase().includes( search.toString().toLowerCase()) 
    )

    const navigate = useNavigate()
    
    const handlePrint = ( schoolFeesId ) => {
        navigate(`/app/school-fees/print/${schoolFeesId}`)
    }

    const handlePay = ( schoolFees ) => {
        setCurrentSchoolFees( schoolFees )
        setOpenPayment( true )
    }

    return(
        <>
            <NewPayment open = { openPayment } setOpen = { setOpenPayment } />
            <CRow >
                <CCol xs = { 12 }>

                    <CRow
                        className="d-flex mx-2 "
                        style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}
                    >
                        <CCol>
                            <Search 
                                placeholder="Recherche ..."
                                onSearch={onSearch}
                                enterButton
                                onChange = { e => setSearch( e.target.value ) }
                                size="large"
                                style={{ width: 300, marginRight: 10 }}
                            />
                        </CCol>
                    </CRow>

                    <CCard className="m-4">
                        <CCardHeader> ECOLAGE </CCardHeader>
                        <CCardBody>
                            <Table
                                size="small"
                                dataSource = {
                                    searchedData.map(( item, key )=>({
                                        ...item,
                                        key: key,
                                        studentName: item.Student?.studentName,
                                        schoolFeesMonth: item.Month?.monthName,
                                        badgeSchoolFeeStatus: item.schoolFeesStatus == 'Payé'
                                        ? <span style = {{ color: 'white', background: 'teal', padding: '5px 10px', borderRadius: 8}}> { item.schoolFeesStatus } </span>
                                        : <span style = {{ color: 'white', background: 'tomato', padding: '5px 10px', borderRadius: 8}}> { item.schoolFeesStatus } </span>,
                                        paymentInstallments: <PaymentInstallments paymentInstallments = { item.PaymentInstallments } />,
                                        action: <Space>

                                            {
                                                item.schoolFeesStatus != 'Payé' && user?.type =="admin"
                                                ? 
                                                <CButton
                                                    color="success"
                                                    className="text-white"
                                                    onClick = { () => handlePay( item ) }
                                                >
                                                    <MdPayment size = { 22 } />
                                                </CButton> 
                                                :
                                                item.schoolFeesStatus == 'Payé' && <CButton
                                                    color="danger"
                                                    className="text-white"
                                                    onClick = { () => handlePrint( item.schoolFeesId ) }
                                                >
                                                    <AiOutlineFilePdf size = { 22 } />
                                                </CButton>
                                            }

                                        </Space>
                                    }))
                                }
                                columns = { schoolFeesTableColumns }
                                scroll = {{
                                    y: 'calc( 100vh - 400px )',
                                    x: '70vw'
                                }}
                            />
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </>
    )
}