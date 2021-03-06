import React from 'react'
import PropTypes from 'prop-types'
import { div } from 'react-bootstrap'

import { boroughAbbreviationToCode } from 'shared/utilities/languageUtils'
import BaseLink from 'shared/components/BaseLink'
import { constructDOBLink } from 'shared/utilities/linkUtils'

import './style.scss'

class LookupLinks extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return Object.keys(this.props.property).length ? (
      <div className="lookup-links">
        <div>
          <p className="lookup-links__label">More information:</p>
        </div>
        <div className="lookup-links__link-row">
          <BaseLink
            className="lookup-links__link"
            href={`http://a836-acris.nyc.gov/bblsearch/bblsearch.asp?borough=${this.props.property.bbl.charAt(
              0
            )}&block=${this.props.property.bbl.slice(1, 6)}&lot=${this.props.property.bbl.slice(6, 10)}`}
            text="ACRIS Documents"
          />
          <BaseLink
            className="lookup-links__link"
            href={`https://hpdonline.hpdnyc.org/HPDonline/Provide_address.aspx?p1=${boroughAbbreviationToCode(
              this.props.property.borough
            )}&p2=${(this.props.property.original_address || this.props.property.address).split(' ')[0]}&p3=${(
              this.props.property.original_address || this.props.property.address
            )
              .split(' ')
              .slice(1)
              .join(' ')}&SearchButton=Search`}
            text="HPD Property Overview"
          />
          <BaseLink
            className="lookup-links__link"
            href={constructDOBLink(this.props.property.bbl, this.props.bin)}
            text="DOB Property Overview"
          />
        </div>
      </div>
    ) : null
  }
}

LookupLinks.defaultProps = {
  property: undefined,
}

LookupLinks.propTypes = {
  property: PropTypes.object,
  bin: PropTypes.string,
}

export default LookupLinks
