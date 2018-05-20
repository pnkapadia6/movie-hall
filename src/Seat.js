import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const Seat = props => (
  <div className={classnames('hall-seat-container', {
    'hall-seat-container--has-break': props.hasBreak
  })}>
    <div
      className={classnames('hall-seat', {
        'hall-seat--disabled': props.disabled,
        'hall-seat--selected': props.isSelected,
        'hall-seat--occupied': props.isOccupied
      })}
      onClick={props.isOccupied ? undefined : props.onSelect}
    />
  </div>
);

Seat.propTypes = {
  id: PropTypes.string.isRequired,
  isSelected: PropTypes.bool,
  isOccupied: PropTypes.bool,
  hasBreak: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default Seat;
