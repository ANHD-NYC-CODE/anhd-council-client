import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import AddressSearch from 'Lookup/AddressSearch'
import BoundarySelect from 'shared/components/BoundarySelect'
import { Form, Row, Col, Jumbotron, Container } from 'react-bootstrap'
class Main extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="main">
        <Row>
          <Col className="touch-left" xs={12} sm={12} md={6} lg={5}>
            <Jumbotron>
              <h4>Welcome to DAP Portal</h4>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras id lobortis diam. Praesent neque purus,
                mattis eu interdum eget, maximus a purus. Quisque interdum auctor ligula vel commodo. Aliquam est arcu,
                gravida at ultrices vitae, mattis non massa. Curabitur posuere, ex nec rhoncus lobortis, est mi luctus
                massa, in tempor dui est vel erat.
              </p>
              <p>
                Morbi sed mauris eu dui pharetra finibus. Nunc convallis hendrerit porta. Etiam maximus sed risus eu
                scelerisque. Duis pretium tortor felis. Morbi tempor tincidunt erat, ullamcorper sollicitudin nibh
                tempus at. Nullam placerat efficitur lectus in commodo. Ut sit amet lorem ut nisi scelerisque mollis vel
                at nunc. Maecenas sed malesuada nunc.
              </p>
            </Jumbotron>
          </Col>
          <Col xs={12} sm={12} md={6} lg={7}>
            <h5>Select a district to begin, or search for a building address.</h5>
            <Form autoComplete="off">
              <Form.Group>
                <AddressSearch placeholder="Building Lookup Tool" />
              </Form.Group>
              <Form.Group>
                <BoundarySelect
                  confirmChange={false}
                  currentBoundaryType={this.props.appState.currentBoundaryType}
                  currentBoundaryId={this.props.appState.currentBoundaryId}
                  dispatch={this.props.dispatch}
                  placeholder="District Alerts Map"
                />
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </div>
    )
  }
}

Main.propTypes = {
  auth: PropTypes.object,
  dispatch: PropTypes.func,
  showLoginModal: PropTypes.bool,
  path: PropTypes.string,
}

const mapStateToProps = state => {
  return {
    appState: state.appState,
  }
}

export default connect(mapStateToProps)(Main)
