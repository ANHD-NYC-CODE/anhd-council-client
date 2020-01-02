import React from 'react'
import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import BaseTable from 'shared/components/BaseTable'
import TableConfig from 'shared/classes/TableConfig'
import ConfigContext from 'Config/ConfigContext'
import { createHpdComplaintProblemMock } from 'shared/testUtilities/mocks'

configure({ adapter: new Adapter() })

const records = [
  createHpdComplaintProblemMock({
    complaintid: '1',
    problemid: '1',
    status: 'CLOSE',
  }),
  createHpdComplaintProblemMock({
    complaintid: '2',
    problemid: '2',
    status: 'CLOSE',
  }),
]

const tableConfig = new TableConfig({ resourceConstant: 'HPD_COMPLAINT' })

const setupWrapper = (records, tableConfig) => {
  return mount(
    <ConfigContext.Provider
      value={{ infoModals: {}, datasets: [{ model_name: 'hpdcomplaint', last_updated: '2018-01-01', version: '' }] }}
    >
      <BaseTable records={records} tableConfig={tableConfig} />
    </ConfigContext.Provider>
  )
}

describe('BaseTable', () => {
  it('loads table data', () => {
    const wrapper = setupWrapper(records, tableConfig)
    expect(wrapper.find('tbody tr')).toHaveLength(2)
  })

  describe('cell click', () => {
    it('expands the row', () => {
      const wrapper = setupWrapper(records, tableConfig)
      expect(wrapper.find('tbody tr')).toHaveLength(2)
      wrapper
        .find('tbody td.table-column--description')
        .at(1)
        .simulate('click')
      wrapper.update()

      expect(wrapper.find('tbody tr')).toHaveLength(3)
      expect(wrapper.find('.expanded-row')).toHaveLength(1)
    })

    it('sorts the columns', () => {
      const wrapper = setupWrapper(records, tableConfig)
      wrapper
        .find('thead th.sortable')
        .at(0)
        // .simulate('click')
        .simulate('click')
      wrapper.update()

      expect(
        wrapper
          .find('tbody tr')
          .at(0)
          .find('td')
          .at(0)
          .text()
      ).toMatch('2')

      expect(
        wrapper
          .find('tbody tr')
          .at(1)
          .find('td')
          .at(0)
          .text()
      ).toMatch('1')
    })
  })

  describe('filters', () => {
    jest.useFakeTimers()

    describe('with matches', () => {
      const records = [
        createHpdComplaintProblemMock({
          complaintid: '1',
          problemid: '1',
          status: 'CLOSE',
        }),
        createHpdComplaintProblemMock({
          complaintid: '2',
          problemid: '2',
          status: 'CLOSE',
        }),
        createHpdComplaintProblemMock({
          complaintid: '3',
          problemid: '3',
          status: 'CLOSE',
        }),
      ]
      it('finds no matches', () => {
        const wrapper = setupWrapper(records, tableConfig)
        expect(wrapper.find('tbody tr')).toHaveLength(3)

        wrapper
          .find('.table-filter-button-group .table-filter-button')
          .at(3)
          .simulate('click')
        jest.runAllTimers()
        wrapper.update()
        expect(wrapper.find('tbody tr')).toHaveLength(1)
        expect(wrapper.find('tbody tr').text()).toMatch(/No records found/)
      })
    })

    describe('without matches', () => {
      const records = [
        createHpdComplaintProblemMock({
          complaintid: '1',
          problemid: '1',
          status: 'OPEN',
        }),
        createHpdComplaintProblemMock({
          complaintid: '2',
          problemid: '2',
          status: 'OPEN',
        }),
        createHpdComplaintProblemMock({
          complaintid: '3',
          problemid: '3',
          status: 'CLOSE',
        }),
      ]
      it('filters', () => {
        const wrapper = setupWrapper(records, tableConfig)
        expect(wrapper.find('tbody tr')).toHaveLength(3)
        wrapper
          .find('.table-filter-button-group .table-filter-button')
          .at(3)
          .simulate('click')

        jest.runAllTimers()
        wrapper.update()
        expect(wrapper.find('tbody tr')).toHaveLength(2)
      })
    })
  })
})
