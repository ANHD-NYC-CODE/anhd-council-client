import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'
const AdvancedSearchInstructions = props => {
  return (
    <div className="advanced-search__instructions">
      <h2>Search Guide</h2>
      <p>Custom search lets you explore properties that meet the conditions you specify.</p>
      <p>
        Once you choose a district, custom search allows you apply advanced logic to filter for the properties you want.
      </p>
      <h4>Logical Conditions</h4>
      <Button size="lg" role="header" variant="success">
        And
      </Button>
      <p>Returns properties where every filter contained within is true.</p>
      <Button size="lg" role="header" variant="success">
        Or
      </Button>
      <p>Returns properties where any of the filters contained within are true.</p>
      <h5>Groupings</h5>
      <p>
        All of the filters within a logical condition are considered to be a group. This is to avoid ambiguous queries,
        such as when searching for properties with X, Y, OR Z, the groupings specify whether you mean to query for
        properties with (X AND Y) OR Z, or properties with X AND (Y OR Z).{' '}
      </p>
      <h5>Multiple Conditions</h5>
      <p>
        Only the first condition can contain more than 1 condition inside of it. This is designed to reduce the
        complexity of queries and improve the chances of a successful result.{' '}
      </p>
      <h4>Tips & Caveats</h4>
      <p>
        The data contained within is comprised of tens of millions of records. The more complicated a query gets, the
        longer this tool will take to return a result. If the query exceeds 4 minutes, the result will timeout and
        return an error. However, attemping the same query a 2nd time may result in a success due to database caching.
      </p>
    </div>
  )
}

AdvancedSearchInstructions.propTypes = {}

export default AdvancedSearchInstructions
