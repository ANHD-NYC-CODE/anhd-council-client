import * as r from '../'
import * as a from '../../actions'
import * as c from '../../constants'

describe('Advanced Search reducer', () => {
  it('should return the initial state', () => {
    expect(r.advancedSearchReducer(undefined, {})).toEqual(r.initialState)
  })

  describe('ADD_CONDITION', () => {
    const condition = { type: 'AND', filters: [{ dataset: 1 }, { dataset: 2 }] }
    it('replace initial state', () => {
      expect(r.advancedSearchReducer(undefined, a.addCondition(condition))).toEqual({
        ...r.initialState,
        conditions: [condition],
      })
    })

    it('adds to array', () => {
      const state = {
        conditions: [
          {
            type: 'AND',
            filters: [{ dataset: 1 }],
          },
        ],
      }
      expect(r.advancedSearchReducer(state, a.addCondition(condition))).toEqual({
        ...r.initialState,
        conditions: [state.conditions[0], condition],
      })
    })
  })

  describe('ADD_CONDITION', () => {
    const state = {
      conditions: [
        {
          type: 'AND',
          filters: [{ dataset: 1 }],
        },
      ],
    }
    const condition = state.conditions[0]
    it('replaces with the initial state', () => {
      expect(r.advancedSearchReducer(state, a.removeCondition(condition))).toEqual({
        ...r.initialState,
        conditions: [r.initialState.conditions[0]],
      })
    })

    it('removes the exact condition', () => {
      const state = {
        conditions: [
          {
            type: 'AND',
            filters: [{ dataset: 1 }, { dataset: 2 }],
          },
          {
            type: 'OR',
            filters: [{ dataset: 3 }, { dataset: 4 }],
          },
        ],
      }
      const condition = {
        type: 'AND',
        filters: [{ dataset: 1 }, { dataset: 2 }],
      }
      expect(r.advancedSearchReducer(state, a.removeCondition(condition))).toEqual({
        ...r.initialState,
        conditions: [
          {
            type: 'OR',
            filters: [{ dataset: 3 }, { dataset: 4 }],
          },
        ],
      })
    })
  })
})
