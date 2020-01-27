import React from 'react'
import PropTypes from 'prop-types'
import * as yup from 'yup'
import { getAdvancedSearchParamMaps } from 'Store/AdvancedSearch/utilities/advancedSearchStoreUtils'
import FilterComponent from 'AdvancedSearch/FilterComponent'
import ClearAdvancedSearchButton from 'shared/components/buttons/ClearAdvancedSearchButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import ConditionComponent from 'AdvancedSearch/ConditionComponent'
import GeographySelect from 'shared/components/GeographySelect'
import FormError from 'shared/components/FormError'
import { Form, Button, Row, Col } from 'react-bootstrap'
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

    this.validateForm = this.validateForm.bind(this)
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
        this.props.onSubmit()
      }
    })
  }

  render() {
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
        {({ handleSubmit, handleChange, handleBlur, touched, errors, submitCount }) => (
          <Form
            noValidate
            className="advanced-search-form mb-5"
            onSubmit={handleSubmit}
            validated={this.state.validated}
          >
            <FormError show={!!this.props.error} message={(this.props.error || {}).message} />
            <Row>
              <Col xs={12} md={6}>
                <h4 className="text-muted font-weight-bold text-uppercase mb-4">1) Select a geography</h4>
              </Col>
              <Col xs={12} md={6} className="mb-4 mb-md-0">
                <ClearAdvancedSearchButton className="d-inline">
                  <span className="border-danger text-danger toggle-link btn">
                    <FontAwesomeIcon icon={faTimes} /> Clear Search
                  </span>
                </ClearAdvancedSearchButton>
              </Col>
            </Row>
            <GeographySelect
              selectClass="main-geography-select"
              inputSize="md"
              submitButtonVariant="dark"
              cancelChangeGeography={this.props.cancelChangeGeography}
              changing={this.props.appState.changingGeography}
              confirmChange={true}
              currentGeographyType={this.props.geographyType}
              currentGeographyId={this.props.geographyId}
              changingGeographyType={this.props.changingGeographyType}
              changingGeographyId={this.props.changingGeographyId}
              dispatch={this.props.dispatch}
              handleChangeGeography={this.props.changeGeography}
              handleChangeGeographyType={this.props.handleChangeGeographyType}
              handleBlur={handleBlur}
              handleChange={handleChange}
              touched={touched}
              errors={errors}
            />
            {this.props.geographyType && this.props.geographyId && (
              <div className="advanced-search-form__housingtype-select">
                <h4 className="text-muted font-weight-bold text-uppercase mt-5 mb-4">2) Select a housing type</h4>
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

                <h4 className="text-muted font-weight-bold text-uppercase mt-5 mb-4">3) Add filters</h4>
                <ConditionComponent
                  conditions={this.props.advancedSearch.conditions}
                  condition={this.props.advancedSearch.conditions[0]}
                  config={this.props.config}
                  dispatch={this.props.dispatch}
                  dispatchAction={this.props.forceUpdate}
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
  geographyType: PropTypes.string,
  geographyId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  changingGeographyType: PropTypes.string,
  changingGeographyId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  error: PropTypes.object,
  loading: PropTypes.bool,
}

export default AdvancedSearchForm
