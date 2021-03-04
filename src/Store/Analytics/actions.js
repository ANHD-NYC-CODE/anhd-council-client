import ReactGA from 'react-ga'
import { constructCsvFileName } from 'Store/AdvancedSearch/utilities/advancedSearchStoreUtils'
export const fireCsvDownloadEvent = fileName => () => {
  // const userId = getState().auth.user ? getState().auth.user.id : undefined
  ReactGA.event({
    category: 'Csv',
    action: 'download',
    label: fileName,
  })
}

export const fireUserLoginEvent = userId => (_, getState) => {
  const userId = getState().auth.user ? getState().auth.user.id : undefined
  ReactGA.event({
    category: 'User',
    action: 'Login',
    label: userId,
  })
}

export const fireAdvancedSearchSubmitEvent = advancedSearch => () => {
  // const userId = getState().auth.user ? getState().auth.user.id : undefined
  ReactGA.event({
    category: 'CustomSearch',
    action: 'submit',
    label: constructCsvFileName(advancedSearch, false),
  })
}

export const fireCustomSearchSelectFilterEvent = label => () => {
  // const userId = getState().auth.user ? getState().auth.user.id : undefined
  ReactGA.event({
    category: 'CustomSearch',
    action: 'select-filter',
    label: label,
  })
}

export const fireCustomSearchPropertyTypeEvent = () => () => {
  // const userId = getState().auth.user ? getState().auth.user.id : undefined
  ReactGA.event({
    category: 'CustomSearch',
    action: 'property-type',
  })
}

export const fireCustomSearchSwitchConditionEvent = type => (_, getState) => {
  const userId = getState().auth.user ? getState().auth.user.id : undefined
  ReactGA.event({
    category: 'CustomSearch',
    action: 'add-condition-type',
    value: userId,
    label: type,
  })
}

export const fireCustomSearchAddConditionGroupEvent = () => () => {
  // const userId = getState().auth.user ? getState().auth.user.id : undefined
  ReactGA.event({
    category: 'CustomSearch',
    action: 'add-group',
  })
}

export const fireFilterSelectEvent = filter => (_, getState) => {
  const userId = getState().auth.user ? getState().auth.user.id : undefined
  ReactGA.event({
    category: 'DistrictDashboard',
    action: 'select-filter',
    label: filter.label || (filter.resourceModel || {}).label,
  })
}

export const fireMapDateRangeSelectEvent = value => () => {
  // const userId = getState().auth.user ? getState().auth.user.id : undefined
  ReactGA.event({
    category: 'DistrictDashboard',
    action: 'select-date',
    label: value,
  })
}

export const fireDashboardToggleConditionEvent = value => () => {
  // const userId = getState().auth.user ? getState().auth.user.id : undefined
  ReactGA.event({
    category: 'DistrictDashboard',
    action: 'toggle-condition',
    label: value,
  })
}

export const fireSwitchLookupTableEvent = name => () => {
  // const userId = getState().auth.user ? getState().auth.user.id : undefined
  ReactGA.event({
    category: 'Lookup',
    action: 'select-table',
    label: name,
  })
}

export const fireAnalyticsModalOpenEvent = () => () => {
  // const userId = getState().auth.user ? getState().auth.user.id : undefined
  ReactGA.event({
    category: 'Modal',
    action: 'analytics-information',
  })
}
