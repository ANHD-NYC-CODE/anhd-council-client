import React from 'react'
import PropTypes from 'prop-types'
import * as ht from 'shared/constants/housingTypes'

import CustomSelect from 'shared/components/CustomSelect'
import { Form, Col, Button } from 'react-bootstrap'

const HousingTypeQuery = props => {
  return (
    <div className="housing-type-query">
      {!props.housingTypes.length && (
        <Form.Row className="housing-type">
          <Col sm={6} md={4}>
            <Form.Label>Housing Type</Form.Label>
            <CustomSelect
              isSearchable={false}
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
                  isSearchable={false}
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
                Object.keys(housingType.paramsObject).map((paramsSetKey, paramSetIndex) =>
                  housingType.paramsObject[paramsSetKey].paramMaps.map((paramMap, paramMapIndex) => {
                    return (
                      <Col key={`${housingType.name}-filter-${paramSetIndex}-${paramMapIndex}`} sm={6} md={4}>
                        <Form.Label>{housingType.paramsObject[paramsSetKey].filter.label}</Form.Label>
                        <Form.Label>
                          <Button
                            variant="danger"
                            onClick={() => props.removeParamsObject(housingTypeIndex, paramsSetKey, paramMapIndex)}
                          >
                            {' '}
                            -{' '}
                          </Button>
                        </Form.Label>
                        {housingType.paramsObject[paramsSetKey].filter.component({
                          paramMapping: paramMap,
                          index: paramSetIndex,
                          options: housingType.paramsObject[paramsSetKey].filter.options(
                            housingType.paramsObject[paramsSetKey].filter.optionValues
                          ),
                          onChange: e => props.changeHousingTypeParam(housingTypeIndex, paramsSetKey, paramMapIndex, e),
                        })}
                      </Col>
                    )
                  })
                )}
              {Object.keys(housingType.paramsMappingSchema).map((schemaKey, index) => {
                return (
                  housingType.paramsObject[schemaKey].paramMaps.length <
                    housingType.paramsMappingSchema[schemaKey].maxMaps && (
                    <Col key={`${housingType.name}-add-param-${schemaKey}-${index}`} sm={6} md={4}>
                      <Button onClick={() => props.addHousingTypeParamMapping(housingTypeIndex, schemaKey, 0)}>
                        {housingType.paramsMappingSchema[schemaKey].filter.newButtonLabel}
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
