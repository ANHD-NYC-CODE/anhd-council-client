import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Navbar } from 'react-bootstrap'
// We hope this will lead to better decisions on what to
// prioritize and how to improve the site.
import PrivacyPolicyModal from 'shared/components/modals/PrivacyPolicyModal'
import ModalContext from 'Modal/ModalContext'
import { fireAnalyticsModalOpenEvent } from 'Store/Analytics/actions'

import './style.scss'

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
              <Navbar className="footer-nav" expand="lg">
                <div className="layout-width-wrapper">
                  <div className="footer-text">
                    <p className="text-black">
                      This site uses{' '}
                      <a
                        className="font-weight-bold"
                        href="https://analytics.google.com"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Google Analytics
                      </a>{' '}
                      to help us better understand how it's used.
                      <a
                        className="font-weight-bold"
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
