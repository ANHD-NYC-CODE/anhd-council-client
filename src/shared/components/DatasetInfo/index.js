import React from 'react'
import PropTypes from 'prop-types'
import ConfigContext from 'Config/ConfigContext'
import moment from 'moment'

import './style.scss'

const getUpdateType = dataset => {
  return dataset.automated ? 'an automated' : 'a manual'
}

const parseDatasetRange = dataset => {
  const updateSentenceStart = () => {
    if (dataset.records_start || dataset.records_end) return 'It was'
    else return 'This dataset was'
  }

  let sentenceArray = []
  if (dataset.records_start && !dataset.records_end)
    sentenceArray.push(
      <span key="dataset-info-sentence-item-1">
        This dataset starts on <b>{moment(dataset.records_start).format('MM/DD/YYYY')}</b>.
      </span>
    )
  else if (!dataset.records_start && dataset.records_end)
    sentenceArray.push(
      <span key="dataset-info-sentence-item-2">
        This dataset ends on <b>{moment(dataset.records_end).format('MM/DD/YYYY')}</b>.
      </span>
    )
  else if (dataset.records_start && dataset.records_end)
    sentenceArray.push(
      <span key="dataset-info-sentence-item-3">
        This dataset's range is from <b>{moment(dataset.records_start).format('MM/DD/YYYY')}</b> to{' '}
        <b>{moment(dataset.records_end).format('MM/DD/YYYY')}</b>.
      </span>
    )

  if (dataset.last_update && dataset.update_schedule)
    sentenceArray.push(
      <span key="dataset-info-sentence-item-4">
        {updateSentenceStart()} last updated on <b>{moment(dataset.last_update).format('MM/DD/YYYY')}</b> and is on{' '}
        {getUpdateType(dataset)} {dataset.update_schedule} update schedule.
      </span>
    )

  return sentenceArray
}

const DatasetInfo = props => {
  return (
    <div className="dataset-info">
      <ConfigContext.Consumer>
        {config => {
          const dataset = config.datasets.find(ds => ds.model_name.toLowerCase() === props.datasetModelName)
          if (dataset) {
            return (
              <div>
                <div>{parseDatasetRange(dataset).map(el => el)}</div>

                {dataset.version && (
                  <div>
                    <span>Version: </span>
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

DatasetInfo.defaultProps = {}

DatasetInfo.propTypes = {
  datasetModelName: PropTypes.string,
  showUpdate: PropTypes.bool,
}

export default DatasetInfo
