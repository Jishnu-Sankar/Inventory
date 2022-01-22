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

import { attemptAddWareHouse } from '../../../actions/warehouses';

const NewWareHouseModal = ({ visible, closemodal }) => {
  const [warehouse_name, setName] = useState('');
  const [stock_limit, setStockLimit] = useState('');

  const [validated, setValidated] = useState(false)
  const handleSubmit = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      setValidated(true);
      attemptAddWareHouse({ warehouse_name, stock_limit })
        .then((data) => closeFormMoal())
    }
  }

  const updateText = (e) => setName(e.target.value);
  const updateStockLimit = (e) => setStockLimit(e.target.value);

  const closeFormMoal = () => {
    setValidated(true);
    setName('');
    setStockLimit('');
    closemodal();
  }

  return (
    <>
      <CModal visible={visible} onClose={closeFormMoal}>
        <CModalHeader onClose={closeFormMoal}>
          <CModalTitle>Add New WareHouse</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm
            className="row g-3 needs-validation"
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
          >
            <CCol md={12}>
              <CFormLabel htmlFor="warehouse_name">WareHouse Name</CFormLabel>
              <CFormInput type="text" id="warehouse_name" value={warehouse_name} required onChange={updateText} />
            </CCol>
            <CCol md={12}>
              <CFormLabel htmlFor="stock_limit">Stock Limit</CFormLabel>
              <CFormInput type="number" id="stock_limit" value={stock_limit} onChange={updateStockLimit} />
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

export default NewWareHouseModal