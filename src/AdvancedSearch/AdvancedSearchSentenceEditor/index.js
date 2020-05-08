import React from 'react'
import PropTypes from 'prop-types'

import * as c from 'shared/constants'
import { formatNumber } from 'shared/utilities/languageUtils'

import StandardizedInput from 'shared/classes/StandardizedInput'

import { mapFilterDateToLabel, longAmountComparisonString } from 'shared/utilities/languageUtils'

import { constructAdvancedSearchSentence } from 'shared/utilities/sentenceUtils'
import { Button } from 'react-bootstrap'
import { clearAdvancedSearchRequest } from 'Store/AppState/actions'

import Property from 'shared/models/resources/Property'

import './style.scss'

const AdvancedSearchSentenceEditor = props => {
  const numberOfUnits = props.results.reduce((total, result) => parseInt(total) + parseInt(result['unitsres']), 0)

  const constructSentenceEditor = () => {
    return constructAdvancedSearchSentence(props.advancedSearch, props.loading)
  }

  return (
    <div className="advanced-search-sentence-editor">
      <div className="advanced-search-sentence-editor__sentence-section">
        {constructSentenceEditor(
          props.housingTypeResultFilter,
          props.selectedFilters,
          props.mapFilterDate,
          props.filterCondition
        )}
      </div>
      <div className="advanced-search-sentence-editor__inner-wrapper">
        <div className="advanced-search-sentence-editor__group">
          <span className="advanced-search-sentence-editor__label">Properties:</span>{' '}
          <span className="advanced-search-sentence-editor__value">
            {props.loading ? null : formatNumber(props.results.length)}
          </span>
        </div>
        <div className="advanced-search-sentence-editor__group">
          <span className="advanced-search-sentence-editor__label">Units:</span>{' '}
          <span className="advanced-search-sentence-editor__value">
            {props.loading ? null : formatNumber(numberOfUnits)}
          </span>
        </div>
        <span className="advanced-search-sentence-editor__buttons">
          {(props.requestCalledAndNotLoading || props.loadingButDisplayingResults) && (
            <Button className="advanced-search__toggle-button" variant="dark" size="sm" onClick={props.toggleForm}>
              {props.displayingForm ? 'View Results' : 'Edit Custom Search'}
            </Button>
          )}
          {props.loadingButDisplayingForm && (
            <Button
              className="advanced-search__toggle-button"
              onClick={() => props.dispatch(clearAdvancedSearchRequest())}
              variant="danger"
              size="sm"
            >
              Cancel
            </Button>
          )}
        </span>
      </div>
    </div>
  )
}

AdvancedSearchSentenceEditor.propTypes = {
  advancedSearch: PropTypes.object,
  dispatch: PropTypes.func,
  results: PropTypes.array,
  loading: PropTypes.bool,
  requestCalledAndNotLoading: PropTypes.bool,
  loadingButDisplayingResults: PropTypes.bool,
  loadingButDisplayingForm: PropTypes.bool,
  displayingForm: PropTypes.bool,
  toggleForm: PropTypes.func,
}
AdvancedSearchSentenceEditor.defaultProps = {
  results: [],
  loading: false,
}

export default AdvancedSearchSentenceEditor
