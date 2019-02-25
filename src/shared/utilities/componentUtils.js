import React from 'react'
import Select from 'react-select'
import { Form } from 'react-bootstrap'
import DateField from 'AdvancedSearch/Filter/DateFilter'

export const convertFieldsToComponents = (field, filterValues = {}) => {
  switch (field.type) {
    case 'INTEGER':
      return (
        <div>
          <Select
            name="comparison"
            options={field.options}
            defaultValue={field.options.find(option => option.value === 'gte')}
            value={field.options.find(option => option.value === filterValues.comparison)}
          />
          <Form.Control name="value" type="number" defaultValue="10" value={filterValues.value} />
        </div>
      )
    case 'DATE':
      return (
        <div>
          <DateField field={field} filterValues={filterValues} />
        </div>
      )
  }
}
