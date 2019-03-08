import React from 'react'
import { configure, shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import sinon from 'sinon'

import { AdvancedSearch } from 'AdvancedSearch'
import { ConditionComponent } from 'AdvancedSearch/ConditionComponent'
import { AdvancedSearchSentence } from 'AdvancedSearch/Sentence'
import { BoundaryQuery } from 'AdvancedSearch/BoundaryQuery'
import { HousingTypeQuery } from 'AdvancedSearch/HousingTypeQuery'
import { Boundary } from 'shared/classes/Boundary'
import { HousingType } from 'shared/classes/HousingType'
import { Condition } from 'shared/classes/Condition'
import { ConditionFilter } from 'shared/classes/ConditionFilter'

configure({ adapter: new Adapter() })

describe('AdvancedSearch', () => {
  const advancedSearch = {
    boundaries: [new Boundary('COUNCIL', 1)],
    conditions: { '0': new Condition({ type: 'AND', filters: [] }) },
  }
  const wrapper = shallow(<AdvancedSearch advancedSearch={advancedSearch} />)

  it('renders the component', () => {
    expect(wrapper.find('.advanced-search')).toBeDefined()
    expect(wrapper.find(AdvancedSearchSentence)).toHaveLength(1)
    expect(wrapper.find(BoundaryQuery)).toHaveLength(1)
    expect(wrapper.find(HousingTypeQuery)).toHaveLength(1)
    expect(wrapper.find(ConditionComponent)).toHaveLength(1)
  })
})
