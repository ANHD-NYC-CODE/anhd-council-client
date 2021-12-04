import React from 'react'
import PropTypes from 'prop-types'
import { Form, Button } from 'react-bootstrap'
import { Formik } from 'formik'
import * as yup from 'yup'

import FormError from 'shared/components/FormError'
import SpinnerLoader from 'shared/components/Loaders/SpinnerLoader'
import { requestWithAuth } from 'shared/utilities/authUtils'
import { toast } from 'react-toastify'
import { 
  saveUserCustomSearch, 
  getUserSavedCustomSearches,
  deleteUserCustomSearch,
  updateSavedCustomSearch
} from 'Store/MyDashboard/actions'

import './style.scss';

const schema = yup.object({
  queryName: yup.string().required(),
  notifications: yup.bool().notRequired(),
  notificationFrequency: yup.string().notRequired()
})

class SaveCustomSearchForm extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      validated: false,
      notifications: this.props.notifications,
      editing: props.editing
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDeleteSearch = this.handleDeleteSearch.bind(this);
    this.handleChangeNotifications = this.handleChangeNotifications.bind(this);
    this.handleSuccessfulDelete = this.handleSuccessfulDelete.bind(this);
    this.handleSuccessfulSubmit = this.handleSuccessfulSubmit.bind(this);
    this.showSuccessMessage = this.showSuccessMessage.bind(this);
  }

  handleChangeNotifications() {
    this.setState({notifications : !this.state.notifications})
  }

  showSuccessMessage(verb) {
    toast.success(`Successfully ${verb} custom search!`);
    if (this.props.postSave()) {
      this.props.postSave();
    }
  }

  handleSuccessfulDelete() {
    this.props.dispatch(requestWithAuth(
      getUserSavedCustomSearches(() => this.showSuccessMessage("deleted"))
    ))
  }

  handleSuccessfulSubmit() {
    const verb = this.props.editing ? "updated" : "saved"
    this.props.dispatch(requestWithAuth(
      getUserSavedCustomSearches(() => this.showSuccessMessage(verb))
    ))
  }

  handleDeleteSearch() {
    const areYouSure = confirm("Are you sure you want to delete this saved custom search?");
    if (!areYouSure) return;

    this.props.dispatch(requestWithAuth(
      deleteUserCustomSearch(this.props.id, 
        this.handleSuccessfulDelete
      )
    ));
  }

  handleSubmit(formData) {
    this.setState({ validated: true })
    const frequency = this.state.notifications ? formData.notificationFrequency || "N" : "N";
    
    if (!this.state.editing) {
      this.props.dispatch(requestWithAuth(
        saveUserCustomSearch(
          formData.queryName, 
          frequency, 
          this.props.url,
          this.handleSuccessfulSubmit
        )
      ));
    }
    else {
      this.props.dispatch(requestWithAuth(
        updateSavedCustomSearch(
          this.props.id,
          formData.queryName,
          frequency,
          this.handleSuccessfulSubmit
        )
      ))
    }
  }

  render() {
    return (
      <Formik 
        enableReinitialize={true}
        initialValues={{
          queryName: this.props.queryName,
          notifications: this.props.notifications,
          notificationFrequency: this.props.notificationFrequency || "D"
        }}
        onSubmit={(e) => this.handleSubmit(e)} 
        validationSchema={schema}>
        {({ handleSubmit, handleChange, handleBlur, touched, errors, submitCount }) => {
          return (
            <Form
              noValidate
              validated={this.state.validated}
              onSubmit={handleSubmit}
            >
              <FormError show={!!this.props.error||!!this.props.deleteError} message={(this.props.error || this.props.deleteError || {}).message} />
              <Form.Group controlId="customSearchQueryName" className="mb-5">
                <Form.Label>Query Name</Form.Label>
                <Form.Control
                  name="queryName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="text"
                  defaultValue={this.props.queryName}
                />
                <FormError show={!!((submitCount || touched.queryName) && errors.queryName)} message="Query Name is a required field" />
              </Form.Group>
              <Form.Group controlId="customSearchNotification" className="mb-3">
                <div className="save-custom-search__notifications">
                  <Form.Label>Would you like to be notified for changes to this search?</Form.Label>
                  <Form.Check
                    type="switch"
                    name="notifications"
                    onChange={this.handleChangeNotifications}
                    onBlur={handleBlur}
                    defaultChecked={this.props.notifications}
                  />
                </div>
              </Form.Group>
              {this.state.notifications &&
                <Form.Group controlId="customSearchNotificationFrequency" className="mb-5">
                  <Form.Label>Notification Frequency</Form.Label>
                  <div className="save-custom-search__frequency inline-radio">
                      <Form.Check
                        inline
                        name="notificationFrequency"
                        label="Daily"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type="radio"
                        value="D"
                      />
                      <Form.Check
                        inline
                        name="notificationFrequency"
                        label="Weekly"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type="radio"
                        value="W"
                      />
                      <Form.Check
                        inline
                        name="notificationFrequency"
                        label="Monthly"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type="radio"
                        value="M"
                      />
                  </div>
                </Form.Group>
              }
              <div className="container mb-3">
                <Button
                  className="col-12"
                  block disabled={this.props.deleteLoading || this.props.loading}
                  variant="dark"
                  type="submit"
                  size="md"
                >
                  <span>Save</span>
                  <div className="button-loader__container">{this.props.loading && <SpinnerLoader size="20px" />}</div>
                </Button>
              </div>
              {this.state.editing && 
                <div className="container">
                  <Button
                    className="btn-loader col-12"
                    block disabled={this.props.deleteLoading || this.props.loading}
                    variant="outline-dark"
                    size="md"
                    onClick={this.handleDeleteSearch}
                  >
                    <span>Delete</span>
                    <div className="button-loader__container">{this.props.deleteLoading && <SpinnerLoader size="20px" />}</div>
                  </Button>
                </div>
              }
            </Form>
          )
        }}
      </Formik>
    )
  }
}

SaveCustomSearchForm.propTypes = {
  dispatch: PropTypes.func,
  queryName: PropTypes.string,
  editing: PropTypes.bool,
  url: PropTypes.string,
  notifications: PropTypes.bool,
  notificationFrequency: PropTypes.string,
  id: PropTypes.string,
  error: PropTypes.object,
  loading: PropTypes.bool,
  deleteError: PropTypes.object,
  deleteLoading: PropTypes.bool
}

export default SaveCustomSearchForm
