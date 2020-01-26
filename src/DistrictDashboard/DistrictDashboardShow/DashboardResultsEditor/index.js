import React from 'react'
import PropTypes from 'prop-types'

import * as c from 'shared/constants'
import { formatNumber } from 'shared/utilities/languageUtils'
import {
  setDashboardFilterCondition,
  setMapFilterDate,
  updateAmountFilter,
  setHousingTypeResultFilter,
} from 'Store/DashboardState/actions'
import StandardizedInput from 'shared/classes/StandardizedInput'

import { mapFilterDateToLabel, longAmountComparisonString } from 'shared/utilities/languageUtils'
import AmountFilterInput from 'DistrictDashboard/AmountFilterInput'

import SentenceDropdown from 'shared/components/SentenceDropdown'
import Property from 'shared/models/resources/Property'

import './style.scss'

const DashboardResultsEditor = props => {
  const numberOfUnits = props.filteredResults.reduce(
    (total, result) => parseInt(total) + parseInt(result['unitsres']),
    0
  )

  const handleHousingTypeFilterChange = id => {
    const filter = Property().ownResultFilters.find(f => f.id === id)

    props.dispatch(setHousingTypeResultFilter(filter))
  }

  const handleAmountFilterChange = (e, amountFilter) => {
    e = new StandardizedInput(e)
    if (e.value || e.value === 0) {
      if (e.value > 999) e.value = 999 // max
      amountFilter.value = e.value
      props.dispatch(updateAmountFilter(amountFilter))
    }
  }

  const handleDateChange = value => {
    props.dispatch(setMapFilterDate(value))
  }

  const handleConditionChange = value => {
    props.dispatch(setDashboardFilterCondition(value))
  }

  const constructDashboardSentence = (
    housingTypeResultFilter,
    selectedFilters = [],
    mapFilterDate,
    filterCondition
  ) => {
    if (!housingTypeResultFilter || !mapFilterDate || !filterCondition) return '...'
    const housingLabel = housingTypeResultFilter.label.toLowerCase()
    const housingOptions = Property().ownResultFilters.map(f => ({ value: f.id, label: f.label }))
    const dateString = mapFilterDateToLabel(mapFilterDate)
    const dateOptions = [c.DISTRICT_REQUEST_DATE_ONE, c.DISTRICT_REQUEST_DATE_TWO, c.DISTRICT_REQUEST_DATE_THREE].map(
      d => ({ value: d, label: mapFilterDateToLabel(d) })
    )
    const conditionString = filterCondition

    const housingDropdown = (
      <SentenceDropdown
        onSubmit={handleHousingTypeFilterChange}
        options={housingOptions}
        label={
          housingLabel.includes('housing') || housingLabel.includes('homes')
            ? housingLabel
            : `${housingLabel} properties`
        }
      />
    )

    const dateDropdown = <SentenceDropdown label={dateString} options={dateOptions} onSubmit={handleDateChange} />

    const selectedFilterElements = selectedFilters.map((filter, index) => {
      return (
        <span key={`amount-filter-sentence-${index}`} className="dashboard-results-editor__amount-segment">
          {longAmountComparisonString(filter.comparison)}
          <AmountFilterInput onSubmit={e => handleAmountFilterChange(e, filter)} value={filter.value} />
          {` ${filter.resourceModel.sentenceNoun} `}
          {selectedFilters.length > 1 && index != selectedFilters.length - 1 && (
            <span>
              <SentenceDropdown
                onSubmit={handleConditionChange}
                label={conditionString}
                options={[{ value: 'AND', label: 'AND' }, { value: 'OR', label: 'OR' }]}
              />
              &nbsp;
            </span>
          )}
        </span>
      )
    })
    return (
      <span>
        Displaying {housingDropdown} {selectedFilterElements.length ? 'with' : null} {selectedFilterElements}
        {selectedFilters.length ? ' in the ' : null} {selectedFilters.length ? dateDropdown : null}
      </span>
    )
  }

  return (
    <div className="dashboard-results-editor">
      <div className="dashboard-results-editor__sentence-section">
        {constructDashboardSentence(
          props.housingTypeResultFilter,
          props.selectedFilters,
          props.mapFilterDate,
          props.filterCondition
        )}
      </div>
      <div className="dashboard-results-editor__inner-wrapper">
        <div className="dashboard-results-editor__group">
          <span className="dashboard-results-editor__label">Properties:</span>{' '}
          <span className="dashboard-results-editor__value">{formatNumber(props.filteredResults.length)}</span>
        </div>
        <div className="dashboard-results-editor__group">
          <span className="dashboard-results-editor__label">Units:</span>{' '}
          <span className="dashboard-results-editor__value">{formatNumber(numberOfUnits)}</span>
        </div>
      </div>
    </div>
  )
}

DashboardResultsEditor.propTypes = {
  dispatch: PropTypes.func,
  filteredResults: PropTypes.array,
  housingTypeResultFilter: PropTypes.object,
  selectedFilters: PropTypes.array,
  mapFilterDate: PropTypes.string,
  filterCondition: PropTypes.string,
}
DashboardResultsEditor.defaultProps = {
  filteredResults: [],
}

export default DashboardResultsEditor
