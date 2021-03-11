import React from 'react'
import ReactDOM from 'react-dom'
import AppProvider from 'AppProvider'
import * as OfflinePluginRuntime from 'offline-plugin/runtime'
import { isPrivateMode } from 'shared/utilities/accessibilityUtils'

import './shared/styles/index.scss'

const rootNode = document.getElementById('root')

// mount app on the client
if (rootNode.hasChildNodes()) {
  ReactDOM.hydrate(<AppProvider />, rootNode)
} else {
  ReactDOM.render(<AppProvider />, rootNode)
}

(async () => {
  const browserIsPrivate = await isPrivateMode()
  // check is necessary for cases where the user has modified their browser
  // security settings to disallow persistent cookies/storage
  if (browserIsPrivate) return

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      try {
        OfflinePluginRuntime.install()
      } catch (err) {
        console.error(err)
      }
    })
  }
})()
