import React from 'react';
import _find from 'lodash/find';

import './UserDetails.css';

const DETAIL_FIELDS = [{
  id: 'name',
  label: 'Name',
  inputProps: {
    type: 'text'
  }
}, {
  id: 'seatCount',
  label: 'Number of Seats',
  inputProps: {
    type: 'number',
    min: 1,
    max: 10
  }
}];

class UserDetails extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name,
      seatCount: props.seatCount,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      name: nextProps.name,
      seatCount: nextProps.seatCount,
    });
  }

  onChange = e => {
    const { value, dataset } = e.target;
    const isDetailNumber = _find(DETAIL_FIELDS, { id: dataset.id }).inputProps.type === 'number';
    const detailValue = isDetailNumber ? parseInt(value, 10) : value;

    this.setState({
      [dataset.id]: detailValue
    });
    this.props.onChange(dataset.id, detailValue);
  }

  renderDetail = detail => (
    <div key={detail.id} className="user-detail">
      <span className="user-detail-label">{detail.label}</span>
      <input
        className="user-detail-value"
        value={this.state[detail.id]}
        {...detail.inputProps}
        data-id={detail.id}
        onChange={this.onChange}
      />
    </div>
  )

  render() {
    return (
      <div className="user-details">
        {DETAIL_FIELDS.map(this.renderDetail)}
      </div>
    )
  }
}

export default UserDetails;
