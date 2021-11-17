import React from 'react'
import dayjs from 'dayjs'
import { Button } from 'react-bootstrap'
import BaseLink from 'shared/components/BaseLink'
import { getLinkId, getLinkProps } from 'shared/tables/tableColumns'
import {
  capitalizeSentences,
  capitalizeString,
  capitalizeWords,
  preserveUppercaseTerms,
} from 'shared/utilities/languageUtils'

import lookupIcon from 'shared/images/lookup-document.svg'

export const hpdProblemStatusFormatter = cell => {
  switch (cell) {
    case 'The Department of Housing Preservation and Development responded to a complaint of no heat or hot water and was advised by a tenant in the building that heat and hot water had been restored. If the condition still exists, please file a new complaint.':
      return 'HPD responded to a complaint of no heat or hot water and was advised by a tenant that heat/hot water had been restored.'
    case 'The Department of Housing Preservation and Development inspected the following conditions. Violations were issued. However, HPD also identified potential lead-based paint conditions and will attempt to contact you to schedule a follow-up inspection to test the paint for lead. Information about specific violations is available at www.nyc.gov/hpd.':
      return 'HPD inspected conditions and issued violations. HPD also identified potential lead-based paint conditions and will attempt to contact you for a follow-up inspection.'
    case 'The following complaint conditions are still open. HPD may attempt to contact you to verify the correction of the condition or may conduct an inspection.':
      return 'Complaint conditions are still open. HPD may attempt to contact you.'
    case 'The Department of Housing Preservation and Development contacted a tenant in the building and verified that the following conditions were corrected. The complaint has been closed. If the condition still exists, please file a new complaint.':
      return 'HPD contacted a tenant and verified conditions were corrected.'
    case 'More than one complaint was received for this building-wide condition.This complaint status is for the initial complaint. The Department of Housing Preservation and Development inspected the following conditions. Violations were issued. Information about specific violations is available at www.nyc.gov/hpd.':
      return 'HPD received more than one complaint; this is the initial complaint. HPD inspected conditions and issued violations.'
    case 'The Department of Housing Preservation and Development was not able to gain access to your apartment to inspect for a lack of heat or hot water. However, HPD was able to verify that heat or hot water was inadequate by inspecting another apartment and a violation was issued. Information about specific violations is available at www.nyc.gov/hpd.':
      return 'HPD was unable to gain access to apartment that filed complaint, but verified lack of heat/hot water in another apartment. HPD issued a violation.'
    case 'The Department of Housing Preservation and Development responded to a complaint of no heat or hot water. Heat was not required at the time of the inspection. No violations were issued. If the condition still exists, please file a new complaint.':
      return 'HPD responded to a complaint of no heat or hot water, but heat was not required at the time of inspection. No violations were issued.'
    case 'The Department of Housing Preservation and Development inspected the following conditions. A Section 8 Failure was issued. Both the tenant and the property owner will receive a notice in the mail regarding the details of the Failure and the resulting action by the Agency.':
      return 'HPD inspected conditions and issued a Section 8 Failure. Tenant and property owner will receive notices in the mail with details.'
    case 'More than one complaint was received for this building-wide condition.This complaint status is for the initial complaint. The Department of Housing Preservation and Development responded to a complaint of no heat or hot water and was advised by a tenant in the building that heat and hot water had been restored. If the condition still exists, please file a new complaint.':
      return 'HPD received more than one complaint about lack of heat or hot water; this is the initial complaint. HPD inspected and was advised by a tenant that heat/hot water was restored. '
    case 'The Department of Housing Preservation and Development was not able to gain access to inspect the following conditions. The complaint has been closed. If the condition still exists, please file a new complaint.':
      return 'HPD was unable to gain access and has closed the complaint.'
    case 'The Department of Housing Preservation and Development contacted an occupant of the apartment and verified that the following conditions were corrected. The complaint has been closed. If the condition still exists, please file a new complaint.':
      return 'HPD contacted tenant and verified conditions were corrected. Complaint has been closed.'
    case 'More than one complaint was received for this building-wide condition.This complaint status is for the initial complaint. The Department of Housing Preservation and Development was not able to gain access to your apartment or others in the building to inspect for a lack of heat or hot water. The complaint has been closed. If the condition still exists, please file a new complaint.':
      return 'HPD received more than one complaint about lack of heat/hot water; this is the initial complaint. HPD was unable to gain access to inspect. Complaint has been closed.'
    case 'More than one complaint was received for this building-wide condition.This complaint status is for the initial complaint. The following complaint conditions are still open. HPD may attempt to contact you to verify the correction of the condition or may conduct an inspection.':
      return 'HPD received more than one complaint about lack of heat/hot water; this is the initial complaint. Complaint is still open. HPD may contact you to verify the condition or conduct an inspection.'
    case 'The Department of Housing Preservation and Development conducted an inspection for the following conditions and identified potential lead-based paint conditions. HPD will attempt to contact you to schedule a follow-up inspection to test the paint for lead.':
      return 'HPD inspected conditions and identified potential lead-based paint. HPD will attempt to contact you for a follow-up inspection of lead-based paint.'
    case 'The Department of Housing Preservation and Development inspected the following conditions. No violations were issued. The complaint has been closed.':
      return 'HPD inspected conditions and did not issue a violation. Complaint has been closed.'
    case 'The Department of Housing Preservation and Development was not able to gain access to inspect the conditions. If the conditions still exist and an inspection is required, please contact the borough office with your complaint number at':
      return 'HPD was unable to gain access. If conditions still exist, contact borough office.'
    case 'More than one complaint was received for this building-wide condition.This complaint status is for the initial complaint. The Department of Housing Preservation and Development responded to a complaint of no heat or hot water. Heat was not required at the time of the inspection. No violations were issued. If the condition still exists, please file a new complaint.':
      return 'HPD received more than one complaint; this is the initial complaint. HPD responded to a complaint of no heat/hot water, but heat was not required at the time of inspection. No violations were issued.'
    case 'The Department of Housing Preservation and Development inspected the following conditions. Violations were issued. Information about specific violations is available at www.nyc.gov/hpd.':
      return 'HPD inspected conditions and issued violations.'
    case 'More than one complaint was received for this building-wide condition.This complaint status is for the initial complaint. The Department of Housing Preservation and Development contacted an occupant of the apartment and verified that the following conditions were corrected. The complaint has been closed. If the condition still exists, please file a new complaint.':
      return 'HPD received more than one complaint; this is the initial complaint. HPD contacted a tenant and verified conditions were corrected. Complaint has been closed.'
    case 'More than one complaint was received for this building-wide condition.This complaint status is for the initial complaint. The Department of Housing Preservation and Development was not able to gain access to inspect the following conditions. The complaint has been closed. If the condition still exists, please file a new complaint.':
      return 'HPD received more than one complaint; this is the initial complaint. HPD was unable to gain access. Complaint has been closed.'
    case 'The Department of Housing Preservation and Development was not able to gain access to your apartment or others in the building to inspect for a lack of heat or hot water. The complaint has been closed. If the condition still exists, please file a new complaint.':
      return 'HPD was unable to gain access to inspect a lack of heat/hot water. Complaint has been closed.'
    case 'More than one complaint was received for this building-wide condition.This complaint status is for the initial complaint. The Department of Housing Preservation and Development inspected the following conditions. No violations were issued. The complaint has been closed.':
      return 'HPD received more than one complaint; this is the initial complaint. HPD inspected conditions and did not issue a violation. Complaint has been closed.'
    case 'The Department of Housing Preservation and Development inspected the following conditions. Violations were previously issued for these conditions. Information about specific violations is available at www.nyc.gov/hpd.':
      return 'HPD inspected conditions and violations had already been issued.'
    case 'More than one complaint was received for this building-wide condition.This complaint status is for the initial complaint. The Department of Housing Preservation and Development contacted a tenant in the building and verified that the following conditions were corrected. The complaint has been closed. If the condition still exists, please file a new complaint.':
      return 'HPD received more than one complaint; this is the initial complaint. HPD contacted a tenant and verified conditions were corrected. Complaint has been closed.'
    case 'The Department of Housing Preservation and Development was unable to access the rooms where the following conditions were reported. No violations were issued. The complaint has been closed.':
      return 'HPD was unable to access rooms. No violations were issued and complaint has been closed. '
    default:
      return cell
  }
}

