import React from 'react';
import PropTypes from 'prop-types';

const SortCaret = ({ direction, isSortedColumn }) => {
  if (!isSortedColumn) return null;

  switch (direction) {
    case 'NONE':
      return null;
    case 'ASC':
      return <i className="fa fa-caret-up" aria-hidden="true"></i>;
    case 'DESC':
      return <i className="fa fa-caret-down" aria-hidden="true"></i>;
    default:
      return null;
  }
};

SortCaret.propTypes = {
  direction: PropTypes.string.isRequired,
  isSortedColumn: PropTypes.bool.isRequired
};

export default SortCaret;
