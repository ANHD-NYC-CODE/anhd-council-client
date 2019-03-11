import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import sinon from 'sinon'

import { AdvancedSearch } from 'AdvancedSearch'
import { AdvancedSearchSentence } from 'AdvancedSearch/Sentence'
import { BoundaryQuery } from 'AdvancedSearch/BoundaryQuery'
import { HousingTypeQuery } from 'AdvancedSearch/HousingTypeQuery'
import { Boundary } from 'shared/classes/Boundary'
import { Condition } from 'shared/classes/Condition'
configure({ adapter: new Adapter() })

describe('AdvancedSearch', () => {
  const dispatch = sinon.spy()
  const advancedSearch = {
    boundaries: [new Boundary('COUNCIL', 1)],
    conditions: { '0': new Condition({ type: 'AND', filters: [] }) },
    housingTypes: [],
  }
  const wrapper = shallow(<AdvancedSearch advancedSearch={advancedSearch} dispatch={dispatch} />)

  it('renders the component', () => {
    expect(wrapper.find('.advanced-search')).toBeDefined()
    expect(wrapper.find(AdvancedSearchSentence)).toHaveLength(1)
    expect(wrapper.find(BoundaryQuery)).toHaveLength(1)
    expect(wrapper.find(HousingTypeQuery)).toHaveLength(1)
  })
})
