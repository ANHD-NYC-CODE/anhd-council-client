import React from 'react'
import PropTypes from 'prop-types'
import * as b from 'shared/constants/boundaries'

import { Form, Row, Col } from 'react-bootstrap'

export class BoundaryQuery extends React.Component {
  constructor(props) {
    super(props)

    this.getBoundaryIdOptions = this.getBoundaryIdOptions.bind(this)
  }

  getBoundaryIdOptions(type) {
    switch (type) {
      case 'council':
        return [
          <option disabled value={-1} key={-1}>
            #
          </option>,
          ...this.props.districts.map(d => (
            <option key={`boundary-id-option-${d.id}`} value={d.id}>
              {d.id}
            </option>
          )),
        ]
      case 'cd':
        return [
          { value: -1, label: '#' },
          ...this.props.boards.map(b => ({ value: { key: 'id', value: b.id }, label: b.id })),
        ]
    }
  }

  render() {
    return this.props.boundaries.length ? (
      this.props.boundaries.map((boundary, boundaryIndex) => {
        return (
          <Form key={`boundary-${boundary.name}`}>
            <Form.Group as={Row}>
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
                  value={boundary.id || -1}
                >
                  {this.getBoundaryIdOptions(boundary.queryName)}
                </Form.Control>
              </Col>
            </Form.Group>
          </Form>
        )
      })
    ) : (
      <Form>
        <Form.Group as={Row}>
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
        </Form.Group>
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
