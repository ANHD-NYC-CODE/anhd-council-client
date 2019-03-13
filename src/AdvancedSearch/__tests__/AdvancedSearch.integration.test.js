import React from 'react'
import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { setupStore } from 'shared/testUtilities'
import { Provider } from 'react-redux'
import AdvancedSearch from 'AdvancedSearch'
import { setupDatasetModels, setupHousingTypeModels } from 'shared/utilities/actionUtils'
import ConfigContext from 'Config/ConfigContext'

configure({ adapter: new Adapter() })

const setupWrapper = state => {
  if (!state) {
    const datasetsResponse = [{ model_name: 'hpdviolation' }]
    const dataset = {
      datasets: datasetsResponse,
      housingTypeModels: setupHousingTypeModels(datasetsResponse),
      datasetModels: setupDatasetModels(datasetsResponse),
    }
    const council = { districts: [{ id: 1 }, { id: 2 }, { id: 3 }] }
    const community = { boards: [{ id: 1 }] }
    const router = { location: { pathname: '/search' } }
    state = { dataset, council, community, router }
  }
  const store = setupStore(state)
  const wrapper = mount(
    <Provider store={store}>
      <ConfigContext.Provider
        value={{
          datasets: state.dataset.datasets,
          datasetModels: state.dataset.datasetModels,
          housingTypeModels: state.dataset.housingTypeModels,
        }}
      >
        <AdvancedSearch />
      </ConfigContext.Provider>
    </Provider>
  )

  return wrapper
}

const selectedBoundaryWrapper = ({ wrapper = undefined, selectValue = undefined, idValue = undefined } = {}) => {
  if (!wrapper) {
    wrapper = setupWrapper()
  }
  wrapper
    .find('select[name="boundaryType"]')
    .simulate('change', { target: { name: 'boundaryType', value: selectValue, dataset: { key: 'boundaryType' } } })

  wrapper.update()

  if (idValue) {
    wrapper
      .find('select[name="boundaryId"]')
      .simulate('change', { target: { name: 'boundaryId', value: idValue, dataset: { key: 'id' } } })
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
    .simulate('change', { target: { name: 'boundaryType', value: selectValue } })
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
  })

  describe('Advanced Search Form', () => {
    describe('Boundary Query Select', () => {
      it('has initial state', () => {
        const wrapper = setupWrapper()
        expect(wrapper.find('BoundaryQuery')).toHaveLength(1)
        expect(wrapper.find('select[name="boundaryType"]')).toHaveLength(1)
        expect(wrapper.find('select[name="boundaryId"]')).toHaveLength(0)

        expect(wrapper.find('select[name="boundaryType"]').props().value).toEqual(-1)
        expect(wrapper.find('select[name="boundaryType"] option')).toHaveLength(3)
      })

      it('switches between boundaries', () => {
        let wrapper = selectedBoundaryWrapper({ selectValue: 'COUNCIL' })
        expect(wrapper.find('select[name="boundaryType"]')).toHaveLength(1)
        expect(wrapper.find('select[name="boundaryType"]').props().value).toEqual('COUNCIL')

        wrapper = selectedBoundaryWrapper({ wrapper: wrapper, selectValue: 'COMMUNITY' })
        expect(wrapper.find('select[name="boundaryType"]')).toHaveLength(1)
        expect(wrapper.find('select[name="boundaryType"]').props().value).toEqual('COMMUNITY')
      })

      it('adds council districts when selected', () => {
        const wrapper = selectedBoundaryWrapper({ selectValue: 'COUNCIL', idValue: 3 })
        expect(wrapper.find('select[name="boundaryType"]').props().value).toEqual('COUNCIL')

        expect(wrapper.find('select[name="boundaryId"]')).toHaveLength(1)
        expect(wrapper.find('select[name="boundaryId"] option')).toHaveLength(4)
        expect(wrapper.find('select[name="boundaryId"]').props().value).toEqual(3)
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

        expect(wrapper.find('AdvancedSearchSentence').text()).toMatch(
          /Show me rent regulated properties expiring before/
        )
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
  })
})
