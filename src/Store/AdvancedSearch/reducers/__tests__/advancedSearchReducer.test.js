import * as r from '../'
import * as a from '../../actions'

describe('Advanced Search reducer', () => {
  it('should return the initial state', () => {
    expect(r.advancedSearchReducer(undefined, {})).toEqual(r.initialState)
  })

  describe('ADD_NEW_CONDITION', () => {
    const condition1 = { type: 'OR', filters: [] }
    it('adds to condition array, adds opposite type, adds condition filter', () => {
      const state = {
        conditions: [
          {
            type: 'AND',
            filters: [{ dataset: 1 }],
          },
        ],
      }
      const condition0 = {
        type: 'AND',
        filters: [{ conditionGroup: 1 }, { dataset: 1 }],
      }
      expect(r.advancedSearchReducer(state, a.addNewCondition(0))).toEqual({
        ...r.initialState,
        conditions: [condition0, condition1],
      })
    })
  })

  describe('REMOVE_LAST_CONDITION', () => {
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
      expect(r.advancedSearchReducer(state, a.removeLastCondition(condition))).toEqual({
        ...r.initialState,
        conditions: [r.initialState.conditions[0]],
      })
    })

    it('removes the last condition', () => {
      const state = {
        conditions: [
          {
            type: 'AND',
            filters: [{ conditionGroup: 1 }, { dataset: 1 }, { dataset: 2 }],
          },
          {
            type: 'OR',
            filters: [{ dataset: 3 }, { dataset: 4 }],
          },
        ],
      }

      expect(r.advancedSearchReducer(state, a.removeLastCondition(condition))).toEqual({
        ...r.initialState,
        conditions: [
          {
            type: 'AND',
            filters: [{ dataset: 1 }, { dataset: 2 }],
          },
        ],
      })
    })
  })

  describe('ADD_FILTER', () => {
    it('adds a filter', () => {
      const state = {
        conditions: [{ type: 'AND', filters: [{ dataset: 1 }, { dataset: 2 }] }],
      }

      const expectedConditions = [{ type: 'AND', filters: [{ dataset: 1 }, { dataset: 2 }, { dataset: 3 }] }]
      const filter = { dataset: 3 }
      expect(r.advancedSearchReducer(state, a.addFilter(0, filter))).toEqual({
        ...r.initialState,
        conditions: expectedConditions,
      })
    })

    it('adds a filter 2', () => {
      const state = {
        conditions: [
          { type: 'AND', filters: [{ dataset: 1 }, { dataset: 2 }, { dataset: 3 }] },
          { type: 'OR', filters: [{ dataset: 1 }, { dataset: 2 }, { dataset: 3 }] },
        ],
      }

      const expectedConditions = [
        { type: 'AND', filters: [{ dataset: 1 }, { dataset: 2 }, { dataset: 3 }, { dataset: 4 }] },
        { type: 'OR', filters: [{ dataset: 1 }, { dataset: 2 }, { dataset: 3 }] },
      ]
      const filter = { dataset: 4 }
      expect(r.advancedSearchReducer(state, a.addFilter(0, filter))).toEqual({
        ...r.initialState,
        conditions: expectedConditions,
      })
    })

    it('adds a filter 3', () => {
      const state = {
        conditions: [
          { type: 'AND', filters: [{ dataset: 1 }, { dataset: 2 }] },
          { type: 'OR', filters: [{ dataset: 3 }, { dataset: 4 }] },
          { type: 'AND', filters: [{ dataset: 6 }, { dataset: 7 }] },
        ],
      }

      const expectedConditions = [
        { type: 'AND', filters: [{ dataset: 1 }, { dataset: 2 }] },
        { type: 'OR', filters: [{ dataset: 3 }, { dataset: 4 }, { dataset: 5 }] },
        { type: 'AND', filters: [{ dataset: 6 }, { dataset: 7 }] },
      ]
      const filter = { dataset: 5 }
      expect(r.advancedSearchReducer(state, a.addFilter(1, filter))).toEqual({
        ...r.initialState,
        conditions: expectedConditions,
      })
    })
  })

  describe('UPDATE_FILTER', () => {
    it('updates a filter', () => {
      const state = {
        conditions: [{ type: 'AND', filters: [{ dataset: 1 }, { dataset: 2 }] }],
      }

      const expectedConditions = [{ type: 'AND', filters: [{ dataset: 1 }, { dataset: 3 }] }]
      expect(r.advancedSearchReducer(state, a.updateFilter(0, 1, { dataset: 3 }))).toEqual({
        ...r.initialState,
        conditions: expectedConditions,
      })
    })
  })

  describe('REMOVE_FILTER', () => {
    it('removes a filter', () => {
      const state = {
        conditions: [{ type: 'AND', filters: [{ dataset: 1 }, { dataset: 2 }] }],
      }

      const expectedConditions = [{ type: 'AND', filters: [{ dataset: 2 }] }]
      expect(r.advancedSearchReducer(state, a.removeFilter(0, 0))).toEqual({
        ...r.initialState,
        conditions: expectedConditions,
      })
    })

    it('removes a filter 2', () => {
      const state = {
        conditions: [
          { type: 'AND', filters: [{ dataset: 1 }, { dataset: 2 }] },
          { type: 'AND', filters: [{ dataset: 3 }, { dataset: 4 }] },
        ],
      }

      const expectedConditions = [
        { type: 'AND', filters: [{ dataset: 1 }, { dataset: 2 }] },
        { type: 'AND', filters: [{ dataset: 3 }] },
      ]
      expect(r.advancedSearchReducer(state, a.removeFilter(1, 1))).toEqual({
        ...r.initialState,
        conditions: expectedConditions,
      })
    })
  })
})
