import React from 'react'
import moment from 'moment'
import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { setupStore, configuredState } from 'shared/testUtilities'
import { Provider } from 'react-redux'
import AdvancedSearch from 'AdvancedSearch'
import ConfigContext from 'Config/ConfigContext'

configure({ adapter: new Adapter() })

const todayminus1year = moment(moment.now())
  .subtract(1, 'Y')
  .format('MM/DD/YYYY')

const todayplus1year = moment(moment.now())
  .add(1, 'Y')
  .format('MM/DD/YYYY')

const setupWrapper = state => {
  if (!state) {
    state = configuredState()
  }
  const store = setupStore({ ...state })
  const wrapper = mount(
    <Provider store={store}>
      <ConfigContext.Provider
        value={{
          datasets: state.dataset.datasets,
          datasetModels: state.dataset.datasetModels,
          housingTypeModels: state.dataset.housingTypeModels,
          councilDistricts: state.council.districts,
          communityDistricts: state.community.boards,
        }}
      >
        <AdvancedSearch />
      </ConfigContext.Provider>
    </Provider>
  )
  return wrapper
}

const selectedGeographyWrapper = ({ wrapper = undefined, selectValue = undefined, idValue = undefined } = {}) => {
  if (!wrapper) {
    wrapper = setupWrapper()
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
    wrapper = setupWrapper()
  }
  wrapper
    .find('select[name="housingTypeSelect"]')
    .simulate('change', { target: { name: 'geographyType', value: selectValue } })
  wrapper.update()
  return wrapper
}

