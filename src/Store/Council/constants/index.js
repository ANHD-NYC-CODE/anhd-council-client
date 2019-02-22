export const HANDLE_GET_COUNCILS = 'HANDLE_GET_COUNCILS'
export const GET_COUNCILS = 'GET_COUNCILS'

export const HANDLE_GET_COUNCIL = 'HANDLE_GET_COUNCIL'
export const GET_COUNCIL = 'GET_COUNCIL'

export const HANDLE_GET_COUNCIL_HOUSING = 'HANDLE_GET_COUNCIL_HOUSING'
export const GET_COUNCIL_HOUSING = 'GET_COUNCIL_HOUSING'

export const HANDLE_GET_COUNCIL_PROPERTY_SUMMARY = 'HANDLE_GET_COUNCIL_PROPERTY_SUMMARY'
export const GET_COUNCIL_PROPERTY_SUMMARY = 'GET_COUNCIL_PROPERTY_SUMMARY'

export const constructSummaryConstant = (constant, params) => {
  const { type, value, sinceData } = params

  return [constant, type, value, sinceData].map(el => el.value.toUpperCase()).join('_')
}
