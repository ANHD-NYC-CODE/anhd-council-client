import React from 'react'
import BaseLink from 'shared/components/BaseLink'
import { Col, Row } from 'react-bootstrap'
export const getTableSubheaders = ({ constant, property } = {}) => {
  return (
    <Row>
      <Col>{getTableSubheaderLinks({ constant, property })}</Col>
    </Row>
  )
}

export const getTableSubheaderLinks = ({ constant = '', property = {} } = {}) => {
  switch (constant) {
    case 'ACRIS_REAL_MASTER':
      return (
        <ul className="text-muted small">
          {!!Object.keys(property).length && (
            <li>
              Visit this property’s{' '}
              <BaseLink
                className="lookup-links__link"
                href={`http://a836-acris.nyc.gov/bblsearch/bblsearch.asp?borough=${property.bbl.charAt(
                  0
                )}&block=${property.bbl.slice(1, 6)}&lot=${property.bbl.slice(6, 10)}`}
              >
                ACRIS page
              </BaseLink>
            </li>
          )}
          to view financing information and additional property documents.
          <li>Click the Document ID to view the full record in ACRIS</li>
        </ul>
      )
    case 'HPD_VIOLATION':
      return (
        <ul className="text-muted small">
          {!!Object.keys(property).length && (
            <li>
              Visit this property’s{' '}
              <BaseLink
                className="lookup-links__link"
                href={`https://hpdonline.hpdnyc.org/HPDonline/Provide_address.aspx?p1=1&p2=${
                  property.address.split(' ')[0]
                }&p3=${property.address
                  .split(' ')
                  .slice(1)
                  .join(' ')}&SearchButton=Search`}
              >
                HPD page
              </BaseLink>{' '}
              to view more HPD records.
            </li>
          )}
        </ul>
      )
    case 'HPD_COMPLAINT':
      return (
        <ul className="text-muted small">
          {!!Object.keys(property).length && (
            <li>
              Visit this property’s{' '}
              <BaseLink
                className="lookup-links__link"
                href={`https://hpdonline.hpdnyc.org/HPDonline/Provide_address.aspx?p1=1&p2=${
                  property.address.split(' ')[0]
                }&p3=${property.address
                  .split(' ')
                  .slice(1)
                  .join(' ')}&SearchButton=Search`}
              >
                HPD page
              </BaseLink>{' '}
              to view more HPD records.
            </li>
          )}
          <li>One complaint can include multiple problems.</li>
        </ul>
      )
    case 'HOUSING_LITIGATION':
      return (
        <ul className="text-muted small">
          {!!Object.keys(property).length && (
            <li>
              Visit this property’s{' '}
              <BaseLink
                className="lookup-links__link"
                href={`https://hpdonline.hpdnyc.org/HPDonline/Provide_address.aspx?p1=1&p2=${
                  property.address.split(' ')[0]
                }&p3=${property.address
                  .split(' ')
                  .slice(1)
                  .join(' ')}&SearchButton=Search`}
              >
                HPD page
              </BaseLink>{' '}
              to view more HPD records.
            </li>
          )}
        </ul>
      )
    case 'DOB_COMPLAINT':
      return (
        <ul className="text-muted small">
          {!!Object.keys(property).length && (
            <li>
              Visit this property’s{' '}
              <BaseLink
                className="lookup-links__link"
                href={`http://a810-bisweb.nyc.gov/bisweb/PropertyProfileOverviewServlet?boro=${property.bbl.charAt(
                  0
                )}&block=${property.bbl.slice(1, 6)}&lot=${property.bbl.slice(6, 10)}`}
              >
                DOB page
              </BaseLink>{' '}
              to view more about this property.
            </li>
          )}
          <li>Click the Complaint # to view the full record in the DOB Building Information System</li>
        </ul>
      )
    case 'DOB_VIOLATION':
      return (
        <ul className="text-muted small">
          {!!Object.keys(property).length && (
            <li>
              Visit this property’s{' '}
              <BaseLink
                className="lookup-links__link"
                href={`http://a810-bisweb.nyc.gov/bisweb/PropertyProfileOverviewServlet?boro=${property.bbl.charAt(
                  0
                )}&block=${property.bbl.slice(1, 6)}&lot=${property.bbl.slice(6, 10)}`}
              >
                DOB page
              </BaseLink>{' '}
              to view more about this property.
            </li>
          )}
          <li>Click the Violation # to view the full record in the DOB Building Information System</li>
        </ul>
      )
    case 'ECB_VIOLATION':
      return (
        <ul className="text-muted small">
          {!!Object.keys(property).length && (
            <li>
              Visit this property’s{' '}
              <BaseLink
                className="lookup-links__link"
                href={`http://a810-bisweb.nyc.gov/bisweb/PropertyProfileOverviewServlet?boro=${property.bbl.charAt(
                  0
                )}&block=${property.bbl.slice(1, 6)}&lot=${property.bbl.slice(6, 10)}`}
              >
                DOB page
              </BaseLink>{' '}
              to view more about this property.
            </li>
          )}
          <li>Click the Violation # to view the full record in the DOB Building Information System</li>
        </ul>
      )
    case 'DOB_ISSUED_PERMIT':
      return (
        <ul className="text-muted small">
          {!!Object.keys(property).length && (
            <li>
              Visit this property’s{' '}
              <BaseLink
                className="lookup-links__link"
                href={`http://a810-bisweb.nyc.gov/bisweb/PropertyProfileOverviewServlet?boro=${property.bbl.charAt(
                  0
                )}&block=${property.bbl.slice(1, 6)}&lot=${property.bbl.slice(6, 10)}`}
              >
                DOB page
              </BaseLink>{' '}
              to view more about this property.
            </li>
          )}
          <li>Click the Job Filing # to view the full record in the DOB Building Information System.</li>
          <li>
            Permits filed electronically through the DOB NOW system need to be searched via the{' '}
            <BaseLink href="https://a810-dobnow.nyc.gov/publish/#!/">DOB NOW portal</BaseLink>.{' '}
          </li>
        </ul>
      )
    case 'DOB_FILED_PERMIT':
      return (
        <ul className="text-muted small">
          {!!Object.keys(property).length && (
            <li>
              Visit this property’s{' '}
              <BaseLink
                className="lookup-links__link"
                href={`http://a810-bisweb.nyc.gov/bisweb/PropertyProfileOverviewServlet?boro=${property.bbl.charAt(
                  0
                )}&block=${property.bbl.slice(1, 6)}&lot=${property.bbl.slice(6, 10)}`}
              >
                DOB page
              </BaseLink>{' '}
              to view more about this property.
            </li>
          )}
          <li>Click the Job Filing # to view the full record in the DOB Building Information System.</li>
          <li>
            Permits filed electronically through the DOB NOW system need to be searched via the{' '}
            <BaseLink href="https://a810-dobnow.nyc.gov/publish/#!/">DOB NOW portal</BaseLink>.{' '}
          </li>
        </ul>
      )
    default:
      return () => null
  }
}
