import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-bootstrap'
import ConfigContext from 'Config/ConfigContext'

const datasetOptions = datasetModels => {
  return [
    <option disabled key={'new-filter-option-disabled'} value={-1}>
      New Filter
    </option>,
    datasetModels.map((ds, index) => {
      return (
        <option key={`new-filter-option-${index}`} value={ds.id}>
          {ds.languageModule ? ds.languageModule.noun : ds.id}
        </option>
      )
    }),
  ]
}

const NewFilterSelect = props => {
  return (
    <ConfigContext.Consumer>
      {config => (
        <Form.Control
          as="select"
          className="new-filter-select"
          onChange={e => props.onChange(props.filterIndex, e)}
          value={props.value || -1}
        >
          {datasetOptions(config.datasetModels)}
        </Form.Control>
      )}
    </ConfigContext.Consumer>
  )
}

NewFilterSelect.propTypes = {
  filterIndex: PropTypes.number,
  onChange: PropTypes.func,
  value: PropTypes.string,
}

export default NewFilterSelect
