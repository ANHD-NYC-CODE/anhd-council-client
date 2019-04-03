import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Card, Row, Col } from 'react-bootstrap'
import BaseLink from 'shared/components/BaseLink'
import './style.scss'

class LookupLinks extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return this.props.property ? (
      <div className="lookup-links">
        <Card.Body>
          <Row>
            <Col>
              <p className="font-weight-bold text-dark-gray">External Links:</p>
            </Col>
          </Row>
          <Row className="mb-2">
            <Col>
              <BaseLink
                className="lookup-links__link"
                href={`https://whoownswhat.justfix.nyc/bbl/${this.props.property.bbl}`}
                text="Other properties owned by this landlord (via WhoOwnsWhat)"
              />
            </Col>
          </Row>

          <Row className="small">
            <Col>
              <Row>
                <Col>
                  <BaseLink
                    className="lookup-links__link"
                    href={`https://hpdonline.hpdnyc.org/HPDonline/Provide_address.aspx?p1=1&p2=${
                      this.props.property.address.split(' ')[0]
                    }&p3=${this.props.property.address
                      .split(' ')
                      .slice(1)
                      .join(' ')}&SearchButton=Search`}
                    text="HPD Property Overview"
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <BaseLink
                    className="lookup-links__link"
                    href={`http://a810-bisweb.nyc.gov/bisweb/PropertyProfileOverviewServlet?boro=${this.props.property.bbl.charAt(
                      0
                    )}&block=${this.props.property.bbl.slice(1, 6)}&lot=${this.props.property.bbl.slice(6, 10)}`}
                    text="DOB Property Overview"
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <BaseLink
                    className="lookup-links__link"
                    href={`http://a836-acris.nyc.gov/bblsearch/bblsearch.asp?borough=${this.props.property.bbl.charAt(
                      0
                    )}&block=${this.props.property.bbl.slice(1, 6)}&lot=${this.props.property.bbl.slice(6, 10)}`}
                    text="ACRIS Documents"
                  />
                </Col>
              </Row>
            </Col>
            <Col>
              <Row>
                <Col>
                  <BaseLink className="lookup-links__link" href={'http://www.oasisnyc.net/map.aspx'} text="Oasis" />
                </Col>
              </Row>
              <Row>
                <Col>
                  <BaseLink
                    className="lookup-links__link"
                    href={`https://zola.planning.nyc.gov/lot/${this.props.property.bbl.charAt(
                      0
                    )}/${this.props.property.bbl.slice(1, 6)}/${this.props.property.bbl.slice(6, 10)}`}
                    text="Zola"
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </Card.Body>
      </div>
    ) : null
  }
}

LookupLinks.defaultProps = {
  property: undefined,
  request: {},
}

LookupLinks.propTypes = {
  dispatch: PropTypes.func,
  request: PropTypes.object,
}

const mapStateToProps = (state, ownProps) => {
  return {
    property: state.requests[ownProps.request.requestConstant],
  }
}

export default connect(mapStateToProps)(LookupLinks)
