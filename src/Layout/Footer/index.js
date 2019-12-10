import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Navbar, Nav } from 'react-bootstrap'
// We hope this will lead to better decisions on what to
// prioritize and how to improve the site.
import PrivacyPolicyModal from 'shared/components/modals/PrivacyPolicyModal'
import ModalContext from 'Modal/ModalContext'
import { fireAnalyticsModalOpenEvent } from 'Store/Analytics/actions'

class Footer extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <ModalContext.Consumer>
        {modal => {
          return (
            <footer className="footer">
              <Navbar bg="dark" variant="light" expand="lg">
                <div className="layout-width-wrapper">
                  <p className="text-muted small">
                    This site uses{' '}
                    <a href="https://analytics.google.com" target="_blank" rel="noopener noreferrer">
                      Google Analytics
                    </a>{' '}
                    to help us better understand how it's used.
                    <a
                      href="#"
                      onClick={() => {
                        this.props.dispatch(fireAnalyticsModalOpenEvent())

                        modal.setModal({
                          modalComponent: PrivacyPolicyModal,
                          modalProps: {
                            size: 'lg',
                          },
                        })
                      }}
                    >
                      {' '}
                      Read more
                    </a>{' '}
                    about how we collect analytics.
                  </p>
                </div>
              </Navbar>
            </footer>
          )
        }}
      </ModalContext.Consumer>
    )
  }
}

Footer.propTypes = {
  dispatch: PropTypes.func,
}

export default connect()(Footer)
