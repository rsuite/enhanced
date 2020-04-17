import React from 'react';
import { Icon } from 'rsuite';
import {IconProps} from "rsuite/es/Icon";

export interface SpinnerProps extends Omit<IconProps, 'icon' | 'spin'> {

}

function Spinner(props: SpinnerProps) {
  return (
    <Icon icon="spinner" spin {...props} />
  );
}

export default Spinner;
