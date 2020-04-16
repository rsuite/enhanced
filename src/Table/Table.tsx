/**
 * 增强的 Table 组件
 * 增加多选相关的 props
 * - rowCheckable
 * - checkedRowKeys 如果此 prop 存在，则自动渲染 checkbox 列 todo 非受控
 * - onCheckedRowKeysChange
 * - todo 控制 checkAll 行为、禁用 checkAll 等
 *
 * 增加分页相关的 props
 * - pagination 如果此 props 存在，则渲染分页组件，此值为分页组件的 props
 */
import React from 'react';
import _ from 'lodash';
import { Checkbox, Table as RSuiteTable } from 'rsuite';
import { TableProps as RSuiteTableProps } from 'rsuite/es/Table';
import { TablePaginationProps } from 'rsuite/es/Table/TablePagination';
import CheckboxCell from './cells/CheckboxCell';

const { Column, HeaderCell, Pagination } = RSuiteTable;

export interface TableProps<RowData = any, RowKey = string | number | symbol> extends RSuiteTableProps<RowKey, RowData> {
  checkedRowKeys?: RowKey[];

  onCheckedRowKeysChange?(rowKeys: RowKey[], event?: React.SyntheticEvent): void;

  rowCheckable?(rowData: RowData, rowIndex: number): boolean;

  pagination?: TablePaginationProps | React.ReactElement<TablePaginationProps>;
}

function Table<RowData = any, RowKey = string | number | symbol>({
  height,
  rowCheckable,
  checkedRowKeys,
  onCheckedRowKeysChange,
  pagination,
  children,
  ...props
}: TableProps<RowData, RowKey>) {

  // Table.defaultProps.rowKey
  const { rowKey = 'key', data = [] } = props;

  /**
   * 反转一下 rowCheckable 以便转换为 disabled
   */
  function rowNotCheckable(rowData: any, rowIndex: number): boolean {
    return rowCheckable?.(rowData, rowIndex) ?? false;
  }

  const allCheckableDataKeys = data
    .filter((item, index) => !rowNotCheckable(item, index))
    .map(item => item[rowKey as any]);

  /**
   * 当前 rowCheckable 的 data 中是否有存在 checkedRows
   */
  function hasCheckedRows() {
    return _.intersection(allCheckableDataKeys, checkedRowKeys ?? []).length > 0;
  }

  /**
   * 是否全选
   * 如果当前所有 rowCheckable 的 data 都被 check，则为 true
   */
  function isCheckedAll() {
    return hasCheckedRows() && _.difference(allCheckableDataKeys, checkedRowKeys ?? []).length < 1;
  }

  /**
   * checkAll 变化的回调
   * 全选：选中所有 rowCheckable 的行
   * 取消全选：取消选择所有行
   */
  function onCheckAllChange(__: any, checked: boolean, event: React.SyntheticEvent) {
    function checkAll(e?: React.SyntheticEvent) {
      return onCheckedRowKeysChange?.(allCheckableDataKeys, e);
    }

    function uncheckAll(e?: React.SyntheticEvent) {
      return onCheckedRowKeysChange?.([], e);
    }

    return checked ? checkAll(event) : uncheckAll(event);
  }

  /**
   * 传入 checkedRows 数组则渲染 check 列
   */
  function shouldRenderCheckColumn() {
    return !!checkedRowKeys;
  }

  /**
   * 行是否被选中，用于 CheckboxCell
   */
  function isRowChecked(rowData: RowData): boolean {
    return checkedRowKeys?.includes(rowData[rowKey as any]) ?? false;
  }

  /**
   * 行勾选变化回调
   */
  function onRowCheckedChange(value: RowKey, checked: boolean, event: React.SyntheticEvent) {
    function check(checkValue: RowKey, e?: React.SyntheticEvent) {
      return onCheckedRowKeysChange?.(checkedRowKeys!.filter(dataValue => dataValue !== checkValue).concat(checkValue), e);
    }

    function uncheck(uncheckValue: RowKey, e?: React.SyntheticEvent) {
      return onCheckedRowKeysChange?.(checkedRowKeys!.filter(dataValue => dataValue !== uncheckValue), e);
    }

    return checked ? check(value, event) : uncheck(value, event);
  }

  /**
   * 如果 pagination props 存在
   * 则渲染分页
   */
  function shouldRenderPagination(): boolean {
    return !!pagination;
  }

  /**
   * 如果 pagination props 是 React element
   * 则直接渲染 pagination
   * 否则渲染 <Pagination {...pagination} />
   */
  function renderPagination() {
    if (React.isValidElement(pagination)) {
      return pagination;
    }

    return (
      <Pagination {...pagination} />
    );
  }

  /**
   * 计算 Table 组件实际高度
   * 传入的 height props
   * 如果显示分页，减去分页组件的高度
   */
  function getTableActualHeight() {
    if (shouldRenderPagination()) {
      return height! - 64;
    }

    return height;
  }

  return (
    <>
      <RSuiteTable
        height={getTableActualHeight()}
        {...props as any}
      >
        {shouldRenderCheckColumn() && (
          <Column width={56} fixed>
            <HeaderCell className="checkbox-cell">
              <Checkbox
                disabled={allCheckableDataKeys.length < 1}
                checked={isCheckedAll()}
                indeterminate={hasCheckedRows() && !isCheckedAll()}
                onChange={onCheckAllChange}
              />
            </HeaderCell>
            <CheckboxCell
              dataKey={rowKey as any}
              disabled={rowNotCheckable}
              checked={isRowChecked}
              onChange={onRowCheckedChange}
            />
          </Column>
        )}
        {children}
      </RSuiteTable>
      {shouldRenderPagination() && renderPagination()}
    </>
  );
}

Table.displayName = `Enhanced(${RSuiteTable.displayName})`;

export default Table;
