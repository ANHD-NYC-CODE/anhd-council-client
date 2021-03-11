import React from 'react'
import { Jumbotron } from 'react-bootstrap'

import BaseLink from 'shared/components/BaseLink'
import './style.scss'

const IntroductionBlock = () => (
  <Jumbotron className="introduction-block text-light mb-0">
    <h3 className="mb-4">ABOUT</h3>
    <p>
      The Displacement Alert Project (DAP) Portal is a dynamic and powerful data tool that helps you understand a New
      York City neighborhood’s housing landscape, where tenants and homeowners are at heightened risk of displacement,
      and what is happening in buildings where tenants or homeowners are having problems.
    </p>
    <p>DAP Portal is made up of three features:</p>
    <p>
      The <BaseLink href="/lookup">Property Lookup</BaseLink> lets you investigate displacement threats at a building
      level, view detailed records over time, find patterns and connections, and get the most recent information
      possible.
    </p>
    <p>
      The <BaseLink href="/map">District Dashboard</BaseLink> allows you to apply displacement threat indicators
      across districts or zip codes to see a broader snapshot of threats by neighborhood, and produce maps and lists
      of buildings that might not be on your radar for outreach and organizing.
    </p>
    <p>
      The <BaseLink href="/search">Custom Search</BaseLink> allows you to customize maps and lists of buildings that
      meet your unique search criteria and answer specific research questions about the threats facing our
      neighborhoods.
    </p>
    <p>The DAP Portal is made possible by the support of the New York City Council and New York State Senate.</p>

    {/* {props.scrollToControls && (
      <div className="d-block d-lg-none my-5">
        <Button variant="info" onClick={props.scrollToControls}>
          Get Started
        </Button>
      </div>
    )} */}
    <h3 className="mb-4">The Displacement Alert Project</h3>
    <p>
      In New York City, ending displacement is one of the most urgent issues we face.
      <BaseLink href="https://displacementalert.org">The Displacement Alert Project</BaseLink> is designed to address
      this problem by providing effective early warning information for residents facing harassment and displacement,
      for communities being destabilized, and for the community groups and policy makers trying to address the crisis.
    </p>
    <p>
      Existing data and information is fragmented and often confusing, which can make it challenging to identify which
      buildings are most vulnerable in order to intervene.
    </p>
    <p>
      We use data and information visualization tools to proactively identify buildings that are facing a rising risk
      of displacement. With this information community groups, decision makers, and local residents themselves can
      take strategic steps to push back with outreach, education, and organizing strategies.
    </p>
    <p>
      The Displacement Alert Project is operated by the{' '}
      <BaseLink href="https://anhd.org">Association for Neighborhood and Housing Development (ANHD)</BaseLink>.
    </p>
    <p>
      Developed by <BaseLink href="https://data.automatica.love">Data Automatica</BaseLink>.
    </p>
  </Jumbotron>
)

export default IntroductionBlock