export const acrisParties1Formatter = cell => {
  if (!cell.length) return ''
  try {
    return cell
      .filter(party => party.partytype === 1)
      .map(party => party.name)
      .filter(f => f)
      .join(', ')
  } catch (e) {
    return ''
  }
}

export const acrisParties2Formatter = cell => {
  if (!cell.length) return ''
  try {
    return cell
      .filter(party => party.partytype === 2)
      .map(party => party.name)
      .filter(f => f)
      .join(', ')
  } catch (e) {
    return ''
  }
}

export const lispendenCommentFormatter = cell => {
  if (!cell.length) return cell
  return [...new Set(cell.map(comment => comment.datecomments.split('-')[1]).filter(f => f))].join(' || ')
}

export const capitalizeFormatter = cell => {
  if (!cell) return cell
  return capitalizeWords(cell)
}

export const dobViolationStatusFormatter = cell => {
  if (!cell) return cell
  return capitalizeWords(
    cell
      .toUpperCase()
      .replace('V-DOB VIOLATION - ', '')
      .replace('V*-DOB VIOLATION - ', '')
      .trim()
  )
}

export const ecbViolationStatusFormatter = cell => {
  cell = cell.toLowerCase().replace('resolve', 'resolved')
  return capitalizeFormatter(cell)
}

