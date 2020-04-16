# RSuite Enhanced Edition
> Make the best use of RSuite.

增强的 rsuite 组件，基于常用业务场景封装，提供了一些通用的交互以及 props。

Components
- `<CheckPicker>`
- `<Input>`
- `<SelectPicker>`
- `<Table>`

Hooks
- `useForm`

## Components

### `<CheckPicker>`
- 支持了 loading 状态以及 label 文字显示，可用于表格工具栏的筛选控件。

|Props|Type (default)|Description|
|---|---|---|
|loading|`boolean`||
|label|`React.ReactNode`||
|delimiter|`React.ReactNode` (`"："`)|label 后面的分隔符|

### `<Input>`
- 支持 debounce

|Props|Type (default)|Description|
|---|---|---|
|debounceChange|`number`|debounce 的间隔时间，单位 ms|

### `<SelectPicker>`
- 支持了 loading 状态以及 label 文字显示，可用于表格工具栏的筛选控件。

|Props|Type (default)|Description|
|---|---|---|
|loading|`boolean`||
|label|`React.ReactNode`||
|delimiter|`React.ReactNode` (`"："`)|label 后面的分隔符|

### `<Table>`
- 支持了勾选行的操作，可用于批量操作等业务场景。
- 直接导出了 `<Column>` `<Cell>` `<HeaderCell>` `<Pagination>`
- 支持直接传入 `<Pagination>` 的配置，自动显示分页组件并计算高度
- 更好的泛型支持
- 增强的 `<Cell>`，具体见 `<Table.Cell>` 介绍

|Props|Type (default)|Description|
|---|---|---|
|checkedRowKeys|`any[]`|选中的行的 rowKey 数组（受控）|
|onCheckedRowKeysChange|`(rowKeys: any[], event: React.SyntheticEvent) => void`|勾选行变化的回调|
|rowCheckable|`(rowData: any, rowIndex: number) => boolean`|判断当前行能否被选中|
|pagination|`TablePaginationProps`&#124;`React.ReactElement<TablePaginationProps>`|如果此 props 存在，则渲染分页组件，此值为分页组件的 props。如果 `pagination` 是一个 React element，则直接作为分页组件渲染|

### `<Table.Cell>`
- `dataKey` 支持嵌套属性，并支持 nullish fallback
- 支持 tooltip 提示信息
- 支持添加操作按钮
- 支持渲染属性

```typescript jsx
// Table 直接导出了附属组件
import Table, { Column, Cell, HeaderCell, Pagination, ActionCell } from 'rsuite-enhanced/Table';

function UserTable({
  users,
  onViewUserDetail,
  onEditUser,
  onDeleteUser,
  onRemoveUserFromGroup
}) {
  return (
    <Table data={users}>
      <Column>
        <HeaderCell>Name</HeaderCell>
        <ActionCell dataKey="name">
          // 可以添加任意数量的 Action
          <ActionCell.Action icon="detail" onClick={onViewUserDetail}>Detail</ActionCell.Action>
          <ActionCell.Action icon="edit" onClick={onEditUser}>Edit</ActionCell.Action>
          // 也可以将 Action 收起在 More 菜单中
          <ActionCell.More>
            <ActionCell.Action icon="close" onClick={onDeleteUser}>Delete</ActionCell.Action>
          </ActionCell.More>
        </ActionCell>
      </Column>
      <Column>
        <HeaderCell>Group</HeaderCell>
        <Cell dataKey="group.name" fallback="--">
          {(user, rowIndex, dataValue, dataValueOrFallback) => (<>
            <Link to={`/users/${user.id}`}>{user.name}</Link> // 也可以使用 <Link >{dataValue}</Link> 避免重复书写 dataKey

            // 不仅在 ActionCell 中，在任何 Cell 中都可以使用 ActionCell.Action
            // 事实上，ActionCell 仅仅是一层渲染属性的简单封装
            <ActionCell.Actions>
              <ActionCell.Action icon="close" onClick={onRemoveUserFromGroup}>Leave</ActionCell.Action>
            </ActionCell.Actions>
          </>)}
        </Cell>
      </Column>
    </Table>
  );
}
```

#### `<Table.Cell>` Props
|Props|Type (default)|Description|
|---|---|---|
|fallback|`React.ReactNode`(`"--"`)|当 dataKey 对应的值为 nullish 时显示的内容|
|tooltip|`React.ReactNode`&#124;`true`|hover 时的 tooltip 提示信息，如果设为 true 则显示 dataKey 对应的内容|
|tooltipPlacement|`TypeAttributes.Placement`(`"topStart"`)|tooltip 的 placement|
|tooltipDelay|`number`(`300`)|tooltip 的 delayShow|

#### `<Table.Cell.Action>` Props
|Props|Type (default)|Description|
|---|---|---|
|icon|`IconProps['icon']`|操作显示的 icon|
|children|`React.ReactNode`|操作的说明，当操作显示为按钮时，以 tooltip 形式展示，当操作收起在更多菜单里时，以 DropdownItem 的形式展示|
|onClick|`(rowData: any, event: React.SyntheticEvent) => void`|操作的回调|

## Hooks

### `useForm`
利用 `useForm` 钩子快速方便地使用 `<Form>` 组件。

```
function useForm<FormValue>(initialFormValue: FormValue): {
  ref: React.MutableRefObject<FormInstance>;
  handle: {
    populate(newValue: FormValue): void;
    submit(validated?: boolean): FormValue | null;
  };
  props: Partial<FormProps>;
}
```

#### Usage
```typescript jsx
function App() {

  const { ref, handle, props } = useForm({
    email: '',
    password: ''
  });

  async function submitForm() {
    const data = handle.submit();
    if (!data) {
      // submit() returns null if validation failed
      return;
    }

    await login(data);
  }

  return (
    <Form ref={ref} model={model} {...props}>
      <FormField name="email">
        <Input />
      </FormField>
      <FormField name="password">
        <Input type="password" />
      </FormField>

      <FormGroup>
        <Button onClick={submitForm}>Submit</Button>
      </FormGroup>
    </Form>
  );
}
```
