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
      const wrapper = setupWrapper()
      it('adds council districts when selected', () => {
        expect(wrapper.find('BoundaryQuery')).toHaveLength(1)
        expect(wrapper.find('select[name="boundaryType"]').props().value).toEqual(-1)
        expect(wrapper.find('select[name="boundaryType"] option')).toHaveLength(3)

        wrapper
          .find('select[name="boundaryType"]')
          .simulate('change', { target: { name: 'boundaryType', value: 'COUNCIL' } })

        wrapper.update()
        expect(wrapper.find('select[name="boundaryType"]').props().value).toEqual('COUNCIL')
        expect(wrapper.find('select[name="boundaryId"]').props().value).toEqual(-1)
        expect(wrapper.find('select[name="boundaryId"] option')).toHaveLength(4)

        wrapper
          .find('select[name="boundaryId"]')
          .simulate('change', { target: { name: 'boundaryId', value: 3, dataset: { key: 'id' } } })
        wrapper.update()
        expect(wrapper.find('select[name="boundaryId"]').props().value).toEqual(3)
      })
    })
  })
})
