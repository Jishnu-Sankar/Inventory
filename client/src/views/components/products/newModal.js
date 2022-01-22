import React, { useState } from 'react';
import {
  CButton,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle
} from '@coreui/react'

import { attemptAddProduct } from '../../../actions/products';

const newProductModal = ({ visible, closemodal }) => {
  const [product_name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [warning, setWarning] = useState('');

  const [validated, setValidated] = useState(false)
  const handleSubmit = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      setValidated(true);
      attemptAddProduct({ product_name, price })
        .then((data) => closeFormMoal())
    }
  }

  const updateText = (e) => setName(e.target.value);
  const updatePrice = (e) => setPrice(e.target.value);

  const closeFormMoal = () => {
    setValidated(true);
    setName('');
    setPrice('');
    closemodal();
  }

  return (
    <>
      <CModal visible={visible} onClose={closeFormMoal}>
        <CModalHeader onClose={closeFormMoal}>
          <CModalTitle>Add New Product</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm
            className="row g-3 needs-validation"
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
          >
            <CCol md={12}>
              <CFormLabel htmlFor="product_name">Product Name</CFormLabel>
              <CFormInput type="text" id="product_name" value={product_name} required onChange={updateText} />
            </CCol>
            <CCol md={12}>
              <CFormLabel htmlFor="price">Unit Price</CFormLabel>
              <CFormInput type="number" id="price" value={price} required onChange={updatePrice} />
            </CCol>
            <CCol xs={6}>
              <CButton color="secondary" onClick={closeFormMoal}>
                Cancel
              </CButton>
            </CCol>
            <CCol xs={6}>
              <CButton color="success" type="submit">
                Submit
              </CButton>
            </CCol>
          </CForm>
        </CModalBody>
      </CModal>
    </>
  )
}

export default newProductModal