import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as b from 'shared/constants/boundaries'
import { Boundary } from 'shared/classes/Boundary'
import FormError from 'shared/components/FormError'

import { StandardizedInput } from 'shared/classes/StandardizedInput'

import { addBoundary, updateBoundary } from 'Store/AdvancedSearch/actions'

import { Form, Row, Col } from 'react-bootstrap'

export class BoundaryQuery extends React.Component {
  constructor(props) {
    super(props)

    this.getBoundaryIdOptions = this.getBoundaryIdOptions.bind(this)
    this.addBoundary = this.addBoundary.bind(this)
    this.changeBoundary = this.changeBoundary.bind(this)
  }

  addBoundary(e) {
    this.props.handleChange(e)
    e = new StandardizedInput(e)
    this.props.dispatch(addBoundary(new Boundary(e.value)))
  }

  changeBoundary(index, boundary, e) {
    this.props.handleChange(e)
    e = new StandardizedInput(e)
    boundary[e.key] = e.value
    this.props.dispatch(updateBoundary(index, boundary))
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
          <option disabled value={-1} key={-1}>
            #
          </option>,
          ...this.props.boards.map(d => (
            <option key={`boundary-id-option-${d.id}`} value={d.id}>
              {d.id}
            </option>
          )),
        ]
    }
  }

  render() {
    return this.props.boundaries.length ? (
      this.props.boundaries.map((boundary, boundaryIndex) => {
        return (
          <Form.Group as={Row} key={`boundary-${boundary.name}`}>
            <Col xs={6}>
              <Form.Control
                required
                size="sm"
                placeholder="Search boundary"
                name="boundaryType"
                as="select"
                onBlur={this.props.handleBlur}
                isInvalid={
                  (this.props.touched.boundaryType || !!this.props.submitCount) && this.props.errors.boundaryType
                }
                data-key="boundaryType"
                onChange={e => this.changeBoundary(boundaryIndex, boundary, e)}
                value={boundary.constant}
              >
                <option disabled value={-1} key={-1}>
                  Select a geography
                </option>
                <option value={b.COUNCILBOUNDARY.constant}>{b.COUNCILBOUNDARY.name}</option>
                <option value={b.COMMUNITYBOUNDARY.constant}>{b.COMMUNITYBOUNDARY.name}</option>
              </Form.Control>
              <FormError
                show={!!(this.props.touched.boundaryType || !!this.props.submitCount) && this.props.errors.boundaryType}
                message={this.props.errors.boundaryType}
              />
            </Col>
            <Col>
              <Form.Control
                required
                as="select"
                data-key="id"
                name="boundaryId"
                onChange={e => this.changeBoundary(boundaryIndex, boundary, e)}
                placeholder="Search boundary"
                size="sm"
                onBlur={this.props.handleBlur}
                isInvalid={(this.props.touched.boundaryId || !!this.props.submitCount) && this.props.errors.boundaryId}
                value={boundary.id || -1}
              >
                {this.getBoundaryIdOptions(boundary.queryName)}
              </Form.Control>

              <FormError
                show={!!((this.props.touched.boundaryId || !!this.props.submitCount) && this.props.errors.boundaryId)}
                message={this.props.errors.boundaryId}
              />
            </Col>
          </Form.Group>
        )
      })
    ) : (
      <Form.Group as={Row}>
        <Col xs={6}>
          <Form.Control
            required
            size="sm"
            placeholder="Search boundary"
            name="boundaryType"
            as="select"
            onChange={this.addBoundary}
            onBlur={this.props.handleBlur}
            isInvalid={(this.props.touched.boundaryType || !!this.props.submitCount) && this.props.errors.boundaryType}
            value={-1}
          >
            <option disabled value={-1} key={-1}>
              Select a geography
            </option>
            <option value={b.COUNCILBOUNDARY.constant}>{b.COUNCILBOUNDARY.name}</option>
            <option value={b.COMMUNITYBOUNDARY.constant}>{b.COMMUNITYBOUNDARY.name}</option>
          </Form.Control>

          <FormError
            show={!!(this.props.touched.boundaryType || !!this.props.submitCount) && this.props.errors.boundaryType}
            message={this.props.errors.boundaryType}
          />
        </Col>
      </Form.Group>
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

const mapStateToProps = state => {
  return {
    boards: state.community.boards,
    districts: state.council.districts,
  }
}

export default connect(mapStateToProps)(BoundaryQuery)
