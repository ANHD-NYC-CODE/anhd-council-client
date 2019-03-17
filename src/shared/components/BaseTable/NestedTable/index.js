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
    const columns = getTableColumns(this.props.nestedModelKey, this.setExpandedContent, null, this.constructFilter)
    return (
      <Card bg="light" border="secondary" className="nested-table">
        <BootstrapTable
          keyField={getKeyField(this.props.nestedModelKey)}
          bootstrap4
          columns={columns}
          data={this.props.data}
          condensed
          filter={filterFactory()}
          bordered={false}
          expandRow={this.expandRow()}
          tabIndexCell
          rowClasses={'table-row--collapsed'}
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
  jsonData: PropTypes.object,
}

export default NestedTable
