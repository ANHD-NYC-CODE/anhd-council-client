import React from 'react'
import PropTypes from 'prop-types'
import { Filter } from 'shared/classes/Filter'
import { Geography } from 'shared/classes/Geography'
import * as yup from 'yup'

import { StandardizedInput } from 'shared/classes/StandardizedInput'
import { getAdvancedSearch } from 'Store/AdvancedSearch/actions'
import { requestWithAuth } from 'shared/utilities/authUtils'
import { getAdvancedSearchParamMaps } from 'Store/AdvancedSearch/utilities/advancedSearchStoreUtils'
import { setGeographyAndRequestsAndRedirect } from 'Store/AppState/actions'

import { addGeography, updateGeography } from 'Store/AdvancedSearch/actions'
import { addHousingType, updateHousingType } from 'Store/AdvancedSearch/actions'
import { setAdvancedSearchRequestAndRedirect } from 'Store/AppState/actions'
import ConditionComponent from 'AdvancedSearch/ConditionComponent'
import GeographySelect from 'shared/components/GeographySelect'
import HousingTypeQuery from 'AdvancedSearch/HousingTypeQuery'
import FormError from 'shared/components/FormError'

import { Form, Button } from 'react-bootstrap'
import { Formik } from 'formik'
import './style.scss'
const schema = yup.object({
  geographyType: yup
    .string()
    .test('selectValid', 'Please make a selection', value => {
      return !!value && value !== '-1'
    })
    .required('Please make a selection'),
  geographyId: yup.string().required('Please make a selection'),
})

class AdvancedSearchForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      validated: false,
    }

    this.submitForm = this.submitForm.bind(this)
    this.addHousingType = this.addHousingType.bind(this)
    this.changeHousingType = this.changeHousingType.bind(this)
    this.validateForm = this.validateForm.bind(this)
    this.changeGeography = this.changeGeography.bind(this)
    this.syncGeographyToAppState = this.syncGeographyToAppState.bind(this)

    this.syncGeographyToAppState(props)
  }

  componentWillReceiveProps(nextProps) {
    this.syncGeographyToAppState(nextProps)
  }

  syncGeographyToAppState(props) {
    if (props.appState.currentGeographyType && props.advancedSearch.geographies.length) {
      const geography = props.advancedSearch.geographies[0]
      if (
        props.appState.currentGeographyType !== geography.geographyType.constant ||
        props.appState.currentGeographyId !== geography.id
      ) {
        console.log('syncing!')
        geography['geographyType'] = props.appState.currentGeographyType
        geography['id'] = props.appState.currentGeographyId
        props.dispatch(updateGeography(0, geography))
      }
    }
  }

  changeGeography(type, id) {
    if (!this.props.advancedSearch.geographies.length) {
      this.props.dispatch(addGeography(new Geography(type, id)))
    } else {
      const geography = this.props.advancedSearch.geographies[0]
      geography['geographyType'] = type
      geography['id'] = id
      this.props.dispatch(updateGeography(0, geography))
    }
    this.props.dispatch(
      setGeographyAndRequestsAndRedirect({
        geographyType: type,
        geographyId: id,
        redirect: false,
      })
    )
  }

  addHousingType(e) {
    e = new StandardizedInput(e)
    const housingType = this.props.config.housingTypeModels.find(housingType => housingType.id === e.value)
    const newHousingType = new Filter({ model: housingType })
    this.props.dispatch(addHousingType(newHousingType))
  }

  changeHousingType(housingTypeIndex, e) {
    e = new StandardizedInput(e)
    const housingType = this.props.config.housingTypeModels.find(housingType => housingType.id === e.value)
    const newHousingType = new Filter({ model: housingType })
    this.props.dispatch(updateHousingType(housingTypeIndex, newHousingType))
  }

  validateForm() {
    const allParamMaps = getAdvancedSearchParamMaps(this.props.advancedSearch)
    const allConditions = [
      ...Object.keys(this.props.advancedSearch.conditions).map(key => this.props.advancedSearch.conditions[key]),
    ]
    const allFilters = [].concat(
      ...allConditions.map(condition => condition.filters.filter(filter => !filter.conditionGroup))
    )

    allConditions.forEach(condition => condition.validate())
    allFilters.forEach(filter => filter.validate())
    allParamMaps.forEach(paramMap => paramMap.validate())
    return [allConditions, allFilters, allParamMaps]
  }

  submitForm(values, formik) {
    const [allConditions, allFilters, allParamMaps] = this.validateForm()
    formik.validateForm(values).then(() => {
      if (
        allConditions.some(condition => !!condition.errors.length) ||
        allFilters.some(filter => !!filter.errors.length) ||
        allParamMaps.some(paramMap => !!paramMap.errors.length)
      ) {
        return
      } else {
        this.props.dispatch(setAdvancedSearchRequestAndRedirect({ redirect: true }))
        // this.props.dispatch(requestWithAuth(getAdvancedSearch()))
      }
    })
  }

  render() {
    return (
      <Formik
        enableReinitialize={true}
        initialValues={{
          geographyType: this.props.appState.currentGeographyType,
          geographyId: this.props.appState.currentGeographyId,
        }}
        onSubmit={this.submitForm}
        validationSchema={schema}
      >
        {({ handleSubmit, handleChange, handleBlur, touched, errors, submitCount }) => (
          <Form noValidate className="advanced-search-form" onSubmit={handleSubmit} validated={this.state.validated}>
            <FormError show={!!this.props.error} message={(this.props.error || {}).message} />

            <GeographySelect
              confirmChange={true}
              currentGeographyType={this.props.appState.currentGeographyType}
              currentGeographyId={this.props.appState.currentGeographyId}
              dispatch={this.props.dispatch}
              onChange={this.changeGeography}
              handleBlur={handleBlur}
              touched={touched}
              errors={errors}
              handleChange={handleChange}
            />

            <HousingTypeQuery
              addHousingType={this.addHousingType}
              changeHousingType={this.changeHousingType}
              housingTypes={this.props.advancedSearch.housingTypes}
              dispatch={this.props.dispatch}
              handleChange={handleChange}
              handleBlur={handleBlur}
              touched={touched}
              errors={errors}
              submitCount={submitCount}
            />

            <ConditionComponent
              conditions={this.props.advancedSearch.conditions}
              condition={this.props.advancedSearch.conditions[0]}
              config={this.props.config}
              dispatch={this.props.dispatch}
              key={'condition-0'}
              conditionKey={'0'}
              validateForm={this.validateForm}
            />

            <Button disabled={this.props.loading} type="submit" variant="primary">
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    )
  }
}

AdvancedSearchForm.propTypes = {
  advancedSearch: PropTypes.object,
  appState: PropTypes.object,
  dispatch: PropTypes.func,
  error: PropTypes.object,
  loading: PropTypes.bool,
}

export default AdvancedSearchForm
