import moment from 'moment'
const dateFormatter = (cell, row, index) => {
  return moment(cell).format('MM/DD/YYYY')
}

const dobComplaintCategoryFormatter = (cell, row, index) => {
  switch (cell) {
    case '01':
      return `${cell} - Priority: A - Accident – Construction/Plumbing `
    case '03':
      return `${cell} - Priority: A - Adjacent Buildings - Not Protected `
    case '04':
      return `${cell} - Priority: B - After Hours Work – Illegal `
    case '05':
      return `${cell} - Priority: B - Permit – None (Building/PA/Demo etc.) `
    case '06':
      return `${cell} - Priority: B - Construction – Change Grade/Change Watercourse `
    case '09':
      return `${cell} - Priority: B - Debris – Excessive `
    case '10':
      return `${cell} - Priority: A - Debris/Building -Falling or In Danger of Falling `
    case '12':
      return `${cell} - Priority: A - Demolition-Unsafe/Illegal/Mechanical Demo `
    case '13':
      return `${cell} - Priority: A - Elevator In (FDNY) Readiness-None `
    case '14':
      return `${cell} - Priority: A - Excavation - Undermining Adjacent Building `
    case '15':
      return `${cell} - Priority: B - Fence - None/Inadequate/Illegal `
    case '16':
      return `${cell} - Priority: A - Inadequate Support/Shoring `
    case '18':
      return `${cell} - Priority: A - Material Storage – Unsafe `
    case '20':
      return `${cell} - Priority: A - Landmark Building – Illegal Work `
    case '21':
      return `${cell} - Priority: B - Safety Net/Guardrail-Damaged/Inadequate/None (over 6 Story/75 ft.) `
    case '23':
      return `${cell} - Priority: B - Sidewalk Shed/Supported Scaffold/Inadequate/Defective/None/No Permit/No Cert `
    case '29':
      return `${cell} - Priority: C - Building – Vacant, Open and Unguarded `
    case '30':
      return `${cell} - Priority: A - Building Shaking/Vibrating/Structural Stability Affected `
    case '31':
      return `${cell} - Priority: C - Certificate of Occupancy – None/Illegal/Contrary to Co `
    case '35':
      return `${cell} - Priority: D - Curb Cut/Driveway/Carport – Illegal `
    case '37':
      return `${cell} - Priority: A - Egress – Locked/Blocked/Improper/No Secondary Means `
    case '45':
      return `${cell} - Priority: B - Illegal Conversion `
    case '49':
      return `${cell} - Priority: C - Storefront or Business Sign/Awning/Marquee/Canopy – Illegal `
    case '50':
      return `${cell} - Priority: A - Sign Falling - Danger/Sign Erection or Display In Progress – Illegal `
    case '52':
      return `${cell} - Priority: B - Sprinkler System – Inadequate `
    case '53':
      return `${cell} - Priority: D - Vent/Exhaust – Illegal/Improper `
    case '54':
      return `${cell} - Priority: B - Wall/Retaining Wall – Bulging/Cracked `
    case '55':
      return `${cell} - Priority: D - Zoning – Non-conforming `
    case '56':
      return `${cell} - Priority: A - Boiler – Fumes/Smoke/Carbon Monoxide `
    case '58':
      return `${cell} - Priority: B - Boiler – Defective/Non-operative/No Permit `
    case '59':
      return `${cell} - Priority: B - Electrical Wiring – Defective/Exposed, In Progress `
    case '62':
      return `${cell} - Priority: A - Elevator-Danger Condition/Shaft Open/Unguarded `
    case '63':
      return `${cell} - Priority: B - Elevator-Danger Condition/Shaft Open/Unguarded `
    case '65':
      return `${cell} - Priority: A - Gas Hook-Up/Piping – Illegal or Defective `
    case '66':
      return `${cell} - Priority: B - Plumbing Work – Illegal/No Permit(Also Sprinkler/Standpipe) `
    case '67':
      return `${cell} - Priority: A - Crane – No Permit/License/Cert/Unsafe/Illegal `
    case '71':
      return `${cell} - Priority: B - SRO – Illegal Work/No Permit/Change In Occupancy Use `
    case '73':
      return `${cell} - Priority: C - Failure to Maintain `
    case '74':
      return `${cell} - Priority: C - Illegal Commercial/Manufacturing Use In Residential Zone `
    case '75':
      return `${cell} - Priority: B - Adult Establishment `
    case '76':
      return `${cell} - Priority: A - Unlicensed/Illegal/Improper Plumbing Work In Progress `
    case '77':
      return `${cell} - Priority: C - Contrary To Ll58/87 (Handicap Access) `
    case '78':
      return `${cell} - Priority: B - Privately Owned Public Space/Non-Compliance `
    case '79':
      return `${cell} - Priority: C - Lights from Parking Lot Shining on Building `
    case '80':
      return `${cell} - Priority: D - Elevator Not Inspected/Illegal/No Permit `
    case '81':
      return `${cell} - Priority: A - Elevator – Accident `
    case '82':
      return `${cell} - Priority: A - Boiler – Accident/Explosion `
    case '83':
      return `${cell} - Priority: B - Construction – Contrary/Beyond Approved Plans/Permits `
    case '85':
      return `${cell} - Priority: C - Failure to Retain Water/Improper Drainage (LL103/89) `
    case '86':
      return `${cell} - Priority: A - Work Contrary to Stop Work Order `
    case '88':
      return `${cell} - Priority: B - Safety Net/Guard Rail-Dam/Inadequate/None(6fl.75ft. or less) `
    case '89':
      return `${cell} - Priority: A - Accident – Cranes/Derricks/Suspension `
    case '90':
      return `${cell} - Priority: C - Unlicensed/Illegal Activity `
    case '91':
      return `${cell} - Priority: A - Site Conditions Endangering Workers `
    case '92':
      return `${cell} - Priority: B - Illegal Conversion of Manufacturing/Industrial Space `
    case '93':
      return `${cell} - Priority: B - Request for Retaining Wall Safety Inspection `
    case '94':
      return `${cell} - Priority: C - Plumbing-Defective/Leaking/Not Maintained `
    case '1A':
      return `${cell} - Priority: B - Illegal Conversion Commercial Building/Space to Dwelling Units `
    case '1B':
      return `${cell} - Priority: B - Illegal Tree Removal/Topo. Change In SNAD `
    case '1D':
      return `${cell} - Priority: B - Con Edison Referral `
    case '1E':
      return `${cell} - Priority: A - Suspended (Hanging) Scaffolds- No Permit/License/Dangerous/Accident `
    case '1G':
      return `${cell} - Priority: B - Stalled Construction Site `
    case '1K':
      return `${cell} - Priority: D - Bowstring Truss Tracking Complaint `
    case '1Z':
      return `${cell} - Priority: D - Enforcement Work Order (DOB) `
    case '2A':
      return `${cell} - Priority: B - Posted Notice or Order Removed/Tampered With `
    case '2B':
      return `${cell} - Priority: A - Failure to Comply with Vacate Order `
    case '2C':
      return `${cell} - Priority: B - Smoking Ban – Smoking on Construction Site `
    case '2D':
      return `${cell} - Priority: B - Smoking Signs – ‘No Smoking Signs’ Not Observed on Construction Site `
    case '2E':
      return `${cell} - Priority: A - Demolition Notification Received `
    case '2F':
      return `${cell} - Priority: D - Building Under Structural Monitoring `
    case '2G':
      return `${cell} - Priority: C - Advertising Sign/Billboard/Posters/Flexible Fabric – Illegal `
    case '2H':
      return `${cell} - Priority: D - Second Avenue Subway Construction `
    case '2J':
      return `${cell} - Priority: D - Sandy: Building Destroyed `
    case '2K':
      return `${cell} - Priority: D - Structurally Compromised Building (LL33/08) `
    case '2L':
      return `${cell} - Priority: D - Façade (LL11/98) – Unsafe Notification `
    case '2M':
      return `${cell} - Priority: D - Monopole Tracking Complaint `
    case '3A':
      return `${cell} - Priority: B - Unlicensed/Illegal/Improper Electrical Work In Progress `
    case '4A':
      return `${cell} - Priority: B - Illegal Hotel Rooms In Residential Buildings `
    case '4B':
      return `${cell} - Priority: B - SEP – Professional Certification Compliance Audit `
    case '4C':
      return `${cell} - Priority: D - Excavation Tracking Complaint `
    case '4D':
      return `${cell} - Priority: D - Interior Demo Tracking Complaint `
    case '4F':
      return `${cell} - Priority: D - SST Tracking Complaint `
    case '4G':
      return `${cell} - Priority: B - Illegal Conversion No Access Follow-Up `
    case '4J':
      return `${cell} - Priority: D - M.A.R.C.H. Program (Interagency) `
    case '4K':
      return `${cell} - Priority: D - CSC – DM Tracking Complaint `
    case '4L':
      return `${cell} - Priority: D - CSC – High-Rise Tracking Complaint `
    case '4M':
      return `${cell} - Priority: D - CSC – Low-Rise Tracking Complaint `
    case '4N':
      return `${cell} - Priority: D - Retaining Wall Tracking Complaint `
    case '4P':
      return `${cell} - Priority: D - Legal/Padlock Tracking Complaint `
    case '4W':
      return `${cell} - Priority: C - Woodside Settlement Project `
    case '5A':
      return `${cell} - Priority: B - Request for Joint FDNY/DOB Inspection `
    case '5B':
      return `${cell} - Priority: A - Non-Compliance with Lightweight Materials `
    case '5C':
      return `${cell} - Priority: A - Structural Stability Impacted – New Building Under Construction `
    case '5E':
      return `${cell} - Priority: A - Amusement Ride Accident/Incident `
    case '5F':
      return `${cell} - Priority: B - Compliance Inspection `
    case '5G':
      return `${cell} - Priority: B - Unlicensed/Illegal/Improper Work In Progress `
    case '6A':
      return `${cell} - Priority: C - Vesting Inspection `
    default:
      return cell
  }
}

