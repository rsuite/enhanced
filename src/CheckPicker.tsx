import { CheckPicker as RSuiteCheckPicker } from 'rsuite';
import enhancePicker from './HOCs/enhancePicker';

/**
 * todo 支持最大选择数量
 */
export default enhancePicker(RSuiteCheckPicker);
