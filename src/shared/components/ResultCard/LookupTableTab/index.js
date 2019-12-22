import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'
import SpinnerLoader from 'shared/components/Loaders/SpinnerLoader'
import classnames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { faChartBar } from '@fortawesome/free-solid-svg-icons'

import './style.scss'
import { Row, Col } from 'react-bootstrap'
const getLabel = props => {
  if (props.label) return props.label
  else {
    return (
      <Row>
        {props.resultsFilter && (
          <Col xs={2}>
            <FontAwesomeIcon icon={faHome} />
          </Col>
        )}
        <Col xs={10}>{props.resultsFilter.label ? props.resultsFilter.label : 'All Properties'}</Col>
        {props.request && (
          <Col xs={2}>
            <FontAwesomeIcon icon={faChartBar} />
          </Col>
        )}
        {props.request && <Col xs={10}>{props.request.summaryCardLabel}</Col>}
      </Row>
    )
  }
}

const getRecordsCount = (request, results) => {
  if (request.resourceModel.tableRecordsCountFunction) {
    return request.resourceModel.tableRecordsCountFunction(results)
  } else {
    return results.length
  }
}

const LookupTableTab = props => {
  console.log(props.request.level)
  return (
    <button
      className={classnames('lookup-table-tab', props.isBuildingTab ? 'tab--secondary' : 'tab--primary', {
        active: props.selected,
      })}
      onClick={props.onClick}
    >
      <div className="summary-result-card__label">
        <p>
          {getLabel(props)}{' '}
          <span className="summary-result-card__result">
            {props.loading ? <SpinnerLoader className="spinner-loader__container--inline" size="14px" /> : null}
          </span>
        </p>
      </div>
    </button>
  )
}

LookupTableTab.defaultProps = {
  isBuildingTab: false,
  loading: false,
  error: undefined,
  results: [],
  selected: false,
  resultsFilter: undefined,
}

LookupTableTab.propTypes = {
  isBuildingTab: PropTypes.bool,
  onClick: PropTypes.func,
  resultsComponent: PropTypes.func,
  selected: PropTypes.bool,
  summaryTextColorClass: PropTypes.string,
  className: PropTypes.string,
  results: PropTypes.array,
}
export default LookupTableTab
