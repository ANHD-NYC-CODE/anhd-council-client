import React from 'react'
import PropTypes from 'prop-types'
import { Form, Button } from 'react-bootstrap'
import { loginUser } from 'Store/Auth/actions'
import { Formik } from 'formik'
import * as yup from 'yup'
import FormError from 'shared/components/FormError'
import UserRequestModal from 'shared/components/modals/UserRequestModal'

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
    this.props.dispatch(loginUser(userData))
  }

  render() {
    return (
      <Formik onSubmit={e => this.handleSubmit(e)} validationSchema={schema}>
        {({ handleSubmit, handleChange, handleBlur, touched, errors, submitCount }) => {
          return (
            <Form noValidate className="auth-login-form" validated={this.state.validated} onSubmit={handleSubmit}>
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
                  placeholder="Enter username"
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
                  placeholder="Password"
                  type="password"
                />
                <FormError show={!!((submitCount || touched.password) && errors.password)} message={errors.password} />
              </Form.Group>
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

LoginForm.propTypes = {
  dispatch: PropTypes.func,
  modal: PropTypes.object,
  error: PropTypes.object,
  loading: PropTypes.bool,
}

export default LoginForm
