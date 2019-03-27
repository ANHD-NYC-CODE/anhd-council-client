import React from 'react'
import { Col, Jumbotron } from 'react-bootstrap'

import './style.scss'

const IntroductionBlock = props => {
  return (
    <Jumbotron className="introduction-block text-light">
      <h4 className="font-weight-bold mb-5">Welcome to DAP Portal</h4>
      <p>
        For New Yorkers, stopping tenant displacement is one of the most urgent issues of the day. The Displacement
        Alert Project is designed to address this problem by providing effective early warning information for residents
        facing harassment and displacement, for communities being destabilized, and for the community groups and policy
        makers trying to address the crisis.
      </p>
      <p>
        We use data and information visualization tools to proactively identify buildings that are facing a rising risk
        of displacement. With this information, community groups, decision makers, and local residents themselves can
        take strategic steps to push back with outreach, education, and organizing strategies.
      </p>
      <p>
        Existing data and information is fragmented and often confusing, which can make it challenging to identify which
        buildings are most are most vulnerable in order to do something about it.
      </p>
      <p>
        Our Property Lookup tool allows you to easily find all the relevant information about a building across multiple
        city agency datasets and other unique data sources.
      </p>
      <p>
        Our District Dashboard allows you to see displacement threat indicators and trends across your local City
        Council or Community District.
      </p>
      <p>
        Our Advanced Search tool allows you to analyze and download data points on local housing issues by flexibly
        creating custom searches that query many housing- and displacement-related datasets.
      </p>
    </Jumbotron>
  )
}

export default IntroductionBlock
