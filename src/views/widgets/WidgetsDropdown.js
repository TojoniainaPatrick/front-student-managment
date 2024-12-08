import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

import {
  CRow,
  CCol,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
  CWidgetStatsA,
  CCard,
  CCardHeader,
  CCardBody,
} from '@coreui/react'
import { getStyle } from '@coreui/utils'
import { CChartBar, CChartLine } from '@coreui/react-chartjs'
import CIcon from '@coreui/icons-react'
import { cilArrowBottom, cilArrowTop, cilOptions } from '@coreui/icons'

const WidgetsDropdown = (props) => {
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
          <p> <strong> Payé : </strong> 20 </p>
          <p> <strong> Impayé : </strong> 3 </p>
        </CCardBody>

      </CCard>
      
    </CCol>

      <CCol sm={6} xl={5} xxl={4}>

        <CCard color='info' className='text-white'>

          <CCardHeader> <h6> LICENCE 2 </h6> </CCardHeader>

          <CCardBody>
            <p> <strong> Payé : </strong> 22 </p>
            <p> <strong> Impayé : </strong> 5 </p>
          </CCardBody>

        </CCard>

      </CCol>

      <CCol sm={6} xl={5} xxl={4}>

        <CCard color='warning' className='text-white'>

          <CCardHeader> <h6> LICENCE 3 </h6> </CCardHeader>

          <CCardBody>
            <p> <strong> Payé : </strong> 30 </p>
            <p> <strong> Impayé : </strong> 2 </p>
          </CCardBody>

        </CCard>

      </CCol>

    </CRow>
  )
}

WidgetsDropdown.propTypes = {
  className: PropTypes.string,
  withCharts: PropTypes.bool,
}

export default WidgetsDropdown
