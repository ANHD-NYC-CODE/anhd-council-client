import React from 'react'
import PropTypes from 'prop-types'

import { formatNumber } from 'shared/utilities/languageUtils'

import { constructAdvancedSearchSentence } from 'shared/utilities/sentenceUtils'
import { Button } from 'react-bootstrap'
import { clearAdvancedSearchRequest } from 'Store/AppState/actions'

import ConfigContext from 'Config/ConfigContext'
import ModalContext from 'Modal/ModalContext'

import './style.scss'

const AdvancedSearchSentenceEditor = props => {
  const numberOfUnits = props.results.reduce((total, result) => parseInt(total) + parseInt(result['unitsres'] || 0), 0)
  const searchedFilters = [...props.advancedSearch.conditions[0].filters];

  const getFilterLabel = (filter) => {
    return filter.resourceModel.label
  }

  const getFilterResourceConstant = (filter) => {
    return filter.resourceModel.resourceConstant;
  }

  const getFilterColumnValue = (filter) => {
    if (!props.results.length) return 0;
    const columnKey = Object.keys(props.results[0]).find(column => 
      column.startsWith(filter.resourceModel.urlPath)
    );
    return props.results.reduce((total, result) => parseInt(total) + parseInt(result[columnKey] || 0), 0);
  }

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
      {
        searchedFilters.some(filter => getFilterResourceConstant(filter) === "OCA_HOUSING_COURT") &&
        <div className="advanced-search-sentence-editor__disclaimer-section">
          <ConfigContext.Consumer>
            {config => {
              return (
                <ModalContext.Consumer>
                  {modal => {
                    return (
                      <button
                        className="error-cta text-link"
                        onClick={e => {
                          e.preventDefault()
                          modal.setModal({
                            modalProps: {
                              title: config.infoModals["OCA_DATA_UNAVAILABLE"].title,
                              body: config.infoModals["OCA_DATA_UNAVAILABLE"].body,
                              sources: config.infoModals["OCA_DATA_UNAVAILABLE"].sources,
                              documentationBody: config.infoModals["OCA_DATA_UNAVAILABLE"].documentationBody,
                              documentationSources: config.infoModals["OCA_DATA_UNAVAILABLE"].documentationSources,
                              size: 'lg',
                            },
                          })
                        }}
                        onKeyDown={e =>
                          spaceEnterKeyDownHandler(e, e => {
                            e.preventDefault()
                            modal.setModal({
                              modalProps: {
                                title: config.infoModals["OCA_DATA_UNAVAILABLE"].title,
                                body: config.infoModals["OCA_DATA_UNAVAILABLE"].body,
                                sources: config.infoModals["OCA_DATA_UNAVAILABLE"].sources,
                                documentationBody: config.infoModals["OCA_DATA_UNAVAILABLE"].documentationBody,
                                documentationSources: config.infoModals["OCA_DATA_UNAVAILABLE"].documentationSources,
                                size: 'lg',
                              },
                            })
                          })
                        }
                      >
                        Housing court case data not available for properties with fewer than 11 residential units. See why.
                      </button>
                    )
                  }}
                </ModalContext.Consumer>
              )
            }}
            </ConfigContext.Consumer>
        </div>
      }
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
        {
          searchedFilters.map(filter => 
            <div className="advanced-search-sentence-editor__group"
              key={filter.resourceModel.resourceConstant}>
              <span className="advanced-search-sentence-editor__label">{getFilterLabel(filter)}:</span>{' '}
              <span className="advanced-search-sentence-editor__value">
                {props.loading ? null : formatNumber(getFilterColumnValue(filter))}
              </span>
            </div>
          )
        }
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
