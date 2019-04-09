export const createPropertyRequestMock = ({
  bbl = '1',
  council = 1,
  cd = 101,
  buildings = [],
  conhrecords = [],
  rentstabilizationrecord = undefined,
  taxliens = [],
  nycha = [],
  subsidyrecords = [],
  subsidyj51records = [],
  subsidy421arecords = [],
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
  numfloors = '1.00',
  numbldgs = 1,
  bldgclass = 'V0',
  ownertype = null,
  ownername = 'test owner',
  lat = '40.0',
  lng = '-73.0',
} = {}) => {
  return {
    bbl: bbl,
    council: council,
    cd: cd,
    buildings: buildings,
    conhrecords,
    rentstabilizationrecord: rentstabilizationrecord,
    taxliens: taxliens,
    nycha: nycha,
    subsidyrecords: subsidyrecords,
    subsidyj51records: subsidyj51records,
    subsidy421arecords: subsidy421arecords,
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
    numfloors: numfloors,
    numbldgs: numbldgs,
    ownername: ownername,
    bldgclass: bldgclass,
    ownertype: ownertype,
    lat: lat,
    lng: lng,
  }
}
