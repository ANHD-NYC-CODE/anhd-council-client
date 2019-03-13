import React from 'react'
import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { setupStore } from 'shared/testUtilities'
import { Provider } from 'react-redux'
import AdvancedSearch from 'AdvancedSearch'
import { setupDatasetModels, setupHousingTypeModels } from 'shared/utilities/actionUtils'
import ConfigContext from 'Config/ConfigContext'

configure({ adapter: new Adapter() })

describe('AdvancedSearch', () => {
  const datasetsResponse = [{ model_name: 'hpdviolation' }]
  const dataset = {
    datasets: datasetsResponse,
    housingTypeModels: setupHousingTypeModels(datasetsResponse),
    datasetModels: setupDatasetModels(datasetsResponse),
  }
  const council = { districts: [{ id: 1 }] }
  const community = { boards: [{ id: 1 }] }
  const router = { location: { pathname: '/search' } }
  const store = setupStore({ dataset, council, community, router })
  const wrapper = mount(
    <Provider store={store}>
      <ConfigContext.Provider
        value={{
          datasets: dataset.datasets,
          datasetModels: dataset.datasetModels,
          housingTypeModels: dataset.housingTypeModels,
        }}
      >
        <AdvancedSearch />
      </ConfigContext.Provider>
    </Provider>
  )

  it('renders the component page', () => {
    expect(wrapper.find('AdvancedSearch')).toBeDefined()
    expect(wrapper.find('AdvancedSearchSentence')).toHaveLength(1)
    expect(wrapper.find('AdvancedSearchForm')).toHaveLength(1)
    expect(wrapper.find('ConditionComponent')).toHaveLength(1)
  })
})
