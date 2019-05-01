import React from 'react'
import moment from 'moment'
import * as c from 'shared/constants'
import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { setupStore, configuredState } from 'shared/testUtilities'
import { Provider } from 'react-redux'
import AdvancedSearch from 'AdvancedSearch'
import ConfigContext from 'Config/ConfigContext'
import Config from 'Config'

configure({ adapter: new Adapter() })

const rawStartDate = c.CUSTOM_DEFAULT_START_DATE
const rawEndDate = c.CUSTOM_DEFAULT_END_DATE

const startDate = moment(rawStartDate, 'YYYY-MM-DD').format('MM/DD/YYYY')
const endDate = moment(rawEndDate, 'YYYY-MM-DD').format('MM/DD/YYYY')

const setupWrapper = state => {
  if (!state) {
    state = configuredState()
  }
  const store = setupStore({ ...state })
  const wrapper = mount(
    <Provider store={store}>
      <Config>
        <ConfigContext.Consumer>
          {config => {
            return <AdvancedSearch config={config} />
          }}
        </ConfigContext.Consumer>
      </Config>
    </Provider>
  )
  return wrapper
}

const selectedGeographyWrapper = ({
  wrapper = undefined,
  selectValue = undefined,
  idValue = undefined,
  state = undefined,
} = {}) => {
  if (!wrapper) {
    wrapper = setupWrapper(state)
  }
  wrapper
    .find('select[name="geographyType"]')
    .simulate('change', { target: { name: 'geographyType', value: selectValue, dataset: { key: 'geographyType' } } })

  wrapper.update()

  if (idValue) {
    wrapper
      .find('select[name="geographyId"]')
      .simulate('change', { target: { name: 'geographyId', value: idValue, dataset: { key: 'id' } } })
  }
  wrapper.update()
  return wrapper
}

const selectedHousingTypeWrapper = ({ wrapper = undefined, selectValue = undefined } = {}) => {
  if (!wrapper) {
    wrapper = selectedGeographyWrapper({ selectValue: 'COUNCIL', idValue: '1' })
  }
  wrapper
    .find('.advanced-search-form__housingtype-select select')
    .simulate('change', { target: { name: 'value', value: selectValue } })
  wrapper.update()
  return wrapper
}

const selectedFilterWrapper = ({ wrapper = undefined, selectValue = undefined } = {}) => {
  if (!wrapper) {
    wrapper = selectedGeographyWrapper({ selectValue: 'COUNCIL', idValue: '1' })
  }
  wrapper.find('ConditionComponent button.add-filter').simulate('click')
  wrapper.update()
  wrapper.find('select[name="newFilter"]').simulate('change', { target: { name: 'newFilter', value: selectValue } })
  wrapper.update()
  return wrapper
}

