import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import sinon from 'sinon'

import { ConditionComponent } from 'AdvancedSearch/ConditionComponent'
import { FilterComponent } from 'AdvancedSearch/FilterComponent'

import { Condition } from 'shared/classes/Condition'
import { ConditionFilter } from 'shared/classes/ConditionFilter'
import { Filter } from 'shared/classes/Filter'

configure({ adapter: new Adapter() })

const newCondition = ({ type = 'AND', key = '', filters = [] } = {}) => {
  return new Condition({ key, type, filters })
}

const newNestingCondition = ({ key = '', type = 'AND', conditionGroup = '1' } = {}) => {
  return new Condition({ key, type, filters: [new ConditionFilter({ conditionGroup: conditionGroup })] })
}

describe('ConditionComponent', () => {
  describe('Condition 0 ', () => {
    const conditionKey = '0'
    const condition = newCondition({ key: '0' })
    const conditions = { [conditionKey]: condition }
    const dispatch = sinon.spy()
    const wrapper = shallow(<ConditionComponent conditions={conditions} condition={condition} dispatch={dispatch} />)

    it('renders the component', () => {
      expect(wrapper.find('.condition')).toBeDefined()
      expect(wrapper.find('.remove-condition')).toHaveLength(0)
    })

    describe('With a nested condition', () => {
      const conditionKey = '0'
      const condition = newNestingCondition({ key: '0', conditionGroup: '1' })

      const conditions = {
        [conditionKey]: condition,
        '1': newCondition({ type: 'OR', filters: [] }),
      }
      const dispatch = sinon.spy()
      const wrapper = shallow(<ConditionComponent conditions={conditions} condition={condition} dispatch={dispatch} />)
      it('renders a second condition', () => {
        expect(wrapper.find(ConditionComponent)).toHaveLength(1)
      })

      it('does not render a remove condition button', () => {
        const button = wrapper.find('.remove-condition')
        expect(button).toHaveLength(0)
      })
    })
  })

  describe('Condition 1 ', () => {
    const conditionKey = '1'
    const condition = new Condition({
      key: conditionKey,
      type: 'AND',
      filters: [],
    })
    const conditions = { [conditionKey]: condition }
    const dispatch = sinon.spy()
    const wrapper = shallow(<ConditionComponent conditions={conditions} condition={condition} dispatch={dispatch} />)

    it('renders the component', () => {
      expect(wrapper.find('.condition')).toBeDefined()
      expect(wrapper.find('.remove-condition')).toHaveLength(1)
    })

    describe('With a nested condition', () => {
      const conditionKey = '1'
      const condition = newNestingCondition({ conditionGroup: '2' })
      const conditions = {
        '0': newNestingCondition({ conditionGroup: '1' }),
        [conditionKey]: condition,
        '2': newCondition({ key: '2' }),
      }
      const dispatch = sinon.spy()

      const wrapper = shallow(<ConditionComponent conditions={conditions} condition={condition} dispatch={dispatch} />)

      it('renders a second condition', () => {
        expect(wrapper.find(ConditionComponent)).toHaveLength(1)
      })

      it('does not render an add button component on this condition', () => {
        const button = wrapper.find('.add-condition')
        expect(button).toHaveLength(0)
      })

      it('renders a remove condition button', () => {
        const button = wrapper.find('.remove-condition')
        expect(button).toHaveLength(1)
      })
    })
  })

  describe('Any Condition ', () => {
    const conditionKey = '1'
    const condition = new Condition({
      key: conditionKey,
      type: 'AND',
      filters: [new Filter({ modelConstant: 'HPD_VIOLATION' })],
    })
    const conditions = { [conditionKey]: condition }
    const dispatch = sinon.spy()

    describe('With a filter', () => {
      const wrapper = shallow(<ConditionComponent conditions={conditions} condition={condition} dispatch={dispatch} />)

      it('renders a filter component', () => {
        expect(wrapper.find(FilterComponent)).toHaveLength(1)
      })
    })
  })
})
