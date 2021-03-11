import React from 'react'
import { Button } from 'react-bootstrap'

const AdvancedSearchInstructions = () => (
  <div className="advanced-search__instructions">
    <div className="py-2 mb-2">
      <h2>Search Guide</h2>
      <p>Custom search lets you explore properties that meet the conditions you specify.</p>
      <p>
        Once you choose a district, custom search allows you apply advanced logic to filter for the properties you
        want.
      </p>
    </div>
    <div className="py-2 mb-2">
      <h4 className="font-weight-bold">Logical Conditions</h4>
      <span className="d-flex align-items-center">
        <h5>AND&nbsp;</h5>
        <Button size="lg" variant="success">
          And
        </Button>
      </span>
      <p>Returns results where every single applied filter is true for each property.</p>
      <span className="d-flex align-items-center">
        <h5>OR&nbsp;</h5>
        <Button size="lg" variant="success">
          Or
        </Button>
      </span>
      <p>Returns results where any one of the applied filters are true for the property.</p>
    </div>

    <div className="py-2 mb-2">
      <h4 className="font-weight-bold">Tips & Caveats</h4>
      <p>
        The data this search tool is querying contains tens of millions of records. The more complicated a query gets,
        the longer this tool will take to return a result. If the query exceeds 4 minutes, the result will timeout and
        return an error. However, attemping the same query a 2nd time may result in a success due to database caching.
      </p>
    </div>
  </div>
)

AdvancedSearchInstructions.propTypes = {}

export default AdvancedSearchInstructions
