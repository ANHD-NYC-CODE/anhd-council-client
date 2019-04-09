import React from 'react'
import PropTypes from 'prop-types'
import InnerLoader from 'shared/components/Loaders/InnerLoader'
import ConfigContext from 'Config/ConfigContext'
import TableAlert from 'shared/components/BaseTable/TableAlert'

import { Card } from 'react-bootstrap'
import PropertySummaryBody from 'Lookup/LookupProfileSummary/PropertySummaryBody'
import OwnershipSection from 'Lookup/LookupProfileSummary/OwnershipSection'
import RentStabilizationSection from 'Lookup/LookupProfileSummary/RentStabilizationSection'
import ProgramSection from 'Lookup/LookupProfileSummary/ProgramSection'

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
                <ConfigContext.Consumer>
                  {config => {
                    return (
                      <div>
                        <PropertySummaryBody config={config} profile={profile} />
                        <OwnershipSection profile={profile} dispatch={props.dispatch} request={props.request} />
                        <ProgramSection config={config} profile={profile} />

                        <RentStabilizationSection
                          config={config}
                          profile={profile}
                          dispatch={props.dispatch}
                          request={props.request}
                        />
                      </div>
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
