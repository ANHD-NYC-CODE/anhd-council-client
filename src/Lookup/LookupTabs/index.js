import React, { useState } from 'react'
import PropTypes from 'prop-types'
import LookupTableTab from 'shared/components/ResultCard/LookupTableTab'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import classnames from 'classnames'
import './style.scss'

const LookupTabs = props => {
  const [isOpen, toggleOpen] = useState(true)

  const getTabLabel = (error, resourceModel, count1 = '...', count2 = 0) => {
    
    switch (resourceModel.resourceConstant) {
      case 'ACRIS_REAL_MASTER':
        return `Sales (${count1}) and Financing`
      case 'HPD_COMPLAINT':
        return `HPD Complaints (${count1}) and Problems (${count2})`
      case 'OCA_HOUSING_COURT':
        return error && (error.status === 401 || error.status === 403) ? 
          `${resourceModel.label}` : `${resourceModel.label} (${count1})`;
      case 'FORECLOSURE':
        return error && error.status === 401 ? `${resourceModel.label}` : `${resourceModel.label} (${count1})`
      case 'PSFORECLOSURE':
        return error && error.status === 401 ? `${resourceModel.label}` : `${resourceModel.label} (${count1})`
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
        {props.lookupRequests.map(request => {
          const results = props.requests[request.requestConstant] || []
          const loading = props.loadingState[request.requestConstant]
          
          let error = props.errorState[request.requestConstant];
          if (request.resourceModel.resourceConstant === 'OCA_HOUSING_COURT' &&
              props.propertyResult.unitsres < 11 && !error) 
          {
            error = {
              status: 403
            };
          }
          
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
              onClick={() => props.switchTable(request)}
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
