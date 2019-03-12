import React from 'react'
import PropTypes from 'prop-types'
import { Filter } from 'shared/classes/Filter'
import * as yup from 'yup'

import { StandardizedInput } from 'shared/classes/StandardizedInput'
import { getAdvancedSearch } from 'Store/AdvancedSearch/actions'
import { requestWithAuth } from 'shared/utilities/authUtils'

import { addHousingType, updateHousingType } from 'Store/AdvancedSearch/actions'

import ConfigContext from 'Config/ConfigContext'

import ConditionComponent from 'AdvancedSearch/ConditionComponent'
import BoundaryQuery from 'AdvancedSearch/BoundaryQuery'
import HousingTypeQuery from 'AdvancedSearch/HousingTypeQuery'
import { Form, Button } from 'react-bootstrap'
import { Formik } from 'formik'

class AdvancedSearchForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      validated: false,
    }

    this.submitForm = this.submitForm.bind(this)
    this.addHousingType = this.addHousingType.bind(this)
    this.changeHousingType = this.changeHousingType.bind(this)
    this.generateFormSchema = this.generateFormSchema.bind(this)
  }

  addHousingType(e) {
    e = new StandardizedInput(e)
    const newHousingType = new Filter({ modelConstant: e.value })
    this.props.dispatch(addHousingType(newHousingType))
  }

  changeHousingType(housingTypeIndex, e) {
    e = new StandardizedInput(e)
    const newHousingType = new Filter({ modelConstant: e.value })
    this.props.dispatch(updateHousingType(housingTypeIndex, newHousingType))
  }

  submitForm() {
    this.props.dispatch(requestWithAuth(getAdvancedSearch()))
  }

  generateFormSchema() {
    return yup.object({
      boundaryType: yup
        .string()
        .test('selectValid', 'Please make a selection', value => {
          return !!value && value !== '-1'
        })
        .required('Please make a selection'),
      boundaryId: yup.string().required('Please make a selection'),
    })
  }

  render() {
    console.log(this.generateFormSchema())
    return (
      <Formik className="advanced-search-form" onSubmit={this.submitForm} validationSchema={this.generateFormSchema()}>
        {({ handleSubmit, handleChange, handleBlur, touched, errors, submitCount }) => (
          <Form noValidate onSubmit={handleSubmit} validated={this.state.validated}>
            {this.props.error && (
              <Form.Text className="text-danger" type="invalid">
                {this.props.error.message}
              </Form.Text>
            )}
            <BoundaryQuery
              addBoundary={this.addBoundary}
              boundaries={this.props.advancedSearch.boundaries}
              changeBoundary={this.changeBoundary}
              handleChange={handleChange}
              handleBlur={handleBlur}
              touched={touched}
              errors={errors}
              submitCount={submitCount}
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
            <ConfigContext.Consumer>
              {config => (
                <ConditionComponent
                  conditions={this.props.advancedSearch.conditions}
                  condition={this.props.advancedSearch.conditions[0]}
                  datasetModels={config.datasetModels}
                  dispatch={this.props.dispatch}
                  key={'condition-0'}
                  conditionKey={'0'}
                />
              )}
            </ConfigContext.Consumer>
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
  dispatch: PropTypes.func,
  error: PropTypes.object,
  loading: PropTypes.bool,
}

export default AdvancedSearchForm
