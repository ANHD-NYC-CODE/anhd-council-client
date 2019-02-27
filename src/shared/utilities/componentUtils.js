import React from 'react'
import Select from 'react-select'
import { Form } from 'react-bootstrap'
import DateField from 'AdvancedSearch/Filter/DateFilter'

export const convertFieldsToComponents = (field, filterValues = {}, onChange) => {
  switch (field.type) {
    case 'INTEGER':
      return (
        <div>
          <Select
            name="comparison"
            options={field.options}
            onChange={e => onChange({ name: 'comparison', value: e.value })}
            value={field.options.find(option => option.value === filterValues.comparison)}
          />
          <Form.Control name="value" onChange={onChange} type="number" value={filterValues.value} />
        </div>
      )
    case 'DATE':
      return <DateField field={field} filterValues={filterValues} onChange={onChange} />
  }
}
