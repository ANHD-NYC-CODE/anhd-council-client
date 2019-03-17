import React from 'react'
import PropTypes from 'prop-types'
import BootstrapTable from 'react-bootstrap-table-next'
import filterFactory from 'react-bootstrap-table2-filter'
import TableAlert from 'shared/components/BaseTable/TableAlert'

import BaseTable from 'shared/components/BaseTable'
import { Card } from 'react-bootstrap'

class NestedTable extends BaseTable {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Card bg="light" border="secondary" className="nested-table">
        <BootstrapTable
          bootstrap4
          bordered={false}
          columns={this.state.columns}
          condensed
          data={this.props.records}
          defaultSorted={this.props.tableConfig.defaultSorted}
          expandRow={this.expandRow()}
          filter={filterFactory()}
          keyField={`${this.props.tableConfig.keyField}`}
          noDataIndication={
            <TableAlert
              textType="text-dark"
              variant="warning"
              message={"There's nothing here."}
              buttonText="Clear Filters"
              buttonVariant="secondary"
              action={
                this.props.records.length ? () => Object.keys(this.filters).forEach(key => this.filters[key]('')) : null
              }
              rowClasses={this.props.tableConfig.tableRowClasses}
              tabIndexCell
            />
          }
        />
      </Card>
    )
  }
}

NestedTable.propTypes = {
  records: PropTypes.array,
  tableConfig: PropTypes.object,
}

export default NestedTable
