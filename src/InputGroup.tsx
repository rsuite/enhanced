/**
 * WIP
 */
import React from 'react';
import { InputProps } from 'rsuite/es/Input';
import { FormControlBaseProps } from 'rsuite/es/@types/common';
import { InputGroupProps } from 'rsuite/es/InputGroup';
import { Input, InputGroup as RSuiteInputGroup } from 'rsuite';

export interface InputGroupAccepterProps extends Pick<InputProps, keyof FormControlBaseProps>, Omit<InputGroupProps, 'children'> {
  before?: React.ReactNode;
  after?: React.ReactNode;
}

function InputGroup({
  value,
  onChange,
  defaultValue,
  before,
  after,
  ...props
}: InputGroupAccepterProps) {
  return (
    <RSuiteInputGroup {...props}>
      {!!before && (
        <RSuiteInputGroup.Addon>{before}</RSuiteInputGroup.Addon>
      )}
      <Input defaultValue={defaultValue} value={value} onChange={onChange} />
      {!!after && (
        <RSuiteInputGroup.Addon>{after}</RSuiteInputGroup.Addon>
      )}
    </RSuiteInputGroup>
  );
}

InputGroup.Addon = RSuiteInputGroup.Addon;

export default InputGroup;
