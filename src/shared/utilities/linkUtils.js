export const constructDOBLink = (bbl, bin = undefined) => {
  const baseLink = 'http://a810-bisweb.nyc.gov/bisweb/PropertyProfileOverviewServlet'
  if (bin) {
    return `${baseLink}?bin=${bin}&requestid=1`
  } else {
    return `${baseLink}?boro=${bbl.charAt(0)}&block=${bbl.slice(1, 6)}&lot=${bbl.slice(6, 10)}`
  }
}
