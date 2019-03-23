import React from 'react'
import Router from 'Router'

import { ToastContainer } from 'react-toastify'
import Auth from 'Auth'
import Config from 'Config'
import Modal from 'Modal'
import ErrorBoundary from 'shared/components/ErrorBoundary'
import 'react-toastify/dist/ReactToastify.css'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css'

import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css'

export class App extends React.Component {
  constructor() {
    super()
  }
  render() {
    return (
      <ErrorBoundary>
        <Modal>
          <Auth>
            <Config>
              <Router />
              <ToastContainer />
            </Config>
          </Auth>
        </Modal>
      </ErrorBoundary>
    )
  }
}

export default App
