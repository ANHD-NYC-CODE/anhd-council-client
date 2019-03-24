import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import UserContext from 'Auth/UserContext'
import NavigationBar from 'Layout/NavigationBar'
import SubHeader from 'Layout/SubHeader'
import Footer from 'Layout/Footer'
import PrintLayout from 'Layout/PrintLayout'
import './style.scss'
import { Container } from 'react-bootstrap'
import LayoutContext from 'Layout/LayoutContext'
import ModalContext from 'Modal/ModalContext'

class Layout extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      print: false,
      printTitle: undefined,
    }

    this.togglePrint = this.togglePrint.bind(this)
  }

  togglePrint(title) {
    this.setState({
      print: !this.state.print,
      printTitle: title,
    })
  }
  render() {
    return (
      <LayoutContext.Provider
        value={{
          print: this.state.print,
          printTitle: this.state.printTitle,
          togglePrint: this.togglePrint,
        }}
      >
        {this.state.print ? (
          <PrintLayout>{this.props.children}</PrintLayout>
        ) : (
          <div className="layout">
            <div className="footer-push">
              <UserContext.Consumer>
                {auth => (
                  <div>
                    <NavigationBar />
                    <ModalContext.Consumer>
                      {modal => {
                        return <SubHeader modal={modal} auth={auth} />
                      }}
                    </ModalContext.Consumer>
                  </div>
                )}
              </UserContext.Consumer>
              <Container fluid={true}>{this.props.children}</Container>
            </div>
            <Footer />
          </div>
        )}
      </LayoutContext.Provider>
    )
  }
}

Layout.propTypes = {}

const mapStateToProps = state => {
  return { print: state.appState.printView }
}

export default connect(mapStateToProps)(Layout)
