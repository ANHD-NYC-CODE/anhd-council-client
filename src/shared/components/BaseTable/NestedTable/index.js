import React from 'react'
import PropTypes from 'prop-types'
import BootstrapTable from 'react-bootstrap-table-next'
import filterFactory from 'react-bootstrap-table2-filter'

import BaseTable from 'shared/components/BaseTable'
import { getTableColumns, getKeyField } from 'shared/models/tables'
import { Card } from 'react-bootstrap'

class NestedTable extends BaseTable {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Card bg="light" border="secondary" className="nested-table">
        <BootstrapTable
          keyField={getKeyField(this.props.nestedModelKey)}
          bootstrap4
          columns={getTableColumns(this.props.nestedModelKey, this.setExpandedContent)}
          data={this.props.data}
          condensed
          filter={filterFactory()}
          bordered={false}
          expandRow={this.expandRow()}
          tabIndexCell
          rowClasses={'table-row--collapsed'}
        />
      </Card>
    )
  }
}

NestedTable.propTypes = {
  jsonData: PropTypes.object,
}

export default NestedTable
