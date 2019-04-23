import * as r from '../'
import * as a from '../../actions'
import Geography from 'shared/classes/Geography'
import Condition from 'shared/classes/Condition'

import ConditionFilter from 'shared/classes/ConditionFilter'

describe('Custom Search reducer', () => {
  it('should return the initial state', () => {
    expect(r.advancedSearchReducer(undefined, {})).toEqual(r.initialState())
  })

  describe('ADD_NEW_CONDITION', () => {
    const newConditionId = '1'
    const condition1 = new Condition({ key: newConditionId, type: 'AND', filters: [] })
    describe('without an optional filter', () => {
      it('adds to condition array, adds condition filter at end', () => {
        const state = {
          ...r.initialState(),
          conditions: {
            '0': new Condition({ key: '0', type: 'AND', filters: [] }),
          },
        }
        const expectedCondition0 = new Condition({
          key: '0',
          type: 'AND',
          filters: [new ConditionFilter({ conditionGroup: newConditionId })],
        })
        expect(
          r.advancedSearchReducer(state, a.addNewCondition({ parentKey: '0', conditionKey: newConditionId }))
        ).toEqual({
          ...r.initialState(),
          conditions: { '0': expectedCondition0, [newConditionId]: condition1 },
        })
      })
    })

    describe('with an optional filter', () => {
      const newConditionId = '1'
      it('moves the filter to the new condition, creates a conditionGroup in the parent condition, and deletes the filter from the parent condition', () => {
        const state = {
          ...r.initialState(),
          conditions: {
            '0': new Condition({ key: '0', type: 'AND', filters: [{ id: 1 }] }),
          },
        }
        const expectedConditions = {
          '0': new Condition({
            key: '0',
            type: 'AND',
            filters: [new ConditionFilter({ conditionGroup: newConditionId })],
          }),
          [newConditionId]: new Condition({
            key: newConditionId,
            type: 'AND',
            filters: [{ id: 1 }],
          }),
        }

        expect(
          r.advancedSearchReducer(
            state,
            a.addNewCondition({ parentKey: '0', conditionKey: newConditionId, filterIndex: 0 })
          )
        ).toEqual({
          ...r.initialState(),
          conditions: expectedConditions,
        })
      })
    })
  })

  describe('ADD_NEW_CONDITION_GROUP', () => {
    const filters = [{ id: 1 }, { id: 2 }]
    it('adds an empty condition of opposite type as a parent, movies filter to child ', () => {
      const state = {
        ...r.initialState(),
        conditions: {
          '0': new Condition({ key: '0', type: 'AND', filters: filters }),
        },
      }
      const expectedCondition0 = new Condition({
        key: '0',
        type: 'OR',
        filters: [new ConditionFilter({ conditionGroup: '1' })],
      })
      const expectedCondition1 = new Condition({
        key: '1',
        type: 'AND',
        filters: filters,
      })
      expect(
        r.advancedSearchReducer(state, a.addNewConditionGroup({ parentKey: '0', conditionKey: '1', filters }))
      ).toEqual({
        ...r.initialState(),
        conditions: { '0': expectedCondition0, '1': expectedCondition1 },
      })
    })
  })

  describe('CHANGE_CONDITION_TYPE', () => {
    describe('condition0', () => {
      it('changes the condition type', () => {
        const state = {
          ...r.initialState(),
          conditions: {
            '0': new Condition({ key: '0', type: 'AND', filters: [] }),
          },
        }
        const expectedCondition0 = new Condition({
          key: '0',
          type: 'OR',
          filters: [],
        })
        expect(r.advancedSearchReducer(state, a.changeConditionType('0', 'OR'))).toEqual({
          ...r.initialState(),
          conditions: { '0': expectedCondition0 },
        })
      })
    })
  })

  describe('REMOVE_CONDITION', () => {
    const state = {
      ...r.initialState(),
      conditions: {
        '0': new Condition({ key: '0', type: 'AND', filters: [] }),
      },
      results: undefined,
    }
    const conditionId = '0'
    it('replaces with the initial state', () => {
      expect(r.advancedSearchReducer(state, a.removeCondition(conditionId))).toEqual({
        ...r.initialState(),
        conditions: { ...r.initialState().conditions },
      })
    })

    it('removes the last condition', () => {
      const conditionId = '1'
      const state = {
        ...r.initialState(),
        conditions: {
          '0': new Condition({
            key: '0',
            type: 'AND',
            filters: [new ConditionFilter({ conditionGroup: conditionId })],
          }),

          [conditionId]: new Condition({ key: conditionId, type: 'AND', filters: [] }),
        },
      }

      expect(r.advancedSearchReducer(state, a.removeCondition(conditionId))).toEqual({
        ...r.initialState(),
        conditions: {
          '0': new Condition({ key: '0', type: 'AND', filters: [] }),
        },
      })
    })
  })

  describe('ADD_GEOGRAPHY', () => {
    it('adds a geographies', () => {
      const state = {
        ...r.initialState(),
      }

      const geography = new Geography('COUNCIL', 1)
      const expectedGeographies = [geography]
      expect(r.advancedSearchReducer(state, a.addGeography(geography))).toEqual({
        ...r.initialState(),
        geographies: expectedGeographies,
      })
    })
  })

  describe('UPDATE_GEOGRAPHY', () => {
    it('updates a geographies', () => {
      const geography = new Geography('COUNCIL', 1)
      const state = {
        ...r.initialState(),
        geographies: [geography],
      }

      geography.id = 2
      const expectedGeographies = [geography]

      expect(r.advancedSearchReducer(state, a.updateGeography(0, geography))).toEqual({
        ...r.initialState(),
        geographies: expectedGeographies,
      })
    })
  })

  describe('REMOVE_GEOGRAPHY', () => {
    it('removes a geographies', () => {
      const state = {
        ...r.initialState(),
        geographies: [{ object: { queryName: 'council' }, id: '1' }],
      }

      const expectedGeographies = []

      expect(r.advancedSearchReducer(state, a.removeGeography(0))).toEqual({
        ...r.initialState(),
        geographies: expectedGeographies,
      })
    })
  })
})