const selectedFilterWrapper = ({ wrapper = undefined, selectValue = undefined } = {}) => {
  if (!wrapper) {
    wrapper = setupWrapper()
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
    expect(wrapper.find('ConditionComponent')).toHaveLength(1)
    expect(wrapper.find('button[type="submit"]')).toHaveLength(1)
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
        'Select a Geography typeCouncil DistrictCommunity District'
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
      const wrapper = setupWrapper()
      expect(wrapper.find('HousingTypeQuery')).toHaveLength(1)
      expect(wrapper.find('select[name="housingTypeSelect"]')).toHaveLength(1)
      expect(wrapper.find('select[name="housingTypeSelect"]').props().value).toEqual('ALL_TYPES')
      expect(wrapper.find('div.housingtype-paramset')).toHaveLength(0)

      expect(wrapper.find('select[name="housingTypeSelect"] option')).toHaveLength(6)
    })

    it('switches between housing types', () => {
      let wrapper = selectedHousingTypeWrapper({ selectValue: 'RENT_STABILIZED' })
      expect(wrapper.find('select[name="housingTypeSelect"]').props().value).toEqual('RENT_STABILIZED')

      expect(wrapper.find('HousingTypeQuery')).toHaveLength(1)

      wrapper = selectedHousingTypeWrapper({ wrapper: wrapper, selectValue: 'SMALL_HOMES' })
      expect(wrapper.find('select[name="housingTypeSelect"]').props().value).toEqual('SMALL_HOMES')

      expect(wrapper.find('HousingTypeQuery')).toHaveLength(1)
    })

    it('adds Rent Stabilized param sets when selection is made', () => {
      const wrapper = selectedHousingTypeWrapper({ selectValue: 'RENT_STABILIZED' })

      expect(wrapper.find('select[name="housingTypeSelect"]').props().value).toEqual('RENT_STABILIZED')
      expect(wrapper.find('div.housingtype-paramset--group')).toHaveLength(1)

      wrapper.find('button.housingtype-paramset--new-button').simulate('click')
      wrapper.update()
      expect(wrapper.find('div.multitype-fieldgroup')).toHaveLength(1)

      expect(wrapper.find('AdvancedSearchSentence').text()).toMatch(
        /Show me rent stabilized properties that lost at least 25% rent stabilized units after 2010/
      )
    })

    it('adds Rent Regulated param sets when selection is made', () => {
      const wrapper = selectedHousingTypeWrapper({ selectValue: 'RENT_REGULATED' })

      expect(wrapper.find('select[name="housingTypeSelect"]').props().value).toEqual('RENT_REGULATED')
      expect(wrapper.find('div.housingtype-paramset--group')).toHaveLength(2)

      wrapper
        .find('button.housingtype-paramset--new-button')
        .at(0)
        .simulate('click')
      wrapper.update()
      expect(wrapper.find('div.multitype-fieldgroup')).toHaveLength(1)

      wrapper
        .find('button.housingtype-paramset--new-button')
        .at(0)
        .simulate('click')
      wrapper.update()
      expect(wrapper.find('div.multitype-fieldgroup')).toHaveLength(2)

      expect(wrapper.find('AdvancedSearchSentence').text()).toMatch(/Show me rent regulated properties expiring before/)
    })

    it('adds Small Homes param sets when selection is made', () => {
      const wrapper = selectedHousingTypeWrapper({ selectValue: 'SMALL_HOMES' })

      expect(wrapper.find('select[name="housingTypeSelect"]').props().value).toEqual('SMALL_HOMES')
      expect(wrapper.find('div.housingtype-paramset--group')).toHaveLength(1)

      wrapper.find('button.housingtype-paramset--new-button').simulate('click')
      wrapper.update()
      expect(wrapper.find('div.multitype-fieldgroup')).toHaveLength(1)
      expect(wrapper.find('AdvancedSearchSentence').text()).toMatch(
        /Show me small home properties with at most 6 units/
      )
    })

    it('adds Market Rate param sets when selection is made', () => {
      const wrapper = selectedHousingTypeWrapper({ selectValue: 'MARKET_RATE' })

      expect(wrapper.find('select[name="housingTypeSelect"]').props().value).toEqual('MARKET_RATE')
      expect(wrapper.find('div.housingtype-paramset--group')).toHaveLength(0)
      expect(wrapper.find('AdvancedSearchSentence').text()).toMatch(/Show me market rate properties/)
    })

    it('adds Public Housing param sets when selection is made', () => {
      const wrapper = selectedHousingTypeWrapper({ selectValue: 'PUBLIC_HOUSING' })

      expect(wrapper.find('select[name="housingTypeSelect"]').props().value).toEqual('PUBLIC_HOUSING')
      expect(wrapper.find('div.housingtype-paramset--group')).toHaveLength(0)
      expect(wrapper.find('AdvancedSearchSentence').text()).toMatch(/Show me public housing properties/)
    })
  })

  describe('Conditions', () => {
    it('has initial state', () => {
      const wrapper = setupWrapper()
      expect(wrapper.find('ConditionComponent')).toHaveLength(1)
      expect(wrapper.find('ConditionComponent').props().condition.type).toEqual('AND')
      expect(wrapper.find('NewFilterSelect')).toHaveLength(0)
      expect(wrapper.find('FilterComponent')).toHaveLength(0)
    })

    it('it switches between conditions', () => {
      const wrapper = setupWrapper()
      wrapper.find('ConditionComponent button.switch-condition').simulate('click')
      wrapper.update()
      expect(wrapper.find('ConditionComponent').props().condition.type).toEqual('OR')
      expect(wrapper.find('NewFilterSelect')).toHaveLength(0)
      expect(wrapper.find('FilterComponent')).toHaveLength(0)
    })

    it('it shows a new filter select', () => {
      const wrapper = setupWrapper()
      wrapper.find('ConditionComponent button.add-filter').simulate('click')
      wrapper.update()
      expect(wrapper.find('NewFilterSelect')).toHaveLength(1)
      expect(wrapper.find('FilterComponent')).toHaveLength(0)
    })

    it('it cancels a new filter select', () => {
      const wrapper = setupWrapper()
      wrapper.find('ConditionComponent button.add-filter').simulate('click')
      wrapper.update()
      expect(wrapper.find('NewFilterSelect')).toHaveLength(1)
      expect(wrapper.find('FilterComponent')).toHaveLength(0)
      wrapper.find('ConditionComponent button.remove-add-filter').simulate('click')
      wrapper.update()
      expect(wrapper.find('NewFilterSelect')).toHaveLength(0)
      expect(wrapper.find('FilterComponent')).toHaveLength(0)
    })
  })

  describe('Filters', () => {
    it('has initial state', () => {
      const wrapper = selectedFilterWrapper({ selectValue: 'HPD_VIOLATION' })
      expect(wrapper.find('FilterComponent')).toHaveLength(1)
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
      expect(wrapper.find('AdvancedSearchSentence').text()).toMatch(/that have at least 100 HPD Violations/)
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
      expect(wrapper.find('AdvancedSearchSentence').text()).toMatch(/HPD Violations after 01\/01\/2020/)
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
        `HPD Violations between ${todayminus1year} and ${todayplus1year}`
      )
    })
  })
})
