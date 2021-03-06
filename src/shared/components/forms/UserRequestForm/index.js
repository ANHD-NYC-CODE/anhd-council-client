import React from 'react'
import PropTypes from 'prop-types'
import * as c from 'shared/constants'
import { Form, Button } from 'react-bootstrap'
import { postUserRequest } from 'Store/Request/actions'
import { Formik } from 'formik'
import * as yup from 'yup'
import FormError from 'shared/components/FormError'
import { toast } from 'react-toastify'
import SpinnerLoader from 'shared/components/Loaders/SpinnerLoader'

import './style.scss'

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
  organization: yup
    .string()
    .required()
    .max(120),
  position: yup
    .string()
    .required()
    .max(120),
  longDescription: yup.string().max(1000),
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
      description: formData.position,
      long_description: formData.longDescription,
    }

    this.props.dispatch(postUserRequest(userData, this.handleSuccessfulSubmit))
  }

  render() {
    return (
      <Formik onSubmit={e => this.handleSubmit(e)} validationSchema={schema}>
        {({ handleSubmit, handleChange, handleBlur, touched, errors, submitCount }) => {
          return (
            <Form
              noValidate
              className="user-request-form auth-login-form"
              validated={this.state.validated}
              onSubmit={handleSubmit}
            >
              <FormError show={!!this.props.error} message={(this.props.error || {}).message} />
              <Form.Text className="user-request-form__text mb-3">
                Please allow us time to process your request. Once approved, you’ll receive an email containing a
                temporary password. Please contact <a href={`mailto:${c.CONTACT_EMAIL}`}>{c.CONTACT_EMAIL}</a> with any
                questions.
              </Form.Text>
              <Form.Text className="user-request-form__text mb-3">
                We’ll only use your name and email to maintain your account and we won’t share it with anyone else.
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
                  placeholder=""
                />
                <FormError show={!!((submitCount || touched.email) && errors.email)} message={errors.email} />
                <Form.Text className="text-muted">Please use your organization’s email, if applicable.</Form.Text>
              </Form.Group>
              <Form.Group controlId="userRequestUsername">
                <Form.Label>Username *</Form.Label>
                <Form.Control
                  required
                  name="username"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={false}
                  isInvalid={!!this.props.submitCount || (touched.username && errors.username)}
                  placeholder=""
                />
                <FormError show={!!((submitCount || touched.username) && errors.username)} message={errors.username} />
              </Form.Group>
              <Form.Group controlId="userRequestFirstName">
                <Form.Label>First name *</Form.Label>
                <Form.Control
                  required
                  name="first_name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={false}
                  isInvalid={false}
                  placeholder=""
                />
                <FormError
                  show={!!((submitCount || touched.first_name) && errors.first_name)}
                  message={errors.first_name}
                />
              </Form.Group>
              <Form.Group controlId="userRequestLastName">
                <Form.Label>Last name *</Form.Label>
                <Form.Control
                  required
                  name="last_name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={false}
                  isInvalid={false}
                  placeholder=""
                />
                <FormError
                  show={!!((submitCount || touched.last_name) && errors.last_name)}
                  message={errors.last_name}
                />
              </Form.Group>
              <Form.Group controlId="userRequestOrganization">
                <Form.Label>Work/Organization *</Form.Label>
                <Form.Control
                  required
                  name="organization"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={false}
                  isInvalid={false}
                  placeholder=""
                />
                <FormError
                  show={!!((submitCount || touched.first_name) && errors.organization)}
                  message={errors.organization}
                />
              </Form.Group>
              <Form.Group controlId="userRequestDescription">
                <Form.Label>Position/Title *</Form.Label>
                <Form.Control
                  required
                  name="position"
                  className="valued"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={false}
                  isInvalid={false}
                  placeholder=""
                />
                <FormError
                  show={!!((submitCount || touched.first_name) && errors.position)}
                  message={errors.position}
                />
              </Form.Group>
              <Form.Group controlId="userRequestLongDescription">
                <Form.Label>Please describe how you'd like to use this tool.</Form.Label>
                <Form.Control
                  required
                  name="longDescription"
                  as="textarea"
                  className="valued"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={false}
                  isInvalid={false}
                  placeholder=""
                />
                <FormError
                  show={!!((submitCount || touched.first_name) && errors.position)}
                  message={errors.position}
                />
              </Form.Group>

              <Button className="btn-loader" block disabled={this.props.loading} variant="dark" type="submit">
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

UserRequestForm.propTypes = {
  dispatch: PropTypes.func,
  error: PropTypes.object,
  loading: PropTypes.bool,
}

export default UserRequestForm
