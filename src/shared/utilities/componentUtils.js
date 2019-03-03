import React from 'react'
import CustomSelect from 'shared/components/CustomSelect'
import { Form, Row, Col } from 'react-bootstrap'
import DateField from 'AdvancedSearch/Filter/DateFilter'

export const convertFieldsToComponents = (field, filter = {}, onChange, index, dataset) => {
  switch (field.type) {
    case 'INTEGER':
      return (
        <Form.Group key={`filterField-${index}`} as={Col} md="3">
          <Row>
            <Col md="8">
              <CustomSelect
                name="comparison"
                options={field.options}
                onChange={e => onChange({ name: 'comparison', value: e.value })}
                size="sm"
                value={field.options.find(option => option.value === filter.comparison)}
              />
            </Col>
            <Col md="4">
              <Form.Control name="value" onChange={onChange} size="sm" type="number" value={filter.value} />
            </Col>
          </Row>
        </Form.Group>
      )
    case 'DATE':
      return (
        <Col md="6" key={`filterField-${index}`}>
          <DateField dataset={dataset} field={field} filter={filter} onChange={onChange} type="date" />
        </Col>
      )
    case 'YEAR':
      return (
        <Col md="6" key={`filterField-${index}`}>
          <DateField dataset={dataset} field={field} filter={filter} onChange={onChange} type="number" />
        </Col>
      )
  }
}
