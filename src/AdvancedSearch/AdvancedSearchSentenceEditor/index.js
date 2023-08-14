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
// import { constantToModelName } from '../../shared/utilities/filterUtils'

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
    if (!filter) {
      console.warn("Filter is undefined.");
      return "Unknown Filter";
    }
    if (!filter.resourceModel) {
      console.warn("Filter's resourceModel is undefined. Filter:", filter);
      return "Unknown Filter";
    }
    return filter.resourceModel.label;
  }

  function getLowerCaseFilterLabel(filter) {
    const originalLabel = getFilterLabel(filter) || ""; // default to empty string if undefined
    const lowercaseLabel = originalLabel.toLowerCase().replace(/\s+/g, '-');
    return lowercaseLabel;
  }

  const getFilterResourceConstant = (filter) => {
    return filter.resourceModel.resourceConstant;
  }

  let filtersHash = {};
  searchedFilters.forEach(v => filtersHash[getFilterLabel(v)] = v);
  const uniqueSearchedFilters = Object.values(filtersHash);

  const getFilterColumnValue = (filter) => {
    // console.log("within function /////////")
    // console.log("the filter ", filter)
    // console.log("length", props.results.length)
    // console.log("the column headers ", Object.keys(props.results[0]))
    // console.log("the filter url path ", filter.resourceModel.urlPath)
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
                  activeText="You have saved this search"
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
          uniqueSearchedFilters.map((filter, index) => {
            const binaryFilterIds = ['TAX_LIEN', 'CONH_RECORD', 'AEP_BUILDING'];

            // If the filter is in the binaryFilterIds list, we don't render anything for it
            if (binaryFilterIds.includes(filter.id)) {
              return null;
            }


            const key = filter.resourceModel.resourceConstant;

            return (
              <div className={`advanced-search-sentence-editor__group ${getLowerCaseFilterLabel(filter)}-label`}
                key={key}>
                <span className="advanced-search-sentence-editor__label">{getFilterLabel(filter)}:</span>{' '}
                <span className="advanced-search-sentence-editor__value">
                  {props.loading ? null : formatNumber(getFilterColumnValue(filter))}
                </span>
              </div>
            );
          })
        }
        <span className="advanced-search-sentence-editor__buttons">
          {(props.requestCalledAndNotLoading || props.loadingButDisplayingResults) && (
            <div>
              <a type="button" className="btn btn-outline-primary btn-sm mr-3" href="/search">
                Clear
              </a>
              <Button className="advanced-search__toggle-button" variant="dark" size="sm" onClick={props.toggleForm}>
                {props.displayingForm ? 'View Results' : 'Edit Custom Search'}
              </Button>
            </div>
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
