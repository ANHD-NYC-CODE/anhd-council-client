import React from 'react'
import PropTypes from 'prop-types'
import * as ht from 'shared/constants/housingTypes'

import CustomSelect from 'shared/components/CustomSelect'
import { Form, Col } from 'react-bootstrap'
import HousingTypeSelection from 'AdvancedSearch/HousingTypeQuery/HousingTypeSelection'

export const HousingTypeQuery = props => {
  return (
    <Form className="housing-type-query">
      <Form.Row className="housing-type">
        <Col>
          <Form.Label>Housing Type</Form.Label>
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
            <CustomSelect
              isSearchable={false}
              onChange={props.addHousingType}
              options={Object.keys(ht).map(key => ({ value: ht[key].constant, label: ht[key].name }))}
              placeholder="Pick a housing type..."
              size="sm"
            />
          )}
        </Col>
      </Form.Row>
    </Form>
  )
}

HousingTypeQuery.propTypes = {
  housingTypes: PropTypes.array,
  addHousingType: PropTypes.func,
  dispatch: PropTypes.func,
}

export default HousingTypeQuery
