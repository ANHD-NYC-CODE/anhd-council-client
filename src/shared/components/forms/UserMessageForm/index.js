import React from 'react'
import PropTypes from 'prop-types'
import { Form, Button } from 'react-bootstrap'
import { Formik } from 'formik'
import * as yup from 'yup'
import { toast } from 'react-toastify'

import FormError from 'shared/components/FormError'
import { postUserMessage } from 'Store/Request/actions'
import SpinnerLoader from 'shared/components/Loaders/SpinnerLoader'

import './style.scss'

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

class UserMessageForm extends React.Component {
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
    toast.success('Your message has been submitted. Thank you!')
  }
  handleSubmit(formData) {
    this.setState({ validated: true })
    const bugData = {
      from_email: formData.email,
      description: formData.description,
    }

    this.props.dispatch(postUserMessage(bugData, this.handleSuccessfulSubmit))
  }

  render() {
    return (
      <Formik onSubmit={e => this.handleSubmit(e)} validationSchema={schema}>
        {({ handleSubmit, handleChange, handleBlur, touched, errors, submitCount }) => {
          return (
            <Form
              noValidate
              className="bug-report-form auth-login-form"
              validated={this.state.validated}
              onSubmit={handleSubmit}
            >
              <FormError show={!!this.props.error} message={(this.props.error || {}).message} />

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
                <Form.Text className="bug-report-form__text text-muted mb-3">
                  We'll only use your email if needed to respond to your message and won't share it with anyone else.
                </Form.Text>
                <FormError show={!!((submitCount || touched.email) && errors.email)} message={errors.email} />
              </Form.Group>
              <Form.Text>
                If reporting a bug, please provide a detailed description, including:
                <ol>
                  <li>The browser you were using.</li>
                  <li>The url of the page that the bug occured on.</li>
                  <li>(important!) The steps we'd need to take to see the bug for ourselves.</li>
                </ol>
              </Form.Text>
              <Form.Group controlId="userRequestUsername">
                <Form.Label>Message *</Form.Label>
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

UserMessageForm.defaultProps = {
  error: null,
}

UserMessageForm.propTypes = {
  dispatch: PropTypes.func,
  error: PropTypes.object,
  loading: PropTypes.bool,
}

export default UserMessageForm
