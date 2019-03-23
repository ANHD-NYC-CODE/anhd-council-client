import React from 'react'
import PropTypes from 'prop-types'
import { Container } from 'react-bootstrap'
import PrintHeader from 'Layout/PrintHeader'
import LayoutContext from 'Layout/LayoutContext'
const PrintLayout = props => {
  return (
    <Container className="print-layout">
      <LayoutContext.Consumer>
        {layout => <PrintHeader layout={layout} title={layout.printTitle} />}
      </LayoutContext.Consumer>
      {props.children}
    </Container>
  )
}

PrintLayout.propTypes = {}

export default PrintLayout
