import React from 'react'
import PropTypes from 'prop-types'
import CustomSelect from 'shared/components/Select'
import { Form, Row, Col } from 'react-bootstrap'

class DateField extends React.Component {
  constructor(props) {
    super(props)
    this.startingConfig = 'startDate'
    this.state = {
      config: this.chooseDateConfig(this.props.filterValues),
    }

    this.renderDateConfig = this.renderDateConfig.bind(this)
    this.chooseDateConfig = this.chooseDateConfig.bind(this)
    this.changeDateConfig = this.changeDateConfig.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      config: this.chooseDateConfig(nextProps.filterValues),
    })
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

  changeDateConfig(value) {
    let dateObject
    switch (value) {
      case 'range':
        dateObject = {
          startDate: this.props.filterValues.startDate || this.props.filterValues.endDate,
          endDate: this.props.filterValues.endDate || this.props.filterValues.startDate,
        }
        break
      case 'startDate':
        dateObject = {
          startDate: this.props.filterValues.startDate || this.props.filterValues.endDate,
          endDate: undefined,
        }
        break
      case 'endDate':
        dateObject = {
          startDate: undefined,
          endDate: this.props.filterValues.endDate || this.props.filterValues.startDate,
        }
        break
    }
    this.props.onChange(dateObject)
  }

  renderDateConfig(filterValues) {
    switch (this.state.config) {
      case 'startDate':
        return (
          <Form.Control
            name="startDate"
            onChange={this.props.onChange}
            size="sm"
            type={this.props.type}
            value={filterValues.startDate}
          />
        )
      case 'endDate':
        return (
          <Form.Control
            name="endDate"
            onChange={this.props.onChange}
            type={this.props.type}
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
                type={this.props.type}
                value={filterValues.startDate}
              />{' '}
            </Col>
            <Col md="6">
              <Form.Control
                name="endDate"
                onChange={this.props.onChange}
                size="sm"
                type={this.props.type}
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
              onChange={e => this.changeDateConfig(e.value)}
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

DateField.propTypes = {
  field: PropTypes.object,
  filterValues: PropTypes.object,
  onChange: PropTypes.func,
}

export default DateField
