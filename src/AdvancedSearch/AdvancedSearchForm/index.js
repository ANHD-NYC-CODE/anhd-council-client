import React from 'react'
import PropTypes from 'prop-types'
import Filter from 'shared/classes/Filter'
import Geography from 'shared/classes/Geography'
import * as yup from 'yup'

import StandardizedInput from 'shared/classes/StandardizedInput'
import { getAdvancedSearchParamMaps } from 'Store/AdvancedSearch/utilities/advancedSearchStoreUtils'
import { setGeographyAndRequestsAndRedirect } from 'Store/AppState/actions'
import FilterComponent from 'AdvancedSearch/FilterComponent'
import { replacePropertyFilter } from 'Store/AdvancedSearch/actions'

import { addGeography, updateGeography } from 'Store/AdvancedSearch/actions'
import { addHousingType, updateHousingType } from 'Store/AdvancedSearch/actions'
import { setAppState, setAdvancedSearchRequestAndRedirect } from 'Store/AppState/actions'
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

class AdvancedSearchForm extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      validated: false,
      hasErrors: false,
    }

    this.submitForm = this.submitForm.bind(this)
    this.addHousingType = this.addHousingType.bind(this)
    this.changeHousingType = this.changeHousingType.bind(this)
    this.updatePropertyFilter = this.updatePropertyFilter.bind(this)
    this.validateForm = this.validateForm.bind(this)
    this.changeGeography = this.changeGeography.bind(this)
    this.handleChangeGeographyType = this.handleChangeGeographyType.bind(this)
    this.cancelChangeGeography = this.cancelChangeGeography.bind(this)
    this.syncGeographyToAppState = this.syncGeographyToAppState.bind(this)

    this.syncGeographyToAppState(props)
  }

  componentWillReceiveProps(nextProps) {
    this.syncGeographyToAppState(nextProps)
  }

  syncGeographyToAppState(props) {
    if (props.appState.currentGeographyType && !!props.advancedSearch.geographies.length) {
      const geography = props.advancedSearch.geographies[0]
      if (
        props.appState.currentGeographyType !== geography.geographyType.constant ||
        props.appState.currentGeographyId !== geography.id
      ) {
        geography['geographyType'] = props.appState.currentGeographyType
        geography['id'] = props.appState.currentGeographyId
        props.dispatch(updateGeography(0, geography))
      }
    } else if (props.appState.currentGeographyType && !props.advancedSearch.geographies.length) {
      this.props.dispatch(
        addGeography(new Geography(props.appState.currentGeographyType, props.appState.currentGeographyId))
      )
    }
  }

  changeGeography({ e, geographyType, geographyId } = {}) {
    e = new StandardizedInput(e)
    const type = geographyType || this.props.appState.changingGeographyType || this.props.appState.currentGeographyType
    const id = geographyId || e.value
    if (!this.props.advancedSearch.geographies.length) {
      const newGeography = new Geography(type, id)
      this.props.dispatch(addGeography(newGeography))
    } else {
      const geography = this.props.advancedSearch.geographies[0]
      geography[e.key] = e.value
      this.props.dispatch(updateGeography(0, geography))
    }
    this.props.dispatch(
      setGeographyAndRequestsAndRedirect({
        geographyType: type,
        geographyId: id,
        redirect: false,
        requests: this.props.config.createMapRequests(type, id),
      })
    )
    this.cancelChangeGeography()
  }

  handleChangeGeographyType(e) {
    e = new StandardizedInput(e)
    this.props.dispatch(
      setAppState({
        changingGeography: true,
        changingGeographyType: e.value,
        changingGeographyId: -1,
      })
    )
    if (this.props.handleChange) this.props.handleChange(e)
  }

  cancelChangeGeography() {
    this.props.dispatch(
      setAppState({
        changingGeography: false,
        changingGeographyType: undefined,
        changingGeographyId: undefined,
      })
    )
  }

  updatePropertyFilter() {
    const propertyFilter = this.props.advancedSearch.propertyFilter
    this.props.dispatch(replacePropertyFilter(propertyFilter))
  }

  addHousingType(e) {
    e = new StandardizedInput(e)
    const housingType = this.props.config.housingTypeModels.find(housingType => housingType.id === e.value)
    const newHousingType = new Filter({ resourceModel: housingType, schema: housingType.schema })
    this.props.dispatch(addHousingType(newHousingType))
  }

  changeHousingType(housingTypeIndex, e) {
    e = new StandardizedInput(e)
    const housingType = this.props.config.housingTypeModels.find(housingType => housingType.id === e.value)
    const newHousingType = new Filter({ resourceModel: housingType, schema: housingType.schema })
    this.props.dispatch(updateHousingType(housingTypeIndex, newHousingType))
  }

  validateForm() {
    const allParamMaps = getAdvancedSearchParamMaps(this.props.advancedSearch)
    const allConditions = [
      ...Object.keys(this.props.advancedSearch.conditions).map(key => this.props.advancedSearch.conditions[key]),
    ]
    const allFilters = [].concat(
      ...allConditions.map(condition => condition.filters.filter(filter => !filter.conditionGroup)),
      this.props.advancedSearch.propertyFilter
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
        this.setState({ hasErrors: true })
        return
      } else {
        this.setState({ hasErrors: false })
        this.props.dispatch(
          setAdvancedSearchRequestAndRedirect({
            redirect: true,
            advancedSearchRequest: this.props.config.createAdvancedSearchRequest(
              this.props.appState.currentGeographyType,
              this.props.appState.currentGeographyId,
              this.props.advancedSearch
            ),
          })
        )
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
          <Form
            noValidate
            className="advanced-search-form my-5"
            onSubmit={handleSubmit}
            validated={this.state.validated}
          >
            <FormError show={!!this.props.error} message={(this.props.error || {}).message} />
            <h4 className="text-muted font-weight-bold text-uppercase mt-4 mb-4">1) Select a geography</h4>
            <GeographySelect
              cancelChangeGeography={this.cancelChangeGeography}
              changing={this.props.appState.changingGeography}
              changingGeographyType={this.props.appState.changingGeographyType}
              changingGeographyId={this.props.appState.changingGeographyId}
              confirmChange={true}
              currentGeographyType={this.props.appState.currentGeographyType}
              currentGeographyId={this.props.appState.currentGeographyId}
              dispatch={this.props.dispatch}
              handleChangeGeography={this.changeGeography}
              handleBlur={handleBlur}
              handleChange={handleChange}
              touched={touched}
              errors={errors}
              handleChangeGeographyType={this.handleChangeGeographyType}
            />
            {this.props.appState.currentGeographyType && this.props.appState.currentGeographyId && (
              <div>
                <h4 className="text-muted font-weight-bold text-uppercase mt-5 mb-4">2) Select a housing type</h4>
                {
                  <FilterComponent
                    blockWidth={true}
                    config={this.props.config}
                    dispatch={this.props.dispatch}
                    dispatchAction={this.updatePropertyFilter}
                    filter={this.props.advancedSearch.propertyFilter}
                    showPopups={false}
                  />
                }
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

                <h4 className="text-muted font-weight-bold text-uppercase mt-5 mb-4">3) Add filters</h4>
                <ConditionComponent
                  conditions={this.props.advancedSearch.conditions}
                  condition={this.props.advancedSearch.conditions[0]}
                  config={this.props.config}
                  dispatch={this.props.dispatch}
                  key={'condition-0'}
                  conditionKey={'0'}
                  showPopups={this.props.showPopups}
                  validateForm={this.validateForm}
                />
                <div className="w-100 d-flex flex-column align-items-end my-4">
                  <FormError
                    show={!!this.state.hasErrors || !!Object.keys(errors).length}
                    message="Please correct errors before proceeding."
                  />
                  <Button disabled={this.props.loading} size="lg" type="submit" variant="primary">
                    Submit
                  </Button>
                </div>
              </div>
            )}
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
