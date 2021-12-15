import React from 'react'
import ReactDOMServer from 'react-dom/server'

export const infoModals = {
  DASHBOARD_HOUSING_TYPE: {
    title: 'Housing Type',
    body: ReactDOMServer.renderToString(
      <div>
        <p>
          Housing Types are our definitions of different housing categories; each housing type carries unique
          displacement risks.
        </p>
        <p>
          There is overlap between the housing types below, which is why percentages do not add up to one hundred. The
          percentages displayed are the share of units in that housing type out of all residential units in the
          geography shown.
        </p>
      </div>
    ),
  },
  rs: {
    title: 'Rent Stabilized Housing',
    body: ReactDOMServer.renderToString(
      <div>
        <p>
          An apartment may be regulated under New York State’s system of Rent Stabilization if it is in a property that
          was built before 1974 and has six or more units or if the property has benefitted from certain regulatory
          programs like 421a or J-51. All properties classified in DAP Portal as rent stabilized included at least one
          rent stabilized unit beginning in 2007, the first year for which we have data. We base stabilized unit numbers
          on property tax bills from the NYC Department of Finance. Missing or fluctuating numbers may be due to
          missing/incorrect registration by the owner or inconsistencies in property tax documentation. Properties with
          tax incentives or subsidies that require rent stabilization will be included in this housing type as well as
          Subsidized Housing.
        </p>
        <p>
          Note that because rent controlled apartments historically have not required registration by owners, they will
          not be reflected in this housing type.
        </p>
        <p>
          We display the percentage of properties and units in buildings that have contained any rent stabilized units
          during this time period, even though not all units in those buildings are currently stabilized.
        </p>
        <p>
          The percentage displayed in parentheses is the number of residential units in this housing type as a share of
          all residential units in this geography.
        </p>
      </div>
    ),

    sources: [
      {
        text: 'taxbills.nyc',
        url: 'https://github.com/talos/nyc-stabilization-unit-counts',
      },
      {
        text: 'https://github.com/talos/nyc-stabilization-unit-counts',
        url: 'https://github.com/talos/nyc-stabilization-unit-counts',
      },
      {
        text: 'https://github.com/justfixnyc/nyc-doffer',
        url: 'https://github.com/justfixnyc/nyc-doffer',
      },
    ],
    documentationSources: [
      {
        text: 'NYC Stabilization Unit Counts',
        url: 'https://github.com/talos/nyc-stabilization-unit-counts',
      },
    ],
  },
  rr: {
    title: 'Subsidized Housing',
    body: ReactDOMServer.renderToString(
      <div>
        <p>
          These properties are subject to regulations and agreements at the City, State, or Federal level and receive
          some form of subsidy. This includes tax incentives and financing that determines affordability levels or
          requires rent stabilization, as well as zoning incentives such as Mandatory Inclusionary Housing. Find out
          more about the programs included by clicking on the link below to the Furman Center's Directory of NYC Housing
          Programs. Properties receiving subsidies that require rent stabilization will be included in this housing type
          as well as Rent Stabilized.
        </p>
        <p>
          The percentage displayed in parentheses is the number of residential units in this housing type as a share of
          all residential units in this geography.
        </p>
      </div>
    ),
    sources: [
      {
        text: 'New York University Furman Center’s CoreData.nyc',
        url: 'http://coredata.nyc/',
      },
    ],
    documentationSources: [
      {
        text: 'Directory of NYC Housing Programs',
        url: 'https://furmancenter.org/coredata/directory',
      },
    ],
  },
  sh: {
    title: 'Small Homes',
    body: ReactDOMServer.renderToString(
      <div>
        <p>
          We define small homes as any property with one to four residential units (apartments), regardless of rent
          stabilization or subsidy. Therefore this housing type overlaps significantly with Market Rate properties and
          to some degree, Rent Stabilized and Subsidized Housing.
        </p>
        <p>
          The percentage displayed in parentheses is the number of residential units in this housing type as a share of
          all residential units in this geography.
        </p>
      </div>
    ),
    sources: [
      {
        text: 'NYC Department of City Planning',
        url: 'https://www1.nyc.gov/site/planning/data-maps/open-data.page#pluto',
      },
    ],
    documentationSources: [
      {
        text: 'PLUTO Data Dictionary',
        url:
          'https://www1.nyc.gov/assets/planning/download/pdf/data-maps/open-data/pluto_datadictionary.pdf?r=18v21beta',
      },
    ],
  },
  mr: {
    title: 'Market Rate',
    body: ReactDOMServer.renderToString(
      <div>
        <p>
          We define market rate properties as buildings that are not covered under either rent stabilization or any
          subsidy governing affordability.
        </p>
        <p>
          This category includes one-unit or single-family homes, many of which are occupied by homeowners rather than
          renters.
        </p>
        <p>
          The percentage displayed in parentheses is the number of residential units in this housing type as a share of
          all residential units in this geography.
        </p>
      </div>
    ),
    sources: [
      {
        text: 'NYC Department of City Planning',
        url: 'https://www1.nyc.gov/site/planning/data-maps/open-data.page#pluto',
      },
    ],
    documentationSources: [
      {
        text: 'PLUTO Data Dictionary',
        url:
          'https://www1.nyc.gov/assets/planning/download/pdf/data-maps/open-data/pluto_datadictionary.pdf?r=18v21beta',
      },
    ],
  },
  ph: {
    title: 'Public Housing',
    body: ReactDOMServer.renderToString(
      <div>
        <p>
          Public housing properties are buildings owned and operated by the New York City Housing Authority (NYCHA) or
          Project-based Section 8 buildings. This housing type does not include properties with households using Section
          8 vouchers.
        </p>
        <p>
          The percentage displayed in parentheses is the number of residential units in this housing type as a share of
          all residential units in this geography.
        </p>
      </div>
    ),

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
    documentationSources: [
      {
        text: 'HPD Violation Open Data 2017.pdf',
        url:
          'https://data.cityofnewyork.us/api/views/wvxf-dwi5/files/02c794c8-3013-49ea-9ab3-9e5998b061de?download=true&filename=HPD%20Violation%20Open%20Data%202017.pdf',
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
          most recent calendar month of available data. You can visit HPD's website directly to view complaints since
          the beginning of the month.
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
    documentationSources: [
      {
        text: 'Complaint Data Dictionary.pdf',
        url:
          'https://data.cityofnewyork.us/api/views/uwyv-629c/files/6d8919d1-2b80-4ec0-8640-d6c55461ce44?download=true&filename=Complaint%20Data%20Dictionary.pdf',
      },
      {
        text: 'HPD Complaint Open Data.pdf',
        url:
          'https://data.cityofnewyork.us/api/views/a2nx-4u46/files/516fa3f1-fff3-4ef4-9ec8-74da856d9cb8?download=true&filename=HPD%20Complaint%20Open%20Data.pdf',
      },
    ],
  },
  DOB_VIOLATION: {
    title: 'DOB Violations',
    body:
      'The Department of Buildings (DOB) issues violations to landlords when they violate the City building or zoning codes. DOB violations can relate to construction, demolition, renovations, or structural issues in a building. A high number of DOB violations can indicate a failure to uphold safety standards and potential tenant harassment.',
    sources: [
      {
        text: 'NYC Open Data - DOB Violations',
        url: 'https://data.cityofnewyork.us/Housing-Development/DOB-Violations/3h2n-5cm9',
      },
    ],
    documentationSources: [
      {
        text: 'DD_DOB_Violations_2019-03-19.xlsx',
        url:
          'https://data.cityofnewyork.us/api/views/3h2n-5cm9/files/77115414-4d7e-4188-8547-a5ad3d10f726?download=true&filename=DD_DOB_Violations_2019-03-19.xlsx',
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
    documentationSources: [
      {
        text: 'DD_DOB_Complaints_Received_2019-08-21.xlsx',
        url:
          'https://data.cityofnewyork.us/api/views/eabe-havv/files/e19c463a-69dd-4810-ae72-3c7c7fc657f8?download=true&filename=DD_DOB_Complaints_Received_2019-08-21.xlsx',
      },
    ],
  },
  DOB_ISSUED_PERMIT: {
    title: 'DOB Issued Permits',
    body: ReactDOMServer.renderToString(
      <div>
        <p>
          Construction permits issued by the Department of Buildings show that a landlord has permission to do
          construction and renovations, which can indicate displacement pressure. While the{' '}
          <a href="https://www.nysenate.gov/legislation/bills/2019/s6458" target="_blank" rel="noopener noreferrer">
            Housing Stability and Tenant Protection Act of 2019
          </a>{' '}
          eliminated much of the displacement incentive of renovating rent-stabilized apartments to conduct Individual
          Apartment Improvements and dramatically raise rents, construction still poses risks to affordability.
          Landlords can use Major Capital Improvements, combine adjacent apartments, vacate and demolish a building, or
          use "substantial rehabilitation" to greatly increase rents.
        </p>
        <p>
          One issued permit can contain multiple work types, which are displayed in the table as separate records. Only
          initial permit records (and not permit renewals) are displayed.{' '}
        </p>
      </div>
    ),
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
    documentationBody:
      "DOB permits data comes from two sources: permits filed in hard copy via the traditional system that captures data in DOB's Building Information System (BIS), and permits filed electronically via the DOB NOW portal. Currently, only some permits are able to be submitted via DOB NOW. The fields and data captured in the two systems differ from one another. ",
    documentationSources: [
      {
        text: 'DD_DOB_Permit_Issuance_2019-07-29.xlsx',
        url:
          'https://data.cityofnewyork.us/api/views/ipu4-2q9a/files/12265875-36c8-4f5c-8a8c-657952bd1484?download=true&filename=DD_DOB_Permit_Issuance_2019-07-29.xlsx',
      },
      {
        text: 'DD_DOB_NOW_Build_Approved_Permits_2018-06-29.xlsx',
        url:
          'https://data.cityofnewyork.us/api/views/rbx6-tga4/files/04484c71-75ff-46ba-8b90-3eaf66d45dc8?download=true&filename=DD_DOB_NOW_Build_Approved_Permits_2018-06-29.xlsx',
      },
    ],
  },
  DOB_FILED_PERMIT: {
    title: 'DOB Permit Applications',
    body: ReactDOMServer.renderToString(
      <div>
        <p>
          Construction permit applications show a landlord's intention to do construction and renovations, which can
          cause displacement pressure. While the{' '}
          <a href="https://www.nysenate.gov/legislation/bills/2019/s6458" target="_blank" rel="noopener noreferrer">
            Housing Stability and Tenant Protection Act of 2019
          </a>{' '}
          eliminated much of the displacement incentive of renovating rent-stabilized apartments to conduct Individual
          Apartment Improvements and dramatically raise rents, construction still poses risks to affordability.
          Landlords can use Major Capital Improvements (MCIs), combine adjacent apartments, vacate and demolish a
          building, or use "substantial rehabilitation" to greatly increase rents.
        </p>
        <p>
          One issued permit can contain multiple work types, which are displayed in the table as separate records. Only
          initial permit records (and not permit renewals) are displayed.
        </p>
      </div>
    ),
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
    documentationBody:
      "DOB permits data comes from two sources: permits filed in hard copy via the traditional system that captures data in DOB's Building Information System (BIS), and permits filed electronically via the DOB NOW portal. Currently, only some permits are able to be submitted via DOB NOW. The fields and data captured in the two systems differ from one another.",
    documentationSources: [
      {
        text: 'DD_DOB_Permit_Issuance_2019-07-29.xlsx',
        url:
          'https://data.cityofnewyork.us/api/views/ipu4-2q9a/files/12265875-36c8-4f5c-8a8c-657952bd1484?download=true&filename=DD_DOB_Permit_Issuance_2019-07-29.xlsx',
      },
      {
        text: 'DD_DOB_NOW_Build_Approved_Permits_2018-06-29.xlsx',
        url:
          'https://data.cityofnewyork.us/api/views/rbx6-tga4/files/04484c71-75ff-46ba-8b90-3eaf66d45dc8?download=true&filename=DD_DOB_NOW_Build_Approved_Permits_2018-06-29.xlsx',
      },
    ],
  },
  ECB_VIOLATION: {
    title: 'ECB Violations',
    body:
      'The Department of Buildings (DOB) issues violations to landlords when they violate the City building or zoning codes. Environmental Control Board (ECB) violations are a type of DOB violation that an owner can contest in front of the Office of Administrative Trials and Hearings (OATH). Unlike regular DOB violations, ECB violations carry penalties. A high number of DOB violations can indicate a failure to uphold safety standards and potential tenant harassment.',
    sources: [
      {
        text: 'NYC Open Data - DOB/ECB Violations',
        url: 'https://data.cityofnewyork.us/Housing-Development/DOB-ECB-Violations/6bgk-3dad',
      },
    ],
    documentationSources: [
      {
        text: 'DD_DOB ECB Violations_2019-07-10.xlsx',
        url:
          'https://data.cityofnewyork.us/api/views/6bgk-3dad/files/9cf3234e-9687-4a4b-8085-9b8f95dc1f58?download=true&filename=DD_DOB%20ECB%20Violations_2019-07-10.xlsx',
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
          housing. A high sale price can mean a new owner must raise rents to make large profits. While the{' '}
          <a href="https://www.nysenate.gov/legislation/bills/2019/s6458" target="_blank" rel="noopener noreferrer">
            Housing Stability and Tenant Protection Act of 2019
          </a>{' '}
          eliminated much of the financial incentives to displace tenants, threats such as increases via Major Capital
          Improvements (MCIs), preferential rents, substantial rehabilitation, demolition, and fraud remain.
        </p>
        <p>
          Although they are not counted in the total number of Sales, mortgage-related documents are included here for
          financing context. A mortgage is the loan a buyer takes from a bank or non-bank lender to purchase a property.
          It can also be a loan taken out for other purposes, with an owner's property serving as collateral for that
          loan. The following mortgage-related documents are included on DAP Portal: AALR, AGMT, AL&R, ASST, ASPM, DEMM,
          MTGE, PSAT, SAT, SMTG, WSAT, M&CON, SPRD
        </p>
        <p>
          <b>Note:</b> ACRIS data updates once per month, so the time periods on the District Dashboard will display
          month, year, or three years prior to the most recent available data. Usually, the prior calendar month's data
          is available around the 10th of the following month.
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
    documentationSources: [
      {
        text: 'ACRIS_Public_OpenData_Guide.doc',
        url:
          'https://data.cityofnewyork.us/api/views/bnx9-e6tj/files/c5d51488-f56b-495e-aef1-b9e7acc4680c?download=true&filename=ACRIS_Public_OpenData_Extract_Guide_v_1.0.doc',
      },
    ],
  },
  FORECLOSURE: {
    title: 'Foreclosure Filings',
    body: ReactDOMServer.renderToString(
      <div>
        <p>
          This table includes records of foreclosure filings in court, which indicates that a property is in
          pre-foreclosure and the homeowner is at risk of losing the property to the lender. A foreclosure can still be
          avoided, and many owners facing foreclosure benefit from homeowner assistance such as that offered by the{' '}
          <a rel="noopener noreferrer" target="_blank" href="https://cnycn.org/foreclosure/">
            Center for New York City Neighborhoods
          </a>
          . See information about the entire foreclosure process{' '}
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="https://www.propertyshark.com/info/foreclosure-process-new-york/"
          >
            here
          </a>
          .
        </p>
      </div>
    ),
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
  PSFORECLOSURE: {
    title: 'Foreclosue Auctions',
    body: ReactDOMServer.renderToString(
      <div>
        <p>
          This table includes scheduled foreclosure auctions, beginning with 5/15/2019. We update auctions scheduled in
          the next 90 days on a weekly basis. Auctions that have already occurred are still included. Before an auction
          occurs, the owner can still recuperate the property by paying off the owed debt: see information about
          pre-sale reinstatement and an overview of the entire foreclosure process{' '}
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="https://www.propertyshark.com/info/foreclosure-process-new-york"
          >
            here
          </a>
          .
        </p>
      </div>
    ),
    sources: [
      {
        text: 'PropertyShark (August, 2019 - Present)',
        url: 'https://propertyshark.com',
      },
    ],
  },
  OCA_HOUSING_COURT: {
    title: 'Housing Court Cases',
    body: ReactDOMServer.renderToString(
      <div>
        <p>
          Housing Court Data comes from the New York State Office of Court Administration 
          data on housing court cases. The dataset includes non-payment and holdover 
          evictions, HP (repairs), harassment, and other types of cases in residential 
          properties and commercial properties, when the case is a tenant/landlord issue.
          High numbers of cases can indicate neglect, harassment, or displacement 
          pressure by a landlord.
        </p>
        <p>
          To protect individual privacy, our data sharing agreement restricts sharing
          information about cases in properties with 10 or fewer residential units. 
          You will only be able to view data on housing court cases on DAP Portal
          with approved access via an account and for properties with 11 or more 
          residential units. 
        </p>
        <p>
          This data has been obtained and made available through the collaborative 
          efforts of the <a target="_blank" href="https://www.housingdatanyc.org/">Housing Data Coalition</a>, 
          the <a target="_blank" href="https://www.righttocounselnyc.org/">Right to Counsel Coalition</a>, <a target="_blank" href="https://beta.nyc/">BetaNYC</a>, 
          the <a target="_blank" href="https://anhd.org/">Association for Neighborhood and Housing Development</a>, 
          the <a target="_blank" href="https://unhp.org">University Neighborhood Housing Program</a>, 
          and <a target="_blank" href="https://www.justfix.nyc/">JustFix.nyc</a>. 
        </p>
        <p>
          Use of this data is restricted to the purposes of stopping speculation 
          and displacement and/or further tenant and small homeowner rights.{' '}
          <a target="_blank" href="https://portal.displacementalert.org/policies/data-access-policy">
            View our full data access policy
          </a>.
        </p>
      </div>
    ),
    sources: [
      {
        text: 'Office of Court Administration via the Housing Data Coalition',
        url: 'https://github.com/housing-data-coalition/oca',
      },
    ],
    documentationSources: [
      {
        text: 'https://github.com/housing-data-coalition/oca/tree/master/docs',
        url: 'https://github.com/housing-data-coalition/oca/tree/master/docs'
      }
    ]
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
    body: ReactDOMServer.renderToString(
      <div>
        <p>This dataset containts evictions that were executed by court-ordered marshals since 1/1/2017.</p>

        <p>
          "Marshal evictions" only occur at the very end of an eviction proceeding, if a judge orders a marshal to
          physically remove a tenant from their home and change the locks. If a case ends any other way prior to that
          point, it won't be captured in this data. In many of those cases, tenants will still have left their homes.
        </p>
        <p>
          We have de-duplicated the Department of Investigation's data using court marshal last name, eviction address,
          apartment number, and eviction date and matched addresses to BBLs to the best of our ability.
        </p>
      </div>
    ),
    sources: [
      {
        text: 'NYC Open Data - Evictions',
        url: 'https://data.cityofnewyork.us/City-Government/Evictions/6z8x-wfk4',
      },
    ],
    documentationSources: [
      {
        text: 'DOI - Marshals Evictions - Dataset Dictionary.xlsx',
        url:
          'https://data.cityofnewyork.us/api/views/6z8x-wfk4/files/39d3f781-a654-4547-be79-b6bd12c1e6d5?download=true&filename=DOI%20-%20Marshals%20Evictions%20-%20Dataset%20Dictionary.xlsx',
      },
    ],
  },
  HOUSING_LITIGATION: {
    title: 'Litigations against landlord',
    body: ReactDOMServer.renderToString(
      <div>
        <p>
          This dataset contains records of litigations that the Department of Housing Preservation and Development (HPD)
          or tenants initiate in Housing Court against landlords. These cases can result in enforceable orders to
          correct, civil penalties (fines), and contempt sanctions. A history of litigation can indicate harassment or
          negligence by landlords, poor building conditions, and/or a history of tenant organizing.
        </p>
      </div>
    ),
    sources: [
      {
        text: 'NYC Open Data - Housing Litigations',
        url: 'https://data.cityofnewyork.us/Housing-Development/Housing-Litigations/59kj-x8nc',
      },
    ],
    documentationSources: [
      {
        text: 'Glossary of terms',
        url: 'https://hpdonline.hpdnyc.org/HPDonline/GlossaryLMS.aspx',
      },
      {
        text: 'Housing_Litigations_Data_Dictionary.pdf',
        url:
          'https://data.cityofnewyork.us/api/views/59kj-x8nc/files/f1fa59a6-f45d-4109-bbf0-811aacc3fa1a?download=true&filename=Housing_Litigations_Data_Dictionary.pdf',
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
    documentationSources: [
      {
        text: 'Directory of NYC Housing Programs',
        url: 'https://furmancenter.org/coredata/directory',
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

  LOOKUP_BBL: {
    title: 'Borough-Block-Lot code',
    body:
      'BBL stands for Borough-Block-Lot, a combined 10-digit code that identifies individual properties, or tax lots, in New York City. Borough is one digit, Block is 5, and Lot is 4. To look up a property on city agency websites, you usually need to select the borough and then enter the Block and Lot codes separately.',
  },

  LOOKUP_STABILIZATION: {
    title: 'Rent Stabilization',
    body:
      'We base stabilized unit numbers on property tax bills from the NYC Department of Finance. They have been scraped by open data activists. Missing or fluctuating numbers may be due to missing/incorrect registration by the owner or inconsistencies in property tax documentation. Click the links below for documentation and raw data.',
    sources: [
      {
        text: 'taxbills.nyc',
        url: 'https://github.com/talos/nyc-stabilization-unit-counts',
      },
      {
        text: 'https://github.com/talos/nyc-stabilization-unit-counts',
        url: 'https://github.com/talos/nyc-stabilization-unit-counts',
      },
      {
        text: 'https://github.com/justfixnyc/nyc-doffer',
        url: 'https://github.com/justfixnyc/nyc-doffer',
      },
    ],
  },
  DASHBOARD_AND_OR: {
    title: 'Conditional Filters',
    body:
      'The most recent version of DAP Portal will by default display results that meet **all** of the active filter conditions. DAP Portal BETA displayed results that met **any** of the active filter conditions. You can go back to displaying any of the active filter conditions by toggling to **OR**.',
  },
  OCA_DATA_UNAVAILABLE: {
    title: 'OCA Housing Court Data Unavailable',
    body:
      'Housing Court Data comes from the New York State Office of Court Administration data on housing court cases. To protect individual privacy, our data sharing agreement restricts sharing information about cases in properties with 10 or fewer residential units.'
  }
}