describe('AdvancedSearch', () => {
  const wrapper = setupWrapper()
  it('renders the page components', () => {
    expect(wrapper.find('AdvancedSearch')).toBeDefined()
    expect(wrapper.find('AdvancedSearchSentence')).toHaveLength(1)
    expect(wrapper.find('AdvancedSearchForm')).toHaveLength(1)
    expect(wrapper.find('AdvancedSearchInstructions')).toHaveLength(1)
    expect(wrapper.find('.advanced-search-form__housingtype-select')).toHaveLength(0)
    expect(wrapper.find('ConditionComponent')).toHaveLength(0)
  })

  describe('Geography Query Select', () => {
    it('has initial state', () => {
      const wrapper = setupWrapper()
      expect(wrapper.find('GeographySelect')).toHaveLength(1)
      expect(wrapper.find('select[name="geographyType"]')).toHaveLength(1)
      expect(wrapper.find('select[name="geographyId"]')).toHaveLength(0)

      expect(wrapper.find('select[name="geographyType"]').props().value).toEqual(-1)
      expect(wrapper.find('select[name="geographyType"] option')).toHaveLength(3)
      expect(wrapper.find('select[name="geographyType"]').text()).toEqual(
        'Select a geographyCouncil DistrictCommunity District'
      )
    })

    it('switches between geographies', () => {
      let wrapper = selectedGeographyWrapper({ selectValue: 'COUNCIL' })
      expect(wrapper.find('select[name="geographyType"]')).toHaveLength(1)
      expect(wrapper.find('select[name="geographyType"]').props().value).toEqual('COUNCIL')

      wrapper = selectedGeographyWrapper({ wrapper: wrapper, selectValue: 'COMMUNITY' })
      expect(wrapper.find('select[name="geographyType"]')).toHaveLength(1)
      expect(wrapper.find('select[name="geographyType"]').props().value).toEqual('COMMUNITY')
    })

    it('adds council districts when selected', () => {
      const wrapper = selectedGeographyWrapper({ selectValue: 'COUNCIL', idValue: 3 })
      expect(wrapper.find('select[name="geographyType"]').props().value).toEqual('COUNCIL')

      expect(wrapper.find('select[name="geographyId"]')).toHaveLength(1)
      expect(wrapper.find('select[name="geographyId"] option')).toHaveLength(4)
      expect(wrapper.find('select[name="geographyId"]').props().value).toEqual(3)
      expect(wrapper.find('AdvancedSearchSentence').text()).toMatch(/Show me all properties in council district 3/)
    })
  })

  describe('Housing Type selection', () => {
    it('has initial state', () => {
      const wrapper = selectedGeographyWrapper({ selectValue: 'COUNCIL', idValue: '1' })
      expect(wrapper.find('.advanced-search-form__housingtype-select select')).toHaveLength(1)
      expect(wrapper.find('.advanced-search-form__housingtype-select select').props().value).toEqual('all')
      expect(wrapper.find('div.housingtype-paramset')).toHaveLength(0)

      expect(wrapper.find('.advanced-search-form__housingtype-select select option')).toHaveLength(6)
    })

    it('switches between housing types', () => {
      let wrapper = selectedHousingTypeWrapper({ selectValue: 'rs' })
      expect(wrapper.find('.advanced-search-form__housingtype-select select').props().value).toEqual('rs')

      wrapper = selectedHousingTypeWrapper({ wrapper: wrapper, selectValue: 'sh' })
      expect(wrapper.find('.advanced-search-form__housingtype-select select').props().value).toEqual('sh')
    })

    it('adds Rent Stabilized param sets when selection is made', () => {
      const wrapper = selectedHousingTypeWrapper({ selectValue: 'rs' })

      expect(wrapper.find('.advanced-search-form__housingtype-select select').props().value).toEqual('rs')
      expect(wrapper.find('div.paramset-wrapper.modifying-paramset')).toHaveLength(1)

      wrapper.find('button.paramset--new-button').simulate('click')
      wrapper.update()
      expect(wrapper.find('.modifying-paramset div.multitype-fieldgroup')).toHaveLength(1)

      expect(wrapper.find('AdvancedSearchSentence').text()).toMatch(
        'Show me rent stabilized properties (at least 25% units losts, after 2007) in council district 1'
      )
    })

    it('adds Subsidized Housing param sets when selection is made', () => {
      const wrapper = selectedHousingTypeWrapper({ selectValue: 'rr' })

      expect(wrapper.find('.advanced-search-form__housingtype-select select').props().value).toEqual('rr')
      expect(wrapper.find('.advanced-search-form__housingtype-select .filter-component__paramsets')).toHaveLength(2)

      expect(wrapper.find('AdvancedSearchSentence').text()).toMatch(/Show me subsidized housing properties/)
    })

    it('adds Small Homes param sets when selection is made', () => {
      const wrapper = selectedHousingTypeWrapper({ selectValue: 'sh' })

      expect(wrapper.find('.advanced-search-form__housingtype-select select').props().value).toEqual('sh')
      expect(wrapper.find('.advanced-search-form__housingtype-select .filter-component__paramsets')).toHaveLength(1)

      expect(wrapper.find('AdvancedSearchSentence').text()).toMatch(/Show me small home properties/)
    })

    it('adds Market Rate param sets when selection is made', () => {
      const wrapper = selectedHousingTypeWrapper({ selectValue: 'mr' })

      expect(wrapper.find('.advanced-search-form__housingtype-select select').props().value).toEqual('mr')
      expect(wrapper.find('div.paramset-wrapper--group')).toHaveLength(0)
      expect(wrapper.find('AdvancedSearchSentence').text()).toMatch(/Show me market rate properties/)
    })

    it('adds Public Housing param sets when selection is made', () => {
      const wrapper = selectedHousingTypeWrapper({ selectValue: 'ph' })

      expect(wrapper.find('.advanced-search-form__housingtype-select select').props().value).toEqual('ph')
      expect(wrapper.find('div.paramset-wrapper--group')).toHaveLength(0)
      expect(wrapper.find('AdvancedSearchSentence').text()).toMatch(/Show me public housing properties/)
    })
  })

  describe('Conditions', () => {
    it('has initial state', () => {
      const wrapper = selectedGeographyWrapper({ selectValue: 'COUNCIL', idValue: '1' })
      expect(wrapper.find('ConditionComponent')).toHaveLength(1)
      expect(wrapper.find('ConditionComponent').props().condition.type).toEqual('AND')
      expect(wrapper.find('NewFilterSelect')).toHaveLength(0)
      expect(wrapper.find('ConditionComponent FilterComponent')).toHaveLength(0)
    })

    it('it switches between conditions', () => {
      const wrapper = selectedFilterWrapper({ selectValue: 'HPD_VIOLATION' })

      wrapper
        .find('ConditionComponent button.add-filter')
        .at(1)
        .simulate('click')
      wrapper.update()
      wrapper
        .find('select[name="newFilter"]')
        .at(1)
        .simulate('change', { target: { name: 'newFilter', value: 'DOB_VIOLATION' } })
      wrapper.update()
      wrapper.find('ConditionComponent button.dropdown-toggle').simulate('click')
      wrapper
        .find('ConditionComponent a.dropdown-item')
        .at(1)
        .simulate('click')
      wrapper.update()
      expect(wrapper.find('ConditionComponent').props().condition.type).toEqual('OR')
      expect(wrapper.find('ConditionComponent FilterComponent')).toHaveLength(2)
    })

    it('it shows a new filter select', () => {
      const wrapper = selectedGeographyWrapper({ selectValue: 'COUNCIL', idValue: '1' })
      wrapper.find('ConditionComponent button.add-filter').simulate('click')
      wrapper.update()
      expect(wrapper.find('NewFilterSelect')).toHaveLength(1)
      expect(wrapper.find('ConditionComponent FilterComponent')).toHaveLength(0)
    })

    it('it cancels a new filter select', () => {
      const wrapper = selectedGeographyWrapper({ selectValue: 'COUNCIL', idValue: '1' })
      wrapper.find('ConditionComponent button.add-filter').simulate('click')
      wrapper.update()
      expect(wrapper.find('NewFilterSelect')).toHaveLength(1)
      expect(wrapper.find('ConditionComponent FilterComponent')).toHaveLength(0)
      wrapper.find('ConditionComponent button.remove-add-filter').simulate('click')
      wrapper.update()
      expect(wrapper.find('NewFilterSelect')).toHaveLength(0)
      expect(wrapper.find('ConditionComponent FilterComponent')).toHaveLength(0)
    })
  })

  describe('Filters', () => {
    it('has initial state', () => {
      const wrapper = selectedFilterWrapper({ selectValue: 'HPD_VIOLATION' })
      expect(wrapper.find('ConditionComponent FilterComponent')).toHaveLength(1)
    })

    it('updates reducer state on change (comparison value)', () => {
      const wrapper = selectedFilterWrapper({ selectValue: 'HPD_VIOLATION' })
      wrapper
        .find('FilterComponent input[name="value"]')
        .at(0)
        .simulate('change', { target: { name: 'value', value: '100' } })

      expect(
        wrapper
          .find('FilterComponent input[name="value"]')
          .at(0)
          .props().value
      ).toEqual('100')
      expect(wrapper.find('AdvancedSearchSentence').text()).toMatch(/that have at least 100 HPD violations/)
    })

    it('updates reducer state on change (date value)', () => {
      const wrapper = selectedFilterWrapper({ selectValue: 'HPD_VIOLATION' })
      wrapper
        .find('FilterComponent input[name="value"]')
        .at(1)
        .simulate('change', { target: { name: 'value', value: '2020-01-01' } })

      expect(
        wrapper
          .find('FilterComponent input[name="value"]')
          .at(1)
          .props().value
      ).toEqual('2020-01-01')
      expect(wrapper.find('AdvancedSearchSentence').text()).toMatch(/HPD violations after 01\/01\/2020/)
    })

    it('updates reducer state on change (date range)', () => {
      const wrapper = selectedFilterWrapper({ selectValue: 'HPD_VIOLATION' })
      wrapper
        .find('FilterComponent select[name="comparison"]')
        .at(1)
        .simulate('change', {
          target: { name: 'comparison', value: 'between', dataset: { rangeKey: 'hpdviolationsRange' } },
        })
      wrapper.update()
      expect(
        wrapper
          .find('FilterComponent select[name="comparison"]')
          .at(1)
          .props().value
      ).toEqual('between')
      expect(wrapper.find('AdvancedSearchSentence').text()).toContain(
        `HPD violations between ${startDate} and ${endDate}`
      )
    })
  })
})
