import React from 'react'
import PropTypes from 'prop-types'

import ConfigContext from 'Config/ConfigContext'

import { Form } from 'react-bootstrap'
import InfoModalButton from 'shared/components/InfoModalButton'

import './style.scss'

const HousingTypeSection = props => {
  const handleChange = (config, index) => {
    const propertyResource = Object.values(config.resourceModels).find(model => model.resourceConstant === 'PROPERTY')
    const filter = propertyResource.ownResultFilters[index]

    props.switchSelectedFilter(filter, index)
  }

  const getLabel = (label, index) => {
    // don't return first (all residential)
    if (!index || props.housingTypeResults[index] == undefined || !props.totalPropertyResults.length) return label
    return `${label} (${((props.housingTypeResults[index].length / props.totalPropertyResults.length) * 100).toFixed(
      1
    )}%)`
  }

  return (
    <ConfigContext.Consumer>
      {config => {
        const propertyResource = Object.values(config.resourceModels).find(
          model => model.resourceConstant === 'PROPERTY'
        )

        return (
          <Form className="housingtype-section" data-test-id="housingtype-section">
            <Form.Group controlId="housing-type-select">
              <Form.Label className="housingtype-section__label">Housing Type:</Form.Label>
              {propertyResource.ownResultFilters.map((ownResultFilter, index) => {
                return (
                  <span key={`housingtype-wrapper-${index}`} className="housingtype-section__section">
                    <Form.Check
                      custom
                      className="housingtype-section__check"
                      id={`${ownResultFilter.label}--${index}`}
                      data-test-id="housing-type-radio"
                      label={getLabel(ownResultFilter.label, index)}
                      type="radio"
                      variant="outline-primary"
                      checked={props.housingTypeResultFilter.id === ownResultFilter.id}
                      disabled={props.loading}
                      value={index}
                      onChange={e => handleChange(config, parseInt(index))}
                    />
                    {!!index && <InfoModalButton modalConstant={ownResultFilter.id} />}
                  </span>
                )
              })}
            </Form.Group>
          </Form>
        )
      }}
    </ConfigContext.Consumer>
  )
}

HousingTypeSection.propTypes = {
  loading: PropTypes.bool,
  propertySummaryRequest: PropTypes.object,
  propertyResource: PropTypes.object,
  housingTypeResultFilter: PropTypes.object,
  switchSelectedFilter: PropTypes.func,
  totalPropertyResults: PropTypes.array,
}

HousingTypeSection.defaultProps = {
  loading: false,
  totalPropertyResults: [],
  housingTypeResultFilter: {},
}

export default HousingTypeSection
