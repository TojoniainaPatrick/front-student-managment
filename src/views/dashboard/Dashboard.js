import React, { useEffect, useState } from 'react'

import {
  CCard,
  CCardBody,
  CCol,
  CRow,
} from '@coreui/react'
import WidgetsDropdown from '../widgets/WidgetsDropdown'
import MainChart from './MainChart'
import useCustomContext from '../../hooks/useCustomContext'
import { processData } from '../../function/processDashboardData'

const Dashboard = () => {

  const {
    schoolFees,
    getSchoolFees
  } = useCustomContext()

  const [ dashData, setDashData ] = useState({})

  useEffect(() => {
    getSchoolFees()
  }, [])

  useEffect(() => {
    const tempDashData = processData( schoolFees )
    setDashData( tempDashData )
    console.log( dashData )
  }, [ schoolFees ])

  return (
    <>
      <WidgetsDropdown className="mb-4" totalsByLevel = { dashData?.totalsByLevel } />
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol sm={5}>
              <h4 id="traffic" className="card-title mb-0">
                Paiement d'écolage
              </h4>
            </CCol>
          </CRow>
          <MainChart paymentsByMonth = { dashData?.paymentsByMonth} />
        </CCardBody>
      </CCard>
    </>
  )
}

export default Dashboard
