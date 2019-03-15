import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import sinon from 'sinon'

import { AdvancedSearch } from 'AdvancedSearch'
import { AdvancedSearchSentence } from 'AdvancedSearch/Sentence'

import { Geography } from 'shared/classes/Geography'
import { Condition } from 'shared/classes/Condition'
configure({ adapter: new Adapter() })

describe('AdvancedSearch', () => {
  const dispatch = sinon.spy()
  const advancedSearch = {
    geographies: [new Geography('COUNCIL', 1)],
    conditions: { '0': new Condition({ type: 'AND', filters: [] }) },
    housingTypes: [],
  }
  const wrapper = shallow(<AdvancedSearch advancedSearch={advancedSearch} dispatch={dispatch} />)

  it('renders the component', () => {
    expect(wrapper.find('.advanced-search')).toBeDefined()
    expect(wrapper.find(AdvancedSearchSentence)).toHaveLength(1)
  })
})
