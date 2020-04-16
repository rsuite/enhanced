import React, { useCallback, useState } from 'react';
import _ from 'lodash';
import { FormControlBaseProps } from 'rsuite/es/@types/common';

export interface WithDebounceProps {
  debounceChange?: number;
}

function withDebounce<P extends FormControlBaseProps>(
  Component: React.ComponentType<P>,
  defaultWait?: number
) {
  function Debounced({
    debounceChange = defaultWait,
    value,
    onChange,
    ...props
  }: P & WithDebounceProps) {

    const [_value, setValue] = useState(value ?? props.defaultValue);

    const debouncedChange = useCallback(
      debounceChange ? _.debounce(onChange!, debounceChange) : onChange!
      , [debounceChange]);

    function handleChange(newValue: any, event: React.SyntheticEvent<any>) {
      setValue(newValue);
      debouncedChange(newValue, event);
    }

    return (
      <Component value={_value} onChange={handleChange} {...props as any} />
    );
  }

  Debounced.displayName = `Debounced(${Component.displayName})`;

  return Debounced;
}

export default withDebounce;
