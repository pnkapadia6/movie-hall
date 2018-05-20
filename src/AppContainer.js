import React, { Component } from 'react';
import _reduce from 'lodash/reduce';

import UserDetails from './UserDetails';
import SeatMap from './SeatMap';
import Booking from './Booking';

import { OCCUPIED_SEAT, SELECTED_SEAT } from './constants/seatMap';

import './App.css';

const BOOKING = [{
  name: 'Abc',
  seats: ['A5', 'A6']
}, {
  name: 'xyz',
  seats: ['H5', 'H4', 'H3']
}];

class AppContainer extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
      // from local storage
      booking: BOOKING,
      seatMap: _reduce(BOOKING, (seatMap, booking) => {
        booking.seats.forEach(seatId => {
          seatMap[seatId] = OCCUPIED_SEAT;
        });
        return seatMap;
      }, {}),
      canSelectSeats: false,
      showBooking: false,
    };
  }

  hasUserDetails = () => {
    return this.state.user.name && this.state.user.seatCount;
  }

  hasValidSeatBooking = () => {
    const selectedSeatsCount = this.getSelectedSeats().length;
    return selectedSeatsCount === this.state.user.seatCount;
  }

  getSelectedSeats = () => {
    return _reduce(this.state.seatMap, (selectedSeatsList, seat, seatId) => {
      seat === SELECTED_SEAT && selectedSeatsList.push(seatId);
      return selectedSeatsList;
    }, []);
  }

  onChangeUserDetail = (detail, value) => {
    this.setState({
      user: {
        ...this.state.user,
        [detail]: value,
      }
    });
  }

  onSubmitUser = () => this.setState({ canSelectSeats: true });

  onClickSeat = id => {
    const { seatMap } = this.state;
    this.setState({
      seatMap: {
        ...seatMap,
        [id]: seatMap[id] === SELECTED_SEAT ? false : SELECTED_SEAT
      }
    });
  }

  onSubmitBooking = () => this.setState({
    showBooking: true,
    booking: [...this.state.booking, {
      name: this.state.user.name,
      seats: this.getSelectedSeats(),
    }]
  });

  renderHeader = () => (
    <header className="App-header">
      <h1 className="App-title">Movie Seat Reservation</h1>
    </header>
  );

  renderSeatMap = () => {
    return this.state.canSelectSeats && [
        <SeatMap key="seat-map" seatMap={this.state.seatMap} onClickSeat={this.onClickSeat} />,
        <button key="save-button" className="save-seat-button" disabled={!this.hasValidSeatBooking()} onClick={this.onSubmitBooking}>Confirm Selection</button>
      ];
  }

  renderBookedSection = () => {
    return this.state.showBooking && <Booking booking={this.state.booking} />;
  }

  render() {
    const { state } = this;
    const hasUserDetails = this.hasUserDetails();

    console.log('---', state);

    return (
      <div className="App">
        {this.renderHeader()}
        <UserDetails {...state.user} onChange={this.onChangeUserDetail} />
        <button className="user-submit-button" disabled={!hasUserDetails} onClick={this.onSubmitUser}>Start Selecting</button>
        {this.renderSeatMap()}
        {this.renderBookedSection()}
      </div>
    );
  }
}

export default AppContainer;
