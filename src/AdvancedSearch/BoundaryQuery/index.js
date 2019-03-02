import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as b from 'shared/constants/boundaries'

import CustomSelect from 'shared/components/Select'
import { Form, Col } from 'react-bootstrap'

class BoundaryQuery extends React.Component {
  constructor(props) {
    super(props)

    this.getBoundaryIdOptions = this.getBoundaryIdOptions.bind(this)
  }

  getBoundaryIdOptions(type) {
    switch (type) {
      case 'council':
        return [...this.props.districts.map(d => ({ value: d.id, label: d.id }))]
      case 'cd':
        return [...this.props.boards.map(b => ({ value: b.id, label: b.id }))]
    }
  }

  render() {
    return (
      <Form className="boundary-picker">
        {!this.props.boundaries.length && (
          <Form.Row className="boundary">
            <Col sm={6} md={4}>
              <Form.Label>Geography Type</Form.Label>
              <CustomSelect
                onChange={this.props.addBoundary}
                options={[
                  { value: b.COUNCILBOUNDARY, label: b.COUNCILBOUNDARY.name.toLowerCase() },
                  { value: b.COMMUNITYBOUNDARY, label: b.COMMUNITYBOUNDARY.name.toLowerCase() },
                ]}
                size="sm"
              />
            </Col>
          </Form.Row>
        )}
        {!!this.props.boundaries.length &&
          this.props.boundaries.map((boundary, index) => {
            return (
              <Form.Row className="boundary" key={boundary.object.name}>
                <Col sm={6} md={4}>
                  <Form.Label>Geography Type</Form.Label>
                  <CustomSelect
                    onChange={e => this.props.changeBoundaryObject(e, index)}
                    options={[
                      { value: b.COUNCILBOUNDARY, label: b.COUNCILBOUNDARY.name.toLowerCase() },
                      { value: b.COMMUNITYBOUNDARY, label: b.COMMUNITYBOUNDARY.name.toLowerCase() },
                    ]}
                    size="sm"
                    value={{ value: boundary.object, label: boundary.object.name.toLowerCase() }}
                  />
                </Col>
                <Col>
                  <Form.Label>Geography ID</Form.Label>
                  <CustomSelect
                    onChange={e => this.props.changeBoundaryId(e, index)}
                    options={this.getBoundaryIdOptions(boundary.object.queryName)}
                    size="sm"
                    value={{ value: boundary.id, label: boundary.id }}
                  />
                </Col>
              </Form.Row>
            )
          })}
      </Form>
    )
  }
}

BoundaryQuery.propTypes = {
  addBoundary: PropTypes.func,
  changeBoundaryObject: PropTypes.func,
  changeBoundaryId: PropTypes.func,
  boards: PropTypes.array,
  boundaries: PropTypes.array,
  districts: PropTypes.array,
  dispatch: PropTypes.func,
}

const mapStateToProps = state => {
  return {
    boards: state.community.boards,
    districts: state.council.districts,
  }
}

export default connect(mapStateToProps)(BoundaryQuery)
