import React from 'react'
import PropTypes from 'prop-types'
import { Card, Button } from 'react-bootstrap'
import classnames from 'classnames'

import './style.scss'

class AmountResultFilterCard extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Card
        as={Button}
        bg={classnames({ primary: this.props.selected })}
        disabled={this.props.disabled}
        text={classnames({ light: this.props.selected, dark: !this.props.selected })}
        className={classnames(
          'amount-result-filter-card',
          'result-card',
          this.props.summaryBackgroundColorClass,
          'mb-2',
          {
            active: this.props.selected,
          }
        )}
        onClick={this.props.handleClick}
      >
        <div className="amount-result-filter-card__body">
          {/* {getLabel(this.props)} */}
          {this.props.amountFilter.resourceModel.label}
          {/* <div className="align-self-center summary-result-card__result">
            {this.props.loading ? (
              <SpinnerLoader />
            ) : (
              <h2 className={classnames('m-0', this.props.summaryTextColorClass)}>{this.props.results.length}</h2>
            )}
          </div> */}
        </div>
      </Card>
    )
  }
}

AmountResultFilterCard.propTypes = {
  amountField: PropTypes.object,
}

export default AmountResultFilterCard
