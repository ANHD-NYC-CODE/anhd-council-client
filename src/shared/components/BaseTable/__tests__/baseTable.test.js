import React from 'react'
import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import sinon from 'sinon'
import BaseTable from 'shared/components/BaseTable'
import { TableConfig } from 'shared/classes/TableConfig'

configure({ adapter: new Adapter() })

const hpdProblemRecords = [
  {
    problemid: '1',
    type: 'a',
    unittype: 'b',
    spacetype: 'c',
    majorcategory: 'd',
    minorcategory: 'e',
    code: 'f',
    statusdescription: 'g',
  },
  {
    problemid: '2',
    type: 'a',
    unittype: 'b',
    spacetype: 'c',
    majorcategory: 'd',
    minorcategory: 'e',
    code: 'f',
    statusdescription: 'g',
  },
]
const records = [
  {
    complaintid: '1',
    receiveddate: '2018-01-01',
    apartment: '1a',
    status: 'CLOSE',
    hpdproblems: hpdProblemRecords,
  },
  {
    complaintid: '2',
    receiveddate: '2018-01-01',
    apartment: '1b',
    status: 'CLOSE',
    hpdproblems: [],
  },
]

const tableConfig = new TableConfig({ resourceConstant: 'HPD_COMPLAINT' })
describe('BaseTable', () => {
  it('loads table data', () => {
    const wrapper = mount(<BaseTable records={records} tableConfig={tableConfig} />)
    expect(wrapper.find('tbody tr')).toHaveLength(2)
  })

  describe('cell click', () => {
    it('expands the row with the cell data', () => {
      const wrapper = mount(<BaseTable records={records} tableConfig={tableConfig} />)
      wrapper
        .find('tbody td')
        .at(1)
        .simulate('click')
      wrapper.update()
      expect(wrapper.find('tbody tr')).toHaveLength(3)
      expect(wrapper.find('tbody .card')).toHaveLength(1)
      expect(wrapper.find('tbody .card').text()).toMatch(/01\/01\/2018View HPD Online/)
    })

    it('expands the nested table row', () => {
      const wrapper = mount(<BaseTable records={records} tableConfig={tableConfig} />)
      wrapper
        .find('tbody td')
        .at(4)
        .simulate('click')
      wrapper.update()

      expect(wrapper.find('tbody tr')).toHaveLength(6)
      expect(wrapper.find('tbody .card')).toHaveLength(1)
      expect(wrapper.find('tbody .card').text()).toMatch(
        /Problem IDUrgencyUnit TypeSpace TypeMajor CategoryMinor CategoryDescriptorFull Description/
      )
    })
  })

  describe('filters', () => {
    jest.useFakeTimers()

    it('clears filters', () => {
      const wrapper = mount(<BaseTable records={records} tableConfig={tableConfig} />)
      wrapper
        .find('thead th')
        .at(3)
        .find('input')
        .simulate('change', { target: { value: 'OPEN' } })
      jest.runAllTimers()
      wrapper.update()
      expect(wrapper.find('tbody tr')).toHaveLength(1)
      expect(wrapper.find('tbody tr').text()).toMatch(/Clear Filters/)

      wrapper.find('tbody tr button').simulate('click')
      wrapper.update()

      expect(wrapper.find('tbody tr')).toHaveLength(2)
    })
  })
})
