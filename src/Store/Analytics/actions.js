import ReactGA from 'react-ga'
import { constructCsvFileName } from 'Store/AdvancedSearch/utilities/advancedSearchStoreUtils'

export const fireCsvDownloadEvent = fileName => () => {
  ReactGA.event({
    category: 'Csv',
    action: 'download',
    label: fileName,
  })
}

export const fireUserLoginEvent = () => (_, getState) => {
  const userId = getState().auth.user ? getState().auth.user.id : undefined
  ReactGA.event({
    category: 'User',
    action: 'Login',
    label: userId,
  })
}

export const fireAdvancedSearchSubmitEvent = advancedSearch => () => {
  ReactGA.event({
    category: 'CustomSearch',
    action: 'submit',
    label: constructCsvFileName(advancedSearch, false),
  })
}

export const fireCustomSearchSelectFilterEvent = label => () => {
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
  ReactGA.event({
    category: 'CustomSearch',
    action: 'add-group',
  })
}

export const fireFilterSelectEvent = filter => () => {
  ReactGA.event({
    category: 'DistrictDashboard',
    action: 'select-filter',
    label: filter.label || (filter.resourceModel || {}).label,
  })
}

export const fireMapDateRangeSelectEvent = value => () => {
  ReactGA.event({
    category: 'DistrictDashboard',
    action: 'select-date',
    label: value,
  })
}

export const fireDashboardToggleConditionEvent = value => () => {
  ReactGA.event({
    category: 'DistrictDashboard',
    action: 'toggle-condition',
    label: value,
  })
}

export const fireSwitchLookupTableEvent = name => () => {
  ReactGA.event({
    category: 'Lookup',
    action: 'select-table',
    label: name,
  })
}

export const fireAnalyticsModalOpenEvent = () => () => {
  ReactGA.event({
    category: 'Modal',
    action: 'analytics-information',
  })
}
