// Feature Flags
export const ENABLE_PRINT = false // Shows print buttons
export const ENABLE_GOOGLE_ANALYTICS = process.env.REACT_APP_ENABLE_ANALYTICS === 'true'

// Generic
export const CONTACT_EMAIL = 'dapadmin@anhd.org'
export const TOKEN_EXPIRATIONS = {
  access: 5, // minutes
  refresh: 10, // hours
}

// Layout
export const SIDEBAR_COLUMN_SIZE = 4

// District Dashboard
export const CUSTOM_CARD_BACKGROUND_COLOR_CLASS = 'custom-turqouise'
export const MAP_MARKER_LIMIT = 1000

export const DISTRICT_REQUEST_DATE_FULL = 'full'
export const DISTRICT_REQUEST_DATE_ONE = 'recent'
export const DISTRICT_REQUEST_DATE_TWO = 'lastyear'
export const DISTRICT_REQUEST_DATE_THREE = 'last3years'
