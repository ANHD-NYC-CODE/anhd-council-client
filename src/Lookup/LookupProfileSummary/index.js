import React from 'react'
import PropTypes from 'prop-types'
import InnerLoader from 'shared/components/Loaders/InnerLoader'
import ConfigContext from 'Config/ConfigContext'
import TableAlert from 'shared/components/BaseTable/TableAlert'

import { councilIdToString, communityIdToString } from 'shared/utilities/languageUtils'
import { geographyToLink } from 'shared/utilities/routeUtils'
import BaseLink from 'shared/components/BaseLink'

import { Card } from 'react-bootstrap'
import PropertySummaryBody from 'Lookup/LookupProfileSummary/PropertySummaryBody'
import OwnershipSection from 'Lookup/LookupProfileSummary/OwnershipSection'
import RentStabilizationSection from 'Lookup/LookupProfileSummary/RentStabilizationSection'

import PrintLookupProfileSummary from 'Lookup/PrintLookupProfileSummary'
import LayoutContext from 'Layout/LayoutContext'
import './style.scss'

const LookupProfileSummary = props => {
  if (props.loading) {
    return <InnerLoader />
  } else if (props.error) {
    return <TableAlert message={props.error.messge} />
  } else if (Object.keys(props.records).length) {
    const profile = props.records
    return (
      <LayoutContext.Consumer>
        {layout => {
          return layout.print ? (
            <PrintLookupProfileSummary profile={profile} />
          ) : (
            <Card className="lookup-profile-summary p-0 m-0">
              <Card.Body className="lookup-profile-summary__body p-0">
                <h5 className=" lookup-profile-summary__geography-link">
                  <BaseLink
                    href={geographyToLink('COUNCIL', profile.council)}
                    text={councilIdToString(profile.council)}
                  />
                </h5>
                <p className=" lookup-profile-summary__geography-link">
                  <BaseLink
                    href={geographyToLink('COMMUNITY', profile.cd)}
                    text={`Community District  ${communityIdToString(profile.cd)}`}
                  />
                </p>
                <ConfigContext.Consumer>
                  {config => {
                    return <PropertySummaryBody config={config} profile={profile} />
                  }}
                </ConfigContext.Consumer>
                <OwnershipSection profile={profile} dispatch={props.dispatch} request={props.request} />
                <ConfigContext.Consumer>
                  {config => {
                    return (
                      <RentStabilizationSection
                        config={config}
                        profile={profile}
                        dispatch={props.dispatch}
                        request={props.request}
                      />
                    )
                  }}
                </ConfigContext.Consumer>
              </Card.Body>
            </Card>
          )
        }}
      </LayoutContext.Consumer>
    )
  } else {
    return null
  }
}
LookupProfileSummary.propTypes = {
  records: {},
}

LookupProfileSummary.propTypes = {
  records: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
}

export default LookupProfileSummary
