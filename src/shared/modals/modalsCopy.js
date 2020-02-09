import React from 'react'
import ReactDOMServer from 'react-dom/server'

export const infoModals = {
  rs: {
    title: 'Rent Stabilized Housing',
    body: `An apartment may be regulated under New York State’s system of Rent Stabilization if it is in a property that was built before 1974 and has six or more units or if the property has benefitted from certain regulatory programs like 421a or J-51. All properties in this report included at least one rent stabilized unit beginning in 2007, the first year for which we have data. We base stabilized unit numbers on property tax bills from the NYC Department of Finance. Missing or fluctuating numbers may be due to missing/incorrect registration by the owner or inconsistencies in property tax documentation.
    <br>
    <br>
    We display the percentage of properties and units in buildings that have contained <strong>any</strong> rent stabilized units during this time period, even though not all units in those buildings are currently stabilized.`,

    sources: [
      {
        text: 'taxbills.nyc',
        url: 'https://github.com/talos/nyc-stabilization-unit-counts',
      },
    ],
  },
  rr: {
    title: 'Subsidized Housing',
    body:
      'These properties are subject to a regulatory agreement at the City, State, or Federal level. This includes tax incentives and financing that determines affordability levels. ',
    sources: [
      {
        text: 'New York University Furman Center’s CoreData.nyc',
        url: 'http://coredata.nyc/',
      },
    ],
  },
  sh: {
    title: 'Small Homes',
    body: 'We consider small homes to be any property with four or fewer dwelling units.',
    sources: [
      {
        text: 'NYC Department of City Planning',
        url: 'https://www1.nyc.gov/site/planning/data-maps/open-data.page#pluto',
      },
    ],
  },
  mr: {
    title: 'Market Rate',
    body:
      'We consider market rate properties to be buildings that are not covered under either New York State rent stabilization code or any regulatory agreement governing apartment affordability.',
    sources: [
      {
        text: 'NYC Department of City Planning',
        url: 'https://www1.nyc.gov/site/planning/data-maps/open-data.page#pluto',
      },
    ],
  },
  ph: {
    title: 'Public Housing',
    body:
      'We consider public housing properties to be any building operated by the New York City Housing Authority (NYCHA)',
    sources: [
      {
        text: 'NYCHA Property Directory via JustFixNYC nycha scraper',
        url: 'https://github.com/JustFixNYC/nycha-scraper',
      },
    ],
  },
  HPD_VIOLATION: {
    title: 'HPD Violations',
    body:
      'HPD violations are notices of substandard living conditions as defined in the Housing Maintenance Code for which the landlord is responsible, placed by the Department of Housing Preservation and Development (HPD). A high number of Class A, B, and C violations may indicate that a landlord is neglecting or actively harassing tenants, Class C being the most severe.',
    sources: [
      {
        text: 'NYC Open Data - Housing Maintenance CodeViolations',
        url: 'https://data.cityofnewyork.us/Housing-Development/Housing-Maintenance-Code-Violations/wvxf-dwi5/data',
      },
    ],
  },
  HPD_COMPLAINT: {
    title: 'HPD Complaints & Problems',
    body: ReactDOMServer.renderToString(
      <div>
        <p>
          Complaints that tenants make about conditions in their apartment or building get sent to Housing Preservation
          and Development for inspection. Complaints can be an early signal that landlords are neglecting to make
          repairs.
        </p>
        <p>
          <b>Note:</b> HPD complaint data updates once per month, so the "Last 30 Days" time period will display the
          most recent calendar month of available data.
        </p>
      </div>
    ),
    sources: [
      {
        text: 'NYC Open Data - Housing Maintenance Code Complaints',
        url: 'https://data.cityofnewyork.us/Housing-Development/Housing-Maintenance-Code-Complaints/uwyv-629c/data',
      },
      {
        text: 'NYC Open Data - Complaint Problems',
        url: 'https://data.cityofnewyork.us/Housing-Development/Complaint-Problems/a2nx-4u46',
      },
    ],
  },
  DOB_VIOLATION: {
    title: 'DOB Violations',
    body:
      'DOB violations are notices of City building code or zoning code violations for which the landlord is responsible, placed by the Department of Buildings (DOB). These violations are sometimes part of a pattern of harassment against tenants.',
    sources: [
      {
        text: 'NYC Open Data - DOB Violations',
        url: 'https://data.cityofnewyork.us/Housing-Development/DOB-Violations/3h2n-5cm9',
      },
    ],
  },
  DOB_COMPLAINT: {
    title: 'DOB Complaints',
    body:
      'Complaints that tenants make about issues related to construction, renovation, or certain building-wide issues are directed to the Department of Buildings. Aggressive or improper construction can be a signal of tenant harassment and displacement pressure.',
    sources: [
      {
        text: 'NYC Open Data - DOB Complaints Received',
        url: 'https://data.cityofnewyork.us/Housing-Development/DOB-Complaints-Received/eabe-havv',
      },
    ],
  },
  DOB_ISSUED_PERMIT: {
    title: 'DOB Issued Permits',
    body:
      'Issued construction permits show that a landlord has permission to do construction and renovations, which can indicate harassment and displacement. For example, building-wide work can be used to increase rents via a Major Capital Improvement (MCI) and individual apartment renovations may show that a landlord is actively vacating apartments to dramatically raise rents via Individual Apartment Improvements. One permit can contain multiple work types, which are listed here as separate records.',
    sources: [
      {
        text: 'NYC Open Data - DOB Permit Issuance',
        url: 'https://data.cityofnewyork.us/Housing-Development/DOB-Permit-Issuance/ipu4-2q9a',
      },
      {
        text: 'NYC Open Data - DOB NOW Build Approved Permits',
        url: 'https://data.cityofnewyork.us/Housing-Development/DOB-NOW-Build-Approved-Permits/rbx6-tga4',
      },
    ],
  },
  DOB_FILED_PERMIT: {
    title: 'DOB Permit Applications',
    body:
      "Construction permit applications show a landlord's intention to do construction and renovations, which can be used to destabilize apartments. For example, building-wide work can be used to increase rents via a Major Capital Improvement (MCI) and individual apartment renovations may show that a landlord is actively vacating apartments to dramatically raise rents via Individual Apartment Improvements. One permit can contain multiple work types, which are listed here as separate records.",
    sources: [
      {
        text: 'NYC Open Data - DOB Job Application Filings',
        url: '  https://data.cityofnewyork.us/Housing-Development/DOB-Job-Application-Filings/ic3t-wcy2',
      },
      {
        text: 'NYC Open Data - DOB NOW Build Job Application Filings',
        url: 'https://data.cityofnewyork.us/Housing-Development/DOB-NOW-Build-Job-Application-Filings/w9ak-ipjd',
      },
    ],
  },
  ECB_VIOLATION: {
    title: 'ECB Violations',
    body:
      'ECB violations are notices of city building code or zoning code violations, issued by the Department of Buildings, that are subject to review by the Environmental Control Board. These violations are sometimes part of a pattern of harassment against tenants.',
    sources: [
      {
        text: 'NYC Open Data - DOB/ECB Violations',
        url: 'https://data.cityofnewyork.us/Housing-Development/DOB-ECB-Violations/6bgk-3dad',
      },
    ],
  },
  ACRIS_REAL_MASTER: {
    title: 'Sales',
    body: ReactDOMServer.renderToString(
      <div>
        <p>
          Sales come from the Department of Finance’s ACRIS database and include all deeds recorded. The sale price of a
          building matters because speculative investment is one of the key underlying threats to existing affordable
          housing. A high sale price can mean a new owner plans to displace existing tenants to make large profits.
        </p>
        <p>
          <b>Note:</b> Acris data updates once per month, so the "Last 30 Days" time period will display the most recent
          calendar month of available data.
        </p>
      </div>
    ),
    sources: [
      {
        text: 'NYC Open Data - ACRIS Real Property Master',
        url: 'https://data.cityofnewyork.us/City-Government/ACRIS-Real-Property-Master/bnx9-e6tj',
      },
      {
        text: 'NYC Open Data - ACRIS Real Property Legals',
        url: 'https://data.cityofnewyork.us/City-Government/ACRIS-Real-Property-Legals/8h5j-fqxa',
      },
      {
        text: 'NYC Open Data - ACRIS Real Property Parties',
        url: 'https://data.cityofnewyork.us/City-Government/ACRIS-Real-Property-Parties/636b-3b5g',
      },
    ],
  },
  FORECLOSURE: {
    title: 'Foreclosures',
    body:
      'Lis pendens, pre-foreclosures, and foreclosures indicate that an owner is in financial distress any may lose the property to the mortgage lender. Data available since Dec, 2018',
    sources: [
      {
        text: 'PropertyShark (August, 2019 - Present)',
        url: 'https://propertyshark.com',
      },
      {
        text: 'Public Data Corporation (Dec, 2018 - July, 2019)',
        url: 'http://www.pdcny.com',
      },
    ],
  },
  LISPENDEN: {
    title: 'Foreclosures',
    body:
      'Lis pendens, pre-foreclosures, and foreclosures indicate that an owner is in financial distress any may lose the property to the mortgage lender. Data available since Dec, 2018',
    sources: [
      {
        text: 'Public Data Corporation',
        url: 'http://www.pdcny.com',
      },
    ],
  },
  EVICTION: {
    title: 'Marshal Evictions',
    body:
      'This dataset containts evictions that were executed by court-ordered marshals since 1/1/2017. Evictions in affordable rent-regulated apartments usually indicate an immediate loss of affordable housing because landlords take advantage of the vacancy to dramatically raise the rent. A high rate of evictions may also be an indicator of tenant harassment and displacement by a landlord aggressively driving vacancies.',
    sources: [
      {
        text: 'NYC Open Data - Evictions',
        url: 'https://data.cityofnewyork.us/City-Government/Evictions/6z8x-wfk4',
      },
    ],
  },
  HOUSING_LITIGATION: {
    title: 'Litigations against landlord',
    body: ReactDOMServer.renderToString(
      <div>
        <p>
          This dataset includes actions in Housing Court initiated by the Department of Housing Preservation and
          Development (HPD) or by tenants, where HPD is named as a party. Court cases indicate that a landlord is not
          maintaining building conditions or may be actively harassing tenants.
        </p>
        <p>
          <b>Note:</b> Litigation data updates once per month, so the "Last 30 Days" time period will display the most
          recent calendar month of available data.
        </p>
      </div>
    ),
    sources: [
      {
        text: 'NYC Open Data - Housing Litigations',
        url: 'https://data.cityofnewyork.us/Housing-Development/Housing-Litigations/59kj-x8nc',
      },
    ],
  },
  SUBSIDY_PROGRAM_SOURCE: {
    title: 'Subsidy Prorgams',
    body: "Data comes from Furman's CoreData and DOF's 421-a and J-51 data. ",
    sources: [
      {
        text: "Furman's CoreData",
        url: 'http://app.coredata.nyc',
      },
      {
        text: '421a',
        url: 'https://www1.nyc.gov/site/finance/benefits/benefits-421a.page',
      },
      {
        text: 'J-51',
        url: 'https://www1.nyc.gov/site/finance/benefits/benefits-j51.page',
      },
    ],
  },

  BUILDING_SELECT_INFO: {
    title: 'Tax Lot Buildings',
    body: ReactDOMServer.renderToString(
      <div>
        <p>
          Sometimes there is more than one building on a tax lot. When that's the case, a drop-down will appear for you
          to select an individual building by its address.
        </p>
        <p>The datasets that are available at a building (rather than tax lot) level appear orange instead of blue.</p>
      </div>
    ),
  },

  DASHBOARD_DATES: {
    title: 'Date Ranges',
    body:
      "The selected time period is dependent on a dataset's update schedule. Some datasets are on a weekly or monthly update schedule, in which case the time period will reflect the 30 days, year, or three years prior to the most recent available data. You can find update schedules under each dataset's table header on a building's Property Lookup page.",
  },
}
