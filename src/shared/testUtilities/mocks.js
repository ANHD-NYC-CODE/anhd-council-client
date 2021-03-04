import dayjs from 'dayjs'

export const createHpdComplaintProblemMock = ({
  complaintid = '1',
  problemid = '1',
  spacetype = 'APT',
  majorcategory = 'HEAT',
  minorcategory = '',
  receiveddate = '2018-01-01',
  apartment = 'A',
  status = 'OPEN',
} = {}) => {
  return {
    complaintid,
    problemid,
    spacetype,
    majorcategory,
    minorcategory,
    receiveddate,
    apartment,
    status,
  }
}

export const createHPDContactMock = ({
  businessstreetname = '',
  businessapartment = '',
  businesscity = '',
  businessstate = '',
  businesszip = '',
  title = '',
  contactdescription = '',
  type = '',
  firstname = '',
  lastname = '',
} = {}) => {
  return {
    businessstreetname,
    businessapartment,
    businesscity,
    businessstate,
    businesszip,
    title,
    contactdescription,
    type,
    firstname,
    lastname,
  }
}

export const createHPDRegistrationMock = ({
  registrationid = '1',
  lastregistrationdate = dayjs().format('YYYY-MM-DD'),
  contacts = [],
} = {}) => {
  return {
    registrationid,
    lastregistrationdate,
    contacts,
  }
}

export const createPropertyRequestMock = (
  {
    bbl = '1',
    council = 1,
    cd = 101,
    buildings = [],
    conhrecord = false,
    rentstabilizationrecord = undefined,
    taxliens = false,
    nycha = false,
    subsidyprograms = '',
    subsidyj51 = false,
    subsidy421a = false,
    hpdregistrations = [],
    yearbuilt = 2000,
    unitstotal = 10,
    unitsres = 10,
    unitsrentstabilized = null,
    rsunits_percent_lost = null,
    address = '123 Fake Street',
    borough = 'BK',
    zipcode = '11111',
    zonedist1 = 'R5',
    zonedist2 = 'P1',
    spdist1 = 'A',
    spdist2 = 'B',
    overlay1 = '1',
    overlay2 = '2',
    builtfar = '10.0',
    residfar = '1.0',
    commfar = '2.0',
    facilfar = '3.0',
    numfloors = '1.00',
    numbldgs = 1,
    bldgclass = 'V0',
    ownertype = null,
    ownername = 'test owner',
    lat = '40.0',
    lng = '-73.0',
    original_address = '123 Fake St',
    aepstatus = 'False',
    managementprorgam = 'PVT'
  } = {},
  annotationArgs
) => {
  return {
    bbl: bbl,
    council: council,
    cd: cd,
    buildings: buildings,
    conhrecord,
    rentstabilizationrecord: rentstabilizationrecord,
    taxliens,
    nycha,
    subsidyprograms: subsidyprograms,
    subsidyj51: subsidyj51,
    subsidy421a: subsidy421a,
    hpdregistrations: hpdregistrations,
    yearbuilt: yearbuilt,
    unitstotal: unitstotal,
    unitsres: unitsres,
    unitsrentstabilized: unitsrentstabilized,
    rsunits_percent_lost: rsunits_percent_lost,
    address: address,
    borough: borough,
    zipcode: zipcode,
    zonedist1: zonedist1,
    zonedist2: zonedist2,
    spdist1: spdist1,
    spdist2: spdist2,
    overlay1: overlay1,
    overlay2: overlay2,
    builtfar: builtfar,
    residfar: residfar,
    commfar: commfar,
    facilfar: facilfar,
    numfloors: numfloors,
    numbldgs: numbldgs,
    ownername: ownername,
    bldgclass: bldgclass,
    ownertype: ownertype,
    lat: lat,
    lng: lng,
    original_address: original_address,
    aepstatus,
    managementprorgam,
    // 'hpdviolations_recent__01/01/2010-01/01/2019': 0,
    // 'dobviolations_recent__01/01/2010-01/01/2019': 0,
    // 'ecbviolations_recent__01/01/2010-01/01/2019': 0,
    // 'hpdcomplaints_recent__01/01/2010-01/01/2019': 0,
    // 'dobcomplaints_recent__01/01/2010-01/01/2019': 0,
    // 'acrisrealmasters_recent__01/01/2010-01/01/2019': 0,
    // 'evictions_recent__01/01/2010-01/01/2019': 0,
    // 'dobfiledpermits_recent__01/01/2010-01/01/2019': 0,
    ...annotationArgs,
  }
}
