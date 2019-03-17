import React from 'react'
import PropTypes from 'prop-types'
import BootstrapTable from 'react-bootstrap-table-next'
import filterFactory from 'react-bootstrap-table2-filter'
import TableAlert from 'shared/components/BaseTable/TableAlert'

import BaseTable from 'shared/components/BaseTable'
import { getTableColumns, getKeyField } from 'shared/models/tables'
import { Card } from 'react-bootstrap'

class NestedTable extends BaseTable {
  constructor(props) {
    super(props)
  }

  render() {
    const state = this.state
    return (
      <Card bg="light" border="secondary" className="nested-table">
        <BootstrapTable
          keyField={`${this.props.tableConfig.keyField}`}
          rowClasses={this.props.tableConfig.tableRowClasses}
          expandRow={this.expandRow()}
          bootstrap4
          columns={this.state.columns}
          data={this.props.records}
          condensed
          filter={filterFactory()}
          bordered={false}
          tabIndexCell
          noDataIndication={
            <TableAlert
              textType="text-dark"
              variant="warning"
              message={"There's nothing here."}
              buttonText="Clear Filters"
              buttonVariant="secondary"
              action={() => Object.keys(this.filters).forEach(key => this.filters[key](''))}
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
