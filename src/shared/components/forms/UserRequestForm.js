import React from 'react'
import PropTypes from 'prop-types'
import * as c from 'shared/constants'
import { Form, Button } from 'react-bootstrap'
import { postUserRequest } from 'Store/Request/actions'
import { Formik } from 'formik'
import * as yup from 'yup'
import FormError from 'shared/components/FormError'
import { toast } from 'react-toastify'
const schema = yup.object({
  email: yup
    .string()
    .email()
    .required(),
  username: yup
    .string()
    .max(64)
    .required(),
  first_name: yup
    .string()
    .required()
    .max(120),
  last_name: yup
    .string()
    .required()
    .max(120),
  organization: yup.string().max(120),
  description: yup.string(),
})

class UserRequestForm extends React.Component {
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
    toast.success('Your request has been submitted. Thank you!')
  }
  handleSubmit(formData) {
    this.setState({ validated: true })
    const userData = {
      email: formData.email,
      username: formData.username,
      first_name: formData.first_name,
      last_name: formData.last_name,
      organization: formData.organization,
      description: formData.description,
    }

    this.props.dispatch(postUserRequest(userData, this.handleSuccessfulSubmit))
  }

  render() {
    return (
      <Formik onSubmit={e => this.handleSubmit(e)} validationSchema={schema}>
        {({ handleSubmit, handleChange, handleBlur, touched, errors, submitCount }) => {
          return (
            <Form noValidate className="auth-login-form" validated={this.state.validated} onSubmit={handleSubmit}>
              <FormError show={!!this.props.error} message={(this.props.error || {}).message} />
              <Form.Group controlId="userRequestEmail">
                <Form.Label>Email</Form.Label>
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
                <Form.Label>Username</Form.Label>
                <Form.Control
                  required
                  name="username"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={false}
                  isInvalid={!!this.props.submitCount || (touched.username && errors.username)}
                  type="username"
                  placeholder="Enter your username"
                />
                <FormError show={!!((submitCount || touched.username) && errors.username)} message={errors.username} />
              </Form.Group>
              <Form.Group controlId="userRequestFirstName">
                <Form.Label>First name</Form.Label>
                <Form.Control
                  required
                  name="first_name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={false}
                  isInvalid={false}
                  type="first_name"
                  placeholder="First name"
                />
                <FormError
                  show={!!((submitCount || touched.first_name) && errors.first_name)}
                  message={errors.first_name}
                />
              </Form.Group>
              <Form.Group controlId="userRequestLastName">
                <Form.Label>Last name</Form.Label>
                <Form.Control
                  required
                  name="last_name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={false}
                  isInvalid={false}
                  type="last_name"
                  placeholder="Last name"
                />
                <FormError
                  show={!!((submitCount || touched.last_name) && errors.last_name)}
                  message={errors.last_name}
                />
              </Form.Group>
              <Form.Group controlId="userRequestOrganization">
                <Form.Label>Organization</Form.Label>
                <Form.Control
                  name="organization"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={false}
                  isInvalid={false}
                  type="organization"
                  placeholder="Work/Organization"
                />
              </Form.Group>
              <Form.Group controlId="userRequestDescription">
                <Form.Label>Describe yourself</Form.Label>
                <Form.Control
                  name="description"
                  as="select"
                  className="valued"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={false}
                  isInvalid={false}
                >
                  {[
                    '',
                    'Academic / Researcher',
                    'Government Employee / Official',
                    'Housing Advocate / Organizer',
                    'Non-Profit Staff',
                    'Other',
                  ].map((option, index) => {
                    return (
                      <option key={`option-${index}`} value={option}>
                        {option}
                      </option>
                    )
                  })}
                </Form.Control>
              </Form.Group>
              <small className="form-text text-muted my-3">
                Please allow us time to process your request. Once approved, you'll receive an email containing a
                temporary password. Please contact <a href={`mailto:${c.CONTACT_EMAIL}`}>{c.CONTACT_EMAIL}</a> if you
                have any questions.
              </small>
              <Button block disabled={this.props.loading} variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          )
        }}
      </Formik>
    )
  }
}

UserRequestForm.propTypes = {
  dispatch: PropTypes.func,
  error: PropTypes.object,
  loading: PropTypes.bool,
}

export default UserRequestForm
