import React from 'react';
import { Checkbox } from 'rsuite';
import TableCell, { TableCellProps } from '../TableCell';

/**
 * 取 CheckboxProps 的几个关键属性
 * 从值变成函数
 */
export interface CheckboxCellProps<Row extends object = any, V = any> extends TableCellProps<Row> {
  disabled?(rowData: Row, rowIndex: number): boolean;

  checked?(rowData: Row, rowIndex: number): boolean;

  onChange?: (value: V, checked: boolean, event: React.SyntheticEvent<HTMLInputElement>) => void;
}

/**
 * 自动的 checkbox 列
 */
function CheckboxCell({
  checked,
  onChange,
  disabled,
  ...props
}: CheckboxCellProps) {
  return (
    <TableCell className="checkbox-cell" {...props}>
      {(rowData: any, rowIndex: number, dataValue) => {
        return (
          <Checkbox
            value={dataValue}
            checked={checked?.(rowData, rowIndex) ?? false}
            onChange={onChange}
            disabled={disabled?.(rowData, rowIndex) ?? false}
          />
        );
      }}
    </TableCell>
  );
}

export default CheckboxCell;
