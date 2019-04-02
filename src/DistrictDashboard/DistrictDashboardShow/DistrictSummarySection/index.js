import React from 'react'
import PropTypes from 'prop-types'
import RequestSummaryWrapper from 'shared/components/RequestSummaryWrapper'
import SummaryResultCard from 'shared/components/ResultCard/SummaryResultCard'
import { Card, Row, Col } from 'react-bootstrap'
import BaseLink from 'shared/components/BaseLink'
const DistrictSummarySection = props => {
  return (
    <Row className="district-summary-section">
      {props.geographyRequests.map((request, index) => {
        return (
          <Col xs={12} sm={6} xl={4} key={`rs-col-${index}`} className="geography-request-summary__container">
            <RequestSummaryWrapper
              key={`request-summary-${props.appState.requests.indexOf(request)}`}
              request={request}
              resultsFilter={props.appState.selectedResultsFilter}
              label={request.summaryCardLabel}
              onClick={() => props.switchTable(request)}
              resultsComponent={SummaryResultCard}
              selected={props.selectedRequest === request}
            />
          </Col>
        )
      })}
      {!props.geographyRequests.some(r => r.type === 'ADVANCED_SEARCH') && (
        <Col className="geography-request-summary__container d-flex" xs={12} sm={6} xl={4}>
          <Col className="align-self-center pl-0 pl-lg-2 pr-0" xs={11}>
            <BaseLink href="/search">
              <Card className="border-0">
                <Card.Body>+ Add Custom Search</Card.Body>
              </Card>
            </BaseLink>
          </Col>
          <Col xs={1} className="pl-0 pr-1" />
        </Col>
      )}
    </Row>
  )
}

DistrictSummarySection.propTypes = {}

export default DistrictSummarySection
