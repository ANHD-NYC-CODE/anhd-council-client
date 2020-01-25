import React from 'react'
import PropTypes from 'prop-types'
import { formatNumber } from 'shared/utilities/languageUtils'
import { updateAmountFilter, setHousingTypeResultFilter } from 'Store/DashboardState/actions'
import StandardizedInput from 'shared/classes/StandardizedInput'

import { mapFilterDateToLabel, longAmountComparisonString } from 'shared/utilities/languageUtils'
import AmountFilterInput from 'DistrictDashboard/AmountFilterInput'
import HousingTypeDropdown from 'DistrictDashboard/HousingTypeDropdown'
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

  const handleAmountFilterChange = e => {
    e = new StandardizedInput(e)
    if (e.value || e.value === 0) {
      if (e.value > 999) e.value = 999 // max
      props.amountFilter.value = e.value
      props.dispatch(updateAmountFilter(props.amountFilter))
    }
  }

  const constructDashboardSentence = (
    housingTypeResultFilter,
    selectedFilters = [],
    mapFilterDate,
    filterCondition
  ) => {
    if (!housingTypeResultFilter || !mapFilterDate || !filterCondition) return '...'
    const dateString = mapFilterDateToLabel(mapFilterDate)
    const conditionString = filterCondition.toLowerCase()
    const housingLabel = housingTypeResultFilter.label.toLowerCase()
    const housingOptions = Property().ownResultFilters.map(f => ({ value: f.id, label: f.label }))

    const housingDropdown = (
      <HousingTypeDropdown
        onSubmit={handleHousingTypeFilterChange}
        options={housingOptions}
        value={'ok'}
        label={housingLabel}
      />
    )

    const selectedFilterElements = selectedFilters.map((filter, index) => {
      return (
        <span key={`amount-filter-sentence-${index}`} className="dashboard-results-editor__amount-segment">
          {longAmountComparisonString(filter.comparison)}
          <AmountFilterInput onSubmit={handleAmountFilterChange} value={filter.value} />
          {` ${filter.resourceModel.sentenceNoun}`}
          {selectedFilters.length > 1 && index != selectedFilters.length - 1 && ` ${conditionString} `}
        </span>
      )
    })

    console.log(housingTypeResultFilter, selectedFilters, selectedFilterElements, dateString, conditionString)

    return (
      <span>
        Displaying {housingDropdown} {selectedFilterElements.length ? 'with' : null} {selectedFilterElements}
        {selectedFilters.length ? ` in the ${dateString}.` : '.'}
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
  mapFilterDate: PropTypes.object,
  filterCondition: PropTypes.string,
}
DashboardResultsEditor.defaultProps = {
  filteredResults: [],
}

export default DashboardResultsEditor
