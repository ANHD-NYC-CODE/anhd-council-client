import React from 'react'
import PropTypes from 'prop-types'

import { Form, Col } from 'react-bootstrap'
import HousingTypeParamField from 'AdvancedSearch/HousingTypeQuery/HousingTypeParamField'

const HousingTypeParamSet = props => {
  return props.paramSet.paramMaps.map((paramMap, paramMapIndex) => {
    return (
      <Col key={`housingtype-paramfield-${paramMapIndex}`}>
        <Form.Label>{props.paramSet.filter.label}</Form.Label>

        <HousingTypeParamField
          dispatchParameterAction={props.dispatchParameterAction}
          paramMap={paramMap}
          paramSet={props.paramSet}
          paramSetIndex={props.paramSetIndex}
          paramMapIndex={paramMapIndex}
        />
      </Col>
    )
  })
}

HousingTypeParamSet.propTypes = {
  dispatchParameterAction: PropTypes.func,
  paramSetIndex: PropTypes.number,
  paramSet: PropTypes.object,
}

export default HousingTypeParamSet
