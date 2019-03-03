import React from 'react'
import PropTypes from 'prop-types'
import * as ht from 'shared/constants/housingTypes'

import CustomSelect from 'shared/components/Select'
import { Form, Col, Button } from 'react-bootstrap'

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
        props.housingTypes.map((housingType, housingTypeIndex) => {
          return (
            <Form.Row className="housing-type" key={`${housingType.name}-${housingTypeIndex}`}>
              <Col sm={6} md={4}>
                <Form.Label>Housing Type</Form.Label>
                <CustomSelect
                  onChange={e => props.changeHousingType(housingTypeIndex, housingType, e)}
                  options={Object.keys(ht).map(key => ({
                    value: { key: 'object', value: ht[key].constant },
                    label: ht[key].name,
                  }))}
                  size="sm"
                  value={{ value: housingType.constant, label: housingType.name.toLowerCase() }}
                />
              </Col>

              {!!Object.keys(housingType.paramsObject).length &&
                Object.keys(housingType.paramsObject).map((paramKey, paramIndex) => {
                  return (
                    <Col key={`${housingType.name}-filter-${paramIndex}`} sm={6} md={4}>
                      <Form.Label>{housingType.paramsObject[paramKey].filter.label}</Form.Label>
                      <Form.Label>
                        <Button variant="danger" onClick={() => props.removeParamsObject(housingTypeIndex, paramKey)}>
                          {' '}
                          -{' '}
                        </Button>
                      </Form.Label>
                      {housingType.paramsObject[paramKey].filter.component({
                        paramMapping: housingType.paramsObject[paramKey],
                        index: paramIndex,
                        options: housingType.paramsObject[paramKey].filter.comparisonOptions(),
                        onChange: e => props.changeHousingTypeParam(housingTypeIndex, paramKey, e),
                      })}
                    </Col>
                  )
                })}
              {Object.keys(housingType.paramsMappingSchema).map((paramsMappingKey, index) => {
                return (
                  !housingType.paramsObject[paramsMappingKey] && (
                    <Col key={`${housingType.name}-add-param-${paramsMappingKey}-${index}`} sm={6} md={4}>
                      <Button onClick={() => props.addHousingTypeParamMapping(housingTypeIndex, paramsMappingKey)}>
                        {housingType.paramsMappingSchema[paramsMappingKey].filter.newButtonLabel}
                      </Button>
                    </Col>
                  )
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
  addHousingTypeParamMapping: PropTypes.func,
}

export default HousingTypeQuery
