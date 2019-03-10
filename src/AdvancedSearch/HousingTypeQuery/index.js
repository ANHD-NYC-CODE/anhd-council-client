import React from 'react'
import PropTypes from 'prop-types'

import { Form, Col, Row } from 'react-bootstrap'
import HousingTypeSelection from 'AdvancedSearch/HousingTypeQuery/HousingTypeSelection'
import HousingTypeSelect from 'AdvancedSearch/HousingTypeQuery/HousingTypeSelect'

export const HousingTypeQuery = props => {
  return props.housingTypes.length ? (
    props.housingTypes.map((housingType, housingTypeIndex) => (
      <HousingTypeSelection
        changeHousingType={props.changeHousingType}
        dispatch={props.dispatch}
        housingType={housingType}
        housingTypeIndex={housingTypeIndex}
        key={`housingtype-selection-${housingTypeIndex}`}
      />
    ))
  ) : (
    <Form>
      <Form.Group as={Row} className="housing-type">
        <Col xs={6}>
          <HousingTypeSelect onChange={props.addHousingType} />
        </Col>
      </Form.Group>
    </Form>
  )
}

HousingTypeQuery.propTypes = {
  housingTypes: PropTypes.array,
  addHousingType: PropTypes.func,
  dispatch: PropTypes.func,
}

export default HousingTypeQuery
