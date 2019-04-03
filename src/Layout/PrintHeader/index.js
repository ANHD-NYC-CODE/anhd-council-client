import React from 'react'
import PropTypes from 'prop-types'
import { Col, Row, Button } from 'react-bootstrap'
import logo from 'shared/images/portallogo-white.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPrint } from '@fortawesome/free-solid-svg-icons'
const PrintHeader = props => {
  return (
    <div className="print-header">
      <Row className="py-4">
        <img src={logo} className="print-header__logo d-inline-block align-top" alt="Displacement Alert Portal Logo" />
        <Col>
          <Button className="no-print" onClick={() => props.layout.togglePrint()}>
            <FontAwesomeIcon icon={faPrint} />
            <span> Exit Print</span>
          </Button>
        </Col>
      </Row>
      <Row>
        <h2>{props.title}</h2>
      </Row>
    </div>
  )
}

PrintHeader.defaultProps = {
  title: 'Print Report',
}

PrintHeader.propTypes = {
  layout: PropTypes.object,
  title: PropTypes.string,
}

export default PrintHeader
