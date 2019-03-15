import React from 'react'

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
            {d.id}
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
            {d.id}
          </option>
        )),
      ]
  }
}
