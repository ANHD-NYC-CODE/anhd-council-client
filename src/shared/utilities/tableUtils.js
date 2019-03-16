import moment from 'moment'

export const dateFormatter = (cell, row, index) => {
  try {
    const date = moment(cell)
    return date.isValid() ? date.format('MM/DD/YYYY') : null
  } catch (e) {
    return cell
  }
}

export const bldgClassFormater = (cell, row, index) => {
  switch (cell) {
    case 'A0':
      return `${cell} - CAPE COD`
    case 'A1':
      return `${cell} - TWO STORIES - DETACHED SM OR MID`
    case 'A2':
      return `${cell} - ONE STORY - PERMANENT LIVING QUARTER`
    case 'A3':
      return `${cell} - LARGE SUBURBAN RESIDENCE`
    case 'A4':
      return `${cell} - CITY RESIDENCE ONE FAMILY`
    case 'A5':
      return `${cell} - ONE FAMILY ATTACHED OR SEMI-DETACHED`
    case 'A6':
      return `${cell} - SUMMER COTTAGE`
    case 'A7':
      return `${cell} - MANSION TYPE OR TOWN HOUSE`
    case 'A8':
      return `${cell} - BUNGALOW COLONY - COOPERATIVELY OWNED LAND`
    case 'A9':
      return `${cell} - MISCELLANEOUS ONE FAMILY`
    case 'B1':
      return `${cell} - TWO FAMILY BRICK`
    case 'B2':
      return `${cell} - TWO FAMILY FRAME`
    case 'B3':
      return `${cell} - TWO FAMILY CONVERTED FROM ONE FAMILY`
    case 'B9':
      return `${cell} - MISCELLANEOUS TWO FAMILY`
    case 'C0':
      return `${cell} - THREE FAMILIES`
    case 'C1':
      return `${cell} - OVER SIX FAMILIES WITHOUT STORES`
    case 'C2':
      return `${cell} - FIVE TO SIX FAMILIES`
    case 'C3':
      return `${cell} - FOUR FAMILIES`
    case 'C4':
      return `${cell} - OLD LAW TENEMENT`
    case 'C5':
      return `${cell} - CONVERTED DWELLINGS OR ROOMING HOUSE`
    case 'C6':
      return `${cell} - WALK-UP COOPERATIVE`
    case 'C7':
      return `${cell} - WALK-UP APT. OVER SIX FAMILIES WITH STORES`
    case 'C8':
      return `${cell} - WALK-UP CO-OP; CONVERSION FROM LOFT/WAREHOUSE`
    case 'C9':
      return `${cell} - GARDEN APARTMENTS`
    case 'CM':
      return `${cell} - MOBILE HOMES/TRAILER PARKS`
    case 'D0':
      return `${cell} - ELEVATOR CO-OP; CONVERSION FROM LOFT/WAREHOUSE`
    case 'D1':
      return `${cell} - ELEVATOR APT; SEMI-FIREPROOF WITHOUT STORES`
    case 'D2':
      return `${cell} - ELEVATOR APT; ARTISTS IN RESIDENCE`
    case 'D3':
      return `${cell} - ELEVATOR APT; FIREPROOF WITHOUT STORES`
    case 'D4':
      return `${cell} - ELEVATOR COOPERATIVE`
    case 'D5':
      return `${cell} - ELEVATOR APT; CONVERTED`
    case 'D6':
      return `${cell} - ELEVATOR APT; FIREPROOF WITH STORES`
    case 'D7':
      return `${cell} - ELEVATOR APT; SEMI-FIREPROOF WITH STORES`
    case 'D8':
      return `${cell} - ELEVATOR APT; LUXURY TYPE`
    case 'D9':
      return `${cell} - ELEVATOR APT; MISCELLANEOUS`
    case 'E1':
      return `${cell} - FIREPROOF WAREHOUSE`
    case 'E2':
      return `${cell} - CONTRACTORS WAREHOUSE`
    case 'E3':
      return `${cell} - SEMI-FIREPROOF WAREHOUSE`
    case 'E4':
      return `${cell} - METAL FRAME WAREHOUSE`
    case 'E7':
      return `${cell} - SELF-STORAGE WAREHOUSES`
    case 'E9':
      return `${cell} - MISCELLANEOUS WAREHOUSE`
    case 'F1':
      return `${cell} - FACTORY; HEAVY MANUFACTURING - FIREPROOF`
    case 'F2':
      return `${cell} - FACTORY; SPECIAL CONSTRUCTION - FIREPROOF`
    case 'F4':
      return `${cell} - FACTORY; INDUSTRIAL SEMI-FIREPROOF`
    case 'F5':
      return `${cell} - FACTORY; LIGHT MANUFACTURING`
    case 'F8':
      return `${cell} - FACTORY; TANK FARM`
    case 'F9':
      return `${cell} - FACTORY; INDUSTRIAL-MISCELLANEOUS`
    case 'G0':
      return `${cell} - GARAGE; RESIDENTIAL TAX CLASS 1`
    case 'G1':
      return `${cell} - ALL PARKING GARAGES`
    case 'G2':
      return `${cell} - AUTO BODY/COLLISION OR AUTO REPAIR`
    case 'G3':
      return `${cell} - GAS STATION WITH RETAIL STORE`
    case 'G4':
      return `${cell} - GAS STATION WITH SERVICE/AUTO REPAIR`
    case 'G5':
      return `${cell} - GAS STATION ONLY WITH/WITHOUT SMALL KIOSK`
    case 'G6':
      return `${cell} - LICENSED PARKING LOT`
    case 'G7':
      return `${cell} - UNLICENSED PARKING LOT`
    case 'G8':
      return `${cell} - CAR SALES/RENTAL WITH SHOWROOM`
    case 'G9':
      return `${cell} - MISCELLANEOUS GARAGE OR GAS STATION`
    case 'GU':
      return `${cell} - CAR SALES/RENTAL WITHOUT SHOWROOM`
    case 'HB':
      return `${cell} - BOUTIQUE: 10-100 ROOMS, W/LUXURY FACILITIES, THEMED, STYLISH, W/FULL SVC ACCOMMODATIONS`
    case 'HH':
      return `${cell} - HOSTELS- BED RENTALS IN DORMITORY-LIKE SETTINGS W/SHARED ROOMS & BATHROOMS`
    case 'HR':
      return `${cell} - SRO- 1 OR 2 PEOPLE HOUSED IN INDIVIDUAL ROOMS IN MULTIPLE DWELLING AFFORDABLE HOUSING`
    case 'HS':
      return `${cell} - EXTENDED STAY/SUITE: AMENITIES SIMILAR TO APT; TYPICALLY CHARGE WEEKLY RATES & LESS EXTENSIVE THAN FULL-SERVICE HOTEL`
    case 'H1':
      return `${cell} - LUXURY HOTEL`
    case 'H2':
      return `${cell} - FULL SERVICE HOTEL`
    case 'H3':
      return `${cell} - LIMITED SERVICE; MANY AFFILIATED WITH NATIONAL CHAIN`
    case 'H4':
      return `${cell} - MOTEL`
    case 'H5':
      return `${cell} - HOTEL; PRIVATE CLUB, LUXURY TYPE`
    case 'H6':
      return `${cell} - APARTMENT HOTEL`
    case 'H7':
      return `${cell} - APARTMENT HOTEL - COOPERATIVELY OWNED`
    case 'H8':
      return `${cell} - DORMITORY`
    case 'H9':
      return `${cell} - MISCELLANEOUS HOTEL`
    case 'I1':
      return `${cell} - HOSPITAL, SANITARIUM, MENTAL INSTITUTION`
    case 'I2':
      return `${cell} - INFIRMARY`
    case 'I3':
      return `${cell} - DISPENSARY`
    case 'I4':
      return `${cell} - HOSPITAL; STAFF FACILITY`
    case 'I5':
      return `${cell} - HEALTH CENTER, CHILD CENTER, CLINIC`
    case 'I6':
      return `${cell} - NURSING HOME`
    case 'I7':
      return `${cell} - ADULT CARE FACILITY`
    case 'I9':
      return `${cell} - MISCELLANEOUS HOSPITAL, HEALTH CARE FACILITY`
    case 'J1':
      return `${cell} - THEATRE; ART TYPE LESS THAN 400 SEATS`
    case 'J2':
      return `${cell} - THEATRE; ART TYPE MORE THAN 400 SEATS`
    case 'J3':
      return `${cell} - MOTION PICTURE THEATRE WITH BALCONY`
    case 'J4':
      return `${cell} - LEGITIMATE THEATRE, SOLE USE`
    case 'J5':
      return `${cell} - THEATRE IN MIXED-USE BUILDING`
    case 'J6':
      return `${cell} - TELEVISION STUDIO`
    case 'J7':
      return `${cell} - OFF BROADWAY TYPE THEATRE`
    case 'J8':
      return `${cell} - MULTIPLEX PICTURE THEATRE`
    case 'J9':
      return `${cell} - MISCELLANEOUS THEATRE`
    case 'K1':
      return `${cell} - ONE STORY RETAIL BUILDING`
    case 'K2':
      return `${cell} - MULTI-STORY RETAIL BUILDING (2 OR MORE)`
    case 'K3':
      return `${cell} - MULTI-STORY DEPARTMENT STORE`
    case 'K4':
      return `${cell} - PREDOMINANT RETAIL WITH OTHER USES`
    case 'K5':
      return `${cell} - STAND-ALONE FOOD ESTABLISHMENT`
    case 'K6':
      return `${cell} - SHOPPING CENTER WITH OR WITHOUT PARKING`
    case 'K7':
      return `${cell} - BANKING FACILITIES WITH OR WITHOUT PARKING`
    case 'K8':
      return `${cell} - BIG BOX RETAIL: NOT AFFIXED & STANDING ON OWN LOT W/PARKING, E.G. COSTCO & BJ'S`
    case 'K9':
      return `${cell} - MISCELLANEOUS STORE BUILDING`
    case 'L1':
      return `${cell} - LOFT; OVER 8 STORIES (MID MANH. TYPE)`
    case 'L2':
      return `${cell} - LOFT; FIREPROOF AND STORAGE TYPE WITHOUT STORES`
    case 'L3':
      return `${cell} - LOFT; SEMI-FIREPROOF`
    case 'L8':
      return `${cell} - LOFT; WITH RETAIL STORES OTHER THAN TYPE ONE`
    case 'L9':
      return `${cell} - MISCELLANEOUS LOFT`
    case 'M1':
      return `${cell} - CHURCH, SYNAGOGUE, CHAPEL`
    case 'M2':
      return `${cell} - MISSION HOUSE (NON-RESIDENTIAL)`
    case 'M3':
      return `${cell} - PARSONAGE, RECTORY`
    case 'M4':
      return `${cell} - CONVENT`
    case 'M9':
      return `${cell} - MISCELLANEOUS RELIGIOUS FACILITY`
    case 'N1':
      return `${cell} - ASYLUM`
    case 'N2':
      return `${cell} - HOME FOR INDIGENT CHILDREN, AGED, HOMELESS`
    case 'N3':
      return `${cell} - ORPHANAGE`
    case 'N4':
      return `${cell} - DETENTION HOUSE FOR WAYWARD GIRLS`
    case 'N9':
      return `${cell} - MISCELLANEOUS ASYLUM, HOME`
    case 'O1':
      return `${cell} - OFFICE ONLY - 1 STORY`
    case 'O2':
      return `${cell} - OFFICE ONLY 2 - 6 STORIES`
    case 'O3':
      return `${cell} - OFFICE ONLY 7 - 19 STORIES`
    case 'O4':
      return `${cell} - OFFICE ONLY WITH OR WITHOUT COMM - 20 STORIES OR MORE`
    case 'O5':
      return `${cell} - OFFICE WITH COMM - 1 TO 6 STORIES`
    case 'O6':
      return `${cell} - OFFICE WITH COMM 7 - 19 STORIES`
    case 'O7':
      return `${cell} - PROFESSIONAL BUILDINGS/STAND ALONE FUNERAL HOMES`
    case 'O8':
      return `${cell} - OFFICE WITH APARTMENTS ONLY (NO COMM)`
    case 'O9':
      return `${cell} - MISCELLANEOUS AND OLD STYLE BANK BLDGS.`
    case 'P1':
      return `${cell} - CONCERT HALL`
    case 'P2':
      return `${cell} - LODGE ROOM`
    case 'P3':
      return `${cell} - YWCA, YMCA, YWHA, YMHA, PAL`
    case 'P4':
      return `${cell} - BEACH CLUB`
    case 'P5':
      return `${cell} - COMMUNITY CENTER`
    case 'P6':
      return `${cell} - AMUSEMENT PLACE, BATH HOUSE, BOAT HOUSE`
    case 'P7':
      return `${cell} - MUSEUM`
    case 'P8':
      return `${cell} - LIBRARY`
    case 'P9':
      return `${cell} - MISCELLANEOUS INDOOR PUBLIC ASSEMBLY`
    case 'Q1':
      return `${cell} - PARKS/RECREATION FACILTY`
    case 'Q2':
      return `${cell} - PLAYGROUND`
    case 'Q3':
      return `${cell} - OUTDOOR POOL`
    case 'Q4':
      return `${cell} - BEACH`
    case 'Q5':
      return `${cell} - GOLF COURSE`
    case 'Q6':
      return `${cell} - STADIUM, RACE TRACK, BASEBALL FIELD`
    case 'Q7':
      return `${cell} - TENNIS COURT`
    case 'Q8':
      return `${cell} - MARINA, YACHT CLUB`
    case 'Q9':
      return `${cell} - MISCELLANEOUS OUTDOOR RECREATIONAL FACILITY`
    case 'RA':
      return `${cell} - CULTURAL, MEDICAL, EDUCATIONAL, ETC.`
    case 'RB':
      return `${cell} - OFFICE SPACE`
    case 'RG':
      return `${cell} - INDOOR PARKING`
    case 'RH':
      return `${cell} - HOTEL/BOATEL`
    case 'RK':
      return `${cell} - RETAIL SPACE`
    case 'RP':
      return `${cell} - OUTDOOR PARKING`
    case 'RR':
      return `${cell} - CONDOMINIUM RENTALS`
    case 'RS':
      return `${cell} - NON-BUSINESS STORAGE SPACE`
    case 'RT':
      return `${cell} - TERRACES/GARDENS/CABANAS`
    case 'RW':
      return `${cell} - WAREHOUSE/FACTORY/INDUSTRIAL`
    case 'R0':
      return `${cell} - SPECIAL CONDOMINIUM BILLING LOT`
    case 'R1':
      return `${cell} - CONDO; RESIDENTIAL UNIT IN 2-10 UNIT BLDG.`
    case 'R2':
      return `${cell} - CONDO; RESIDENTIAL UNIT IN WALK-UP BLDG.`
    case 'R3':
      return `${cell} - CONDO; RESIDENTIAL UNIT IN 1-3 STORY BLDG.`
    case 'R4':
      return `${cell} - CONDO; RESIDENTIAL UNIT IN ELEVATOR BLDG.`
    case 'R5':
      return `${cell} - MISCELLANEOUS COMMERCIAL`
    case 'R6':
      return `${cell} - CONDO; RESID.UNIT OF 1-3 UNIT BLDG-ORIG CLASS 1`
    case 'R7':
      return `${cell} - CONDO; COMML.UNIT OF 1-3 UNIT BLDG-ORIG CLASS 1`
    case 'R8':
      return `${cell} - CONDO; COMML.UNIT OF 2-10 UNIT BLDG.`
    case 'R9':
      return `${cell} - CO-OP WITHIN A CONDOMINIUM`
    case 'S0':
      return `${cell} - PRIMARILY 1 FAMILY WITH 2 STORES OR OFFICES`
    case 'S1':
      return `${cell} - PRIMARILY 1 FAMILY WITH 1 STORE OR OFFICE`
    case 'S2':
      return `${cell} - PRIMARILY 2 FAMILY WITH 1 STORE OR OFFICE`
    case 'S3':
      return `${cell} - PRIMARILY 3 FAMILY WITH 1 STORE OR OFFICE`
    case 'S4':
      return `${cell} - PRIMARILY 4 FAMILY WITH 1 STORE OROFFICE`
    case 'S5':
      return `${cell} - PRIMARILY 5-6 FAMILY WITH 1 STORE OR OFFICE`
    case 'S9':
      return `${cell} - SINGLE OR MULTIPLE DWELLING WITH STORES OR OFFICES`
    case 'T1':
      return `${cell} - AIRPORT, AIRFIELD, TERMINAL`
    case 'T2':
      return `${cell} - PIER, DOCK, BULKHEAD`
    case 'T9':
      return `${cell} - MISCELLANEOUS TRANSPORTATION FACILITY`
    case 'U0':
      return `${cell} - UTILITY COMPANY LAND AND BUILDING`
    case 'U1':
      return `${cell} - BRIDGE, TUNNEL, HIGHWAY`
    case 'U2':
      return `${cell} - GAS OR ELECTRIC UTILITY`
    case 'U3':
      return `${cell} - CEILING RAILROAD`
    case 'U4':
      return `${cell} - TELEPHONE UTILITY`
    case 'U5':
      return `${cell} - COMMUNICATION FACILITY OTHER THAN TELEPHONE`
    case 'U6':
      return `${cell} - RAILROAD - PRIVATE OWNERSHIP`
    case 'U7':
      return `${cell} - TRANSPORTATION - PUBLIC OWNERSHIP`
    case 'U8':
      return `${cell} - REVOCABLE CONSENT`
    case 'U9':
      return `${cell} - MISCELLANEOUS UTILITY PROPERTY`
    case 'V0':
      return `${cell} - ZONED RESIDENTIAL; NOT MANHATTAN`
    case 'V1':
      return `${cell} - ZONED COMMERCIAL OR MANHATTAN RESIDENTIAL`
    case 'V2':
      return `${cell} - ZONED COMMERCIAL ADJACENT TO CLASS 1 DWELLING: NOT MANHATTAN`
    case 'V3':
      return `${cell} - ZONED PRIMARILY RESIDENTIAL; NOT MANHATTAN`
    case 'V4':
      return `${cell} - POLICE OR FIRE DEPARTMENT`
    case 'V5':
      return `${cell} - SCHOOL SITE OR YARD`
    case 'V6':
      return `${cell} - LIBRARY, HOSPITAL OR MUSEUM`
    case 'V7':
      return `${cell} - PORT AUTHORITY OF NEW YORK AND NEW JERSEY`
    case 'V8':
      return `${cell} - NEW YORK STATE OR US GOVERNMENT`
    case 'V9':
      return `${cell} - MISCELLANEOUS VACANT LAND`
    case 'W1':
      return `${cell} - PUBLIC ELEMENTARY, JUNIOR OR SENIOR HIGH`
    case 'W2':
      return `${cell} - PAROCHIAL SCHOOL, YESHIVA`
    case 'W3':
      return `${cell} - SCHOOL OR ACADEMY`
    case 'W4':
      return `${cell} - TRAINING SCHOOL`
    case 'W5':
      return `${cell} - CITY UNIVERSITY`
    case 'W6':
      return `${cell} - OTHER COLLEGE AND UNIVERSITY`
    case 'W7':
      return `${cell} - THEOLOGICAL SEMINARY`
    case 'W8':
      return `${cell} - OTHER PRIVATE SCHOOL`
    case 'W9':
      return `${cell} - MISCELLANEOUS EDUCATIONAL FACILITY`
    case 'Y1':
      return `${cell} - FIRE DEPARTMENT`
    case 'Y2':
      return `${cell} - POLICE DEPARTMENT`
    case 'Y3':
      return `${cell} - PRISON, JAIL, HOUSE OF DETENTION`
    case 'Y4':
      return `${cell} - MILITARY AND NAVAL INSTALLATION`
    case 'Y5':
      return `${cell} - DEPARTMENT OF REAL ESTATE`
    case 'Y6':
      return `${cell} - DEPARTMENT OF SANITATION`
    case 'Y7':
      return `${cell} - DEPARTMENT OF PORTS AND TERMINALS`
    case 'Y8':
      return `${cell} - DEPARTMENT OF PUBLIC WORKS`
    case 'Y9':
      return `${cell} - DEPARTMENT OF ENVIRONMENTAL PROTECTION`
    case 'Z0':
      return `${cell} - TENNIS COURT, POOL, SHED, ETC.`
    case 'Z1':
      return `${cell} - COURT HOUSE`
    case 'Z2':
      return `${cell} - PUBLIC PARKING AREA`
    case 'Z3':
      return `${cell} - POST OFFICE`
    case 'Z4':
      return `${cell} - FOREIGN GOVERNMENT`
    case 'Z5':
      return `${cell} - UNITED NATIONS`
    case 'Z7':
      return `${cell} - EASEMENT`
    case 'Z8':
      return `${cell} - CEMETERY`
    case 'Z9':
      return `${cell} - OTHER MISCELLANEOUS`
  }
}

export const dobComplaintCategoryFormatter = (cell, row, index) => {
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

export const acrisDocTypeFormatter = (cell, row, index) => {
  switch (cell) {
    case 'AGMT':
      return 'AGREEMENT'
    case 'DEED':
      return 'DEED'
    case 'DEEDO':
      return 'DEED, OTHER'
    case 'DEED, LE':
      return 'LIFE ESTATE DEED'
    case 'DEED, RC':
      return 'DEED WITH RESTRICTIVE COVENANT'
    case 'DEED, TS':
      return 'TIMESHARE DEED'
    case 'DEEDP':
      return 'DEED, PRE RPT TAX'
    case 'MTGE':
      return 'MORTGAGE'
    case 'CORRM':
      return 'CORRECTION MORTGAGE'
    case 'ASPM':
      return 'ASSUMPTION OF MORTGAGE'
    case 'AL&R':
      return 'ASSIGNMENT OF LEASES AND RENTS'
    case 'M&CON':
      return 'MORTGAGE AND CONSOLIDATION'
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
