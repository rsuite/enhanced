import { SelectPicker as RSuiteSelectPicker } from 'rsuite';
import { SelectProps } from 'rsuite/es/SelectPicker';
import enhancePicker from './HOCs/enhancePicker';
import { FormControlPickerProps } from "rsuite/es/@types/common";

// 修复 SelectPickerProps
export interface SelectPickerProps<ValueType = any>
  extends FormControlPickerProps<ValueType>,
    SelectProps<ValueType> {

}

export default enhancePicker<SelectPickerProps>(RSuiteSelectPicker);
