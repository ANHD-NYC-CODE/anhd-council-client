import React from 'react'
import { Container } from 'react-bootstrap'

import PrintHeader from 'Layout/PrintHeader'
import LayoutContext from 'Layout/LayoutContext'

import './style.scss'

const PrintLayout = props => (
  <Container className="print-layout">
    <LayoutContext.Consumer>
      {layout => <PrintHeader layout={layout} title={layout.printTitle} />}
    </LayoutContext.Consumer>
    {props.children}
  </Container>
)

PrintLayout.propTypes = {}

export default PrintLayout
