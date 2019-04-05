import React from 'react'
import PropTypes from 'prop-types'
import InnerLoader from 'shared/components/Loaders/InnerLoader'
import ConfigContext from 'Config/ConfigContext'
import TableAlert from 'shared/components/BaseTable/TableAlert'
import { constantToModelName } from 'shared/utilities/filterUtils'
import TableHeader from 'shared/components/BaseTable/TableHeader'
import { councilIdToString, communityIdToString } from 'shared/utilities/languageUtils'
import { geographyToLink } from 'shared/utilities/routeUtils'
import BaseLink from 'shared/components/BaseLink'
import BaseTable from 'shared/components/BaseTable'
import { getTableColumns } from 'shared/models/tables'
import TableConfig from 'shared/classes/TableConfig'
import { Card } from 'react-bootstrap'
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

                <div className="lookup-profile-summary__bottom-info py-4">
                  {profile.hpdregistrations.length ? (
                    <div className="mb-4">
                      <TableHeader
                        showUpdate={false}
                        title="HPD Registrations"
                        datasetModelName={constantToModelName('HPDHPD_REGISTRATION')}
                      />
                      <BaseTable
                        classes="fluid-table"
                        wrapperClasses="text-dark"
                        columns={getTableColumns('HPD_REGISTRATION')}
                        dispatch={props.dispatch}
                        records={profile.hpdregistrations}
                        request={props.request}
                        tableConfig={new TableConfig({ resourceConstant: 'HPD_REGISTRATION' })}
                      />
                    </div>
                  ) : (
                    <Card.Text className="text-info text-center font-weight-bold my-4">
                      No HPD Registrations Found
                    </Card.Text>
                  )}
                  {profile.rentstabilizationrecord ? (
                    <div className="mb-4">
                      <TableHeader
                        showUpdate={false}
                        title="Rent Stabilized Units"
                        datasetModelName={constantToModelName('RENT_STABILIZATION_RECORD')}
                      />
                      <BaseTable
                        expandable={false}
                        wrapperClasses="text-dark"
                        columns={getTableColumns('RENT_STABILIZATION_RECORD')}
                        dispatch={props.dispatch}
                        records={[profile.rentstabilizationrecord]}
                        request={props.request}
                        tableConfig={new TableConfig({ resourceConstant: 'RENT_STABILIZATION_RECORD' })}
                      />
                    </div>
                  ) : (
                    <Card.Text className="text-info text-center font-weight-bold my-4">
                      No Rent Stabilization History
                    </Card.Text>
                  )}
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
