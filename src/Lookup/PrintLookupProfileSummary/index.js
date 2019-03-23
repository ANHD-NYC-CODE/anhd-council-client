import React from 'react'
import PropTypes from 'prop-types'
import { Card, Row, Col } from 'react-bootstrap'
import PropertySummaryBody from 'Lookup/LookupProfileSummary/PropertySummaryBody'

const PrintLookupProfileSummary = props => {
  return (
    <Card className="print-lookup-profile-summary">
      <Card.Body>
        <PropertySummaryBody profile={props.profile} />
      </Card.Body>
    </Card>
  )
}

PrintLookupProfileSummary.propTypes = {
  profile: PropTypes.object,
}

export default PrintLookupProfileSummary
