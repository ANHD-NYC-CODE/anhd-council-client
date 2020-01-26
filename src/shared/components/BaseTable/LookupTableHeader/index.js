import React from 'react'
import PropTypes from 'prop-types'
import DatasetInfo from 'shared/components/DatasetInfo'
import { getTableSubheaders } from 'shared/tables/tableSubHeaders'
import classnames from 'classnames'
import InfoModalButton from 'shared/components/InfoModalButton'
import { constantToModelName } from 'shared/utilities/filterUtils'

import './style.scss'

const LookupTableHeader = props => {
  return (
    <div className={classnames('table-header', props.className)}>
      <div className="table-header__title-row">
        <div className="table-header__title">
          <h6>{props.title}</h6>
        </div>
        <InfoModalButton modalConstant={props.resourceConstant} />
        {props.badge && <div className="table-header__badge">{props.badge}</div>}
      </div>

      <div className="table-header__dataset-info">
        <DatasetInfo datasetModelName={constantToModelName(props.resourceConstant)} showUpdate={props.showUpdate} />
      </div>

      <div className="table-header__subcopy">
        {getTableSubheaders({
          constant: props.resourceConstant,
          property: props.property,
        })}
      </div>
    </div>
  )
}

LookupTableHeader.defaultProps = {
  size: '',
}

LookupTableHeader.propTypes = {
  resourceConstant: PropTypes.string,
  headerClass: PropTypes.string,
  size: PropTypes.string,
  title: PropTypes.string,
  property: PropTypes.object,
  request: PropTypes.object,
}

export default LookupTableHeader
