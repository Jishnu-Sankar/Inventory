import React, { useState, useEffect } from 'react';
import {
  CButton,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CFormFeedback,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle
} from '@coreui/react'

import { attemptAddStock } from '../../../actions/stocks';
import { attemptGetProducts } from '../../../actions/products';
import { attemptGetWareHouses } from '../../../actions/warehouses';

const newStockModal = ({ visible, closemodal }) => {
  const [products, setProducts] = useState([]);
  const [warehouses, setWareHouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [id_product, setProduct] = useState('');
  const [id_warehouse, setWareHouse] = useState('');
  const [quantity, setQuantity] = useState('');
  const [noProduct, setNoProduct] = useState(false);
  const [noQuantity, setNoQuantity] = useState(false);
  const [noWH, setNoWH] = useState(false);

  const FetchData = async () => {
    return Promise.all([
      attemptGetWareHouses(),
      attemptGetProducts()
    ])
  };

  useEffect(() => {
    FetchData().then((data) => {
      setWareHouses(data[0]);
      setProducts(data[1]);
      setLoading(false);
    });
  }, [loading]);

  const validateForm = () => {
    if (!id_product) {
      setNoProduct(true);
    }
    if (!id_warehouse) {
      setNoWH(true);
    }
    if (!quantity) {
      setNoQuantity(true);
    }
  }

  const handleSubmit = () => {
    validateForm();
    if (id_product, id_warehouse, quantity) {
      attemptAddStock({ id_product, id_warehouse, quantity })
        .then((data) => closeFormMoal())
    }
  }

  const updateProduct = (e) => { setProduct(e.target.value); setNoProduct(false); };
  const updateWareHouse = (e) => { setWareHouse(e.target.value); setNoWH(false); };
  const updateQuantity = (e) => { setQuantity(e.target.value); setNoQuantity(false); };

  const closeFormMoal = () => {
    setNoProduct(false);
    setNoWH(false);
    setNoQuantity(false);
    setProduct('');
    setWareHouse('');
    setQuantity('');
    closemodal();
  }

  return !loading && (
    <>
      <CModal visible={visible} onClose={closeFormMoal}>
        <CModalHeader onClose={closeFormMoal}>
          <CModalTitle>Add Stock</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm className="row g-3 needs-validation">
            <CCol md={12}>
              <CFormLabel htmlFor="id_warehouse">WareHouse</CFormLabel>
              <CFormSelect id="id_warehouse" value={id_warehouse} onChange={updateWareHouse}>
                <option>Select warehouse</option>
                {warehouses.map((item) => (
                  <option key={item.id_warehouse} value={item.id_warehouse}>{item.warehouse_name}</option>
                ))}
              </CFormSelect>
              {noWH && (
                <CFormFeedback >Please select a warehouse.</CFormFeedback>
              )}
            </CCol>

            <CCol md={12}>
              <CFormLabel htmlFor="id_product">Product</CFormLabel>
              <CFormSelect id="id_product" value={id_product} onChange={updateProduct}>
                <option>Select Product</option>
                {products.map((item) => (
                  <option key={item.id_product} value={item.id_product}>{item.product_name}</option>
                ))}
              </CFormSelect>
              {noProduct && (
                <CFormFeedback >Please select a valid product.</CFormFeedback>
              )}
            </CCol>
            <CCol md={12}>
              <CFormLabel htmlFor="quantity">Quantity</CFormLabel>
              <CFormInput type="number" id="quantity" value={quantity} onChange={updateQuantity} />
              {noQuantity && (
                <CFormFeedback>Please select a valid product.</CFormFeedback>
              )}
            </CCol>

            <CCol xs={6}>
              <CButton color="secondary" onClick={closeFormMoal}>
                Cancel
              </CButton>
            </CCol>
            <CCol xs={6}>
              <CButton color="success" type="submit" onClick={handleSubmit}>
                Submit
              </CButton>
            </CCol>
          </CForm>
        </CModalBody>
      </CModal>
    </>
  )
}

export default newStockModal