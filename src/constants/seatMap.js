import _range from 'lodash/range';

export const SEAT_ROWS_COUNT = 10;
export const SEAT_PER_ROW_COUNT = 12;

export const SEATS = _range(1, SEAT_PER_ROW_COUNT + 1);
export const SEAT_ROWS = _range(SEAT_ROWS_COUNT).map(i => String.fromCharCode(i + 65));

export const OCCUPIED_SEAT = 'OCCUPIED';
export const SELECTED_SEAT = 'SELECTED';

export const ROW_BREAKS = [4];
export const SEAT_BREAKS = [4];
