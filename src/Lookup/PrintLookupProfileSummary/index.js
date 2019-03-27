import React from 'react'
import PropTypes from 'prop-types'
import { Card, Row, Col } from 'react-bootstrap'
import PropertySummaryBody from 'Lookup/LookupProfileSummary/PropertySummaryBody'
import './style.scss'
const PrintLookupProfileSummary = props => {
  return (
    <Card className="print-lookup-profile-summary" onClick={e => e.preventDefault()}>
      <Card.Body>
        <PropertySummaryBody onClick={e => e.preventDefault()} profile={props.profile} />
      </Card.Body>
    </Card>
  )
}

PrintLookupProfileSummary.propTypes = {
  profile: PropTypes.object,
}

export default PrintLookupProfileSummary
