import React from 'react'
import PropTypes from 'prop-types'
import ConfigContext from 'Config/ConfigContext'
const DatasetInfo = props => {
  return (
    <div className="dataset-info">
      <ConfigContext.Consumer>
        {config => {
          const dataset = config.datasets.find(ds => ds.model_name.toLowerCase() === props.datasetModelName)
          if (dataset) {
            return (
              <div>
                <span>Last Updated:</span>
                {dataset.last_update}
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
