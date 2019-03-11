import * as r from '../'
import * as a from '../../actions'
import { Boundary } from 'shared/classes/Boundary'
import { Condition } from 'shared/classes/Condition'

import { ConditionFilter } from 'shared/classes/ConditionFilter'
import { HousingType } from 'shared/classes/HousingType'

describe('Advanced Search reducer', () => {
  it('should return the initial state', () => {
    expect(r.advancedSearchReducer(undefined, {})).toEqual(r.initialState)
    expect(r.advancedSearchReducer(undefined, {}).housingTypes.length).toEqual(1)
  })

  describe('ADD_NEW_CONDITION', () => {
    const conditionId = '1'
    const condition1 = new Condition({ key: conditionId, type: 'OR', filters: [] })
    it('adds to condition array, adds opposite type, adds condition filter at end', () => {
      const state = {
        ...r.initialState,
        conditions: {
          '0': new Condition({ key: '0', type: 'AND', filters: [] }),
        },
      }
      const expectedCondition0 = new Condition({
        key: '0',
        type: 'AND',
        filters: [new ConditionFilter({ conditionGroup: conditionId })],
      })
      expect(r.advancedSearchReducer(state, a.addNewCondition('0', conditionId))).toEqual({
        ...r.initialState,
        conditions: { '0': expectedCondition0, [conditionId]: condition1 },
      })
    })
  })

  describe('CHANGE_CONDITION_TYPE', () => {
    describe('condition0', () => {
      it('changes the condition type', () => {
        const state = {
          ...r.initialState,
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
          ...r.initialState,
          conditions: { '0': expectedCondition0 },
        })
      })
    })
  })

  describe('REMOVE_CONDITION', () => {
    const state = {
      ...r.initialState,
      conditions: {
        '0': new Condition({ key: '0', type: 'AND', filters: [] }),
      },
      results: undefined,
    }
    const conditionId = '0'
    it('replaces with the initial state', () => {
      expect(r.advancedSearchReducer(state, a.removeCondition(conditionId))).toEqual({
        ...r.initialState,
        conditions: { ...r.initialState.conditions },
      })
    })

    it('removes the last condition', () => {
      const conditionId = '1'
      const state = {
        ...r.initialState,
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
        ...r.initialState,
        conditions: {
          '0': new Condition({ key: '0', type: 'AND', filters: [] }),
        },
      })
    })
  })

  describe('ADD_BOUNDARY', () => {
    it('adds a boundaries', () => {
      const state = {
        ...r.initialState,
      }

      const boundary = new Boundary('COUNCIL', 1)
      const expectedBoundaries = [boundary]
      expect(r.advancedSearchReducer(state, a.addBoundary(boundary))).toEqual({
        ...r.initialState,
        boundaries: expectedBoundaries,
      })
    })
  })

  describe('UPDATE_BOUNDARY', () => {
    it('updates a boundaries', () => {
      const boundary = new Boundary('COUNCIL', 1)
      const state = {
        ...r.initialState,
        boundaries: [boundary],
      }

      boundary.id = 2
      const expectedBoundaries = [boundary]

      expect(r.advancedSearchReducer(state, a.updateBoundary(0, boundary))).toEqual({
        ...r.initialState,
        boundaries: expectedBoundaries,
      })
    })
  })

  describe('REMOVE_BOUNDARY', () => {
    it('removes a boundaries', () => {
      const state = {
        ...r.initialState,
        boundaries: [{ object: { queryName: 'council' }, id: '1' }],
      }

      const expectedBoundaries = []

      expect(r.advancedSearchReducer(state, a.removeBoundary(0))).toEqual({
        ...r.initialState,
        boundaries: expectedBoundaries,
      })
    })
  })

  describe('ADD_HOUSING_TYPE', () => {
    it('adds a housingTypes', () => {
      const state = {
        ...r.initialState,
        housingTypes: [],
      }

      const housingType = new HousingType({ housingType: 'SMALL_HOMES' })
      const expected = [housingType]

      expect(r.advancedSearchReducer(state, a.addHousingType(housingType))).toEqual({
        ...r.initialState,
        housingTypes: expected,
      })
    })
  })

  describe('UPDATE_HOUSING_TYPE', () => {
    it('updates a housingTypes', () => {
      const state = {
        ...r.initialState,
        housingTypes: [new HousingType({ housingType: 'SMALL_HOMES' })],
      }

      const updatedObject = new HousingType({ housingType: 'MARKET_RATE' })
      const expected = [updatedObject]

      expect(r.advancedSearchReducer(state, a.updateHousingType(0, updatedObject))).toEqual({
        ...r.initialState,
        housingTypes: expected,
      })
    })
  })

  describe('REMOVE_HOUSING_TYPE', () => {
    it('removes a housingTypes', () => {
      const state = {
        ...r.initialState,
        housingTypes: [new HousingType({ housingType: 'SMALL_HOMES' })],
      }

      const expected = []

      expect(r.advancedSearchReducer(state, a.removeHousingType(0))).toEqual({
        ...r.initialState,
        housingTypes: expected,
      })
    })
  })
})
