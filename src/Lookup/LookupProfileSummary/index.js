import React from 'react'
import PropTypes from 'prop-types'
import InnerLoader from 'shared/components/InnerLoader'

import TableAlert from 'shared/components/BaseTable/TableAlert'

import { councilIdToString, communityIdToString } from 'shared/utilities/languageUtils'
import { geographyToLink } from 'shared/utilities/routeUtils'
import BaseLink from 'shared/components/BaseLink'
import BaseTable from 'shared/components/BaseTable'
import { getTableColumns } from 'shared/models/tables'
import { TableConfig } from 'shared/classes/TableConfig'
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
                <Row>
                  <Col>
                    {profile.hpdregistrations.length ? (
                      <div>
                        <BaseTable
                          caption="HPD Registrations"
                          classes="fluid-table"
                          columns={getTableColumns('HPD_REGISTRATION')}
                          dispatch={props.dispatch}
                          records={profile.hpdregistrations}
                          request={props.request}
                          tableConfig={new TableConfig({ resourceConstant: 'HPD_REGISTRATION' })}
                        />
                      </div>
                    ) : (
                      <Card.Text>No HPD Registrations Found</Card.Text>
                    )}
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Card.Text className="lookup-profile-summary__group">
                      <BaseLink
                        href={geographyToLink('COUNCIL', profile.council)}
                        text={councilIdToString(profile.council)}
                      />
                    </Card.Text>
                    <Card.Text className="lookup-profile-summary__group">
                      <BaseLink
                        href={geographyToLink('COMMUNITY', profile.cd)}
                        text={`Community District  ${communityIdToString(profile.cd)}`}
                      />
                    </Card.Text>
                  </Col>
                </Row>
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
