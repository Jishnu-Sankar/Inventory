import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderDivider,
  CHeaderNav,
  CNavLink,
  CNavItem,
} from '@coreui/react'

const AppHeader = () => {
  const currentLocation = useLocation().pathname;

  const getPage = (location, string) => {
    const path = location.split(`/`)[1];
    return path.includes(string);
  };

  const isProductPage = getPage(currentLocation, 'products');
  const isDashBoard = getPage(currentLocation, 'dashboard');
  const isWareHousePage = getPage(currentLocation, 'warehouses');

  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid>
        <CHeaderBrand className="mx-auto" to="/">
          <h3>
            <b> My Inventory </b>
          </h3>
        </CHeaderBrand>
      </CContainer>
      <CHeaderDivider />
      <CContainer fluid>
        <CHeaderNav className="d-md-flex me-auto">
          <CNavItem color='success'>
            <CNavLink to="/dashboard" component={NavLink} active={isDashBoard}>
              Dashboard
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#/products" active={isProductPage}>
              Products
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#/warehouses" active={isWareHousePage}>
              Ware House
            </CNavLink>
          </CNavItem>
        </CHeaderNav>
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
