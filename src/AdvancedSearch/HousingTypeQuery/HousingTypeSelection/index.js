import React from 'react'
import PropTypes from 'prop-types'
import * as ht from 'shared/constants/housingTypes'
import { HousingType } from 'shared/classes/HousingType'

import { updateHousingType } from 'Store/AdvancedSearch/actions'
import { Form } from 'react-bootstrap'
import CustomSelect from 'shared/components/CustomSelect'
import HousingTypeParamSet from 'AdvancedSearch/HousingTypeQuery/HousingTypeParamSet'

const changeHousingType = (dispatch, housingTypeIndex, option) => {
  const newHousingType = new HousingType({ housingType: option.value.value })

  dispatch(updateHousingType(housingTypeIndex, newHousingType))
}

const HousingTypeSelection = props => {
  const dispatchAction = () => {
    props.dispatch(updateHousingType(props.housingTypeIndex, props.housingType))
  }

  return (
    <div>
      <CustomSelect
        isSearchable={false}
        onChange={e => changeHousingType(props.dispatch, props.housingTypeIndex, e)}
        options={Object.keys(ht).map(key => ({
          value: { key: 'object', value: ht[key].constant },
          label: ht[key].name,
        }))}
        size="sm"
        value={{ value: props.housingType.constant, label: props.housingType.name.toLowerCase() }}
      />

      {!!Object.keys(props.housingType.paramsObject).length && <Form.Label>Options</Form.Label>}
      {Object.keys(props.housingType.paramsObject).map((paramsSetKey, paramSetIndex) => (
        <HousingTypeParamSet
          dispatchAction={dispatchAction}
          key={`housingtype-paramset-${paramSetIndex}`}
          paramSet={props.housingType.paramsObject[paramsSetKey]}
        />
      ))}
    </div>
  )
}

HousingTypeSelection.propTypes = {
  dispatch: PropTypes.func,
  housingType: PropTypes.object,
  housingTypeIndex: PropTypes.number,
}

export default HousingTypeSelection
