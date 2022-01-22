import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Products = React.lazy(() => import('./views/pages/products/index'))
const WareHouses = React.lazy(() => import('./views/pages/warehouses/index'))
const WareHouse = React.lazy(() => import('./views/pages/warehouses/details'))
const Stocks = React.lazy(() => import('./views/pages/stocks/index'))


const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/products', name: 'Products', component: Products, exact: true },
  { path: '/warehouses', name: 'WareHouses', component: WareHouses, exact: true },
  { path: '/warehouses/:id', name: 'WareHouses', component: WareHouse, exact: true },
  { path: '/stocks', name: 'Stocks', component: Stocks, exact: true }
]

export default routes
