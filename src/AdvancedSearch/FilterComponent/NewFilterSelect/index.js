import React from 'react'
import PropTypes from 'prop-types'
import { Button, Form } from 'react-bootstrap'
import ConfigContext from 'Config/ConfigContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

import FormError from 'shared/components/FormError'
import './style.scss'
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
          <div className="new-filter-select">
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
            {props.removeNewFilters && (
              <Button className="remove-add-filter" size="sm" variant="link" onClick={props.removeNewFilters}>
                <FontAwesomeIcon icon={faTimes} /> Cancel
              </Button>
            )}
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
