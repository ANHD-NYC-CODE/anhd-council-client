import moment from 'moment'

// Generic
export const CONTACT_EMAIL = 'anhd.tech@gmail.com'

// Layout
export const SIDEBAR_COLUMN_SIZE = 4

// District Dashboard
export const CUSTOM_CARD_BACKGROUND_COLOR_CLASS = 'custom-turqouise'
export const MAP_MARKER_LIMIT = 1000
export const DISTRICT_RESULTS_DATE_ONE = moment() // last 30 days
  .subtract(30, 'days')
  .format('YYYY-MM-DD')
export const DISTRICT_RESULTS_DATE_TWO = moment() // 1 year ago jan 1st.
  .subtract('1', 'year')
  .format('YYYY-MM-DD')
export const DISTRICT_RESULTS_DATE_THREE = moment() // Three years jan 1st.
  .subtract('3', 'year')
  .format('YYYY-MM-DD')

export const DISTRICT_REQUEST_DATE_ONE = 'recent'
export const DISTRICT_REQUEST_DATE_TWO = 'lastyear'
export const DISTRICT_REQUEST_DATE_THREE = 'last3years'
