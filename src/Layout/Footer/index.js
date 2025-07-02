import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Navbar } from 'react-bootstrap'
// We hope this will lead to better decisions on what to
// prioritize and how to improve the site.
import PrivacyPolicyModal from 'shared/components/modals/PrivacyPolicyModal'
import ModalContext from 'Modal/ModalContext'
import { fireAnalyticsModalOpenEvent } from 'Store/Analytics/actions'
import { BUILD_TIMESTAMP } from '../../buildTimestamp'

import './style.scss'

class Footer extends React.Component {
  constructor(props) {
    super(props)
  }

  isStaging = () => {
    return window.location.hostname.includes('staging')
  }

  render() {
    const isStaging = this.isStaging()
    
    return (
      <ModalContext.Consumer>
        {modal => {
          return (
            <footer className="footer">
              <Navbar className="footer-nav" expand="lg">
                <div className="layout-width-wrapper">
                  <div className="footer-text">
                    <p className="text-black">
                      {isStaging && (
                        <span style={{ color: '#ff6b35', fontWeight: 'bold' }}>
                          [STAGING - Built: {BUILD_TIMESTAMP}]{' '}
                        </span>
                      )}
                      This site uses{' '}
                      <a
                        className="text-link"
                        href="https://analytics.google.com"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Google Analytics
                      </a>{' '}
                      to help us better understand how it's used.{' '}
                      <button
                        className="text-link"
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
                      </button>{' '}
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
