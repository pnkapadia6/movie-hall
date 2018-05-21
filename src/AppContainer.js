import React, { Component } from 'react';
import _reduce from 'lodash/reduce';
import _values from 'lodash/values';

import { getBookings, saveBookings } from './localStorage';

import UserDetails from './components/UserDetails';
import SeatMap from './components/SeatMap';
import Booking from './components/Booking';

import {
  SEAT_ROWS_COUNT,
  SEAT_PER_ROW_COUNT,
  OCCUPIED_SEAT,
  SELECTED_SEAT
} from './constants/seatMap';

import './App.css';

const getInitialState = () => {
  const booking = getBookings();  // from local storage

  return {
    user: {
      name: '',
      seatCount: 1
    },
    booking,
    seatMap: _reduce(booking, (seatMap, booking) => {
      booking.seats.forEach(seatId => {
        seatMap[seatId] = OCCUPIED_SEAT;
      });
      return seatMap;
    }, {}),
    canSelectSeats: false,
    showBooking: false,
  };
};

class AppContainer extends Component {
  constructor() {
    super();
    this.state = getInitialState();
  }

  hasUserDetails = () => {
    const { user } = this.state;
    return user.name && user.seatCount;
  }

  hasValidSeatBooking = () => {
    const selectedSeatsCount = this.getSelectedSeats().length;
    return selectedSeatsCount === this.state.user.seatCount;
  }

  getAvailableSeatsCount = () => {
    const totalSeats = SEAT_ROWS_COUNT * SEAT_PER_ROW_COUNT,
      seatsTaken = _values(this.state.seatMap).length;
    return totalSeats - seatsTaken;
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

  onSubmitUser = () => {
    const { seatCount } = this.state.user;
    if (seatCount < 1 || seatCount > this.getAvailableSeatsCount()) {
      return alert(`Sorry! We don't have ${seatCount} seats available`);
    }
    this.setState({ canSelectSeats: true });
  }

  onClickSeat = id => {
    const { seatMap } = this.state;
    this.setState({
      seatMap: {
        ...seatMap,
        [id]: seatMap[id] === SELECTED_SEAT ? false : SELECTED_SEAT
      }
    });
  }

  onSubmitBooking = () => {
    const updatedBookings = [...this.state.booking, {
      name: this.state.user.name,
      seats: this.getSelectedSeats(),
    }];

    this.setState({
      showBooking: true,
      booking: updatedBookings
    });
    saveBookings(updatedBookings);  // saving in local storage
  }

  onReset = () => {
    this.setState(getInitialState());
  }

  renderHeader = () => (
    <header className="App-header">
      <h1 className="App-title">Movie Seat Reservation</h1>
    </header>
  );

  renderSeatMap = () => {
    const { state } = this;
    return state.canSelectSeats && [
        <SeatMap key="seat-map" seatMap={state.seatMap} onClickSeat={this.onClickSeat} />,
        <button key="save-button" className="App-button" disabled={!this.hasValidSeatBooking() || state.showBooking} onClick={this.onSubmitBooking}>Confirm Selection</button>
      ];
  }

  renderBookedSection = () => {
    return this.state.showBooking && <Booking booking={this.state.booking} />;
  }

  render() {
    const { state } = this;
    const hasUserDetails = this.hasUserDetails();

    return (
      <div className="App">
        {this.renderHeader()}
        <UserDetails {...state.user} onChange={this.onChangeUserDetail} />
        <button className="App-button" disabled={!hasUserDetails || state.showBooking} onClick={this.onSubmitUser}>Start Selecting</button>
        {this.renderSeatMap()}
        {this.renderBookedSection()}
        {state.showBooking && <button className="App-button" onClick={this.onReset}>Book new</button>}
      </div>
    );
  }
}

export default AppContainer;
