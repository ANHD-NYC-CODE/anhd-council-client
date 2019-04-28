import React from 'react'
import { textFilter } from 'react-bootstrap-table2-filter'
import classnames from 'classnames'
export default class BaseTableConfig {
  constructor() {
    this._filters = {}
    this._selectedFilters = {}
    this._filterPrototypes = {
      ...this.createFilterPrototype('HPD_VIOLATION_OPEN'),
      ...this.createFilterPrototype('HPD_VIOLATION_CLASS'),
    }
    this._filterFunctions = {
      ...this.createFilterFunction('HPD_VIOLATION_OPEN'),
      ...this.createFilterFunction('HPD_VIOLATION_CLASS'),
    }
    this.filterButtonSets = {
      HPD_VIOLATION: [
        this.createFilterButtonSet(
          'HPD_VIOLATION',
          'HPD_VIOLATION_OPEN',
          [this.createFilterItem('Open', 'open')],
          'All'
        ),
        this.createFilterButtonSet(
          'HPD_VIOLATION',
          'HPD_VIOLATION_CLASS',
          [
            this.createFilterItem('Class A', 'A'),
            this.createFilterItem('Class B', 'B'),
            this.createFilterItem('Class C', 'C'),
          ],
          'All'
        ),
      ],
    }
  }

  get filters() {
    return this._filters
  }

  set filters(filters) {
    this._filters = filters
  }

  get filterPrototypes() {
    return this._filterPrototypes
  }

  set filterPrototypes(filterPrototypes) {
    this._filterPrototypes = filterPrototypes
  }

  get filterFunctions() {
    return this._filterFunctions
  }

  set filterFunctions(filterFunctions) {
    this._filterFunctions = filterFunctions
  }

  get selectedFilters() {
    return this._selectedFilters
  }

  set selectedFilters(selectedFilters) {
    this._selectedFilters = selectedFilters
  }

  clearFilterGroup(filterConstant) {
    Object.keys(this.selectedFilters).map(key => {
      if (key.includes(filterConstant)) {
        this.filterFunctions[filterConstant](undefined, '')
        this.selectedFilters = { ...this.selectedFilters, [key]: '' }
      }
    })
  }

  createFilterPrototype(constant) {
    return {
      [constant]: textFilter({
        getFilter: filter => {
          this.filters[constant] = filter
        },
      }),
    }
  }

  createFilterFunction(constant) {
    return {
      [constant]: (e, value) => {
        this.filters[constant](value)
        if (value) {
          this.selectedFilters = { ...this.selectedFilters, [constant + value]: true }
        }
      },
    }
  }

  createFilterItem(label, value) {
    return { label, value }
  }

  createFilterButtonSet(resourceConstant, filterConstant, valuesArray, clearLabel) {
    return selectedFilters => {
      return (
        <div key={`${filterConstant}`} className="table-filter-button-group">
          {valuesArray.map((item, index) => {
            return (
              <button
                key={`button-${filterConstant}-${index}`}
                className={`${classnames('table-filter-button', 'btn', {
                  'btn-primary': !!selectedFilters[filterConstant + item.value],
                })}`}
                onClick={e => {
                  this.clearFilterGroup(filterConstant)
                  this.filterFunctions[filterConstant](e, item.value)
                }}
              >
                {item.label}
              </button>
            )
          })}

          <button
            className={`${classnames('table-filter-button', 'btn', {
              'btn-primary': !Object.keys(selectedFilters).find(
                key => key.includes(filterConstant) && selectedFilters[key]
              ),
            })}`}
            onClick={() => this.clearFilterGroup(filterConstant)}
          >
            {clearLabel}
          </button>
        </div>
      )
    }
  }
}
