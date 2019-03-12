import { ParamError } from 'shared/classes/ParamError'
import moment from 'moment'

export const minValidate = paramMap => {
  if (paramMap._value >= paramMap._validations.min) return

  paramMap.addError(new ParamError({ message: `Value can not be less than ${paramMap._validations.min}` }))
}

export const maxValidate = paramMap => {
  if (paramMap._value <= paramMap._validations.max) return

  paramMap.addError(new ParamError({ message: `Value can not be greater than ${paramMap._validations.max}` }))
}

export const requiredValidate = paramMap => {
  if (paramMap.value) return

  paramMap.addError(new ParamError({ message: 'Value is required' }))
}

export const typeValidate = paramMap => {
  switch (paramMap.type) {
    case 'DATE':
      dateValidate(paramMap)
      break
    case 'YEAR':
      numberValidate(paramMap)
      break
    case 'AMOUNT':
      numberValidate(paramMap)
      break
    case 'PERCENT':
      numberValidate(paramMap)
      break
  }
}

const numberValidate = paramMap => {
  if (!isNaN(paramMap.value)) return

  paramMap.addError(new ParamError({ message: 'Value must be a number' }))
}

const dateValidate = paramMap => {
  if (moment(paramMap.value, 'YYYY-MM-DD', true).isValid()) return

  paramMap.addError(new ParamError({ message: 'Value must be a date - MM/DD/YYYY' }))
}
