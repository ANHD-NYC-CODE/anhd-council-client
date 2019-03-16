import React from 'react'
import Router from 'Router'

import { ToastContainer } from 'react-toastify'
import Auth from 'Auth'
import Config from 'Config'
import ModalContainer from 'ModalContainer'

import 'react-toastify/dist/ReactToastify.css'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css'

import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css'
export class App extends React.Component {
  constructor() {
    super()
  }
  render() {
    return (
      <Auth>
        <Config>
          <Router />
          <ToastContainer />
          <ModalContainer />
        </Config>
      </Auth>
    )
  }
}

export default App