export const dobViolationTypeFormatter = cell => {
  if (!cell) return cell

  const split = cell.split(/-(.+)/)
  if (split.length > 1) {
    return preserveUppercaseTerms(capitalizeString(split[1]))
  } else {
    return preserveUppercaseTerms(capitalizeString(cell))
  }
}

export const lispendenCleanupFormatter = cell => {
  if (!cell) return cell
  return cell.replace('00000', '')
}

export const hpdStatusFormatter = cell => {
  if (!cell) return ''
  if (cell.toLowerCase().includes('close')) return 'Closed'
  if (cell.toLowerCase().includes('open')) return 'Open'
}

export const dateFormatter = cell => {
  try {
    const date = dayjs(cell)
    return date.isValid() ? date.format('MM/DD/YYYY') : ''
  } catch (e) {
    return ''
  }
}

export const sentencesFormatter = cell => {
  return capitalizeSentences(cell)
}

export const dollarFormatter = cell => {
  if (!cell && cell != 0) return ''
  if (typeof cell == 'string') {
    cell = cell.replace(/(\$|,)/, '')
  }
  return parseInt(cell).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  })
}

export const annotatedColumnFormatter = cell => {
  try {
    return cell ? cell : 0
  } catch (e) {
    return cell
  }
}

export const linkFormatter = (cell, row, index, constant) => {
  const linkProps = getLinkProps(constant)({ linkId: row[getLinkId(constant)], bin: row.bin, type: row.type })

  return <BaseLink href={linkProps.href}>{linkProps.linkText}</BaseLink>
}

export const linkWithDocumentFormatter = (cell, row, index, constant) => {
  const linkProps = getLinkProps(constant)({ linkId: row[getLinkId(constant)], bin: row.bin, type: row.type })
  const scannedProps = getLinkProps(`${constant}_SCANNED`)({
    linkId: row[getLinkId(constant)],
    bin: row.bin,
    type: row.type,
  })

  return (
    <span>
      <BaseLink href={linkProps.href}>{linkProps.linkText}</BaseLink>{' '}
      <BaseLink href={scannedProps.href}>
        <img src={lookupIcon} alt="document icon" />
      </BaseLink>
    </span>
  )
}

export const expandTableFormatter = cell => {
  return (
    <div>
      <span>({cell ? cell.length : ''}) </span>
      <span>
        <Button size="sm">Expand</Button>
      </span>
    </div>
  )
}

