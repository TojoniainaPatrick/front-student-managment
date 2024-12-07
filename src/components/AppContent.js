import React, { Suspense, useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'

// routes config
import routes from '../routes'

const AppContent = () => {

  const [ userRoutes, setUserRoutes ] = useState([])

  const user = JSON.parse(localStorage.getItem('user'))

  useEffect(() => {
    setUserRoutes( routes( user.type?.toString().toLowerCase() ))
  }, [])

  return (
    <CContainer className="px-4" lg>
      <Suspense fallback={<CSpinner color="primary" />}>
        <Routes>
          {userRoutes.map((route, idx) => {
            return (
              route.element && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  element={ <route.element />}
                />
              )
            )
          })}
          {/* <Route path="/" element={<Navigate to="dashboard" replace />} /> */}
        </Routes>
      </Suspense>
    </CContainer>
  )
}

export default React.memo(AppContent)
