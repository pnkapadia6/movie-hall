import React from 'react';
import './booking.css';

class Booking extends React.PureComponent {
  renderHeader = () => (
    <div className="booking-header booking-row">
      <div className="booking-field">Name</div>
      <div className="booking-field">No. of seats</div>
      <div className="booking-field">Seats</div>
    </div>
  )

  renderBookingRow = (booking, index) => (
    <div className="booking-row" key={index}>
      <div className="booking-field">{booking.name}</div>
      <div className="booking-field">{booking.seats.length}</div>
      <div className="booking-field">{booking.seats.join(', ')}</div>
    </div>
  )

  render() {
    return (
      <div className="booking-container">
        {this.renderHeader()}
        {this.props.booking.map(this.renderBookingRow)}
      </div>
    )
  }
}

export default Booking;
