import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-bootstrap'
import ConfigContext from 'Config/ConfigContext'
import FormError from 'shared/components/FormError'
const datasetOptions = advancedSearchFilters => {
  return [
    <option disabled key={'new-filter-option-disabled'} value={-1}>
      New Filter
    </option>,
    advancedSearchFilters
      .map((filter, index) => {
        return (
          <option key={`new-filter-option-${index}`} value={filter.resourceModel.resourceConstant}>
            {filter.resourceModel.label}
          </option>
        )
      })
      .filter(o => o),
  ]
}

const NewFilterSelect = props => {
  return (
    <ConfigContext.Consumer>
      {config => {
        return (
          <div className="w-100">
            <Form.Control
              as="select"
              className="new-filter-select valued"
              name="newFilter"
              size=""
              onChange={e => props.onChange(props.filterIndex, e)}
              value={props.value || -1}
            >
              {datasetOptions(config.advancedSearchFilters)}
            </Form.Control>
            <FormError show={!!props.filter.errors.length} message={(props.filter.errors[0] || {}).message} />
          </div>
        )
      }}
    </ConfigContext.Consumer>
  )
}

NewFilterSelect.propTypes = {
  filter: PropTypes.object,
  filterIndex: PropTypes.number,
  onChange: PropTypes.func,
  value: PropTypes.string,
}

export default NewFilterSelect
