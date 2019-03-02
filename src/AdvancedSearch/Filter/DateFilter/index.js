import React from 'react'
import PropTypes from 'prop-types'
import ConfigContext from 'Config/ConfigContext'

import { Form, Row, Col } from 'react-bootstrap'
import CustomSelect from 'shared/components/Select'

class DateField extends React.Component {
  constructor(props) {
    super(props)
    this.startingConfig = 'startDate'
    this.state = {
      config: this.chooseDateConfig(this.props.filter),
    }

    this.renderDateConfig = this.renderDateConfig.bind(this)
    this.chooseDateConfig = this.chooseDateConfig.bind(this)
    this.changeDateConfig = this.changeDateConfig.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      config: this.chooseDateConfig(nextProps.filter),
    })
  }

  chooseDateConfig(filter) {
    if (filter.startDate && filter.endDate) {
      return 'range'
    } else if (filter.startDate) {
      return 'startDate'
    } else if (filter.endDate) {
      return 'endDate'
    }
  }

  changeDateConfig(value) {
    let dateObject
    switch (value) {
      case 'range':
        dateObject = {
          startDate: this.props.filter.startDate || this.props.filter.endDate,
          endDate: this.props.filter.endDate || this.props.filter.startDate,
        }
        break
      case 'startDate':
        dateObject = {
          startDate: this.props.filter.startDate || this.props.filter.endDate,
          endDate: undefined,
        }
        break
      case 'endDate':
        dateObject = {
          startDate: undefined,
          endDate: this.props.filter.endDate || this.props.filter.startDate,
        }
        break
    }
    this.props.onChange(dateObject)
  }

  renderDateConfig(appConfig, dataset, filter) {
    const datasetConfig = appConfig.find(d => d.model_name.toLowerCase() === dataset.model.toLowerCase())
    switch (this.state.config) {
      case 'startDate':
        return (
          <Form.Control
            max={dataset.getMaxDate(datasetConfig)}
            name="startDate"
            onChange={this.props.onChange}
            size="sm"
            type={this.props.type}
            value={filter.startDate}
          />
        )
      case 'endDate':
        return (
          <Form.Control
            max={dataset.getMaxDate(datasetConfig)}
            name="endDate"
            onChange={this.props.onChange}
            type={this.props.type}
            size="sm"
            value={filter.endDate}
          />
        )
      default:
        return (
          <Row>
            <Col md="6">
              <Form.Control
                max={dataset.getMaxDate(datasetConfig)}
                name="startDate"
                onChange={this.props.onChange}
                size="sm"
                type={this.props.type}
                value={filter.startDate}
              />{' '}
            </Col>
            <Col md="6">
              <Form.Control
                max={dataset.getMaxDate(datasetConfig)}
                name="endDate"
                onChange={this.props.onChange}
                size="sm"
                type={this.props.type}
                value={filter.endDate || filter.startDate}
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
          <ConfigContext.Consumer>
            {config => (
              <Col md="9" className="date-field">
                {this.renderDateConfig(config.datasets, this.props.dataset, this.props.filter)}
              </Col>
            )}
          </ConfigContext.Consumer>
        </Row>
      </Col>
    )
  }
}

DateField.propTypes = {
  dataset: PropTypes.object,
  field: PropTypes.object,
  filter: PropTypes.object,
  onChange: PropTypes.func,
}

export default DateField
