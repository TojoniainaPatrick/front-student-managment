import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import dayjs from 'dayjs'

import {
  CRow,
  CCol,
  CCard,
  CCardHeader,
  CCardBody,
} from '@coreui/react'
import { getStyle } from '@coreui/utils'
import useCustomContext from '../../hooks/useCustomContext'

const WidgetsDropdown = (props) => {

  const { totalsByLevel } = props

  const {
    getSchoolFees,
    schoolFees
  } = useCustomContext()

  useEffect( () => {
    getSchoolFees()
  }, [])

  const widgetChartRef1 = useRef(null)
  const widgetChartRef2 = useRef(null)

  useEffect(() => {
    document.documentElement.addEventListener('ColorSchemeChange', () => {
      if (widgetChartRef1.current) {
        setTimeout(() => {
          widgetChartRef1.current.data.datasets[0].pointBackgroundColor = getStyle('--cui-primary')
          widgetChartRef1.current.update()
        })
      }

      if (widgetChartRef2.current) {
        setTimeout(() => {
          widgetChartRef2.current.data.datasets[0].pointBackgroundColor = getStyle('--cui-info')
          widgetChartRef2.current.update()
        })
      }
    })
  }, [widgetChartRef1, widgetChartRef2])

  return (
    <CRow className={props.className} xs={{ gutter: 4 }}>

      <CCol sm={6} xl={5} xxl={4}>

        <CCard color='danger' className='text-white'>

          <CCardHeader> <h6> LICENCE 1 </h6> </CCardHeader>

          <CCardBody>
            <p> <strong> Payé : </strong> { totalsByLevel?.L1?.paid || 0 } </p>
            <p> <strong> Impayé : </strong> { totalsByLevel?.L1?.unpaid || 0 } </p>
          </CCardBody>

        </CCard>
        
      </CCol>

      <CCol sm={6} xl={5} xxl={4}>

        <CCard color='info' className='text-white'>

          <CCardHeader> <h6> LICENCE 2 </h6> </CCardHeader>

          <CCardBody>
            <p> <strong> Payé : </strong> { totalsByLevel?.L2?.paid || 0 } </p>
            <p> <strong> Impayé : </strong> { totalsByLevel?.L2?.unpaid || 0 } </p>
          </CCardBody>

        </CCard>

      </CCol>

      <CCol sm={6} xl={5} xxl={4}>

        <CCard color='warning' className='text-white'>

          <CCardHeader> <h6> LICENCE 3 </h6> </CCardHeader>

          <CCardBody>
            <p> <strong> Payé : </strong> { totalsByLevel?.L3?.paid || 0 } </p>
            <p> <strong> Impayé : </strong> { totalsByLevel?.L3?.unpaid || 0 } </p>
          </CCardBody>

        </CCard>

      </CCol>

      {
        totalsByLevel?.M1 &&
        <CCol sm={6} xl={5} xxl={4}>

          <CCard color='primary' className='text-white'>

            <CCardHeader> <h6> MASTER 1 </h6> </CCardHeader>

            <CCardBody>
              <p> <strong> Payé : </strong> { totalsByLevel?.M1?.paid || 0 } </p>
              <p> <strong> Impayé : </strong> { totalsByLevel?.M1?.unpaid || 0 } </p>
            </CCardBody>

          </CCard>

        </CCol>
      }

      {
        totalsByLevel?.M2 &&
        <CCol sm={6} xl={5} xxl={4}>

          <CCard color='success' className='text-white'>

            <CCardHeader> <h6> MASTER 2 </h6> </CCardHeader>

            <CCardBody>
              <p> <strong> Payé : </strong> { totalsByLevel?.M2?.paid || 0 } </p>
              <p> <strong> Impayé : </strong> { totalsByLevel?.M2?.unpaid || 0 } </p>
            </CCardBody>

          </CCard>

        </CCol>
      }

    </CRow>
  )
}

WidgetsDropdown.propTypes = {
  className: PropTypes.string,
  withCharts: PropTypes.bool,
}

export default WidgetsDropdown
