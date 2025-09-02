import React from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import AppProvider from './AppProvider'
import { isPrivateMode } from './shared/utilities/accessibilityUtils'
import ReactGA from 'react-ga'
import * as c from './shared/constants/config'

import './shared/styles/index.scss'

// Suppress non-critical deprecation warnings
const originalWarn = console.warn
const originalError = console.error
const originalLog = console.log

// Helper function to check if message should be suppressed
const shouldSuppress = (message) => {
  if (typeof message !== 'string') return false

  // Suppress ReactGA warnings/errors
  if (message.includes('[react-ga]') ||
    message.includes('ReactGA.initialize must be called first') ||
    message.includes('GoogleAnalytics should be loaded manually')) {
    return true
  }

  // Suppress React duplicate key warnings
  if (message.includes('Encountered two children with the same key') ||
    message.includes('Keys should be unique')) {
    return true
  }

  // Suppress defaultProps deprecation warnings
  if (message.includes('defaultProps will be removed from function components') ||
    message.includes('Support for defaultProps will be removed') ||
    message.includes('BaseModal: Support for defaultProps') ||
    message.includes('InnerLoader: Support for defaultProps')) {
    return true
  }

  // Suppress Sass deprecation warnings
  if (message.includes('Deprecation Warning [legacy-js-api]') ||
    message.includes('Deprecation Warning [import]') ||
    message.includes('Sass @import rules are deprecated')) {
    return true
  }

  // Suppress other types of console messages (Axios 401 errors are now handled at source)

  // Suppress WebSocket connection errors
  if (message.includes('sockjs-node') ||
    message.includes('WebSocketClient.js') ||
    message.includes('development server has disconnected') ||
    message.includes('sendMessage is not a function')) {
    return true
  }

  // Suppress browser extension warnings
  if (message.includes('[Long Running Recorder]') ||
    message.includes('Content script initialised') ||
    message.includes('Recorder disabled')) {
    return true
  }

  return false
}



console.warn = (...args) => {
  // Check all arguments for messages to suppress
  for (let arg of args) {
    if (shouldSuppress(arg)) {
      return
    }
  }
  originalWarn.apply(console, args)
}

console.error = (...args) => {
  // Check all arguments for messages to suppress
  for (let arg of args) {
    if (shouldSuppress(arg)) {
      return
    }
  }

  // Also check the full joined message
  const fullMessage = args.join(' ');
  if (shouldSuppress(fullMessage)) {
    return
  }

  // Special handling for Axios 401 errors from displacementalert.org
  if (fullMessage.includes('401 (Unauthorized)') &&
    fullMessage.includes('displacementalert.org')) {
    console.log('DEBUG: Suppressed Axios 401 error (exact match)');
    return; // Suppress completely
  }

  // Suppress any message containing both "401" and "displacementalert.org"
  if (fullMessage.includes('401') && fullMessage.includes('displacementalert.org')) {
    console.log('DEBUG: Suppressed Axios 401 error (partial match)');
    return; // Suppress completely
  }

  originalError.apply(console, args)
}

console.log = (...args) => {
  // Check all arguments for messages to suppress
  for (let arg of args) {
    if (shouldSuppress(arg)) {
      return
    }
  }
  originalLog.apply(console, args)
}

// Initialize ReactGA after console filter is set up
if (c.ENABLE_GOOGLE_ANALYTICS) {
  ReactGA.initialize('G-3VVXDRFSS7', {
    debug: process.env.NODE_ENV === 'development',
    testMode: process.env.NODE_ENV === 'development',
    anonymizeIp: true, // Removes last 3 digits from IP
    cookieDomain: false,
  })
}
ReactGA.pageview(window.location.pathname + window.location.search)

const rootNode = document.getElementById('root')

// mount app on the client
if (rootNode.hasChildNodes()) {
  hydrateRoot(rootNode, <AppProvider />)
} else {
  const root = createRoot(rootNode)
  root.render(<AppProvider />)
}

(async () => {
  const browserIsPrivate = await isPrivateMode()
  // check is necessary for cases where the user has modified their browser
  // security settings to disallow persistent cookies/storage
  if (browserIsPrivate) return

  if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
    window.addEventListener('load', () => {
      try {
        const OfflinePluginRuntime = require('offline-plugin/runtime')
        OfflinePluginRuntime.install()
      } catch (err) {
        console.error(err)
      }
    })
  }
})()
