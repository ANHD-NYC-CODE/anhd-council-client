import React from 'react'
import PropTypes from 'prop-types'
import { Form, Button } from 'react-bootstrap'
import { postUserAccessRequest } from 'Store/Request/actions'
import { getUserProfile } from 'Store/Auth/actions'
import { requestWithAuth } from 'shared/utilities/authUtils'
import { Formik } from 'formik'
import { toast } from 'react-toastify'
import * as yup from 'yup'
import FormError from 'shared/components/FormError'
import SpinnerLoader from 'shared/components/Loaders/SpinnerLoader'

import './style.scss'

const schema = yup.object({
  needEmail: yup
    .string(),
  email: yup
    .string()
    .email()
    .when("needEmail", {
      is: "yes",
      then: yup.string().required("Email is a required field")
    }),
  description: yup
    .string(),
  organization: yup
    .string()
    .max(120)
    .required("Organization is a required field"),
  position: yup
    .string()
    .required("Position is a required field")
    .max(120),
  term1: yup
    .boolean()
    .required(),
  term2: yup
    .boolean()
    .required(),
  term3: yup
    .boolean()
    .required(),
  term4: yup
    .boolean()
    .required()
})

const Page = {
  Select: "select",
  Anhd: "member organization",
  Government: "government",
  Personal: "personal"
}

class RequestAccessForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      validated: false,
      page: Page.Select
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleSuccessfulSubmit = this.handleSuccessfulSubmit.bind(this)
    this.setPage = this.setPage.bind(this)
    this.renderTerms = this.renderTerms.bind(this)
    this.renderEmailCheck = this.renderEmailCheck.bind(this)
  }

  setPage(page) {
    this.setState({page});
  }

  handleSuccessfulSubmit() {
    this.props.dispatch(
      requestWithAuth(getUserProfile())
    );
    this.props.modal.hideModal()
    toast.success("Request made successfully. You will receive an email upon approval of your request.");
  }

  handleSubmit(formData) {
    this.setState({ validated: true })
    let data = {
      access_type: this.state.page,
      organization_email: formData.needEmail === "yes" ? formData.email : undefined,
      organization: formData.organization,
      position: formData.position,
      description: formData.position
    }

    this.props.dispatch(requestWithAuth(
      postUserAccessRequest(data, this.handleSuccessfulSubmit))
    );
  }

  renderTerms(errors, submitCount, touched, handleChange, handleBlur) {
    return (
      <div className="request-access-form__terms">
        <p className="request-access-form__text mb-3">
          Please affirm the following:
        </p>
        <Form.Group controlId="accessRequestTerms" className="mb-4">
          <Form.Check 
            className="request-access-form__text mb-2"
            type="checkbox"
            name="term1"
            onChange={handleChange}
            onBlur={handleBlur}
            label="I will not use this data for profit or for personal or commercial gain."
          />
          <Form.Check 
            className="request-access-form__text mb-2"
            type="checkbox"
            name="term2"
            onChange={handleChange}
            onBlur={handleBlur}
            label="I will not use this data to discriminate against any person based on race, gender, race, color, religion, national origin, gender, marital status, sexual orientation, age, disability, veteran status, or any other characteristic protected by federal, state, or local law."
          />
          <Form.Check 
            className="request-access-form__text mb-2"
            type="checkbox"
            name="term3"
            onChange={handleChange}
            onBlur={handleBlur}
            label="I will not use this data to directly or indirectly displace any person."
          />
          <Form.Check 
            className="request-access-form__text mb-2"
            type="checkbox"
            name="term4"
            onChange={handleChange}
            onBlur={handleBlur}
            label={(
              <span>I have read, understand, and agree to the terms of the 
              <a href="https://portal.displacementalert.org/policies/data-access-policy" 
                target="_blank"> data access policy</a>.</span>
            )}
          />
          <FormError
            show={ 
              !!((submitCount || touched.term1 || touched.term2 || touched.term3 || touched.term4) && 
              (errors.term1 || errors.term2 || errors.term3 || errors.term4))
            }
            message="You must agree to all of the terms!"
          />
        </Form.Group>
        <p className="request-access-form__text mb-3">
          Misuse of the data will result in revocation of access. 
          Any redistribution of this data is subject to the same 
          terms and restrictions.
        </p>
        {this.state.page !== Page.Personal && (
          <p className="request-access-form__text mb-3">
            Please allow at least one business day for ANHD to 
            review your request. You can email 
            <a href="mailto:dapadmin@anhd.org"> dapadmin@anhd.org </a> 
            with questions.
          </p>
        )}
        {this.state.page === Page.Personal && (
          <p className="request-access-form__text mb-3">
            Please allow at least 3-5 business days for ANHD to 
            review your request. You can email
            <a href="mailto:dapadmin@anhd.org"> dapadmin@anhd.org </a> 
            with questions.
          </p>
        )}
      </div>
    )
  }

  renderEmailCheck(submitCount, handleChange, handleBlur, touched, errors) {
    return (
      <div className="request-access-form__need-email">
        <Form.Text className="request-access-form__text mb-3">
          Select one:
        </Form.Text>
        <Form.Group controlId="accessRequestNeedEmail">
          <Form.Check 
            type="radio"
            name="needEmail"
            className="request-access-form__text mb-1"
            onChange={handleChange}
            onBlur={handleBlur}
            value="no"
            label={`I used my official organizational email address ending in .${this.state.page === Page.Anhd ? "org" : "gov"} to create my DAP Portal Account.`}
          />
          <Form.Check 
            type="radio"
            name="needEmail"
            className="request-access-form__text"
            onChange={handleChange}
            onBlur={handleBlur}
            value="yes"
            label={`I did not use my official organizational email address ending in .${this.state.page === Page.Anhd ? "org" : "gov"} to create my DAP Portal Account.`}
          />
          <FormError 
            show={!!((submitCount || touched.needEmail) && errors.needEmail)} 
            message={errors.needEmail} 
          />
        </Form.Group>
      </div>
    )
  }

  render() {
    return (
      <div>
        {this.state.page !== Page.Select && (
          <button className="btn-sm btn-dark request-access-form__back" 
            onClick={() => this.setPage(Page.Select)}>Go Back</button>
        )}
        <p className="request-access-form__text mb-4">Select the statement that applies to you:</p>
        {this.state.page === Page.Select && (
          <div className="request-access-form__select">
            <p><a onClick={() => this.setPage(Page.Anhd)} className="request-access-form__text mb-3">
              <b>I am a staff member of an ANHD member organization.</b>
            </a></p>
            <p><a onClick={() => this.setPage(Page.Government)} className="request-access-form__text mb-3">
              <b>
                I am a New York City or State government employee, 
                elected official or elected official staff, or 
                member of a community board.
              </b>
            </a></p>
            <p><a onClick={() => this.setPage(Page.Personal)} className="request-access-form__text mb-3">
              <b>
                I am an employee or member of an organization or 
                an individual who will use this data for the purposes 
                of stopping speculation and displacement and/or 
                furthering tenant and smallhomeowner rights. 
              </b>
            </a></p>
          </div>
        )}
        {this.state.page !== Page.Select && (
          <div>
            {this.state.page === Page.Anhd && (
              <p className="request-access-form__text mb-4">
                <b>I am a staff member of an <a href="https://anhd.org/members" target="_blank" className="request-access-form__text mb-3">
                  ANHD member organization.
                </a></b>
              </p>
            )}
            {this.state.page === Page.Government && (
              <p className="request-access-form__text mb-4">
                <b>
                  I am a New York City or State government employee, 
                  elected official or elected official staff, or 
                  member of a community board.
                </b>
              </p>
            )}
            {this.state.page === Page.Personal && (
              <p className="request-access-form__text mb-4">
                <b>
                  I am an employee or member of an organization or 
                  an individual who will use this data for the purposes 
                  of stopping speculation and displacement and/or 
                  furthering tenant and small homeowner rights. 
                </b>
              </p>
            )}
            {this.state.page === Page.Personal && (
              <p className="request-access-form__text">
                Select the statement that applies to you:
              </p>
            )}
            {this.state.page === Page.Personal && (
              <ul className="mb-3">
                <li className="request-access-form__text ">
                  Academic or policy research
                </li>
                <li className="request-access-form__text">
                  Community/tenant organizing
                </li>
              </ul>
            )}
            <p className="request-access-form__text mb-4">
              To gain access to protected housing court and 
              foreclosures data, Please provide the following information:
            </p>
            <Formik onSubmit={e => this.handleSubmit(e)} validationSchema={schema}>
            {({ handleSubmit, handleChange, handleBlur, touched, errors, submitCount, values }) => {
              return (
                <Form
                  noValidate
                  className="request-access-form auth-login-form"
                  validated={this.state.validated}
                  onSubmit={handleSubmit}
                >
                  <FormError show={!!this.props.error} message={(this.props.error || {}).message} />
                  {this.state.page !== Page.Personal && this.renderEmailCheck(submitCount, handleChange, handleBlur, touched, errors)}
                  {(values.needEmail === "yes" && this.state.page !== Page.Personal) && (
                    <Form.Group controlId="accessRequestEmail">
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
                      <Form.Text className="text-muted">We will send an email to this account to verify it’s yours and update your DAP Portal account with this email address.</Form.Text>
                    </Form.Group>
                  )}
                  {(values.needEmail || this.state.page === Page.Personal) && (
                    <div className="request-access-form__details">
                      <Form.Group controlId="accessRequestOrganization" className="mb-3">
                        <Form.Label>
                          {this.state.page === Page.Government ? "Office, Agency, or Government Body*" : "Organization *"}
                        </Form.Label>
                        <Form.Control
                          required
                          name="organization"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isValid={false}
                          isInvalid={!!this.props.submitCount || (touched.organization && errors.organization)}
                          placeholder=""
                        />
                        <FormError show={!!((submitCount || touched.organization) && errors.organization)} message={errors.organization} />
                        {this.state.page === Page.Anhd && (
                          <Form.Text className="text-muted">
                            Should be an ANHD member organization <a href="https://anhd.org/members" target="_blank">(view list of ANHD members)</a>. 
                            If not, please <a className="request-access-form__text" onClick={() => this.setPage(Page.Personal)}>
                              request access through this form
                            </a>.
                          </Form.Text>
                        )}
                      </Form.Group>
                      <Form.Group controlId="accessRequestPosition">
                        <Form.Label>Position / Title *</Form.Label>
                        <Form.Control
                          required
                          name="position"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isValid={false}
                          isInvalid={false}
                          placeholder=""
                        />
                        <FormError
                          show={!!((submitCount || touched.position) && errors.position)}
                          message={errors.position}
                        />
                      </Form.Group>
                      {this.state.page === Page.Personal && (
                        <Form.Group controlId="accessRequestDescription">
                          <Form.Label className="request-access-form__text">
                            Please describe how you would use this data for the purposes of 
                            stopping speculation and displacement and/or furthering tenant 
                            and small homeowner rights.* 
                          </Form.Label>
                          <Form.Control
                            as="textarea"
                            name="description"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={false}
                            isInvalid={false}
                            placeholder=""
                          />
                          <FormError
                            show={!!((submitCount || touched.description) && errors.description)}
                            message={errors.description}
                          />
                      </Form.Group>
                      )}
                      {this.renderTerms(errors, submitCount, touched, handleChange, handleBlur)}
                      <Button className="btn-loader" block disabled={this.props.loading} variant="dark" type="submit">
                        <span>Submit</span>
                        <div className="button-loader__container">{this.props.loading && <SpinnerLoader size="20px" />}</div>
                      </Button>
                    </div>
                  )}
                </Form>
              )
            }}
          </Formik>
          </div>
        )}
      </div>
    )
  }
}

RequestAccessForm.propTypes = {
  dispatch: PropTypes.func,
  error: PropTypes.object,
  loading: PropTypes.bool,
}

export default RequestAccessForm
