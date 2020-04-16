import React, { useCallback } from 'react';
import _ from 'lodash';
import { Table, Tooltip, Whisper } from 'rsuite';
import { TableCellProps as RSuiteTableCellProps } from 'rsuite/es/Table/TableCell';
import { TooltipProps } from 'rsuite/es/Tooltip';

const RSuiteTableCell = Table.Cell;

export interface TableCellProps<Row extends object = any> extends RSuiteTableCellProps {
  fallback?: React.ReactNode;

  tooltip?: React.ReactNode | true;

  tooltipPlacement?: TooltipProps['placement'];

  tooltipDelay?: TooltipProps['delayShow'];

  children?: React.ReactNode | ((rowData: any, rowIndex: number, value: any, valueOrFallback?: any) => React.ReactNode);

  rowData?: Row;
}

interface TableCellContext<Row extends object = any> {
  rowData?: Row;
  rowIndex?: number;
}

export const TableCellContext = React.createContext<TableCellContext>({});

function TableCell<Row extends object = any>({
  fallback = '--',
  tooltip = false,
  tooltipPlacement = 'topStart',
  tooltipDelay = 300,
  children,
  ...props
}: TableCellProps<Row>): React.ReactElement {

  const value = _.get(props.rowData, props.dataKey as any);
  const valueOrFallback = value ?? fallback;

  const render = useCallback((rowData: any, rowIndex: number) => {
    if (!children) return valueOrFallback;
    if (typeof children !== 'function') return children;
    return children(rowData, rowIndex, value, valueOrFallback);
  }, [value, children, valueOrFallback]);

  const element = (
    <RSuiteTableCell {...props}>
      {render}
    </RSuiteTableCell>
  );

  return (
    // eslint-disable-next-line react/destructuring-assignment
    <TableCellContext.Provider value={{ rowData: props.rowData, rowIndex: props.rowIndex }}>
      {tooltip ? (
        <Whisper
          placement={tooltipPlacement}
          delayShow={tooltipDelay}
          speaker={
            <Tooltip>
              {typeof tooltip !== 'boolean' ? tooltip : valueOrFallback}
            </Tooltip>
          }
        >
          {element}
        </Whisper>
      ) : element}
    </TableCellContext.Provider>
  );
}

TableCell.displayName = `Enhanced(${RSuiteTableCell.displayName})`;

export default TableCell;
