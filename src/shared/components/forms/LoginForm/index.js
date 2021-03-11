import React from 'react'
import PropTypes from 'prop-types'
import { Form, Button } from 'react-bootstrap'
import { Formik } from 'formik'
import * as yup from 'yup'

import BaseLink from 'shared/components/BaseLink'
import { loginUser } from 'Store/Auth/actions'
import FormError from 'shared/components/FormError'
import SpinnerLoader from 'shared/components/Loaders/SpinnerLoader'
import './style.scss'

const schema = yup.object({
  username: yup.string().required(),
  password: yup.string().required(),
})

class LoginForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      validated: false,
    }

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(formData) {
    this.setState({ validated: true })
    const userData = { username: formData.username, password: formData.password }
    this.props.dispatch(loginUser(userData, this.props.postLoginAction))
  }

  render() {
    return (
      <Formik onSubmit={e => this.handleSubmit(e)} validationSchema={schema}>
        {({ handleSubmit, handleChange, handleBlur, touched, errors, submitCount }) => {
          return (
            <Form
              noValidate
              className="login-form auth-login-form"
              validated={this.state.validated}
              onSubmit={handleSubmit}
            >
              <p className="login-form__text">
                An account allows you to view protected foreclosures data. To protect privacy, we only grant accounts to
                ANHD member organizations, elected officials and their staff, and partners who are committed to ending
                displacement.
              </p>
              <FormError show={!!this.props.error} message={(this.props.error || {}).message} />
              <Form.Group controlId="loginUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  required
                  name="username"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={!!this.props.submitCount || (touched.username && errors.username)}
                  type="text"
                  placeholder=""
                />
                <FormError show={!!((submitCount || touched.username) && errors.username)} message={errors.username} />
              </Form.Group>

              <Form.Group controlId="loginPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  required
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={!!this.props.submitCount || (touched.password && errors.password)}
                  placeholder=""
                  type="password"
                />
                <FormError show={!!((submitCount || touched.password) && errors.password)} message={errors.password} />
              </Form.Group>
              <div className="login-form__submit-row">
                <BaseLink className="btn-link" href="https://api.displacementalert.org/password_reset">
                  Reset Password
                </BaseLink>
                <Button
                  className="login-form__submit-button btn-loader"
                  disabled={this.props.loading}
                  variant="dark"
                  type="submit"
                  size="md"
                >
                  <span>Submit</span>
                  <div className="button-loader__container">{this.props.loading && <SpinnerLoader size="20px" />}</div>
                </Button>
              </div>
            </Form>
          )
        }}
      </Formik>
    )
  }
}

LoginForm.propTypes = {
  dispatch: PropTypes.func,
  modal: PropTypes.object,
  error: PropTypes.object,
  loading: PropTypes.bool,
}

export default LoginForm
