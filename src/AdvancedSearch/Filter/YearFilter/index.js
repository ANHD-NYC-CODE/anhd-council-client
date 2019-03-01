import React from 'react'
import PropTypes from 'prop-types'
import CustomSelect from 'shared/components/Select'

import { Col, Row, Form } from 'react-bootstrap'

class YearFilter extends React.Component {
  constructor(props) {
    super(props)
    this.startingConfig = 'startDate'
    this.state = {
      config: this.chooseDateConfig(this.props.filterValues),
    }

    this.renderDateConfig = this.renderDateConfig.bind(this)
    this.chooseDateConfig = this.chooseDateConfig.bind(this)
  }

  chooseDateConfig(filterValues) {
    if (filterValues.startDate && filterValues.endDate) {
      return 'range'
    } else if (filterValues.startDate) {
      return 'startDate'
    } else if (filterValues.endDate) {
      return 'endDate'
    }
  }

  renderDateConfig(filterValues) {
    switch (this.state.config) {
      case 'startDate':
        return (
          <Form.Control
            name="startDate"
            onChange={this.props.onChange}
            size="sm"
            type="number"
            value={filterValues.startDate}
          />
        )
      case 'endDate':
        return (
          <Form.Control
            name="endDate"
            onChange={this.props.onChange}
            type="number"
            size="sm"
            value={filterValues.endDate}
          />
        )
      default:
        return (
          <Row>
            <Col md="6">
              <Form.Control
                name="startDate"
                onChange={this.props.onChange}
                size="sm"
                type="number"
                value={filterValues.startDate}
              />{' '}
            </Col>
            <Col md="6">
              <Form.Control
                name="endDate"
                onChange={this.props.onChange}
                size="sm"
                type="number"
                value={filterValues.endDate || filterValues.startDate}
              />
            </Col>
          </Row>
        )
    }
  }

  render() {
    return (
      <Col md="12">
        <Row>
          <Col md="3">
            <CustomSelect
              options={this.props.field.options}
              onChange={e => this.setState({ config: e.value })}
              size="sm"
              value={this.props.field.options.find(option => option.value === this.state.config)}
            />
          </Col>

          <Col md="9" className="date-field">
            {this.renderDateConfig(this.props.filterValues)}
          </Col>
        </Row>
      </Col>
    )
  }
}

YearFilter.propTypes = {}

export default YearFilter