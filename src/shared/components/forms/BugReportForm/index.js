import React from 'react'
import PropTypes from 'prop-types'
import * as c from 'shared/constants'
import { Form, Button } from 'react-bootstrap'
import { postBugReport } from 'Store/Request/actions'
import { Formik } from 'formik'
import * as yup from 'yup'
import FormError from 'shared/components/FormError'
import { toast } from 'react-toastify'
import SpinnerLoader from 'shared/components/Loaders/SpinnerLoader'

const schema = yup.object({
  email: yup
    .string()
    .email()
    .required(),
  description: yup
    .string()
    .max(2040)
    .required(),
})

class BugReportForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      validated: false,
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleSuccessfulSubmit = this.handleSuccessfulSubmit.bind(this)
  }

  handleSuccessfulSubmit() {
    this.props.hideModal()
    toast.success('Your bug report has been submitted. Thank you!')
  }
  handleSubmit(formData) {
    this.setState({ validated: true })
    const bugData = {
      from_email: formData.email,
      description: formData.description,
    }

    this.props.dispatch(postBugReport(bugData, this.handleSuccessfulSubmit))
  }

  render() {
    return (
      <Formik onSubmit={e => this.handleSubmit(e)} validationSchema={schema}>
        {({ handleSubmit, handleChange, handleBlur, touched, errors, submitCount }) => {
          return (
            <Form noValidate className="auth-login-form" validated={this.state.validated} onSubmit={handleSubmit}>
              <FormError show={!!this.props.error} message={(this.props.error || {}).message} />
              <Form.Text className="text-muted mb-3">
                We'll only use your email if needed to clarify your report and won't share it with anyone else.
              </Form.Text>
              <Form.Group controlId="userRequestEmail">
                <Form.Label>Email *</Form.Label>
                <Form.Control
                  required
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={false}
                  isInvalid={!!this.props.submitCount || (touched.email && errors.email)}
                  type="email"
                  placeholder="Enter your email"
                />
                <FormError show={!!((submitCount || touched.email) && errors.email)} message={errors.email} />
              </Form.Group>
              <Form.Group controlId="userRequestUsername">
                <Form.Text className="text-primary font-weight-bold">
                  Please provide a detailed description, including:
                </Form.Text>
                <Form.Text className="text-primary font-weight-bold">1) The browser you were using.</Form.Text>
                <Form.Text className="text-primary font-weight-bold">
                  2) The url of the page that the bug occured on.
                </Form.Text>
                <Form.Text className="mb-3 text-primary font-weight-bold">
                  3) (important!) The steps we'd need to take to see the bug for ourselves.
                </Form.Text>
                <Form.Label>Description *</Form.Label>
                <Form.Control
                  required
                  as="textarea"
                  rows="5"
                  name="description"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={false}
                  isInvalid={!!this.props.submitCount || (touched.description && errors.description)}
                  type="description"
                />

                <FormError
                  show={!!((submitCount || touched.description) && errors.description)}
                  message={errors.description}
                />
              </Form.Group>

              <Button className="btn-loader" block disabled={this.props.loading} variant="primary" type="submit">
                <span>Submit</span>
                <div className="button-loader__container">{this.props.loading && <SpinnerLoader size="20px" />}</div>
              </Button>
            </Form>
          )
        }}
      </Formik>
    )
  }
}

BugReportForm.defaultProps = {
  error: null,
}

BugReportForm.propTypes = {
  dispatch: PropTypes.func,
  error: PropTypes.object,
  loading: PropTypes.bool,
}

export default BugReportForm
