import React from 'react'
import PropTypes from 'prop-types'
import * as b from 'shared/constants/boundaries'

import CustomSelect from 'shared/components/CustomSelect'
import { Form, InputGroup, DropdownButton, Dropdown, Col } from 'react-bootstrap'

export class BoundaryQuery extends React.Component {
  constructor(props) {
    super(props)

    this.getBoundaryIdOptions = this.getBoundaryIdOptions.bind(this)
  }

  getBoundaryIdOptions(type) {
    switch (type) {
      case 'council':
        return [...this.props.districts.map(d => ({ value: d.id, label: d.id }))]
      case 'cd':
        return [...this.props.boards.map(b => ({ value: { key: 'id', value: b.id }, label: b.id }))]
    }
  }

  render() {
    return (
      <Form className="boundary-picker">
        {!this.props.boundaries.length && (
          <Form.Row>
            <Col xs={6}>
              <Form.Control
                size="sm"
                placeholder="Search boundary"
                name="comparison"
                as="select"
                onChange={this.props.addBoundary}
                value={-1}
              >
                <option disabled value={-1} key={-1}>
                  Select a geography
                </option>
                <option value={b.COUNCILBOUNDARY.constant}>{b.COUNCILBOUNDARY.name}</option>
                <option value={b.COMMUNITYBOUNDARY.constant}>{b.COMMUNITYBOUNDARY.name}</option>
              </Form.Control>
            </Col>
          </Form.Row>
        )}
        {!!this.props.boundaries.length &&
          this.props.boundaries.map((boundary, boundaryIndex) => {
            return (
              <Form.Row key={`boundary-${boundary.name}`}>
                <Col xs={6}>
                  <Form.Control
                    size="sm"
                    placeholder="Search boundary"
                    name="comparison"
                    as="select"
                    onChange={this.props.addBoundary}
                    value={boundary.constant}
                  >
                    <option disabled value={-1} key={-1}>
                      Select a geography
                    </option>
                    <option value={b.COUNCILBOUNDARY.constant}>{b.COUNCILBOUNDARY.name}</option>
                    <option value={b.COMMUNITYBOUNDARY.constant}>{b.COMMUNITYBOUNDARY.name}</option>
                  </Form.Control>
                </Col>
                <Col>
                  <Form.Control
                    as="select"
                    data-key="id"
                    name="comparison"
                    onChange={e => this.props.changeBoundary(boundaryIndex, boundary, e)}
                    placeholder="Search boundary"
                    size="sm"
                    value={-1}
                  >
                    {this.getBoundaryIdOptions(boundary.queryName).map((option, index) => {
                      return (
                        <option key={`boundary-id-option-${index}`} value={option.value}>
                          {option.label}
                        </option>
                      )
                    })}
                  </Form.Control>
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
}

export default BoundaryQuery
