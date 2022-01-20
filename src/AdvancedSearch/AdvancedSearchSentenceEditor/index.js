import React from 'react'
import PropTypes from 'prop-types'

import { formatNumber } from 'shared/utilities/languageUtils'

import { constructAdvancedSearchSentence } from 'shared/utilities/sentenceUtils'
import { getCustomSearchPath } from 'shared/utilities/routeUtils'
import { Button } from 'react-bootstrap'
import { clearAdvancedSearchRequest } from 'Store/AppState/actions'
import { requestWithAuth } from 'shared/utilities/authUtils'
import { 
  getUserSavedCustomSearches, 
  deleteUserCustomSearch 
} from 'Store/MyDashboard/actions'

import ConfigContext from 'Config/ConfigContext'
import ModalContext from 'Modal/ModalContext'
import SaveSearchButton from 'shared/components/buttons/SaveSearchButton'
import SaveOrEditCustomSearch from 'shared/components/modals/SaveCustomSearchModal'
import './style.scss'

const AdvancedSearchSentenceEditor = props => {
  const numberOfUnits = props.results.reduce((total, result) => parseInt(total) + parseInt(result['unitsres'] || 0), 0)
  const searchedFilters = [...props.advancedSearch.conditions[0].filters];

  const loggedIn = !!props.user;
  const thisUrl = getCustomSearchPath(
    props.advancedSearch, 
    props.geographyType, 
    props.geographyId
  );
  const isSaved = !!props.savedSearches[thisUrl];

  const getFilterLabel = (filter) => {
    return filter.resourceModel.label
  }

  const getFilterResourceConstant = (filter) => {
    return filter.resourceModel.resourceConstant;
  }

  let filtersHash = {};
  searchedFilters.forEach(v => filtersHash[getFilterLabel(v)] = v);
  const uniqueSearchedFilters = Object.values(filtersHash);

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

  const constructSavedSearchName = () => {
    return constructSentenceEditor().substring(11);
  }

  const onSaveSearch = (e, modal) => {
    if (!isSaved) {
      e.preventDefault()
      modal.setModal({
        modalComponent: SaveOrEditCustomSearch,
        modalProps: {
          editing: false,
          queryName: constructSavedSearchName(),
          url: thisUrl
        }
      })
    }
    else {
      const areYouSure = confirm("Are you sure you want to delete this bookmark?");
      if (!areYouSure) return;

      props.dispatch(requestWithAuth(
        deleteUserCustomSearch(
          props.savedSearches[thisUrl].id
        )
      )).then(() => {
        props.dispatch(requestWithAuth(getUserSavedCustomSearches()));
      });
    }    
  }

  const openOCAModal = (e, modal, config) => {
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
        <ModalContext.Consumer>
        {modal => {
          return loggedIn && (
            <div className="advanced-search-sentence-editor__search">
              <SaveSearchButton 
                active={isSaved} 
                activeText = "You have saved this search"
                text="Save this search" 
                onSave={e => onSaveSearch(e, modal)}
              />
            </div>
          )
        }}
        </ModalContext.Consumer>
      </div>
      {
        uniqueSearchedFilters.some(filter => getFilterResourceConstant(filter) === "OCA_HOUSING_COURT") &&
        <div className="advanced-search-sentence-editor__disclaimer-section">
          <ConfigContext.Consumer>
            {config => {
              return (
                <ModalContext.Consumer>
                  {modal => {
                    return (
                      <button
                        className="error-cta text-link"
                        onClick={e => openOCAModal(e, modal, config)}
                        onKeyDown={e => openOCAModal(e, modal, config)}
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
          uniqueSearchedFilters.map(filter => 
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
          {(props.requestCalledAndNotLoading || props.loadingButDisplayingResults) && (props.displayingForm) && (
            <a type="button" class="advanced-search__cancel btn btn-primary btn-sm" href="/search">Clear</a>
          )}
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
  user: PropTypes.object,
  savedSearches: PropTypes.object,
  geopraphyId: PropTypes.any,
  geographyType: PropTypes.any
}
AdvancedSearchSentenceEditor.defaultProps = {
  results: [],
  loading: false,
}

export default AdvancedSearchSentenceEditor
