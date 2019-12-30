import React from 'react'
import PropTypes from 'prop-types'
import DatasetInfo from 'shared/components/DatasetInfo'
import { getTableSubheaders } from 'shared/tables/tableSubHeaders'
import classnames from 'classnames'

import './style.scss'

const TableHeader = props => {
  return (
    <div className={classnames('table-header', props.className)}>
      <div className="table-header__title-row">
        <div className="table-header__title">
          <h6>{props.title}</h6>
        </div>
        {props.badge && <div className="table-header__badge">{props.badge}</div>}
      </div>

      <div className="table-header__dataset-info">
        <DatasetInfo datasetModelName={props.datasetModelName} showUpdate={props.showUpdate} />
      </div>

      <div className="table-header__subcopy">
        {getTableSubheaders({
          constant: props.resourceConstant,
          property: props.property,
          hideGutters: props.hideHeaderGutters,
        })}
      </div>
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
