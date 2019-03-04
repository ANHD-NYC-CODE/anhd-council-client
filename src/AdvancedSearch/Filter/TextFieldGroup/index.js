import React from 'react'
import PropTypes from 'prop-types'

import { Button } from 'react-bootstrap'

import TextFieldSet from 'AdvancedSearch/Filter/TextFieldSet'

const IntegerFieldGroup = props => {
  return (
    <div className="integer-fieldgroup">
      {props.paramSet.paramMaps.map((paramMap, paramMapIndex) => {
        return (
          <TextFieldSet
            key={`integer-fieldset-${paramMapIndex}`}
            paramMap={paramMap}
            paramMapIndex={paramMapIndex}
            options={props.paramSet.setComponent.options}
            onChangeParamMap={props.onChangeParamMap}
          />
        )
      })}
      {!!props.paramSet.paramMaps.length && (
        <Button variant="danger" onClick={() => props.clearParamSetMaps(props.paramSet)}>
          -
        </Button>
      )}
    </div>
  )
}

IntegerFieldGroup.propTypes = {
  addHousingTypeParamMapping: PropTypes.func,
  dispatchParameterAction: PropTypes.func,
  onChangeParamMap: PropTypes.func,
  paramSet: PropTypes.object,
  paramSetIndex: PropTypes.number,
  removeParamsMap: PropTypes.object,
}

export default IntegerFieldGroup
