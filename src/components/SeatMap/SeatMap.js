import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import _includes from 'lodash/includes';

import Seat from './Seat';
import {
  SEATS,
  SEAT_ROWS,
  OCCUPIED_SEAT,
  SELECTED_SEAT,
  ROW_BREAKS,
  SEAT_BREAKS
} from '../../constants/seatMap';

import './seatMap.css';

class SeatMap extends React.PureComponent {

  onClickSeat = id => () => this.props.onClickSeat(id);

  renderSeatLabel = (label, seatIndex) => <div className={classnames('hall-seat-label', {
    'hall-seat-label--has-break': _includes(SEAT_BREAKS, seatIndex)
  })} key={label}>{label}</div>;

  renderSeat = rowId => (seatId, seatIndex) => {
    const id = `${rowId}${seatId}`;
    return <Seat
      key={id}
      id={id}
      isOccupied={this.props.seatMap[id] === OCCUPIED_SEAT}
      isSelected={this.props.seatMap[id] === SELECTED_SEAT}
      hasBreak={_includes(SEAT_BREAKS, seatIndex)}
      onSelect={this.onClickSeat(id)}
    />
  }

  renderSeatRow = (rowId, rowIndex) => (
    <div className={classnames('hall-row', {
      'hall-row--has-break': _includes(ROW_BREAKS, rowIndex)
    })} key={rowId}>
      {this.renderSeatLabel(SEAT_ROWS[rowIndex])}
      {SEATS.map(this.renderSeat(rowId))}
    </div>
  )

  renderSeatsMap = () => (
    <div className="hall-map">
      <div className="hall-row">
        <div className="hall-seat-dummy"></div>
        {SEATS.map(this.renderSeatLabel)}
      </div>
      {SEAT_ROWS.map(this.renderSeatRow)}
    </div>
  )

  renderMapHelper = () => (
    <div className="map-helper">
      <div className="map-helper-section">
        <Seat isSelected disabled id="helper"/>
        <span className="map-helper-label">Selected Seat</span>
      </div>
      <div className="map-helper-section">
        <Seat isOccupied disabled id="helper"/>
        <span className="map-helper-label">Reserved Seat</span>
      </div>
      <div className="map-helper-section">
        <Seat disabled id="helper"/>
        <span className="map-helper-label">Empty Seat</span>
      </div>
    </div>
  )

  render() {
    return (
      <div className="seat-map-container">
        <div className="screen">Screen</div>
        <div className="seat-map-viewer">
          {this.renderSeatsMap()}
          {this.renderMapHelper()}
        </div>
      </div>
    )
  }
}

SeatMap.propTypes = {
  seatMap: PropTypes.object,
  selectedSeats: PropTypes.array,
  onClickSeat: PropTypes.func,
};

SeatMap.defaultProps = {
  seatMap: {},
};

export default SeatMap;
