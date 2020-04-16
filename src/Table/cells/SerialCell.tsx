import React from 'react';
import TableCell, { TableCellProps } from '../TableCell';

type SerialCellProps = TableCellProps

function SerialCell(props: SerialCellProps) {
  return (
    <TableCell {...props}>{props.rowIndex! + 1}</TableCell>
  );
}

export default SerialCell;
