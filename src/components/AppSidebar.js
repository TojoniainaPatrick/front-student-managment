import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  CCloseButton,
  CImage,
  CSidebar,
  CSidebarBrand,
  CSidebarFooter,
  CSidebarHeader,
  CSidebarToggler,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { AppSidebarNav } from './AppSidebarNav'

import { logo } from 'src/assets/brand/logo'
import { sygnet } from 'src/assets/brand/sygnet'
import logo_dgi from '../assets/brand/logo.png'

// sidebar nav config
import navigation from '../_nav'

const AppSidebar = () => {

  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)

  const user = JSON.parse( localStorage.getItem('user'))

  return (
    <CSidebar
      className="border-end"
      colorScheme="dark"
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
    >

      <CSidebarHeader className="border-bottom">

        <CSidebarBrand style={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          textDecoration: 'none',
          gap: 15
          }}
        >

          <CImage src = { logo_dgi } width = { 60 }/>

          {
            !unfoldable &&
            <div style = {{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bolder'
              }}>
              <span> Solution RPA </span>
              <span> Télépaiement </span>
            </div>
          }

        </CSidebarBrand>

        <CCloseButton
          className="d-lg-none"
          dark
          onClick={() => dispatch({ type: 'set', sidebarShow: false })}
        />

      </CSidebarHeader>

      <AppSidebarNav items = { navigation(user?.type?.toString().toLowerCase()) } />

      <CSidebarFooter className="border-top d-none d-lg-flex">
        <CSidebarToggler
          onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
        />
      </CSidebarFooter>
      
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
