import React from 'react'

export const getBoundaryPath = type => {
  type = type.toUpperCase()
  switch (type) {
    case 'COUNCIL':
      return 'district'
    case 'COMMUNITY':
      return 'board'
    case 'CD':
      return 'board'
  }
}

export const pathToBoundary = type => {
  type = type.toUpperCase()
  switch (type) {
    case 'DISTRICT':
      return 'COUNCIL'
    case 'BOARD':
      return 'COMMUNITY'
  }
}

export const getBoundaryIdOptions = (districts, boards, type) => {
  type = type.toUpperCase()
  switch (type) {
    case 'COUNCIL':
      return [
        <option disabled value={-1} key={-1}>
          #
        </option>,
        ...districts.map(d => (
          <option key={`boundary-id-option-${d.id}`} value={d.id}>
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
          <option key={`boundary-id-option-${d.id}`} value={d.id}>
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
          <option key={`boundary-id-option-${d.id}`} value={d.id}>
            {d.id}
          </option>
        )),
      ]
  }
}
