import React from 'react'
import PropTypes from 'prop-types'

import ConfigContext from 'Config/ConfigContext'

import { Form } from 'react-bootstrap'

import './style.scss'

const HousingTypeSection = props => {
  const handleChange = (config, index) => {
    const propertyResource = Object.values(config.resourceModels).find(model => model.resourceConstant === 'PROPERTY')
    const filter = propertyResource.ownResultFilters[index]

    props.switchSelectedFilter(filter, index)
  }

  return (
    <ConfigContext.Consumer>
      {config => {
        const propertyResource = Object.values(config.resourceModels).find(
          model => model.resourceConstant === 'PROPERTY'
        )

        return (
          <Form className="housingtype-section">
            <Form.Group controlId="housing-type-select">
              <Form.Label className="housingtype-section__label">Housing Type:</Form.Label>
              <Form.Control
                disabled={props.customView || props.loading}
                className="housing-type-section__wrapper valued"
                as="select"
                size="sm"
                onChange={e => handleChange(config, parseInt(e.currentTarget.value))}
              >
                {propertyResource.ownResultFilters.map((ownResultFilter, index) => {
                  return (
                    <option key={`housingtype-wrapper-${index}`} value={index}>
                      {ownResultFilter.label}
                    </option>
                  )
                })}
              </Form.Control>
            </Form.Group>
          </Form>
        )
      }}
    </ConfigContext.Consumer>
  )
}

HousingTypeSection.propTypes = {
  customView: PropTypes.bool,
  loading: PropTypes.bool,
  propertySummaryRequest: PropTypes.object,
  propertyResource: PropTypes.object,
  housingTypeResultFilter: PropTypes.object,
  switchSelectedFilter: PropTypes.func,
}

HousingTypeSection.defaultProps = {
  customView: false,
  loading: false,
}

export default HousingTypeSection
