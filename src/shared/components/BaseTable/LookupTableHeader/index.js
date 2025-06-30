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
          {props.resourceConstant === 'DOB_ISSUED_PERMIT' && (
            <div style={{ marginTop: '0.5em' }}>
              <a
                href="/Data-Glossary-DOB-Permit-Applications-DAP-Portal-ANHD.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-link"
                style={{ fontSize: '0.9em' }}
              >
                Understanding Permit Application Types in DOB NOW & BIS
              </a>
            </div>
          )}
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
          bin: props.bin,
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
  bin: PropTypes.string,
  request: PropTypes.object,
}

export default LookupTableHeader
