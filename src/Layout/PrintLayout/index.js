import React from 'react'
import PropTypes from 'prop-types'
import { Container } from 'react-bootstrap'
import PrintHeader from 'Layout/PrintHeader'

const PrintLayout = props => {
  return (
    <Container className="print-layout">
      <PrintHeader title="District Summary" />
      {props.children}
    </Container>
  )
}

PrintLayout.propTypes = {}

export default PrintLayout
