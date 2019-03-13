import React from 'react'
import Router from 'Router'

import { ToastContainer } from 'react-toastify'
import Auth from 'Auth'
import Config from 'Config'
import ModalContainer from 'ModalContainer'

import 'react-toastify/dist/ReactToastify.css'

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
