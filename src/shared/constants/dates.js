import dayjs from 'dayjs'

// District Dashboard
export const DISTRICT_RESULTS_DATE_ONE = dayjs() // last 30 days
  .subtract(30, 'days')
  .format('YYYY-MM-DD')
export const DISTRICT_RESULTS_DATE_TWO = dayjs() // 1 year ago jan 1st.
  .subtract(1, 'year')
  .format('YYYY-MM-DD')
export const DISTRICT_RESULTS_DATE_THREE = dayjs() // Three years jan 1st.
  .subtract(3, 'year')
  .format('YYYY-MM-DD')

// Custom Search
export const CUSTOM_DEFAULT_END_DATE = dayjs().format('YYYY-MM-DD')

export const CUSTOM_DEFAULT_START_DATE = dayjs()
  .subtract(1, 'year')
  .format('YYYY-MM-DD')
