import React from 'react'
import { Col, Jumbotron } from 'react-bootstrap'

import './style.scss'

const IntroductionBlock = props => {
  return (
    <Jumbotron className="introduction-block text-light">
      <h4>Welcome to DAP Portal</h4>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras id lobortis diam. Praesent neque purus, mattis eu
        interdum eget, maximus a purus. Quisque interdum auctor ligula vel commodo. Aliquam est arcu, gravida at
        ultrices vitae, mattis non massa. Curabitur posuere, ex nec rhoncus lobortis, est mi luctus massa, in tempor dui
        est vel erat.
      </p>
      <p>
        Morbi sed mauris eu dui pharetra finibus. Nunc convallis hendrerit porta. Etiam maximus sed risus eu
        scelerisque. Duis pretium tortor felis. Morbi tempor tincidunt erat, ullamcorper sollicitudin nibh tempus at.
        Nullam placerat efficitur lectus in commodo. Ut sit amet lorem ut nisi scelerisque mollis vel at nunc. Maecenas
        sed malesuada nunc.
      </p>
    </Jumbotron>
  )
}

export default IntroductionBlock
