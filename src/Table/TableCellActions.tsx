import React, { useContext, useRef } from 'react';
import { IconProps } from 'rsuite/es/Icon';
import { ButtonToolbar, Dropdown, Icon, IconButton, Popover, Tooltip, Whisper } from 'rsuite';
import { TableCellContext } from './TableCell';

export interface TableCellActionsProps {
  children: React.ReactNode;
}

function TableCellActions({
  children
}: TableCellActionsProps) {

  return (
    <ButtonToolbar className="rs-table-cell__actions">
      {children}
    </ButtonToolbar>
  );
}

export interface TableCellActionProps {
  icon: IconProps['icon'];
  children?: React.ReactNode;

  onClick?(row: any, event: React.SyntheticEvent): void;
}

function TableCellAction({
  icon,
  children,
  onClick
}: TableCellActionProps) {

  const { rowData } = useContext(TableCellContext);

  function handleClick(event: React.SyntheticEvent) {
    onClick?.(rowData, event);
  }

  const element = <IconButton icon={<Icon icon={icon} />} appearance="link" onClick={handleClick} />;

  return children ? (
    <Whisper
      placement="top"
      trigger="hover"
      speaker={<Tooltip>{children}</Tooltip>}
    >
      {element}
    </Whisper>
  ) : element;
}

export interface TableCellMoreActionsProps {
  children: React.ReactNode;
}

function TableCellMoreActions({
  children
}: TableCellMoreActionsProps) {

  const popoverRef = useRef<any>();

  function hidePopover() {
    popoverRef.current.hide();
  }

  const { rowData } = useContext(TableCellContext);

  return (
    <Whisper
      placement="autoVerticalStart"
      trigger="click"
      triggerRef={popoverRef}
      speaker={
        <Popover full>
          <Dropdown.Menu onSelect={hidePopover}>
            {React.Children.map(children, ({ props }: React.ReactElement<TableCellActionProps>, index: number) => {
              function handleSelect(_: any, event: React.SyntheticEvent) {
                props.onClick?.(rowData, event);
              }
              return (
                // eslint-disable-next-line react/no-array-index-key
                <Dropdown.Item key={index} onSelect={handleSelect}>
                  <Icon icon={props.icon} />{props.children}
                </Dropdown.Item>
              );
            })}
          </Dropdown.Menu>
        </Popover>
      }
    >
      <TableCellAction icon="more" />
    </Whisper>
  );
}

TableCellActions.Action = TableCellAction;
TableCellActions.More = TableCellMoreActions;

export default TableCellActions;
