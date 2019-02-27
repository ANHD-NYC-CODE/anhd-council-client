import React from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'
import { Form } from 'react-bootstrap'

class DateField extends React.Component {
  constructor(props) {
    super(props)
    this.startingConfig = 'startDate'
    this.state = {
      config: this.startingConfig,
    }

    this.renderDateConfig = this.renderDateConfig.bind(this)
  }

  renderDateConfig(filterValues) {
    switch (this.state.config) {
      case 'startDate':
        return (
          <Form.Control name="startDate" onChange={this.props.onChange} type="date" value={filterValues.startDate} />
        )
      case 'endDate':
        return <Form.Control name="endDate" onChange={this.props.onChange} type="date" value={filterValues.endDate} />
      default:
        return (
          <div>
            <Form.Control name="startDate" onChange={this.props.onChange} type="date" value={filterValues.startDate} />{' '}
            to <Form.Control name="endDate" onChange={this.props.onChange} type="date" value={filterValues.endDate} />
          </div>
        )
    }
  }

  render() {
    const chooseDateConfig = filterValues => {
      if (filterValues.startDate && filterValues.endDate) {
        return 'range'
      } else if (filterValues.startDate) {
        return 'startDate'
      } else if (filterValues.endDate) {
        return 'endDate'
      }
    }
    return (
      <div className="date-field">
        <Select
          options={this.props.field.options}
          onChange={e => this.setState({ config: e.value })}
          value={this.props.field.options.find(option => option.value === chooseDateConfig(this.props.filterValues))}
        />
        {this.renderDateConfig(this.props.filterValues)}
      </div>
    )
  }
}

DateField.propTypes = {
  field: PropTypes.object,
  filterValues: PropTypes.object,
  onChange: PropTypes.func,
}

export default DateField
