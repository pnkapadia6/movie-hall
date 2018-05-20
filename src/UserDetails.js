import React from 'react';
import _find from 'lodash/find';

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
  onChange = e => {
    const { value, dataset } = e.target;
    const isDetailNumber = _find(DETAIL_FIELDS, { id: dataset.id }).inputProps.type === 'number';
    this.props.onChange(dataset.id, isDetailNumber ? parseInt(value, 10) : value);
  }

  renderDetail = detail => (
    <div key={detail.id} className="user-detail">
      <span className="user-detail-label">{detail.label}</span>
      <input className="user-detail-value" {...detail.inputProps} data-id={detail.id} onChange={this.onChange}/>
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
