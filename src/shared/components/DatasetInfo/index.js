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
          const dataset = config.datasets.find(ds => ds.model_name.toLowerCase() === props.datasetModelName)
          if (dataset) {
            return (
              <div>
                <div>
                  <span>Last Updated: </span>
                  {moment(dataset.last_update).format('MM/DD/YYYY')}
                </div>
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

DatasetInfo.propTypes = {
  datasetModelName: PropTypes.string,
}

export default DatasetInfo
