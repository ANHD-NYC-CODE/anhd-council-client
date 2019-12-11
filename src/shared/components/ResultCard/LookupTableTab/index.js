import React from 'react'
import PropTypes from 'prop-types'
import { Card, Button } from 'react-bootstrap'
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
  return (
    <Button
      className={classnames(
        'lookup-table-tab',
        { 'building-link': props.request.level === 'BUILDING' },
        props.summaryBackgroundColorClass,
        {
          active: props.selected,
        }
      )}
      onClick={props.onClick}
    >
      <div className="summary-result-card__label">
        <p>
          {getLabel(props)}{' '}
          <span className="summary-result-card__result">
            {props.loading ? <SpinnerLoader size="14px" /> : `(${getRecordsCount(props.request, props.results)})`}
          </span>
        </p>
      </div>
    </Button>
  )
}

LookupTableTab.defaultProps = {
  loading: false,
  error: undefined,
  results: [],
  selected: false,
  resultsFilter: undefined,
}

LookupTableTab.propTypes = {
  onClick: PropTypes.func,
  resultsComponent: PropTypes.func,
  selected: PropTypes.bool,
  summaryTextColorClass: PropTypes.string,
  summaryBackgroundColorClass: PropTypes.string,
  results: PropTypes.array,
}
export default LookupTableTab
