import React from 'react'
import PropTypes from 'prop-types'

import { Button, Row, Col } from 'react-bootstrap'

import IntegerFieldSet from 'AdvancedSearch/Filter/IntegerFieldSet'

const IntegerFieldGroup = props => {
  return (
    <div className="integer-fieldgroup">
      {props.paramSet.paramMaps.map((paramMap, paramMapIndex) => {
        return (
          <IntegerFieldSet
            key={`integer-fieldset-${paramMapIndex}`}
            paramMap={paramMap}
            paramMapIndex={paramMapIndex}
            options={props.paramSet.filter.options(props.paramSet.filter.optionsList)}
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
