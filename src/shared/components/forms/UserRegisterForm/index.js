import React from 'react'
import PropTypes from 'prop-types'
import { Form, Button } from 'react-bootstrap'
import { postUserRegister } from 'Store/Request/actions'
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
    .required("Email is a required field"),
  username: yup
    .string()
    .max(64)
    .required("Username is a required field"),
  first_name: yup
    .string()
    .required("First Name is a required field")
    .max(120),
  last_name: yup
    .string()
    .required("Last Name is a required field")
    .max(120)
})

class UserRegisterForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      validated: false,
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleSuccessfulSubmit = this.handleSuccessfulSubmit.bind(this)
  }

  handleSuccessfulSubmit(email) {
    this.props.hideModal()
    toast.success(`Registered successfully. An email has been sent to ${email} with your password.`);
  }

  handleSubmit(formData) {
    this.setState({ validated: true })
    const userData = {
      email: formData.email,
      username: formData.username,
      first_name: formData.first_name,
      last_name: formData.last_name
    }

    this.props.dispatch(postUserRegister(userData,
        () => this.handleSuccessfulSubmit(formData.email)));
  }

  render() {
    return (
      <Formik onSubmit={e => this.handleSubmit(e)} validationSchema={schema}>
        {({ handleSubmit, handleChange, handleBlur, touched, errors, submitCount }) => {
          return (
            <Form
              noValidate
              className="user-register-form auth-login-form"
              validated={this.state.validated}
              onSubmit={handleSubmit}
            >
              <FormError show={!!this.props.error} message={(this.props.error || {}).message} />
              <Form.Text className="user-register-form__text mb-3">
                An account allows you to bookmark properties, save custom searches, 
                and set up notifications for new data results. 
              </Form.Text>
              <Form.Text className="user-register-form__text mb-3">
                To create an account, enter the following information:              
              </Form.Text>
              <Form.Group controlId="userRegisterEmail">
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
              <Form.Group controlId="userRegisterUsername">
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
              <Form.Group controlId="userRegisterFirstName">
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
              <Form.Group controlId="userRegisterLastName">
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

UserRegisterForm.propTypes = {
  dispatch: PropTypes.func,
  error: PropTypes.object,
  loading: PropTypes.bool,
}

export default UserRegisterForm
