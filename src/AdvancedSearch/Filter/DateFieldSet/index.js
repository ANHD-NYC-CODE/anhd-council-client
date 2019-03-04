import React from 'react'
import PropTypes from 'prop-types'

import { Form, Row, Col } from 'react-bootstrap'
import CustomSelect from 'shared/components/CustomSelect'
import DateField from 'AdvancedSearch/Filter/DateField'

const DateFieldSet = props => {
  return (
    <div>
      <CustomSelect
        name="comparison"
        options={props.options}
        onChange={e => props.onChangeParamMap(props.paramMap, e)}
        size="sm"
        value={props.options.find(option => option.value === props.paramMap.comparison)}
      />
      <DateField dateType={props.dateType} onChangeParamMap={props.onChangeParamMap} paramMap={props.paramMap} />
    </div>
  )
}

DateFieldSet.propTypes = {
  onChangeParamMap: PropTypes.func,
  paramMap: PropTypes.object,
  paramMapIndex: PropTypes.number,
  dateType: PropTypes.string,
}

export default DateFieldSet
