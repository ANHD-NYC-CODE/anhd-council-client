import React from 'react'
import PropTypes from 'prop-types'
import * as ht from 'shared/constants/housingTypes'

import CustomSelect from 'shared/components/Select'
import { Form, Col } from 'react-bootstrap'

const HousingTypeQuery = props => {
  return (
    <div className="housing-type-query">
      {!props.housingTypes.length && (
        <Form.Row className="housing-type">
          <Col sm={6} md={4}>
            <Form.Label>Housing Type</Form.Label>
            <CustomSelect
              onChange={props.addHousingType}
              options={Object.keys(ht).map(key => ({ value: ht[key].constant, label: ht[key].name }))}
              placeholder="Pick a housing type..."
              size="sm"
            />
          </Col>
        </Form.Row>
      )}
      {!!props.housingTypes.length &&
        props.housingTypes.map((housingType, index) => {
          return (
            <Form.Row className="housing-type" key={housingType.name}>
              <Col sm={6} md={4}>
                <Form.Label>Housing Type</Form.Label>
                <CustomSelect
                  onChange={e => props.changeHousingType(index, housingType, e)}
                  options={Object.keys(ht).map(key => ({
                    value: { type: 'object', value: ht[key].constant },
                    label: ht[key].name,
                  }))}
                  size="sm"
                  value={{ value: housingType.constant, label: housingType.name.toLowerCase() }}
                />
              </Col>

              {!!housingType.filters.length &&
                housingType.filters.map((filter, index) => {
                  return (
                    <Col key={`${housingType.name}-filter-${index}`} sm={6} md={4}>
                      <Form.Label>{filter.label}</Form.Label>
                      {filter.component({
                        filter: filter,
                        index: index,
                        options: filter.comparisonOptions(filter.queryParam, 'params'),
                        onChange: props.changeHousingType,
                        parentObject: housingType,
                      })}
                    </Col>
                  )
                })}
            </Form.Row>
          )
        })}
    </div>
  )
}

HousingTypeQuery.propTypes = {
  housingTypes: PropTypes.array,
  addHousingType: PropTypes.func,
  changeHousingType: PropTypes.func,
}

export default HousingTypeQuery
