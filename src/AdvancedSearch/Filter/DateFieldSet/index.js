import React from 'react'
import PropTypes from 'prop-types'

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
      <DateField type={props.type} onChangeParamMap={props.onChangeParamMap} paramMap={props.paramMap} />
    </div>
  )
}

DateFieldSet.propTypes = {
  onChangeParamMap: PropTypes.func,
  options: PropTypes.array,
  paramMap: PropTypes.object,
  paramMapIndex: PropTypes.number,
  type: PropTypes.string,
}

export default DateFieldSet