export const nestedDataLengthFormatter = cell => {
  return cell.length
}
export const bldgClassFormater = cell => {
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

export const dobComplaintCategoryPriorityFormatter = cell => {
  switch (cell) {
    case '01':
      return 'A'
    case '03':
      return 'A'
    case '04':
      return 'B'
    case '05':
      return 'B'
    case '06':
      return 'B'
    case '09':
      return 'B'
    case '10':
      return 'A'
    case '12':
      return 'A'
    case '13':
      return 'A'
    case '14':
      return 'A'
    case '15':
      return 'B'
    case '16':
      return 'A'
    case '18':
      return 'A'
    case '20':
      return 'A'
    case '21':
      return 'B'
    case '23':
      return 'B'
    case '29':
      return 'C'
    case '30':
      return 'A'
    case '31':
      return 'C'
    case '35':
      return 'D'
    case '37':
      return 'A'
    case '45':
      return 'B'
    case '49':
      return 'C'
    case '50':
      return 'A'
    case '52':
      return 'B'
    case '53':
      return 'D'
    case '54':
      return 'B'
    case '55':
      return 'D'
    case '56':
      return 'A'
    case '58':
      return 'B'
    case '59':
      return 'B'
    case '62':
      return 'A'
    case '63':
      return 'B'
    case '65':
      return 'A'
    case '66':
      return 'B'
    case '67':
      return 'A'
    case '71':
      return 'B'
    case '73':
      return 'C'
    case '74':
      return 'C'
    case '75':
      return 'B'
    case '76':
      return 'A'
    case '77':
      return 'C'
    case '78':
      return 'B'
    case '79':
      return 'C'
    case '80':
      return 'D'
    case '81':
      return 'A'
    case '82':
      return 'A'
    case '83':
      return 'B'
    case '85':
      return 'C'
    case '86':
      return 'A'
    case '88':
      return 'B'
    case '89':
      return 'A'
    case '90':
      return 'C'
    case '91':
      return 'A'
    case '92':
      return 'B'
    case '93':
      return 'B'
    case '94':
      return 'C'
    case '1A':
      return 'B'
    case '1B':
      return 'B'
    case '1D':
      return 'B'
    case '1E':
      return 'A'
    case '1G':
      return 'B'
    case '1K':
      return 'D'
    case '1Z':
      return 'D'
    case '2A':
      return 'B'
    case '2B':
      return 'A'
    case '2C':
      return 'B'
    case '2D':
      return 'B'
    case '2E':
      return 'A'
    case '2F':
      return 'D'
    case '2G':
      return 'C'
    case '2H':
      return 'D'
    case '2J':
      return 'D'
    case '2K':
      return 'D'
    case '2L':
      return 'D'
    case '2M':
      return 'D'
    case '3A':
      return 'B'
    case '4A':
      return 'B'
    case '4B':
      return 'B'
    case '4C':
      return 'D'
    case '4D':
      return 'D'
    case '4F':
      return 'D'
    case '4G':
      return 'B'
    case '4J':
      return 'D'
    case '4K':
      return 'D'
    case '4L':
      return 'D'
    case '4M':
      return 'D'
    case '4N':
      return 'D'
    case '4P':
      return 'D'
    case '4W':
      return 'C'
    case '5A':
      return 'B'
    case '5B':
      return 'A'
    case '5C':
      return 'A'
    case '5E':
      return 'A'
    case '5F':
      return 'B'
    case '5G':
      return 'B'
    case '6A':
      return 'C'
  }
}

// OLD - https://www1.nyc.gov/assets/buildings/pdf/complaint_category.pdf
// NEW -  https://data.cityofnewyork.us/api/views/eabe-havv/files/e19c463a-69dd-4810-ae72-3c7c7fc657f8?download=true&filename=DD_DOB_Complaints_Received_2019-08-21.xlsx
export const dobComplaintCategoryDescriptionFormatter = cell => {
  switch (cell) {
    case '01':
      return 'Accident – Construction/Plumbing '
    case '02':
      return 'Accident – To Public '
    case '03':
      return 'Adjacent Buildings - Not Protected '
    case '04':
      return 'After Hours Work – Illegal '
    case '05':
      return 'Permit – None (Building/PA/Demo etc.) '
    case '06':
      return 'Construction – Change Grade/Change Watercourse '
    case '07':
      return 'Construction - Change Watercourse '
    case '08':
      return "Contractor's Sign - None "
    case '09':
      return 'Debris – Excessive '
    case '10':
      return 'Debris/Building -Falling or In Danger of Falling '
    case '11':
      return 'Demolition - No Permit '
    case '12':
      return 'Demolition-Unsafe/Illegal/Mechanical Demo '
    case '13':
      return 'Elevator In (FDNY) Readiness-None '
    case '14':
      return 'Excavation - Undermining Adjacent Building '
    case '15':
      return 'Fence - None/Inadequate/Illegal '
    case '16':
      return 'Inadequate Support/Shoring '
    case '17':
      return 'Material/Personnel Hoist - No Permit '
    case '18':
      return 'Material Storage – Unsafe '
    case '19':
      return 'Mechanical Demolition - Illegal '
    case '20':
      return 'Landmark Building – Illegal Work '
    case '21':
      return 'Safety Net/Guardrail-Damaged/Inadequate/None (over 6 Story/75 ft.) '
    case '22':
      return 'Safety Netting - None '
    case '23':
      return 'Sidewalk Shed/Supported Scaffold/Inadequate/Defective/None/No Permit/No Cert '
    case '24':
      return 'Sidewalk Shed - None '
    case '25':
      return 'Warning Signs/Lights - None '
    case '26':
      return 'Watchman - None '
    case '27':
      return 'Auto Repair - Illegal '
    case '28':
      return 'Building - In Danger Of Collapse '
    case '29':
      return 'Building – Vacant, Open and Unguarded '
    case '30':
      return 'Building Shaking/Vibrating/Structural Stability Affected '
    case '31':
      return 'Certificate of Occupancy – None/Illegal/Contrary to Co '
    case '32':
      return 'C Of O - Not Being Complied With '
    case '33':
      return 'Commercial Use - Illegal '
    case '34':
      return 'Compactor Room/Refuse Chute - Illegal '
    case '35':
      return 'Curb Cut/Driveway/Carport – Illegal '
    case '36':
      return 'Driveway/Carport - Illegal '
    case '37':
      return 'Egress – Locked/Blocked/Improper/No Secondary Means '
    case '38':
      return 'Egress - Exit Door Not Proper '
    case '39':
      return 'Egress - No Secondary Means '
    case '40':
      return 'Falling - Part Of Building '
    case '41':
      return 'falling - Part Of Building In Danger Of '
    case '42':
      return 'Fence - Illegal '
    case '43':
      return 'Structural Stability Affected '
    case '44':
      return 'Fireplace/Wood Stove - Illegal '
    case '45':
      return 'Illegal Conversion '
    case '46':
      return 'PA Permit - None '
    case '47':
      return 'PA Permit - Not Being Complied With '
    case '48':
      return 'Residential Use - Illegal '
    case '49':
      return 'Storefront or Business Sign/Awning/Marquee/Canopy – Illegal '
    case '50':
      return 'Sign Falling - Danger/Sign Erection or Display In Progress – Illegal '
    case '51':
      return 'Illegal Social Club '
    case '52':
      return 'Sprinkler System – Inadequate '
    case '53':
      return 'Vent/Exhaust – Illegal/Improper '
    case '54':
      return 'Wall/Retaining Wall – Bulging/Cracked '
    case '55':
      return 'Zoning – Non-conforming '
    case '56':
      return 'Boiler – Fumes/Smoke/Carbon Monoxide '
    case '57':
      return 'Boiler - Illegal '
    case '58':
      return 'Boiler – Defective/Non-operative/No Permit '
    case '59':
      return 'Electrical Wiring – Defective/Exposed, In Progress '
    case '60':
      return 'Electrical Work - Improper '
    case '61':
      return 'Electrical Work - Unlicensed, In Progress '
    case '62':
      return 'Elevator-Danger Condition/Shaft Open/Unguarded '
    case '63':
      return 'Elevator-Danger Condition/Shaft Open/Unguarded '
    case '64':
      return 'Elevator Shaft - Open And Unguarded '
    case '65':
      return 'Gas Hook-Up/Piping – Illegal or Defective '
    case '66':
      return 'Plumbing Work – Illegal/No Permit(Also Sprinkler/Standpipe) '
    case '67':
      return 'Crane – No Permit/License/Cert/Unsafe/Illegal '
    case '68':
      return 'Crane/Scaffold - Unsafe/Illegal Operations '
    case '69':
      return 'Crane/Scaffold - Unsafe Installation/Equipment '
    case '70':
      return 'Suspension Scaffold Hanging - No Work In Progress '
    case '71':
      return 'SRO – Illegal Work/No Permit/Change In Occupancy Use '
    case '72':
      return 'SRO - Change in Occupancy/Use '
    case '73':
      return 'Failure to Maintain '
    case '74':
      return 'Illegal Commercial/Manufacturing Use In Residential Zone '
    case '75':
      return 'Adult Establishment '
    case '76':
      return 'Unlicensed/Illegal/Improper Plumbing Work In Progress '
    case '77':
      return 'Contrary To Ll58/87 (Handicap Access) '
    case '78':
      return 'Privately Owned Public Space/Non-Compliance '
    case '79':
      return 'Lights from Parking Lot Shining on Building '
    case '80':
      return 'Elevator Not Inspected/Illegal/No Permit '
    case '81':
      return 'Elevator – Accident '
    case '82':
      return 'Boiler – Accident/Explosion '
    case '83':
      return 'Construction – Contrary/Beyond Approved Plans/Permits '
    case '84':
      return 'Facade - Defective/Cracking '
    case '85':
      return 'Failure to Retain Water/Improper Drainage (LL103/89) '
    case '86':
      return 'Work Contrary to Stop Work Order '
    case '87':
      return 'Request For Deck Safety Inspection '
    case '88':
      return 'Safety Net/Guard Rail-Dam/Inadequate/None(6fl.75ft. or less) '
    case '89':
      return 'Accident – Cranes/Derricks/Suspension '
    case '90':
      return 'Unlicensed/Illegal Activity '
    case '91':
      return 'Site Conditions Endangering Workers '
    case '92':
      return 'Illegal Conversion of Manufacturing/Industrial Space '
    case '93':
      return 'Request for Retaining Wall Safety Inspection '
    case '94':
      return 'Plumbing-Defective/Leaking/Not Maintained '
    case '95':
      return 'Bronx 2nd Offense Pilot Project '
    case '96':
      return 'Unlicensed Boiler, Electrical, Plumbing, Or Sign Work Completed '
    case '97':
      return 'Other Agency Jurisdiction '
    case '98':
      return 'Refer to Operations for Determination '
    case '99':
      return 'Other '
    case '1A':
      return 'Illegal Conversion Commercial Building/Space to Dwelling Units '
    case '1B':
      return 'Illegal Tree Removal/Topo. Change In SNAD '
    case '1C':
      return 'Damange Assessment Request Or Report (Disaster) '
    case '1D':
      return 'Con Edison Referral '
    case '1E':
      return 'Suspended (Hanging) Scaffolds- No Permit/License/Dangerous/Accident '
    case '1F':
      return 'Failure to Comply With Annual Crane Inspection '
    case '1G':
      return 'Stalled Construction Site '
    case '1H':
      return 'Emergency Asbestos Response Inspection '
    case '1J':
      return 'Jewelry/Dentistry Torch: Gas Piping Removed W/O Permit '
    case '1K':
      return 'Bowstring Truss Tracking Complaint '
    case '1L':
      return 'Gas Utility Referral '
    case '1U':
      return 'Special Operations Compliance Inspection '
    case '1V':
      return 'Electrical Enforcement Work Order (DOB) '
    case '1W':
      return 'Plumbing Enforcement Work Order (DOB) '
    case '1X':
      return 'Construction enforcement Work Order (DOB) '
    case '1Y':
      return 'Enforcement Work Order (DOB) '
    case '1Z':
      return 'Enforcement Work Order (DOB) '
    case '2A':
      return 'Posted Notice or Order Removed/Tampered With '
    case '2B':
      return 'Failure to Comply with Vacate Order '
    case '2C':
      return 'Smoking Ban – Smoking on Construction Site '
    case '2D':
      return 'Smoking Signs – ‘No Smoking Signs’ Not Observed on Construction Site '
    case '2E':
      return 'Demolition Notification Received '
    case '2F':
      return 'Building Under Structural Monitoring '
    case '2G':
      return 'Advertising Sign/Billboard/Posters/Flexible Fabric – Illegal '
    case '2H':
      return 'Second Avenue Subway Construction '
    case '2J':
      return 'Sandy: Building Destroyed '
    case '2K':
      return 'Structurally Compromised Building (LL33/08) '
    case '2L':
      return 'Façade (LL11/98) – Unsafe Notification '
    case '2M':
      return 'Monopole Tracking Complaint '
    case '3A':
      return 'Unlicensed/Illegal/Improper Electrical Work In Progress '
    case '3B':
      return 'Routine Inspection '
    case '3C':
      return 'Plan Compliance Inspection '
    case '3D':
      return 'Bicycle Access Waiver Request - Elevator Safety '
    case '3E':
      return 'Bicycle Access Waiver Request - Alternate Parking '
    case '3G':
      return 'Restroom Non-Compliance With Local Law 79/16 '
    case '3H':
      return 'DCP/BSA Compliance Inspection '
    case '4A':
      return 'Illegal Hotel Rooms In Residential Buildings '
    case '4B':
      return 'SEP – Professional Certification Compliance Audit '
    case '4C':
      return 'Excavation Tracking Complaint '
    case '4D':
      return 'Interior Demo Tracking Complaint '
    case '4E':
      return 'Stalled sites Tracking Complaint '
    case '4F':
      return 'SST Tracking Complaint '
    case '4G':
      return 'Illegal Conversion No Access Follow-Up '
    case '4H':
      return 'V.E.S.T. Program (DOB & NYPD) '
    case '4J':
      return 'M.A.R.C.H. Program (Interagency) '
    case '4K':
      return 'CSC – DM Tracking Complaint '
    case '4L':
      return 'CSC – High-Rise Tracking Complaint '
    case '4M':
      return 'CSC – Low-Rise Tracking Complaint '
    case '4N':
      return 'Retaining Wall Tracking Complaint '
    case '4P':
      return 'Legal/Padlock Tracking Complaint '
    case '4S':
      return 'Sustainability Enforcement Work Order '
    case '4W':
      return 'Woodside Settlement Project '
    case '5A':
      return 'Request for Joint FDNY/DOB Inspection '
    case '5B':
      return 'Non-Compliance with Lightweight Materials '
    case '5C':
      return 'Structural Stability Impacted – New Building Under Construction '
    case '5E':
      return 'Amusement Ride Accident/Incident '
    case '5F':
      return 'Compliance Inspection '
    case '5G':
      return 'Unlicensed/Illegal/Improper Work In Progress '
    case '6A':
      return 'Vesting Inspection '
    case '6B':
      return 'Semi-Annual Homeless Shelter Inspection: Plumbing '
    case '6C':
      return 'Semi-Annual Homeless Shelter Inspection: Construction '
    case '6D':
      return 'Semi-Annual Homeless Shelter Inspection: Electrical '
    case '6M':
      return 'Elevator - Multiple Devices On Property '
    case '6S':
      return 'Elevator - Single Device On Property/No Alternate Service '
    case '7F':
      return 'CSE - Tracking Compliance '
    case '7G':
      return 'CSE - Sweep '
    case '8A':
      return 'Construction Safety Compliance Action '
  }
}

export const acrisDocTypeFormatter = cell => {
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

export const dobPermitSourceFormatter = cell => {
  switch (cell) {
    case 'dobpermitissuedlegacy':
      return 'DOB BIS'
    case 'dobpermitissuednow':
      return 'DOB NOW'
    case 'doblegacyfiledpermit':
      return 'DOB BIS'
    case 'dobnowfiledpermit':
      return 'DOB NOW'
  }
}

export const dobPermitJobTypeFormatter = cell => {
  switch (cell) {
    case 'NB':
      return 'Construction of new structures'
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

export const dobPermitWorkTypeFormatter = cell => {
  switch (cell) {
    case 'BL':
      return 'Boiler'
    case 'CC':
      return 'Curb Cut'
    case 'EQ':
      return 'Construction Equipment'
    case 'FA':
      return 'Fire Alarm'
    case 'FB':
      return 'Fuel Burning'
    case 'FP':
      return 'Fire Suppression'
    case 'FS':
      return 'Fuel Storage'
    case 'MH':
      return 'Mechanical/HVAC'
    case 'NB':
      return 'New Building'
    case 'OT':
      return 'Other'
    case 'PL':
      return 'Plumbing'
    case 'SD':
      return 'Standpipe'
    case 'SP':
      return 'Sprinkler'
    default:
      return cell
  }
}

export const dobPermitTypeFormatter = cell => {
  switch (cell) {
    case 'AL':
      return 'Alteration'
    case 'DM':
      return 'Demolition'
    case 'EQ':
      return 'Construction Equipment'
    case 'EW':
      return 'Equipment Work'
    case 'FO':
      return 'Foundation'
    case 'NB':
      return 'New Building'
    case 'PL':
      return 'Plumbing'
    case 'SG':
      return 'Sign'
    default:
      return cell
  }
}

export const dobPermitSubtypeFormatter = cell => {
  switch (cell) {
    case 'BL':
      return 'Boiler'
    case 'CH':
      return 'Chute'
    case 'EA':
      return 'Earthwork'
    case 'FA':
      return 'Fire Alarm'
    case 'FB':
      return 'Fuel Burning'
    case 'FN':
      return 'Fence'
    case 'FP':
      return 'Fire Suppression'
    case 'FS':
      return 'Fuel Storage'
    case 'MH':
      return 'Mechanical/HVAC'
    case 'OT':
      return 'Other'
    case 'SC':
      return 'Scaffold'
    case 'SD':
      return 'Standpipe'
    case 'SF':
      return 'Scaffold'
    case 'SH':
      return 'Sidewalk Shed'
    case 'SP':
      return 'Sprinkler'
    default:
      return cell
  }
}

export const ocaHousingCourtClassificationFormatter = cell => {
  switch(cell) {
    case 'HP':
      return 'HP';
    case'Non-Payment':
      return 'Non Payment';
    case'Holdover':
      return 'Holdover';
    case'Illegal-Lockout':
      return 'Illegal Lockout';
    case'Harassment':
      return 'Harassment';
    case'Illegal-Activity':
      return 'Illegal Activity';
    case'Article-7A':
      return 'Article 7A';
    case'HP-with-harassment':
      return 'HP with harassment';
    case'Breach-of-Warrant-of-Habitability':
      return 'Breach of Warrant of Habitability';
    default:
      return cell;
  }
}

export const ocaHousingCourtStatusFormatter = cell => {
  switch(cell) {
    case 'Disposed':
      return 'Disposed';
    case 'Post-Disposition':
      return 'Post Disposition'; 
    case 'Active':
      return 'Active';
    case 'Active---Pending-Further-Review':
      return 'Active - Pending Further Review';
    case 'Active---Restored':
      return 'Active - Restored';
    case 'Active---Appeal-Pending':
      return 'Active - Appeal Pending';
    case 'Post-Disposition---Appeal-Pending':
      return 'Post Disposition - Appeal Pending';
  }
}