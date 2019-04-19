import React from 'react'
import PropTypes from 'prop-types'
import { setAppState, toggleSelectedRequest } from 'Store/AppState/actions'

import RequestSummaryWrapper from 'shared/components/RequestSummaryWrapper'
import SummaryResultCard from 'shared/components/ResultCard/SummaryResultCard'
import { Card, Row, Col } from 'react-bootstrap'
import BaseLink from 'shared/components/BaseLink'

const DistrictSummarySection = props => {
  const handleSummaryClick = request => {
    if (request.type === 'ADVANCED_SEARCH') {
      props.dispatch(
        setAppState({
          selectedRequests: [request],
          // selectedResultsFilter: undefined,
        })
      )
    } else {
      props.dispatch(setAppState({ districtShowCustomView: false }))
      props.dispatch(toggleSelectedRequest(request))
      if (!props.appState.selectedResultsFilter) {
        props.dispatch(
          setAppState({
            selectedResultsFilter: props.appState.resultFilters[0],
          })
        )
      }
    }
  }

  return (
    <Row className="district-summary-section">
      {// Not Custom Search
      props.geographyRequests
        .filter(r => r.type !== 'ADVANCED_SEARCH')
        .map((request, index) => {
          return (
            <Col xs={12} sm={6} xl={4} key={`rs-col-${index}`} className="geography-request-summary__container">
              <RequestSummaryWrapper
                key={`request-summary-${request.type}-${index}`}
                request={request}
                resultsFilter={props.selectedResultsFilter}
                label={undefined}
                onClick={() => handleSummaryClick(request)}
                resultsComponent={SummaryResultCard}
                selected={!props.customView && props.appState.selectedRequests.includes(request)}
              />
            </Col>
          )
        })}

      {// Custom Search
      props.geographyRequests
        .filter(r => r.type === 'ADVANCED_SEARCH')
        .map(request => (
          <Col xs={12} sm={6} xl={4} key={'rs-col-custom-search'} className="geography-request-summary__container">
            <RequestSummaryWrapper
              key={'request-summary-custom-search'}
              request={request}
              resultsFilter={undefined}
              label={'Custom Search'}
              onClick={() =>
                props.dispatch(setAppState({ districtShowCustomView: !props.appState.districtShowCustomView }))
              }
              resultsComponent={SummaryResultCard}
              selected={props.customView}
            />
          </Col>
        ))}
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

DistrictSummarySection.propTypes = {
  customView: PropTypes.bool,
}

export default DistrictSummarySection
