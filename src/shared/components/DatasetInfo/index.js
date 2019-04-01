import React from 'react'
import PropTypes from 'prop-types'
import ConfigContext from 'Config/ConfigContext'
import moment from 'moment'

import './style.scss'

const DatasetInfo = props => {
  return (
    <div className="dataset-info">
      <ConfigContext.Consumer>
        {config => {
          const c = config
          const dataset = config.datasets.find(ds => ds.model_name.toLowerCase() === props.datasetModelName)
          if (dataset) {
            return (
              <div>
                {props.showUpdate && dataset.last_update && (
                  <div>
                    <span>Last Updated: </span>
                    {moment(dataset.last_update).format('MM/DD/YYYY')}
                  </div>
                )}

                {dataset.version && (
                  <div>
                    <span>Version:</span>
                    {dataset.version}
                  </div>
                )}
              </div>
            )
          } else return null
        }}
      </ConfigContext.Consumer>
    </div>
  )
}

DatasetInfo.defaultProps = {
  showUpdate: true,
}

DatasetInfo.propTypes = {
  datasetModelName: PropTypes.string,
  showUpdate: PropTypes.bool,
}

export default DatasetInfo
