import moment from 'moment'

// Generic
export const CONTACT_EMAIL = 'anhd.tech@gmail.com'

// Layout
export const SIDEBAR_COLUMN_SIZE = 4

// District Dashboard
export const CUSTOM_CARD_BACKGROUND_COLOR_CLASS = 'custom-turqouise'
export const MAP_MARKER_LIMIT = 1000
export const DISTRICT_RESULTS_DATE_ONE = moment() // The 1st of last month
  .subtract(1, 'months')
  .startOf('month')
  .format('YYYY-MM-DD')
export const DISTRICT_RESULTS_DATE_TWO = moment() // 1 year ago jan 1st.
  .startOf('year')
  .subtract('1', 'year')
  .format('YYYY-MM-DD')
export const DISTRICT_RESULTS_DATE_THREE = moment() // Three years jan 1st.
  .startOf('year')
  .subtract('3', 'year')
  .format('YYYY-MM-DD')
