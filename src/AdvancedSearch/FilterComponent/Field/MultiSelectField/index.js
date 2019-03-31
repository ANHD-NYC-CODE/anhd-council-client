import React from 'react'
import PropTypes from 'prop-types'
import StandardizedInput from 'shared/classes/StandardizedInput'
import { InputGroup } from 'react-bootstrap'
import './style.scss'
import CustomSelect from 'shared/components/CustomSelect'
const MultiSelectField = props => {
  return (
    <InputGroup>
      <InputGroup.Prepend>
        <InputGroup.Text>{props.paramMap.paramNoun}</InputGroup.Text>
      </InputGroup.Prepend>
      <CustomSelect
        className={'textmultiselect-field form-control'}
        key={props.key}
        name="value"
        options={props.paramMap.options}
        onChange={e => props.paramMap.update({ dispatchAction: props.dispatchAction, e: new StandardizedInput(e) })}
        isMulti={true}
        size="multi-sm"
        value={[...props.paramMap.value.split(',').map(v => props.paramMap.options.find(option => option.value === v))]}
      />
    </InputGroup>
  )
}

MultiSelectField.propTypes = {
  key: PropTypes.string,
  paramMap: PropTypes.object,
  dispatchAction: PropTypes.func,
}

export default MultiSelectField
