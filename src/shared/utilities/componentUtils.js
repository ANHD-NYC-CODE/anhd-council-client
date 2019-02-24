import React from 'react'
import Select from 'react-select'
import { Form } from 'react-bootstrap'

export const convertFieldsToComponents = field => {
  switch (field.type) {
    case 'INTEGER':
      return (
        <div>
          <Select options={field.options} value={field.options.find(option => option.value === 'gte')} />
          <Form.Control type="number" defaultValue="10" />
        </div>
      )
    case 'DATE':
      return (
        <div>
          <Select options={field.options} value={field.options.find(option => option.value === 'start')} />
          <Form.Control type="date" defaultValue="01/01/2017" />
        </div>
      )
  }
}
