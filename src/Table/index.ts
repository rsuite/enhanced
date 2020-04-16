import { Table } from 'rsuite';

const { Column, HeaderCell, Pagination } = Table;

export { Column, HeaderCell, Pagination };
export { default } from './Table';
export { default as Cell } from './TableCell';

export {
  ActionCell,
  CheckboxCell,
  SerialCell
} from './cells';
