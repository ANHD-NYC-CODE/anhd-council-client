import React, { useState } from 'react'
import PropTypes from 'prop-types'
import LookupTableTab from 'shared/components/ResultCard/LookupTableTab'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import classnames from 'classnames'
import './style.scss'

const LookupTabs = props => {
  const [isOpen, toggleOpen] = useState(true)

  const getTabLabel = (resourceModel, count1 = '...', count2 = 0) => {
    switch (resourceModel.resourceConstant) {
      case 'ACRIS_REAL_MASTER':
        return `Sales (${count1}) and Financing`
      case 'HPD_COMPLAINT':
        return `HPD Complaints (${count1}) and Problems (${count2})`
      default:
        return `${resourceModel.label} (${count1})`
    }
  }

  return (
    <div className="lookup-tabs">
      <div className="lookup-tabs__header">
        <span>Click to view different data about this property</span>
        <button className="text-button--smaller" onClick={() => toggleOpen(!isOpen)}>
          {isOpen ? 'Collapse' : 'Expand Datasets'} <FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown} />
        </button>
      </div>
      <div className={classnames('lookup-tabs__tabs', { open: isOpen })}>
        {props.lookupRequests.map((request, index) => {
          const results = props.requests[request.requestConstant] || []
          const loading = props.loadingState[request.requestConstant]
          const error = props.errorState[request.requestConstant]
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
              className={''}
              dispatch={props.dispatch}
              isBuildingTab={props.isBuildingView && request.level === 'BUILDING'}
              key={`request-summary-${props.appState.requests.indexOf(request)}`}
              onClick={() => props.switchTable(request)}
              selected={props.appState.selectedRequest === request}
              request={request}
              error={error}
              loading={loading}
              results={results}
              totalResults={props.requests[request.requestConstant]}
              label={getTabLabel(
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
  errorState: PropTypes.array,
  loadingState: PropTypes.array,
  requests: PropTypes.array,
  lookupRequests: PropTypes.array,
  switchTable: PropTypes.func,
}
LookupTabs.defaultProps = {}

export default LookupTabs
