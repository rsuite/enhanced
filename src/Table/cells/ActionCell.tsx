import React from 'react';
import TableCell, {TableCellProps} from '../TableCell';
import TableCellActions from '../TableCellActions';

export interface ActionCellProps<Row extends object = any> extends TableCellProps<Row> {
  children?: React.ReactNode;
}

function ActionCell<Row extends object = any>({
  children,
  ...props
}: ActionCellProps<Row>) {
  return (
    <TableCell {...props}>
      {(_: any, __: number, ___: any, dataValueOrFallback: any) => <>
        {dataValueOrFallback}
        <ActionCell.Actions>
          {children}
        </ActionCell.Actions>
      </>}
    </TableCell>
  );
}

ActionCell.Actions = TableCellActions;
ActionCell.Action = TableCellActions.Action;
ActionCell.More = TableCellActions.More;

export default ActionCell;
