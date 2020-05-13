import React from 'react'
import PropTypes from 'prop-types'

import BaseLink from 'shared/components/BaseLink'
import InfoModalButton from 'shared/components/InfoModalButton'

import './style.scss'

const getSubsidiesText = props => {
  if (props.profile.subsidyprograms) {
    return [...new Set(props.profile.subsidyprograms.split(', '))].join(', ')
  } else if (props.profile.subsidyj51 || props.profile.subsidy421a) {
    return [
      props.profile.subsidyj51 ? 'J-51 Tax Incentive' : undefined,
      props.profile.subsidy421a ? '421a Tax Incentive Program' : '',
    ]
      .filter(sp => sp)
      .join(', ')
  } else {
    return 'None'
  }
}

const ProgramSection = props => {
  return (
    <div className="program-section property-section property-summary-body">
      <div>
        <div className="lookup-profile-summary__group">
          <div className="profile-summary-body__label">
            Subsidy Programs <InfoModalButton modalConstant="SUBSIDY_PROGRAM_SOURCE" />
          </div>
        </div>
        <div className="lookup-profile-summary__group program-section__list">
          {getSubsidiesText(props)
            .split(',')
            .map(program => {
              return (
                <div key={`${props.profile.bbl} - ${program}`} className="profile-summary-body__value">
                  {program}
                </div>
              )
            })}
        </div>
        {!!props.profile.legalclassb && (
          <div className="lookup-profile-summary__group">
            <div className="text-danger font-weight-bold">
              This property has {props.profile.legalclassb} Single Room Occupancy (SRO) units.
            </div>
          </div>
        )}

        {props.profile.aepstatus.toUpperCase() === 'AEP ACTIVE' && (
          <div className="lookup-profile-summary__group">
            <div className="text-danger font-weight-bold">
              This property entered into the{' '}
              <BaseLink className="text-link" href="https://www1.nyc.gov/site/hpd/owners/AEP.page">
                Alternative Enforcement Program
              </BaseLink>{' '}
              on {props.profile.aepstartdate} and is still active in the program.
            </div>
          </div>
        )}

        {props.profile.aepstatus.toUpperCase() === 'AEP DISCHARGED' && (
          <div className="lookup-profile-summary__group">
            <div className="text-danger font-weight-bold">
              This property entered into the{' '}
              <BaseLink className="text-link" href="https://www1.nyc.gov/site/hpd/owners/AEP.page">
                Alternative Enforcement Program
              </BaseLink>
              and was discharged on {props.profile.aepdischargedate}.
            </div>
          </div>
        )}

        {props.profile.managementprogram.toUpperCase() === '7A' && (
          <div className="lookup-profile-summary__group">
            <div className="text-danger font-weight-bold">
              This property is managed under the{' '}
              <BaseLink
                className="text-link"
                href="https://www1.nyc.gov/site/hpd/services-and-information/7a-program.page"
              >
                7A program.
              </BaseLink>
            </div>
          </div>
        )}

        {props.profile.nycha && (
          <div className="lookup-profile-summary__group">
            <div className="text-danger font-weight-bold">
              This property is a{' '}
              <BaseLink className="text-link" href="https://www1.nyc.gov/site/nycha/about/developments.page">
                NYCHA development.
              </BaseLink>
            </div>
          </div>
        )}

        {props.profile.conhrecord && (
          <div className="lookup-profile-summary__group">
            <div className="text-danger font-weight-bold">
              A building on this property is eligible for the{' '}
              <BaseLink className="text-link" href="https://anhd.org/project/coalition-against-tenant-harassment-cath">
                Certificate of No Harassment Pilot Program.
              </BaseLink>
            </div>
          </div>
        )}

        {props.profile.taxlien && (
          <div className="lookup-profile-summary__group">
            <div className="text-danger font-weight-bold">
              This property is subject to a{' '}
              <BaseLink className="text-link" href="https://www1.nyc.gov/site/finance/taxes/property-lien-sales.page">
                tax lien
              </BaseLink>{' '}
              as of the most recent data.
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

ProgramSection.propTypes = {
  profile: PropTypes.object,
}

export default ProgramSection
