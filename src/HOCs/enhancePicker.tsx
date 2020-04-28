import React from 'react';
import Spinner from '../Spinner';

export interface EnhancedPickerProps {
  label?: React.ReactNode;
  delimiter?: React.ReactNode;
  loading?: boolean;

  renderLoader?(): React.ReactNode;
}

/**
 * 为 Picker 添加 loading, label 等属性
 * 方便用于异步数据，表格工具栏筛选等场景
 */
function enhancePicker<P = any, EP = P & EnhancedPickerProps>(Picker: React.ComponentType<P>): React.ComponentType<EP> {
  function EnhancedPicker({
    label,
    delimiter = '：',
    loading = false,
    // Picker.defaultProps.placeholder
    placeholder = 'Select',
    renderLoader,
    ...props
  }: P & EnhancedPickerProps | any) {

    // 如果没有 label，也不应显示 delimiter
    const labelWithDelimiter = label ? (<>
      {label}{delimiter}
    </>) : null;

    const placeholderElement = label ? (<>
      {label}{delimiter}{loading ? (renderLoader?.() ?? <Spinner />) : placeholder}
    </>) : placeholder;

    return (
      <Picker
        placeholder={placeholderElement as any}
        renderValue={(_: any, __: any, selectedElement: React.ReactElement) => (<>
          {labelWithDelimiter}{selectedElement}
        </>)}
        {...props as any}
      />
    );
  }
  EnhancedPicker.displayName = `Enhanced(${Picker.displayName})`;

  return EnhancedPicker;
}

export default enhancePicker;
