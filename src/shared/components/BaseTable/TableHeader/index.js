import React from 'react'
import PropTypes from 'prop-types'
import DatasetInfo from 'shared/components/DatasetInfo'
import { getTableSubheaders } from 'shared/tables/tableSubHeaders'
import classnames from 'classnames'
import { Row, Col } from 'react-bootstrap'

const TableHeader = props => {
  return (
    <div className={classnames('table-header', props.className)}>
      <Row className={classnames({ 'no-gutter': props.hideHeaderGutters })}>
        <Col xs={props.badge ? 8 : 12}>
          {props.size === 'sm' ? (
            <h5 className={props.headerClass + ' mb-0'}>{props.title}</h5>
          ) : (
            <h4 className={props.headerClass + ' mb-0'}>{props.title}</h4>
          )}
        </Col>
        {props.badge && <Col xs={4}>{props.badge}</Col>}
      </Row>
      <Row className={classnames({ 'no-gutter': props.hideHeaderGutters })}>
        <Col>
          <DatasetInfo datasetModelName={props.datasetModelName} showUpdate={props.showUpdate} />
        </Col>
      </Row>
      {getTableSubheaders({
        constant: props.resourceConstant,
        property: props.property,
        hideGutters: props.hideHeaderGutters,
      })}
    </div>
  )
}

TableHeader.defaultProps = {
  showUpdate: true,
  size: '',
}

TableHeader.propTypes = {
  hideHeaderGutters: PropTypes.bool,
  datasetModelName: PropTypes.string,
  headerClass: PropTypes.string,
  showUpdate: PropTypes.bool,
  size: PropTypes.string,
  title: PropTypes.string,
  property: PropTypes.object,
}

export default TableHeader
