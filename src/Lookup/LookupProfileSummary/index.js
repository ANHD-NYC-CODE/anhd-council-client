import React from 'react'
import PropTypes from 'prop-types'
import InnerLoader from 'shared/components/Loaders/InnerLoader'

import TableAlert from 'shared/components/BaseTable/TableAlert'

import { councilIdToString, communityIdToString } from 'shared/utilities/languageUtils'
import { geographyToLink } from 'shared/utilities/routeUtils'
import BaseLink from 'shared/components/BaseLink'
import BaseTable from 'shared/components/BaseTable'
import { getTableColumns } from 'shared/models/tables'
import TableConfig from 'shared/classes/TableConfig'
import { Card, Row, Col } from 'react-bootstrap'
import PropertySummaryBody from 'Lookup/LookupProfileSummary/PropertySummaryBody'
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
                <PropertySummaryBody profile={profile} />

                <div className="lookup-profile-summary__bottom-info py-4">
                  {profile.hpdregistrations.length ? (
                    <BaseTable
                      caption="HPD Registrations"
                      classes="fluid-table"
                      wrapperClasses="text-light-gray"
                      columns={getTableColumns('HPD_REGISTRATION')}
                      dispatch={props.dispatch}
                      records={profile.hpdregistrations}
                      request={props.request}
                      tableConfig={new TableConfig({ resourceConstant: 'HPD_REGISTRATION' })}
                    />
                  ) : (
                    <Card.Text className="text-light-gray text-center font-weight-bold my-4">
                      No HPD Registrations Found
                    </Card.Text>
                  )}
                  <h5 className="lookup-profile-summary__group lookup-profile-summary__geography-link">
                    <BaseLink
                      href={geographyToLink('COUNCIL', profile.council)}
                      text={councilIdToString(profile.council)}
                    />
                  </h5>
                  <p className="lookup-profile-summary__group lookup-profile-summary__geography-link">
                    <BaseLink
                      href={geographyToLink('COMMUNITY', profile.cd)}
                      text={`Community District  ${communityIdToString(profile.cd)}`}
                    />
                  </p>
                </div>
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
