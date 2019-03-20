import React from 'react'
import PropTypes from 'prop-types'
import { getRequestType } from 'Store/AppState/selectors'
import SummaryResultCard from 'shared/components/SummaryResultCard'

import LeafletMap from 'LeafletMap'
import AddressSearch from 'Lookup/AddressSearch'

import { Row, Col } from 'react-bootstrap'

import RequestWrapper from 'shared/components/RequestWrapper'
import BuildingSelect from 'Lookup/BuildingSelect'
import RequestSummary from 'shared/components/RequestSummary'
import LookupLinks from 'Lookup/LookupLinks'

class LookupShow extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedRequest: props.requests.length ? getRequestType(props.requests, 'LOOKUP_FILTER')[0] : undefined,
    }

    this.switchTable = this.switchTable.bind(this)
  }

  switchTable(request) {
    this.setState({
      selectedRequest: request,
    })
  }

  render() {
    return (
      <Row>
        <Col xs={12} lg={4}>
          <Row>
            <Col>
              <AddressSearch />
            </Col>
          </Row>
          <Row>
            <Col>
              {!!getRequestType(this.props.requests, 'LOOKUP_PROFILE').length && (
                <RequestWrapper request={getRequestType(this.props.requests, 'LOOKUP_PROFILE')[0]} visible={true} />
              )}
            </Col>
          </Row>
          <Row>
            <Col>
              <LeafletMap />
            </Col>
          </Row>
          <Row>
            <Col>
              {!!getRequestType(this.props.requests, 'LOOKUP_PROFILE').length && (
                <LookupLinks request={getRequestType(this.props.requests, 'LOOKUP_PROFILE')[0]} />
              )}
            </Col>
          </Row>
        </Col>
        <Col xs={12} lg={8}>
          <Row>
            <Col xs={12} lg={3}>
              <Row>
                {getRequestType(this.props.requests, 'LOOKUP_FILTER').map((request, index) => {
                  return (
                    <Col xs={12} sm={6} md={4} lg={12} key={`request-summary-${index}`}>
                      <RequestSummary
                        request={request}
                        onClick={r => this.switchTable(r)}
                        resultsComponent={SummaryResultCard}
                      />
                    </Col>
                  )
                })}
              </Row>
            </Col>
            <Col xs={12} lg={9}>
              <Row>
                <Col>
                  {!!getRequestType(this.props.requests, 'LOOKUP_PROFILE').length && (
                    <BuildingSelect
                      bbl={this.props.bbl}
                      bin={this.props.bin}
                      changeLookup={this.props.changeLookup}
                      request={getRequestType(this.props.requests, 'LOOKUP_PROFILE')[0]}
                    />
                  )}
                </Col>
              </Row>
              <Row>
                {getRequestType(this.props.requests, 'LOOKUP_FILTER').map((request, index) => {
                  return (
                    <Col xs={12} key={`request-wrapper-${index}`}>
                      <RequestWrapper visible={this.state.selectedRequest === request} request={request} />
                    </Col>
                  )
                })}
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    )
  }
}

LookupShow.propTypes = {
  dispatch: PropTypes.func,
  bin: PropTypes.string,
  requests: PropTypes.array,
  changeLookup: PropTypes.func,
}

export default LookupShow
