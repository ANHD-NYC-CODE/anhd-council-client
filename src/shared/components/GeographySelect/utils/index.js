import React from 'react'
import { communityIdToString } from 'shared/utilities/languageUtils'
import { getGeographyObject } from 'shared/utilities/routeUtils'

export const getGeographyIdOptions = (
  districts = [],
  boards = [],
  stateAssemblies = [],
  stateSenates = [],
  zipCodes = [],
  type
) => {
  const zipCodeObject = getGeographyObject('ZIPCODE')
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
        ...districts.map(d => (
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
    case 'STATE_ASSEMBLY':
      return [
        <option disabled value={-1} key={-1}>
          #
        </option>,
        ...stateAssemblies.map(d => (
          <option key={`geography-id-option-${d.id}`} value={d.id}>
            {d.id}
          </option>
        )),
      ]
    case 'STATE_SENATE':
      return [
        <option disabled value={-1} key={-1}>
          #
        </option>,
        ...stateSenates.map(d => (
          <option key={`geography-id-option-${d.id}`} value={d.id}>
            {d.id}
          </option>
        )),
      ]
    case 'ZIPCODE':
      return [
        <option disabled value={-1} key={-1}>
          #
        </option>,
        ...zipCodes
          .filter(geography => zipCodeObject.hidden && !zipCodeObject.hidden.includes(geography.id))
          .map(d => (
            <option key={`geography-id-option-${d.id}`} value={d.id}>
              {d.id}
            </option>
          )),
      ]
  }
}
