import React, { useEffect, useState } from 'react'

import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'

import { attemptGetProducts } from '../../../actions/products';
import NewProductModal from '../../components/products/newModal';

const ProductDashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);


  const fetchProducts = () => {
    attemptGetProducts()
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => { });
  };

  useEffect(() => { fetchProducts(); }, [loading]);

  const closeModal = () => {
    fetchProducts();
    setVisible(false);
  };

  return !loading && (
    <>
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>
              <b>Products</b>
              <CButton className='float-end' color="success" onClick={() => setVisible(true)}>
                Add Product
              </CButton>
            </CCardHeader>
            <CCardBody>
              <CTable hover responsive borderless>
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell className="text-center">
                      Product ID
                    </CTableHeaderCell>
                    <CTableHeaderCell>Name</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Price</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {products.map((item, index) => (
                    <CTableRow v-for="item in tableItems" key={index}>
                      <CTableDataCell className="text-center">
                        <div>{item.id_product}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.product_name}</div>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <div>{item.price}</div>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <NewProductModal
        visible={visible}
        closemodal={closeModal}
      />
    </>
  )
}

export default ProductDashboard