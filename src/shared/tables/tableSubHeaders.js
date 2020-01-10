import React from 'react'
import BaseLink from 'shared/components/BaseLink'
import { Col, Row } from 'react-bootstrap'
import { boroughAbbreviationToCode } from 'shared/utilities/languageUtils'
import classnames from 'classnames'
export const getTableSubheaders = ({ constant, property, hideGutters = false } = {}) => {
  return (
    <Row className={classnames({ 'no-gutter': hideGutters })}>
      <Col>{getTableSubheaderLinks({ constant, property })}</Col>
    </Row>
  )
}

export const getTableSubheaderLinks = ({ constant = '', property = {} } = {}) => {
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
          <div>Click the Document ID to view the full record in ACRIS</div>
        </div>
      )
    case 'HPD_VIOLATION':
      return (
        <div>
          {!!Object.keys(property).length && (
            <div>
              <BaseLink
                className="lookup-links__link"
                href={`https://hpdonline.hpdnyc.org/HPDonline/Provide_address.aspx?p1=${boroughAbbreviationToCode(
                  property.borough
                )}&p2=${property.address.split(' ')[0]}&p3=${property.address
                  .split(' ')
                  .slice(1)
                  .join(' ')}&SearchButton=Search`}
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
                href={`https://hpdonline.hpdnyc.org/HPDonline/Provide_address.aspx?p1=${boroughAbbreviationToCode(
                  property.borough
                )}&p2=${property.address.split(' ')[0]}&p3=${property.address
                  .split(' ')
                  .slice(1)
                  .join(' ')}&SearchButton=Search`}
              >
                Visit this property’s HPD page
              </BaseLink>
            </div>
          )}
          <div>One complaint can include mdivtiple problems.</div>
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
                href={`https://hpdonline.hpdnyc.org/HPDonline/Provide_address.aspx?p1=${boroughAbbreviationToCode(
                  property.borough
                )}&p2=${property.address.split(' ')[0]}&p3=${property.address
                  .split(' ')
                  .slice(1)
                  .join(' ')}&SearchButton=Search`}
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
              <BaseLink
                className="lookup-links__link"
                href={`http://a810-bisweb.nyc.gov/bisweb/PropertyProfileOverviewServlet?boro=${property.bbl.charAt(
                  0
                )}&block=${property.bbl.slice(1, 6)}&lot=${property.bbl.slice(6, 10)}`}
              >
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
              <BaseLink
                className="lookup-links__link"
                href={`http://a810-bisweb.nyc.gov/bisweb/PropertyProfileOverviewServlet?boro=${property.bbl.charAt(
                  0
                )}&block=${property.bbl.slice(1, 6)}&lot=${property.bbl.slice(6, 10)}`}
              >
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
              <BaseLink
                className="lookup-links__link"
                href={`http://a810-bisweb.nyc.gov/bisweb/PropertyProfileOverviewServlet?boro=${property.bbl.charAt(
                  0
                )}&block=${property.bbl.slice(1, 6)}&lot=${property.bbl.slice(6, 10)}`}
              >
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
              <BaseLink
                className="lookup-links__link"
                href={`http://a810-bisweb.nyc.gov/bisweb/PropertyProfileOverviewServlet?boro=${property.bbl.charAt(
                  0
                )}&block=${property.bbl.slice(1, 6)}&lot=${property.bbl.slice(6, 10)}`}
              >
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
              <BaseLink
                className="lookup-links__link"
                href={`http://a810-bisweb.nyc.gov/bisweb/PropertyProfileOverviewServlet?boro=${property.bbl.charAt(
                  0
                )}&block=${property.bbl.slice(1, 6)}&lot=${property.bbl.slice(6, 10)}`}
              >
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
      return () => null
  }
}
