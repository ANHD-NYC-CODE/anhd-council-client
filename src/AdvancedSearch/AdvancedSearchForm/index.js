import React from 'react'
import PropTypes from 'prop-types'
import * as yup from 'yup'
import { push } from 'connected-react-router';
import { getAdvancedSearchParamMaps } from 'Store/AdvancedSearch/utilities/advancedSearchStoreUtils'
import { getCustomSearchPath } from 'shared/utilities/routeUtils';
import FilterComponent from 'AdvancedSearch/FilterComponent'

import * as b from 'shared/constants/geographies'

import StandardizedInput from 'shared/classes/StandardizedInput'
import ConditionComponent from 'AdvancedSearch/ConditionComponent'
import GeographySelect from 'shared/components/GeographySelect'
import FormError from 'shared/components/FormError'
import { Form, Button } from 'react-bootstrap'
import { Formik } from 'formik'
import './style.scss'

class AdvancedSearchForm extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      validated: false,
      hasErrors: false,
      currentGeographyId: this.props.geographyId,
      currentGeographyType: this.props.geographyType,
      changingGeographyType: undefined,
      changingGeographyId: undefined
    }

    this.submitForm = this.submitForm.bind(this);
    this.handleChangeGeographyType = this.handleChangeGeographyType.bind(this);
    this.changeGeography = this.changeGeography.bind(this);
    this.cancelChangeGeography = this.cancelChangeGeography.bind(this);
    this.validateForm = this.validateForm.bind(this);
  }

  componentDidUpdate() {
    this.validateForm()
  }

  validateForm() {
    const allParamMaps = getAdvancedSearchParamMaps(this.props.advancedSearch)
    const allConditions = [
      ...Object.keys(this.props.advancedSearch.conditions).map(key => this.props.advancedSearch.conditions[key]),
    ].filter(c => c)

    allConditions.forEach(condition => condition.validate())
    allConditions.forEach(condition => condition.removeNewFilters())
    const allFilters = []
      .concat(
        ...allConditions.map(condition => condition.filters.filter(filter => !filter.conditionGroup)),
        this.props.advancedSearch.propertyFilter
      )
      .filter(f => f)

    allFilters.forEach(filter => filter.validate(this.props.trusted))
    allParamMaps.forEach(paramMap => paramMap.validate())
    if (
      allConditions.some(condition => !!condition.errors.length) ||
      allFilters.some(filter => !!filter.errors.length) ||
      allParamMaps.some(paramMap => !!paramMap.errors.length)
    ) {
      this.setState({ hasErrors: true })
    } else {
      this.setState({ hasErrors: false })
    }
  }

  submitForm(values, formik) {
    formik.validateForm(values).then(() => {
      if (!this.state.hasErrors) {
        const path = getCustomSearchPath(
          this.props.advancedSearch, 
          this.state.currentGeographyType, 
          this.state.currentGeographyId
        );
        this.props.dispatch(push('/search'+path));
        this.props.onSubmit();
      }
    })
  }

  geographyValid() {
    return this.state.currentGeographyId && this.state.currentGeographyType;
  }

  handleChangeGeographyType(e) {
    e = new StandardizedInput(e)
    const type = e.value
    if (type === b.CITY_GEOGRAPHY.constant) {
      this.setState({
        currentGeographyType: type,
        currentGeographyId: "NYC",
        changingGeographyType: null,
        changingGeographyId: null,
      })
    } else {
      this.setState({
        changingGeographyType: type,
        changingGeographyId: -1,
      })
    }
  }

  changeGeography({ e, geographyType, geographyId } = {}) {
    e = new StandardizedInput(e)
    const type = geographyType || this.state.changingGeographyType || this.state.currentGeographyType;
    const id = geographyId || e.value

    this.setState({
      currentGeographyType: type,
      currentGeographyId: id
    })

    // Change global geography unless it's the borough one
    // if (!this.props.appState.currentGeographyId && type !== b.BOROUGH_GEOGRAPHY.constant) {
    //   this.props.dispatch(
    //     setGeographyAndRequestsAndRedirect({
    //       geographyType: type,
    //       geographyId: id,
    //       redirect: false,
    //       requests: this.props.config.createMapRequests(type, id),
    //     })
    //   )
    // }
    this.cancelChangeGeography()
  }

  cancelChangeGeography() {
    this.setState({
      changingGeographyType: undefined,
      changingGeographyId: undefined,
    })
  }

  render() {
    const schema = yup.object({
      geographyType: yup
        .string()
        .test('selectValid', 'Please make a selection', value => {
          return !!value && value !== '-1'
        })
        .required('Please make a selection'),
      // disable geoId validation for city geo
      geographyId:
        this.state.currentGeographyType !== b.CITY_GEOGRAPHY.constant || !!this.state.changingGeographyType
          ? yup.string().required('Please make a selection')
          : null,
    })

    return (
      <Formik
        enableReinitialize={true}
        initialValues={{
          geographyType: this.props.geographyType,
          geographyId: this.props.geographyId,
        }}
        onSubmit={this.submitForm}
        validationSchema={schema}
      >
        {({ handleSubmit, handleChange, handleBlur, touched, errors }) => (
          <Form
            noValidate
            className="advanced-search-form mb-5"
            onSubmit={handleSubmit}
            validated={this.state.validated}
          >
            <FormError show={!!this.props.error} message={(this.props.error || {}).message} />
            <div className="advanced-search-form__section">
              <h4 className="advanced-search-form__heading">1) Select a geography</h4>
              <FormError
                show={
                  this.state.currentGeographyType === b.CITY_GEOGRAPHY.constant ||
                  this.state.currentGeographyType === b.BOROUGH_GEOGRAPHY.constant
                }
                message="Warning: Some borough and citywide queries may take a long time to complete. Please allow up to 2 minutes for your query to finish."
              />

              <GeographySelect
                selectClass="main-geography-select"
                inputSize="md"
                submitButtonVariant="dark"
                cancelChangeGeography={this.cancelChangeGeography}
                changing={this.props.appState.changingGeography}
                confirmChange={true}
                currentGeographyType={this.state.currentGeographyType}
                currentGeographyId={this.state.currentGeographyId}
                changingGeographyType={this.state.changingGeographyType}
                changingGeographyId={this.state.changingGeographyId}
                dispatch={this.props.dispatch}
                handleChangeGeography={this.changeGeography}
                handleChangeGeographyType={this.handleChangeGeographyType}
                handleBlur={handleBlur}
                handleChange={handleChange}
                touched={touched}
                errors={errors}
                withBoroughs={true}
              />
            </div>
            {this.geographyValid() && (
              <div>
                <div className="advanced-search-form__section advanced-search-form__housingtype-select">
                  <h4 className="advanced-search-form__heading">2) Select a housing type</h4>
                  {
                    <FilterComponent
                      blockWidth={true}
                      config={this.props.config}
                      dispatch={this.props.dispatch}
                      dispatchAction={this.props.forceUpdate}
                      filter={this.props.advancedSearch.propertyFilter}
                      showPopups={false}
                    />
                  }
                </div>
                <div className="advanced-search-form__filter-section">
                  <h4 className="advanced-search-form__heading">3) Add filters</h4>
                  <ConditionComponent
                    conditions={this.props.advancedSearch.conditions}
                    condition={this.props.advancedSearch.conditions['0']}
                    config={this.props.config}
                    dispatch={this.props.dispatch}
                    dispatchAction={this.props.forceUpdate}
                    key={'condition-0'}
                    conditionKey={'0'}
                    showPopups={this.props.showPopups}
                    validateForm={this.validateForm}
                  />
                  <div className="my-4">
                    <FormError
                      show={!!this.state.hasErrors || !!Object.keys(errors).length}
                      message="Please correct errors before proceeding."
                    />
                    <Button disabled={this.props.loading} size="default" type="submit" variant="primary">
                      Submit
                    </Button>
                  </div>
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
  onSubmit: PropTypes.func,
  handleChangeGeographyType: PropTypes.func,
  geographyType: PropTypes.string,
  geographyId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  error: PropTypes.object,
  loading: PropTypes.bool,
  loggedIn: PropTypes.bool,
  trusted: PropTypes.bool
}

export default AdvancedSearchForm
