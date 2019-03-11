import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-bootstrap'
import * as d from 'shared/models/datasets'

const datasetOptions = [
  <option disabled key={'new-filter-option-disabled'} value={-1}>
    New Filter
  </option>,
  ...Object.entries(d).map((ds, index) => {
    return (
      <option key={`new-filter-option-${index}`} value={ds[1].id}>
        {ds[1].languageModule ? ds[1].languageModule.noun : ds[1].id}
      </option>
    )
  }),
]

const NewFilterSelect = props => {
  return (
    <Form.Control
      as="select"
      className="new-filter-select"
      onChange={e => props.onChange(props.filterIndex, e)}
      value={-1}
    >
      {datasetOptions}
    </Form.Control>
  )
}

NewFilterSelect.propTypes = {
  filterIndex: PropTypes.number,
  onChange: PropTypes.func,
}

export default NewFilterSelect
