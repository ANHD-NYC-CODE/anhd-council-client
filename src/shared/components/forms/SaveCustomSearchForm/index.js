import React from 'react'
import PropTypes from 'prop-types'
import { Form, Button } from 'react-bootstrap'
import { Formik } from 'formik'
import * as yup from 'yup'

import FormError from 'shared/components/FormError'
import { requestWithAuth } from 'shared/utilities/authUtils'
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
    this.handleDeleteBookmark = this.handleDeleteBookmark.bind(this);
    this.handleChangeNotifications = this.handleChangeNotifications.bind(this);
  }

  handleChangeNotifications() {
    this.setState({notifications : !this.state.notifications})
  }

  async handleDeleteBookmark() {
    const areYouSure = confirm("Are you sure you want to delete this saved custom search?");
    if (!areYouSure) return;

    await this.props.dispatch(requestWithAuth(
      deleteUserCustomSearch(this.props.id)
    ));
    await this.props.dispatch(requestWithAuth(
      getUserSavedCustomSearches()
    ))
    this.props.postSave();
  }

  async handleSubmit(formData) {
    this.setState({ validated: true })
    const frequency = this.state.notifications ? formData.notificationFrequency || "N" : "N";
    
    if (!this.state.editing) {
      await this.props.dispatch(requestWithAuth(
        saveUserCustomSearch(
          formData.queryName, 
          frequency, 
          this.props.url
        )
      ));
    }
    else {
      await this.props.dispatch(requestWithAuth(
        updateSavedCustomSearch(
          this.props.id,
          formData.queryName,
          frequency
        )
      ))
    }
    
    await this.props.dispatch(requestWithAuth(
      getUserSavedCustomSearches()
    ))

    if (this.props.postSave) {
      this.props.postSave();
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
        onSubmit={async(e) => await this.handleSubmit(e)} 
        validationSchema={schema}>
        {({ handleSubmit, handleChange, handleBlur, touched, errors, submitCount }) => {
          return (
            <Form
              noValidate
              validated={this.state.validated}
              onSubmit={handleSubmit}
            >
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
                  <Form.Switch
                    name="notifications"
                    onChange={this.handleChangeNotifications}
                    onBlur={handleBlur}
                    type="text"
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
                        defaultChecked={this.props.notificationFrequency || "D" === "D"}
                      />
                      <Form.Check
                        inline
                        name="notificationFrequency"
                        label="Weekly"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type="radio"
                        value="W"
                        defaultChecked={this.props.notificationFrequency === "W"}
                      />
                      <Form.Check
                        inline
                        name="notificationFrequency"
                        label="Monthly"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type="radio"
                        value="M"
                        defaultChecked={this.props.notificationFrequency === "M"}
                      />
                  </div>
                </Form.Group>
              }
              <div className="container mb-3">
                <Button
                  className="col-12"
                  variant="dark"
                  type="submit"
                  size="md"
                >
                  <span>Save</span>
                </Button>
              </div>
              {this.state.editing && 
                <div className="container">
                  <Button
                    className="col-12"
                    variant="outline-dark"
                    size="md"
                    onClick={async() => await this.handleDeleteBookmark()}
                  >
                    <span>Delete</span>
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
  id: PropTypes.string
}

export default SaveCustomSearchForm
