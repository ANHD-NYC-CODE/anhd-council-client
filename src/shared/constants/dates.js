import moment from 'moment'

// District Dashboard
export const DISTRICT_RESULTS_DATE_ONE = moment() // last 30 days
  .subtract(30, 'days')
  .format('YYYY-MM-DD')
export const DISTRICT_RESULTS_DATE_TWO = moment() // 1 year ago jan 1st.
  .subtract('1', 'year')
  .format('YYYY-MM-DD')
export const DISTRICT_RESULTS_DATE_THREE = moment() // Three years jan 1st.
  .subtract('3', 'year')
  .format('YYYY-MM-DD')

// Custom Search
export const CUSTOM_DEFAULT_END_DATE = moment(moment.now()).format('YYYY-MM-DD')

export const CUSTOM_DEFAULT_START_DATE = moment(moment.now())
  .subtract(1, 'Y')
  .format('YYYY-MM-DD')
