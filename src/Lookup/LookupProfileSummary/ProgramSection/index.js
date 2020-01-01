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
          <div className="profile-summary-body__label">Subsidy Programs </div>
          <InfoModalButton modalConstant="SUBSIDY_PROGRAM_SOURCE" />
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
        <div className="lookup-profile-summary__group">
          {props.profile.nycha && (
            <div className="text-danger font-weight-bold">
              This property is a{' '}
              <BaseLink className="text-link" href="https://www1.nyc.gov/site/nycha/about/developments.page">
                NYCHA development.
              </BaseLink>
            </div>
          )}
        </div>
        <div className="lookup-profile-summary__group">
          {props.profile.conhrecord && (
            <div className="text-danger font-weight-bold">
              A building on this property is eligible for the{' '}
              <BaseLink className="text-link" href="https://anhd.org/project/coalition-against-tenant-harassment-cath">
                Certificate of No Harassment Pilot Program.
              </BaseLink>
            </div>
          )}
        </div>
        <div>
          <div className="lookup-profile-summary__group">
            {props.profile.taxlien && (
              <div className="text-danger font-weight-bold">
                This property is subject to a{' '}
                <BaseLink className="text-link" href="https://www1.nyc.gov/site/finance/taxes/property-lien-sales.page">
                  tax lien
                </BaseLink>{' '}
                as of the most recent data.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

ProgramSection.propTypes = {
  profile: PropTypes.object,
}

export default ProgramSection
