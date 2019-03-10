import React from 'react'
import PropTypes from 'prop-types'
import * as ht from 'shared/constants/housingTypes'

import { Form, Col } from 'react-bootstrap'
import HousingTypeSelection from 'AdvancedSearch/HousingTypeQuery/HousingTypeSelection'

export const HousingTypeQuery = props => {
  return (
    <div className="housing-type-query">
      {props.housingTypes.length ? (
        props.housingTypes.map((housingType, housingTypeIndex) => (
          <HousingTypeSelection
            dispatch={props.dispatch}
            housingType={housingType}
            housingTypeIndex={housingTypeIndex}
            key={`housingtype-selection-${housingTypeIndex}`}
          />
        ))
      ) : (
        <Form className="housing-type-query">
          <Form.Row className="housing-type">
            <Col xs={6}>
              <Form.Control
                as="select"
                name="comparison"
                onChange={props.addHousingType}
                placeholder="Search housing type"
                size="sm"
                value={'ALL_TYPES'}
              >
                {Object.keys(ht).map((key, index) => {
                  return (
                    <option key={`housingtype-option-${index}`} value={ht[key].constant}>
                      {ht[key].name}
                    </option>
                  )
                })}
              </Form.Control>
            </Col>
          </Form.Row>
        </Form>
      )}
    </div>
  )
}

HousingTypeQuery.propTypes = {
  housingTypes: PropTypes.array,
  addHousingType: PropTypes.func,
  dispatch: PropTypes.func,
}

export default HousingTypeQuery
