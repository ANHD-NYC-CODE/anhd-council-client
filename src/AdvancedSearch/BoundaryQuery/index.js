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
        return [...this.props.districts.map(d => ({ value: { key: 'id', value: d.id }, label: d.id }))]
      case 'cd':
        return [...this.props.boards.map(b => ({ value: { key: 'id', value: b.id }, label: b.id }))]
    }
  }

  render() {
    return (
      <Form className="boundary-picker">
        {!this.props.boundaries.length && (
          <Form.Row className="boundary">
            <Col sm={6} md={4}>
              <Form.Label>Type</Form.Label>
              <CustomSelect
                onChange={this.props.addBoundary}
                options={[
                  { value: b.COUNCILBOUNDARY.constant, label: b.COUNCILBOUNDARY.name },
                  { value: b.COMMUNITYBOUNDARY.constant, label: b.COMMUNITYBOUNDARY.name },
                ]}
                placeholder="Pick a geography..."
                size="sm"
              />
            </Col>
          </Form.Row>
        )}
        {!!this.props.boundaries.length &&
          this.props.boundaries.map((boundary, index) => {
            return (
              <Form.Row className="boundary" key={boundary.name}>
                <Col sm={6} md={4}>
                  <Form.Label>Type</Form.Label>
                  <CustomSelect
                    onChange={e => this.props.changeBoundary(index, boundary, e)}
                    options={[
                      { value: { key: 'object', value: b.COUNCILBOUNDARY.constant }, label: b.COUNCILBOUNDARY.name },
                      {
                        value: { key: 'object', value: b.COMMUNITYBOUNDARY.constant },
                        label: b.COMMUNITYBOUNDARY.name,
                      },
                    ]}
                    size="sm"
                    value={{ value: boundary.constant, label: boundary.name.toLowerCase() }}
                  />
                </Col>
                <Col>
                  <Form.Label>{`${boundary.name} #`}</Form.Label>
                  <CustomSelect
                    onChange={e => this.props.changeBoundary(index, boundary, e)}
                    options={this.getBoundaryIdOptions(boundary.queryName)}
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
  changeBoundary: PropTypes.func,
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
