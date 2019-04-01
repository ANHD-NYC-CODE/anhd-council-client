import React from 'react'
import moment from 'moment'
import { communityIdToString } from 'shared/utilities/languageUtils'
export const getGeographyIdOptions = (districts, boards, type) => {
  type = type.toUpperCase()
  switch (type) {
    case 'COUNCIL':
      return [
        <option disabled value={-1} key={-1}>
          #
        </option>,
        ...districts.map(d => (
          <option key={`geography-id-option-${d.id}`} value={d.id}>
            {d.id}
          </option>
        )),
      ]
    case 'CD':
      return [
        <option disabled value={-1} key={-1}>
          #
        </option>,
        ...boards.map(d => (
          <option key={`geography-id-option-${d.id}`} value={d.id}>
            {communityIdToString(d.id)}
          </option>
        )),
      ]
    case 'COMMUNITY':
      return [
        <option disabled value={-1} key={-1}>
          #
        </option>,
        ...boards.map(d => (
          <option key={`geography-id-option-${d.id}`} value={d.id}>
            {communityIdToString(d.id)}
          </option>
        )),
      ]
  }
}

export const districtDashboardFilterdates = () => {
  return [
    moment()
      .subtract(1, 'months')
      .startOf('month')
      .format('YYYY-MM-DD'),
    moment()
      .subtract('1', 'year')
      .format('YYYY-MM-DD'),
    moment()
      .subtract('3', 'year')
      .format('YYYY-MM-DD'),
  ]
}
