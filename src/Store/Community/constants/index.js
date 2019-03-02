export const HANDLE_GET_COMMUNITIES = 'HANDLE_GET_COMMUNITIES'
export const GET_COMMUNITIES = 'GET_COMMUNITIES'

export const HANDLE_GET_COMMUNITY = 'HANDLE_GET_COMMUNITY'
export const GET_COMMUNITY = 'GET_COMMUNITY'

export const HANDLE_GET_COMMUNITY_HOUSING = 'HANDLE_GET_COMMUNITY_HOUSING'
export const GET_COMMUNITY_HOUSING = 'GET_COMMUNITY_HOUSING'

export const HANDLE_GET_COMMUNITY_PROPERTY_SUMMARY = 'HANDLE_GET_COMMUNITY_PROPERTY_SUMMARY'
export const GET_COMMUNITY_PROPERTY_SUMMARY = 'GET_COMMUNITY_PROPERTY_SUMMARY'

export const GET_COMMUNITY_PROPERTIES = 'GET_COMMUNITY_PROPERTIES'

export const constructSummaryConstant = (constant, params) => {
  const { type, value, comparison, startDate, endDate } = params

  return [constant, type, comparison, value, startDate, endDate]
    .filter(el => el)
    .map(el => el.toUpperCase())
    .join('_')
}
