import React from 'react'
import { Jumbotron, Button } from 'react-bootstrap'
import BugReportModal from 'shared/components/modals/BugReportModal'
import ModalContext from 'Modal/ModalContext'
import BaseLink from 'shared/components/BaseLink'
import './style.scss'

const IntroductionBlock = props => {
  return (
    <Jumbotron className="introduction-block text-light mb-0">
      <h3 className="mb-4">WELCOME TO DAP PORTAL [BETA]!</h3>
      <p className="font-weight-bold">
        DAP Portal is a comprehensive new research tool that includes dozens of datasets indicating harassment and
        potential displacement from New York City housing.
      </p>
      <ModalContext.Consumer>
        {modal => {
          return (
            <p className="font-weight-bold">
              DAP Portal is currently in Beta, so please send us{' '}
              <BaseLink href="https://forms.gle/EAUkzgsAkHn8NgbTA">feedback</BaseLink> or{' '}
              <BaseLink
                href="#"
                onClick={e => {
                  e.preventDefault()
                  modal.setModal({
                    modalComponent: BugReportModal,
                    modalProps: {
                      size: 'lg',
                    },
                  })
                }}
              >
                report any bugs
              </BaseLink>{' '}
              you encounter.
            </p>
          )
        }}
      </ModalContext.Consumer>

      <p>
        The <BaseLink href="/lookup">Property Lookup</BaseLink> tool allows you to easily find all the relevant
        information about a building across a variety of city agency and other unique datasets.
      </p>
      <p>
        The <BaseLink href="/map">District Dashboard</BaseLink> allows you to see displacement threat indicators and
        trends across your local City Council or Community Board.
      </p>
      <p>
        The <BaseLink href="/search">Custom Search</BaseLink> allows you to produce custom maps and tables of buildings
        that meet your unique search criteria by querying dozens of housing and displacement-related datasets.
      </p>
      <p>The DAP Portal is made possible by the support of the New York City Council.</p>

      {props.scrollToControls && (
        <div className="d-block d-lg-none my-5">
          <Button variant="info" onClick={props.scrollToControls}>
            Get Started
          </Button>
        </div>
      )}
      <h3 className="mb-4">About the Displacement Alert Project</h3>
      <hr />
      <p>
        For New Yorkers, stopping tenant displacement is one of the most urgent issues of the day.{' '}
        <BaseLink href="https://displacementalert.org">The Displacement Alert Project</BaseLink> is designed to address
        this problem by providing effective early warning information for residents facing harassment and displacement,
        for communities being destabilized, and for the community groups and policy makers trying to address the crisis.
      </p>
      <p>
        Existing data and information is fragmented and often confusing, which can make it challenging to identify which
        buildings are most vulnerable in order to do something about it.
      </p>
      <p>
        We use data and information visualization tools to proactively identify buildings that are facing a rising risk
        of displacement. With this information, community groups, decision makers, and local residents themselves can
        take strategic steps to push back with outreach, education, and organizing strategies.
      </p>
      <p>
        The Displacement Alert Project is operated by the{' '}
        <BaseLink href="https://anhd.org">Association for Neighborhood and Housing Development (ANHD)</BaseLink>.
      </p>
    </Jumbotron>
  )
}

export default IntroductionBlock
