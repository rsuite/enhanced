import { Input as RSuiteInput } from 'rsuite';
import { InputProps as RSuiteInputProps } from 'rsuite/es/Input';
import withDebounce, { WithDebounceProps } from './HOCs/withDebounce';

export interface InputProps extends RSuiteInputProps, WithDebounceProps {

}

export default withDebounce(RSuiteInput);