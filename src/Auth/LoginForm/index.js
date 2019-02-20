import React from 'react'
import PropTypes from 'prop-types'
import { Form, Button } from 'react-bootstrap'
import { loginUser } from 'Store/Auth/actions'
import { Formik } from 'formik'
import * as yup from 'yup'

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

  handleSubmit(event) {
    event.preventDefault()
    event.stopPropagation()
    const form = event.currentTarget
    if (form.checkValidity() === false) return

    this.setState({ validated: true })
    const userData = { username: form.elements.loginUsername.value, password: form.elements.loginPassword.value }
    this.props.dispatch(loginUser(userData))
  }

  render() {
    return (
      <Formik validationSchema={schema}>
        {({ handleChange, handleBlur, touched, errors }) => (
          <Form className="auth-login-form" validated={this.state.validated} onSubmit={e => this.handleSubmit(e)}>
            {this.props.error && (
              <Form.Text className="text-danger" type="invalid">
                {this.props.error.message}
              </Form.Text>
            )}
            <Form.Group controlId="loginUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                required
                name="username"
                onChange={handleChange}
                onBlur={handleBlur}
                isValid={touched.username && !errors.username}
                isInvalid={touched.username && errors.username}
                type="text"
                placeholder="Enter username"
              />
              {touched.username && errors.username && (
                <Form.Text className="text-danger" type="invalid">
                  {errors.username}
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group controlId="loginPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                isValid={touched.password && !errors.password}
                placeholder="Password"
                type="password"
              />
              {touched.password && errors.password && (
                <Form.Text className="text-danger" type="invalid">
                  {errors.password}
                </Form.Text>
              )}
            </Form.Group>
            <Button disabled={this.props.loading} variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    )
  }
}

LoginForm.propTypes = {
  dispatch: PropTypes.func,
  error: PropTypes.object,
  loading: PropTypes.bool,
}

export default LoginForm
