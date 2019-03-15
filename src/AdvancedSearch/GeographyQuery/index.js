import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as b from 'shared/constants/geographies'
import { Geography } from 'shared/classes/Geography'
import FormError from 'shared/components/FormError'

import { StandardizedInput } from 'shared/classes/StandardizedInput'

import { addGeography, updateGeography } from 'Store/AdvancedSearch/actions'
import { getGeographyIdOptions } from 'shared/utilities/componentUtils'
import { Form, Row, Col } from 'react-bootstrap'

export class GeographyQuery extends React.Component {
  constructor(props) {
    super(props)

    this.addGeography = this.addGeography.bind(this)
    this.changeGeography = this.changeGeography.bind(this)
  }

  addGeography(e) {
    this.props.handleChange(e)
    e = new StandardizedInput(e)
    this.props.dispatch(addGeography(new Geography(e.value)))
  }

  changeGeography(index, geography, e) {
    this.props.handleChange(e)
    e = new StandardizedInput(e)
    geography[e.key] = e.value
    this.props.dispatch(updateGeography(index, geography))
  }

  render() {
    return this.props.geographies.length ? (
      this.props.geographies.map((geography, geographyIndex) => {
        return (
          <Form.Group as={Row} key={`Geography-${geography.name}`}>
            <Col xs={6}>
              <Form.Control
                required
                size="sm"
                placeholder="Search Geography"
                name="geographyType"
                as="select"
                onBlur={this.props.handleBlur}
                isInvalid={
                  (this.props.touched.geographyType || !!this.props.submitCount) && this.props.errors.geographyType
                }
                data-key="geographyType"
                onChange={e => this.changeGeography(geographyIndex, geography, e)}
                value={geography.constant}
              >
                <option disabled value={-1} key={-1}>
                  Select a geography type
                </option>
                <option value={b.COUNCILGEOGRAPHY.constant}>{b.COUNCILGEOGRAPHY.name}</option>
                <option value={b.COMMUNITYGEOGRAPHY.constant}>{b.COMMUNITYGEOGRAPHY.name}</option>
              </Form.Control>
              <FormError
                show={
                  !!(this.props.touched.geographyType || !!this.props.submitCount) && this.props.errors.geographyType
                }
                message={this.props.errors.geographyType}
              />
            </Col>
            <Col>
              <Form.Control
                required
                as="select"
                data-key="id"
                name="geographyId"
                onChange={e => this.changeGeography(geographyIndex, geography, e)}
                placeholder="Search Geography"
                size="sm"
                onBlur={this.props.handleBlur}
                isInvalid={
                  (this.props.touched.geographyId || !!this.props.submitCount) && this.props.errors.geographyId
                }
                value={geography.id || -1}
              >
                {getGeographyIdOptions(this.props.districts, this.props.boards, geography.queryName)}
              </Form.Control>

              <FormError
                show={!!((this.props.touched.geographyId || !!this.props.submitCount) && this.props.errors.geographyId)}
                message={this.props.errors.geographyId}
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
            placeholder="Search Geography"
            name="geographyType"
            as="select"
            onChange={this.addGeography}
            onBlur={this.props.handleBlur}
            isInvalid={
              (this.props.touched.geographyType || !!this.props.submitCount) && this.props.errors.geographyType
            }
            value={-1}
          >
            <option disabled value={-1} key={-1}>
              Select a geography type
            </option>
            <option value={b.COUNCILGEOGRAPHY.constant}>{b.COUNCILGEOGRAPHY.name}</option>
            <option value={b.COMMUNITYGEOGRAPHY.constant}>{b.COMMUNITYGEOGRAPHY.name}</option>
          </Form.Control>

          <FormError
            show={!!(this.props.touched.geographyType || !!this.props.submitCount) && this.props.errors.geographyType}
            message={this.props.errors.geographyType}
          />
        </Col>
      </Form.Group>
    )
  }
}

GeographyQuery.propTypes = {
  addGeography: PropTypes.func,
  changeGeography: PropTypes.func,
  boards: PropTypes.array,
  geographies: PropTypes.array,
  districts: PropTypes.array,
}

const mapStateToProps = state => {
  return {
    boards: state.community.boards,
    districts: state.council.districts,
  }
}

export default connect(mapStateToProps)(GeographyQuery)
