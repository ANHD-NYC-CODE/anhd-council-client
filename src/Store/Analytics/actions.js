import ReactGA from 'react-ga'
import { constructCsvFileName } from 'Store/AdvancedSearch/utilities/advancedSearchStoreUtils'
export const fireCsvDownloadEvent = fileName => (dispatch, getState) => {
  const userId = getState().auth.user ? getState().auth.user.id : undefined
  ReactGA.event({
    category: 'Csv',
    action: 'download',

    label: fileName,
  })
}

export const fireUserLoginEvent = (userId, email) => (dispatch, getState) => {
  const userId = getState().auth.user ? getState().auth.user.id : undefined
  ReactGA.event({
    category: 'User',
    action: 'Login',
    label: userId,
  })
}

export const fireAdvancedSearchSubmitEvent = advancedSearch => (dispatch, getState) => {
  const userId = getState().auth.user ? getState().auth.user.id : undefined
  ReactGA.event({
    category: 'CustomSearch',
    action: 'submit',

    label: constructCsvFileName(advancedSearch, false),
  })
}

export const fireCustomSearchSelectFilterEvent = label => (dispatch, getState) => {
  const userId = getState().auth.user ? getState().auth.user.id : undefined
  ReactGA.event({
    category: 'CustomSearch',
    action: 'select-filter',

    label: label,
  })
}

export const fireCustomSearchPropertyTypeEvent = label => (dispatch, getState) => {
  const userId = getState().auth.user ? getState().auth.user.id : undefined
  ReactGA.event({
    category: 'CustomSearch',
    action: 'property-type',
  })
}

export const fireCustomSearchSwitchConditionEvent = type => (dispatch, getState) => {
  const userId = getState().auth.user ? getState().auth.user.id : undefined
  ReactGA.event({
    category: 'CustomSearch',
    action: 'add-condition-type',
    value: userId,
    label: type,
  })
}

export const fireCustomSearchAddConditionGroupEvent = () => (dispatch, getState) => {
  const userId = getState().auth.user ? getState().auth.user.id : undefined
  ReactGA.event({
    category: 'CustomSearch',
    action: 'add-group',
  })
}

export const fireFilterSelectEvent = filter => (dispatch, getState) => {
  const userId = getState().auth.user ? getState().auth.user.id : undefined
  ReactGA.event({
    category: 'DistrictDashboard',
    action: 'select-filter',

    label: filter.label || (filter.resourceModel || {}).label,
  })
}

export const fireMapDateRangeSelectEvent = value => (dispatch, getState) => {
  const userId = getState().auth.user ? getState().auth.user.id : undefined
  ReactGA.event({
    category: 'DistrictDashboard',
    action: 'select-date',

    label: value,
  })
}

export const fireDashboardToggleConditionEvent = value => (dispatch, getState) => {
  const userId = getState().auth.user ? getState().auth.user.id : undefined
  ReactGA.event({
    category: 'DistrictDashboard',
    action: 'toggle-condition',

    label: value,
  })
}

export const fireSwitchLookupTableEvent = name => (dispatch, getState) => {
  const userId = getState().auth.user ? getState().auth.user.id : undefined
  ReactGA.event({
    category: 'Lookup',
    action: 'select-table',
    label: name,
  })
}

export const fireAnalyticsModalOpenEvent = name => (dispatch, getState) => {
  const userId = getState().auth.user ? getState().auth.user.id : undefined
  ReactGA.event({
    category: 'Modal',
    action: 'analytics-information',
  })
}
