import ReactGA from 'react-ga'
import { constructCsvFileName } from 'Store/AdvancedSearch/utilities/advancedSearchStoreUtils'
export const fireCsvDownloadEvent = fileName => (dispatch, getState) => {
  const userId = getState().auth.user ? getState().auth.user.id : undefined
  ReactGA.event({
    category: 'Csv',
    action: 'download',
    value: parseInt(userId),
    label: fileName,
  })
}

export const fireUserLoginEvent = (userId, email) => (dispatch, getState) => {
  ReactGA.event({
    category: 'User',
    action: 'Login',
    value: parseInt(userId),
    label: email,
  })
}

export const fireAdvancedSearchSubmitEvent = advancedSearch => (dispatch, getState) => {
  const userId = getState().auth.user ? getState().auth.user.id : undefined
  ReactGA.event({
    category: 'CustomSearch',
    action: 'submit',
    value: parseInt(userId),
    label: constructCsvFileName(advancedSearch, false),
  })
}

export const fireCustomSearchSelectFilterEvent = label => (dispatch, getState) => {
  const userId = getState().auth.user ? getState().auth.user.id : undefined
  ReactGA.event({
    category: 'CustomSearch',
    action: 'select-filter',
    value: parseInt(userId),
    label: label,
  })
}

export const fireCustomSearchPropertyTypeEvent = label => (dispatch, getState) => {
  const userId = getState().auth.user ? getState().auth.user.id : undefined
  ReactGA.event({
    category: 'CustomSearch',
    action: 'property-type',
    value: parseInt(userId),
    label: label,
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
    value: parseInt(userId),
  })
}

export const fireFilterSelectEvent = filter => (dispatch, getState) => {
  const userId = getState().auth.user ? getState().auth.user.id : undefined
  ReactGA.event({
    category: 'DistrictDashboard',
    action: 'select-filter',
    value: parseInt(userId),
    label: filter.label || (filter.resourceModel || {}).label,
  })
}

export const fireMapDateRangeSelectEvent = value => (dispatch, getState) => {
  const userId = getState().auth.user ? getState().auth.user.id : undefined
  ReactGA.event({
    category: 'DistrictDashboard',
    action: 'select-date',
    value: parseInt(userId),
    label: value,
  })
}

export const fireSwitchLookupTableEvent = name => (dispatch, getState) => {
  const userId = getState().auth.user ? getState().auth.user.id : undefined
  ReactGA.event({
    category: 'Lookup',
    action: 'select-table',
    value: parseInt(userId),
    label: name,
  })
}
