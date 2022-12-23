type FieldType = 'text' | 'input' | 'select' | 'number' | 'date' | 'dateRange';

export interface ExtrasOptionType {
  text?: string; // 显示的文本
  fieldType?: FieldType; // 字段类型
  name?: string; // 字段名称
  show?: (val?: any) => boolean | boolean; // 是否展示
  compProps?: any;
}

export type ExtrasType = ExtrasOptionType[] | undefined | null;

export interface OptionType {
  value?: any;
  label?: string;
  extras?: ExtrasType;
  helpText?: string;
  tooltip?: string; // 隐形气泡提示，显示在尾部
  bottomTooltip?: string; // 显性气泡提示，显示在下面
}

export interface IProps {
  id?: string;
  options: OptionType[];
  onChange?: (val?: any) => void;
  value?: any;
  readonly?: boolean;
  disabled?: boolean;
}

export interface FormItemProps extends IProps {
  label?: string;
  name?: string;
}
