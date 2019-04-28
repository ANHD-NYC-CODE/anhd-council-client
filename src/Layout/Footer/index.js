import React from 'react'
import PropTypes from 'prop-types'
import { Navbar, Nav } from 'react-bootstrap'
// We hope this will lead to better decisions on what to
// prioritize and how to improve the site.
import PrivacyPolicyModal from 'shared/components/modals/PrivacyPolicyModal'
import ModalContext from 'Modal/ModalContext'
const Footer = props => {
  return (
    <ModalContext.Consumer>
      {modal => {
        return (
          <footer className="footer">
            <Navbar bg="dark" variant="light" expand="lg">
              <p className="text-muted small">
                This site uses{' '}
                <a href="https://analytics.google.com" target="_blank" rel="noopener noreferrer">
                  Google Analytics
                </a>{' '}
                to help us better understand how it's used.
                <a
                  href="#"
                  onClick={() =>
                    modal.setModal({
                      modalComponent: PrivacyPolicyModal,
                      modalProps: {
                        size: 'lg',
                      },
                    })
                  }
                >
                  {' '}
                  Read more
                </a>{' '}
                about how we collect analytics.
              </p>
            </Navbar>
          </footer>
        )
      }}
    </ModalContext.Consumer>
  )
}

Footer.propTypes = {}

export default Footer
