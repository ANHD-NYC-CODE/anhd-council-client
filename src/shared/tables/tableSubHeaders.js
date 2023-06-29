import React from 'react'
import BaseLink from 'shared/components/BaseLink'
import { boroughAbbreviationToCode } from 'shared/utilities/languageUtils'
import lookupIcon from 'shared/images/lookup-document.svg'
import { constructDOBLink } from 'shared/utilities/linkUtils'

export const getTableSubheaders = ({ constant, property, bin = null } = {}) =>
  getTableSubheaderLinks({ constant, property, bin })

export const getTableSubheaderLinks = ({ constant = '', property = {}, bin = null } = {}) => {
  var buildingid = ""
  if(bin) {
    buildingid = "";

    if (property.hpdregistrations && Array.isArray(property.hpdregistrations)) {
      const building = property.hpdregistrations.find((item) => item.bin === bin);
      if (building) {
        buildingid = building.buildingid;
      }
    }
  } else if(property.hpdregistrations){
    buildingid = property.hpdregistrations[0].buildingid;
  }

  switch (constant) {
    case 'ACRIS_REAL_MASTER':
      return (
        <div>
          {!!Object.keys(property).length && (
            <div>
              <BaseLink
                className="lookup-links__link"
                href={`http://a836-acris.nyc.gov/bblsearch/bblsearch.asp?borough=${property.bbl.charAt(
                  0
                )}&block=${property.bbl.slice(1, 6)}&lot=${property.bbl.slice(6, 10)}`}
              >
                Visit this property’s ACRIS page
              </BaseLink>
            </div>
          )}
          <div>
            Click the Document ID to view the full record and the document icon{' '}
            <img alt="document icon" src={lookupIcon} /> to view the scanned document.
          </div>
          {property.borough === 'SI' && (
            <div className="text-danger">
              Note: Staten Island property sales are registered with the Richmond County Clerk and are not currently
              available via Open Data. You can access this property's records{' '}
              <BaseLink
                href={`https://www.richmondcountyclerk.com/Search/ShowResultsBlocks?Block=${property.bbl.slice(
                  1,
                  6
                )}&Lot=${property.bbl.slice(6, 10)}&SelectedDocumentIdentifier=0`}
                text="here"
              />
              .
            </div>
          )}
        </div>
      )
    case 'HPD_VIOLATION':
      return (
        <div>
          {!!Object.keys(property).length && (
            <div>
              <BaseLink
                className="lookup-links__link"
                href={`https://hpdonline.nyc.gov/hpdonline/building/${buildingid}/overview`}
              >
                Visit this property’s HPD page
              </BaseLink>
            </div>
          )}
        </div>
      )
    case 'HPD_COMPLAINT':
      return (
        <div>
          {!!Object.keys(property).length && (
            <div>
              <BaseLink
                className="lookup-links__link"
                href={`https://hpdonline.nyc.gov/hpdonline/building/${buildingid}/overview`}
              >
                Visit this property’s HPD page
              </BaseLink>
            </div>
          )}
          <div>One complaint can include multiple problems.</div>
        </div>
      )
    case 'HOUSING_LITIGATION':
      return (
        <div>
          <div>
            <BaseLink className="lookup-links__link" href="https://hpdonline.hpdnyc.org/HPDonline/GlossaryLMS.aspx">
              See glossary of terms
            </BaseLink>
          </div>
          {!!Object.keys(property).length && (
            <div>
              <BaseLink
                className="lookup-links__link"
                href={`https://hpdonline.nyc.gov/hpdonline/building/${buildingid}/overview`}
              >
                Visit this property’s HPD page
              </BaseLink>
            </div>
          )}
        </div>
      )
    case 'DOB_COMPLAINT':
      return (
        <div>
          {!!Object.keys(property).length && (
            <div>
              <BaseLink className="lookup-links__link" href={constructDOBLink(property.bbl, bin)}>
                Visit this property’s DOB page
              </BaseLink>
            </div>
          )}
          <div>Click the Complaint # to view the full record in the DOB Building Information System</div>
        </div>
      )
    case 'DOB_VIOLATION':
      return (
        <div>
          {!!Object.keys(property).length && (
            <div>
              <BaseLink className="lookup-links__link" href={constructDOBLink(property.bbl, bin)}>
                Visit this property’s DOB page
              </BaseLink>
            </div>
          )}
          <div>Click the Violation # to view the full record in the DOB Building Information System</div>
        </div>
      )
    case 'ECB_VIOLATION':
      return (
        <div>
          {!!Object.keys(property).length && (
            <div>
              <BaseLink className="lookup-links__link" href={constructDOBLink(property.bbl, bin)}>
                Visit this property’s DOB page
              </BaseLink>
            </div>
          )}
          <div>Click the Violation # to view the full record in the DOB Building Information System</div>
        </div>
      )
    case 'DOB_ISSUED_PERMIT':
      return (
        <div>
          {!!Object.keys(property).length && (
            <div>
              <BaseLink className="lookup-links__link" href={constructDOBLink(property.bbl, bin)}>
                Visit this property’s DOB page
              </BaseLink>
            </div>
          )}
          <div>Click the Job Filing # to view the full record in the DOB Building Information System.</div>
          <div>
            Permits filed electronically through the DOB NOW system need to be searched via the{' '}
            <BaseLink href="https://a810-dobnow.nyc.gov/publish/#!/">DOB NOW portal</BaseLink>.{' '}
          </div>
          <div>
            If a permit is renewed, it will show up as a separate record in the table with a Filing Status of{' '}
            <b>Renewed</b>. It will only be counted once in the total DOB Permits Issued.
          </div>
        </div>
      )
    case 'DOB_FILED_PERMIT':
      return (
        <div>
          {!!Object.keys(property).length && (
            <div>
              <BaseLink className="lookup-links__link" href={constructDOBLink(property.bbl, bin)}>
                Visit this property’s DOB page
              </BaseLink>
            </div>
          )}
          <div>Click the Job Filing # to view the full record in the DOB Building Information System.</div>
          <div>
            Permits filed electronically through the DOB NOW system need to be searched via the{' '}
            <BaseLink href="https://a810-dobnow.nyc.gov/publish/#!/">DOB NOW portal</BaseLink>.{' '}
          </div>
        </div>
      )
    default:
      return null
  }
}