export const dobPermitWorkTypeFormatter = (cell, row, index) => {
  switch (cell) {
    case 'NB':
      return `${cell} - Construction of new structures`
    case 'A1':
      return `${cell} - ALT1: Major alterations that will change use, egress or occupancy`
    case 'A2':
      return `${cell} - ALT2: Multiple types of work, not affecting use, egress or occupancy`
    case 'A3':
      return `${cell} - ALT3: One type of minor work, not affecting use, egress or occupancy`
    default:
      return cell
  }
}

export const dobPermitSourceFormatter = (cell, row, index) => {
  switch (cell) {
    case 'dobpermitissuedlegacy':
      return 'Legacy'
    case 'dobpermitissuednow':
      return 'DOB NOW'
  }
}

export const getTableColumns = constant => {
  switch (constant) {
    case 'PROPERTY':
      return [
        {
          dataField: 'bbl',
          text: 'BBL',
        },
        {
          dataField: 'address',
          text: 'Address',
        },
        {
          dataField: 'bldgclass',
          text: 'Class',
        },
        {
          dataField: 'yearbuilt',
          text: 'Year Built',
        },
        {
          dataField: 'unitstotal',
          text: 'Total Units',
        },
        {
          dataField: 'unitsres',
          text: 'Residential Units',
        },
        {
          dataField: 'unitsrentstabilized',
          text: 'Rent Stabilized Units',
        },
        {
          dataField: 'numbldgs',
          text: '# Buildings',
        },
        {
          dataField: 'numfloors',
          text: '# Floors',
        },
      ]
    case 'HPD_VIOLATION':
      return [
        {
          dataField: 'violationid',
          text: 'Violation ID',
        },
        {
          dataField: 'approveddate',
          text: 'Date Approved',
          formatter: dateFormatter,
        },
        {
          dataField: 'class_name',
          text: 'Class',
        },
        {
          dataField: 'novdescription',
          text: 'Description',
        },
        {
          dataField: 'currentstatus',
          text: 'Notice Status',
        },
        {
          dataField: 'violationstatus',
          text: 'Violation Status',
        },
      ]
    case 'HPD_COMPLAINT':
      return [
        {
          dataField: 'complaintid',
          text: 'Complaint ID',
        },
        {
          dataField: 'receiveddate',
          text: 'Date Received',
          formatter: dateFormatter,
        },
        {
          dataField: 'apartment',
          text: 'Apt.',
        },
        {
          dataField: 'status',
          text: 'Status',
        },
      ]
    case 'DOB_VIOLATION':
      return [
        {
          dataField: 'isndobbisviol',
          text: 'isndobbisviol',
        },
        {
          dataField: 'issuedate',
          text: 'Date Issued',
          formatter: dateFormatter,
        },
        {
          dataField: 'violationtype',
          text: 'Violation Type',
        },
        {
          dataField: 'description',
          text: 'Description',
        },
        {
          dataField: 'violationcategory',
          text: 'Status',
        },
      ]
    case 'DOB_COMPLAINT':
      return [
        {
          dataField: 'complaintnumber',
          text: 'Complaint #',
        },
        {
          dataField: 'dateentered',
          text: 'Date Entered',
          formatter: dateFormatter,
        },
        {
          dataField: 'complaintcategory',
          text: 'Category',
          formatter: dobComplaintCategoryFormatter,
        },
        {
          dataField: 'status',
          text: 'Status',
        },
      ]
    case 'ECB_VIOLATION':
      return [
        {
          dataField: 'ecbviolationnumber',
          text: 'Violation #',
        },
        {
          dataField: 'issuedate',
          text: 'Date Issued',
          formatter: dateFormatter,
        },
        {
          dataField: 'violationtype',
          text: 'Violation Type',
        },
        {
          dataField: 'severity',
          text: 'Severity',
        },
        {
          dataField: 'violationdescription',
          text: 'Description',
        },
        {
          dataField: 'ecbviolationstatus',
          text: 'Status',
        },
      ]
    case 'DOB_ISSUED_PERMIT':
      return [
        {
          dataField: 'jobfilingnumber',
          text: 'Job Filing #',
        },
        {
          dataField: 'workpermit',
          text: 'Work Permit',
        },
        {
          dataField: 'issuedate',
          text: 'Date Issued',
          formatter: dateFormatter,
        },
        {
          dataField: 'worktype',
          text: 'Work Type',
        },
        {
          dataField: 'jobdescription',
          text: 'Description',
          formatter: dobPermitWorkTypeFormatter,
        },
        {
          dataField: 'type',
          text: 'Source',
          formatter: dobPermitSourceFormatter,
        },
      ]
    case 'DOB_FILED_PERMIT':
      return [
        {
          dataField: 'job',
          text: 'Job #',
        },
        {
          dataField: 'dobrundate',
          text: 'Date Run',
          formatter: dateFormatter,
        },
        {
          dataField: 'jobtype',
          text: 'Job Type',
          formatter: dobPermitWorkTypeFormatter,
        },
        {
          dataField: 'jobdescription',
          text: 'Description',
        },
        {
          dataField: 'jobstatusdescrp',
          text: 'Status',
        },
      ]
    default:
      return [{ dataField: 'id', text: 'ID' }]
  }
}

export const getKeyField = constant => {
  switch (constant) {
    case 'PROPERTY':
      return 'bbl'
    case 'BUILDING':
      return 'bin'
    case 'HPD_VIOLATION':
      return 'violationid'
    case 'HPD_COMPLAINT':
      return 'complaintid'
    case 'DOB_VIOLATION':
      return 'isndobbisviol'
    case 'DOB_COMPLAINT':
      return 'complaintnumber'
    case 'ECB_VIOLATION':
      return 'ecbviolationnumber'
    case 'DOB_ISSUED_PERMIT':
      return 'jobfilingnumber'
    case 'DOB_FILED_PERMIT':
      return 'job'
    default:
      return 'id'
  }
}
