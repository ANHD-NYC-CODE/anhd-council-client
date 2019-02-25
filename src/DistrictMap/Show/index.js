import React from 'react'
import PropTypes from 'prop-types'
import * as d from 'shared/constants/datasets'

import { getCouncilPropertySummary } from 'Store/Council/actions'
import { constructActionKey } from 'shared/utilities/actionUtils'
import RecordsFetchModule from 'shared/components/RecordsFetchModule'
import BuildingHistoryTable from 'BuildingLookup/BuildingHistoryTable'

const DistictMapShow = props => {
  return (
    <div className="district-map-show">
      <RecordsFetchModule
        id={props.id}
        dataset={d.HPDVIOLATIONS}
        recordsFetch={getCouncilPropertySummary}
        reducerPath={`council.districtPropertySummaries.${constructActionKey(d.HPDVIOLATIONS.constant, {
          type: d.HPDVIOLATIONS.queryName,
          comparison: 'gte',
          value: '10',
          startDate: '2017-01-31',
        })}`}
        render={(title, records, loading, error) => (
          <BuildingHistoryTable title={title} records={records} loading={loading} error={error} />
        )}
        title="Properties with +10 HPD Violations Last Month"
        urlParams={{ type: d.HPDVIOLATIONS.queryName, comparison: 'gte', value: '10', startDate: '2019-01-01' }}
      />
    </div>
  )
}

DistictMapShow.propTypes = {
  id: PropTypes.string,
}

export default DistictMapShow
