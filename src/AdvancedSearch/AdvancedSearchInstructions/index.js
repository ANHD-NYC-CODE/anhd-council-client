import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'
const AdvancedSearchInstructions = props => {
  return (
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
          <Button size="lg" role="header" variant="success">
            And
          </Button>
        </span>
        <p>Returns properties where every filter contained within is true.</p>
        <span className="d-flex align-items-center">
          <h5>OR&nbsp;</h5>
          <Button size="lg" role="header" variant="success">
            Or
          </Button>
        </span>
        <p>Returns properties where any of the filters contained within are true.</p>
        <h5>New Conditions</h5>
        <p>
          Only the opposite condition type can be added. This is because, for example, the filters inside a parent "AND"
          condition and a child "AND" condition can be expressed the same if all of the filters were within the parent
          condition.
        </p>
        <h5>Groupings</h5>
        <p>
          All of the filters within a logical condition are considered to be a group. This is to avoid ambiguous
          queries, such as when searching for properties with X, Y, OR Z, the groupings specify whether you mean to
          query for properties with (X AND Y) OR Z, or properties with X AND (Y OR Z).{' '}
        </p>
        <h5>Multiple Conditions</h5>
        <p>
          Only the first condition can contain more than 1 condition inside of it. This is designed to reduce the
          complexity of queries and improve the chances of a successful result.{' '}
        </p>
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
}

AdvancedSearchInstructions.propTypes = {}

export default AdvancedSearchInstructions
