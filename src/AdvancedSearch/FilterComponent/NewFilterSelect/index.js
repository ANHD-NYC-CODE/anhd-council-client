import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-bootstrap'
import ConfigContext from 'Config/ConfigContext'
import FormError from 'shared/components/FormError'

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
        <div>
          <Form.Control
            as="select"
            className="new-filter-select"
            name="newFilter"
            onChange={e => props.onChange(props.filterIndex, e)}
            value={props.value || -1}
          >
            {datasetOptions(config.datasetModels)}
          </Form.Control>
          <FormError show={!!props.filter.errors.length} message={(props.filter.errors[0] || {}).message} />
        </div>
      )}
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
