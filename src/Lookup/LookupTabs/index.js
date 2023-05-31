import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import LookupTableTab from 'shared/components/ResultCard/LookupTableTab'
import { history } from 'Store/configureStore'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import classnames from 'classnames'
import './style.scss'

const LookupTabs = props => {
  const [isOpen, toggleOpen] = useState(true)
  
  // This allows for dynamic calls to the tabs using "?active_tab=1". This useEffect will run once when the component mounts. 
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    var tab = params.get('active_tab');
    
    // This checks if there's a selectedRequest already. If not, it sets the first lookupRequest as the default.
    if(!props.appState.selectedRequest && props.lookupRequests.length > 0) {
      if(tab) {
        if(tab > 0 && tab <= props.lookupRequests.length) {
          tab--;
          props.switchTable(props.lookupRequests[tab]);
        }
      }
    }
  }, []);

  const getTabLabel = (error, resourceModel, count1 = '...', count2 = 0) => {
    
    switch (resourceModel.resourceConstant) {
      case 'ACRIS_REAL_MASTER':
        return `Sales (${count1}) and Financing`
      case 'HPD_COMPLAINT':
        return `HPD Complaints (${count1}) and Problems (${count2})`
      case 'OCA_HOUSING_COURT':
        return error && (error.status === 401 || error.status === 403 || error.status === 409) ? 
          `${resourceModel.label}` : `${resourceModel.label} (${count1})`;
      case 'FORECLOSURE':
        return error && error.status === 403 ? `${resourceModel.label}` : `${resourceModel.label} (${count1})`
      case 'PSFORECLOSURE':
        return error && error.status === 403 ? `${resourceModel.label}` : `${resourceModel.label} (${count1})`
      default:
        return `${resourceModel.label} (${count1})`
    }
  }
  return (
    <div className="lookup-tabs">
      <div className="lookup-tabs__header">
        <button className="btn-link text-button--smaller" onClick={() => toggleOpen(!isOpen)}>
          {isOpen ? 'Collapse' : 'Expand Datasets'} <FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown} />
        </button>
        {isOpen && <span>Click to view different data about this property</span>}
      </div>
      <div className={classnames('lookup-tabs__tabs', { open: isOpen })}>
        {props.lookupRequests.map((request, index) => {
          const results = props.requests[request.requestConstant] || [];
          const loading = props.loadingState[request.requestConstant];
          const error = props.errorState[request.requestConstant];
          
          const getCount1 = (request, results) => {
            if (request.resourceModel.tableRecordsCountFunction) {
              return request.resourceModel.tableRecordsCountFunction(results)
            } else {
              return results.length
            }
          }

          const getCount2 = (request, results) => {
            if (request.resourceModel.tableRecordsCountFunction2) {
              return request.resourceModel.tableRecordsCountFunction2(results)
            } else {
              return results.length
            }
          }

    
          return (
            <LookupTableTab
              className=""
              dispatch={props.dispatch}
              isBuildingTab={props.isBuildingView && request.level === 'BUILDING'}
              key={`tab-${request.resourceModel.resourceConstant}`}
              onClick={() => {
                // Default behavior
                props.switchTable(request);
                
                // Get the current URL
                const currentPath = window.location.pathname;
                var human_index = index + 1;
                var newURL = currentPath + '?active_tab='+human_index;
                // Change the URL to the new URL
                history.push(newURL);
              }}
              selected={props.appState.selectedRequest === request}
              request={request}
              error={error}
              loading={loading}
              results={results}
              totalResults={props.requests[request.requestConstant]}
              label={getTabLabel(
                error,
                request.resourceModel,
                loading ? undefined : getCount1(request, results),
                getCount2(request, results)
              )}
            />
          )
        })}
      </div>
    </div>
  )
}

LookupTabs.propTypes = {
  appState: PropTypes.object,
  dispatch: PropTypes.func,
  isBuildingView: PropTypes.bool,
  errorState: PropTypes.object,
  loadingState: PropTypes.object,
  requests: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  lookupRequests: PropTypes.array,
  switchTable: PropTypes.func,
  propertyResult: PropTypes.object,
}
LookupTabs.defaultProps = {}

export default LookupTabs
