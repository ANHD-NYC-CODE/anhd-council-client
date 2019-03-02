import React from 'react'
import { configure, shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { AdvancedSearch } from 'AdvancedSearch'
import { Condition } from 'AdvancedSearch/Condition'
import { AdvancedSearchSentence } from 'AdvancedSearch/Sentence'

configure({ adapter: new Adapter() })

describe('AdvancedSearch', () => {
  const advancedSearch = { conditions: { '0': { type: 'AND', filters: [] } } }
  const wrapper = shallow(<AdvancedSearch advancedSearch={advancedSearch} />)

  it('renders the component', () => {
    expect(wrapper.find('div')).toBeDefined()
    expect(wrapper.find(Condition)).toHaveLength(1)
    expect(wrapper.find(AdvancedSearchSentence)).toHaveLength(1)
  })
})
