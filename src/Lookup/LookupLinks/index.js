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
    var buildingid = ""
    if(this.props.bin) {
      buildingid = "";

      if (this.props.property.hpdregistrations && Array.isArray(this.props.property.hpdregistrations)) {
        const building = this.props.property.hpdregistrations.find((item) => item.bin === this.props.bin);
        if (building) {
          buildingid = building.buildingid;
        }
      }
    } else if(this.props.property.hpdregistrations && this.props.property.hpdregistrations.length > 0){
      buildingid = this.props.property.hpdregistrations[0].buildingid;
    }
    
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
            href={`https://hpdonline.nyc.gov/hpdonline/building/${buildingid}/overview`}
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
