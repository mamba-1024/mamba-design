import { QuestionCircleOutlined } from '@ant-design/icons';
import { DatePicker, Form, Input, InputNumber, Radio, Select, Space, Tooltip } from 'antd';
import React from 'react';

import { ExtrasOptionType, ExtrasType, FormItemProps, IProps, OptionType } from './interface';

const { RangePicker } = DatePicker;

export const RadioPro: React.FC<IProps> = (props) => {
  const { options, readonly, disabled, value, onChange, id } = props;

  const handleChangeRadio = (val: string) => {
    if (id) {
      onChange?.({ ...value, [id]: val });
    }
  };

  const handleChange = (val: any, fieldName?: string) => {
    if (fieldName) {
      onChange?.({ ...value, [fieldName]: val });
    }
  };

  function Extra(option: OptionType, disabledRadio?: boolean) {
    const { extras, helpText } = option;

    return (
      <Space>
        {extras?.map((extra: ExtrasOptionType, k: number) => {
          const { text, fieldType, name, compProps, show } = extra;

          if (typeof show === 'boolean' && !show) return null;

          switch (fieldType) {
            case 'text':
              return <span key={k}>{text}</span>;
            case 'input':
              return (
                <Input
                  onChange={(e) => {
                    const val = e.target.value;
                    handleChange(val, name);
                  }}
                  key={k}
                  {...compProps}
                  style={{ width: 80, ...compProps?.style }}
                  disabled={disabled || disabledRadio}
                />
              );
            case 'select':
              return (
                <Select
                  onChange={(val) => {
                    handleChange(val, name);
                  }}
                  key={k}
                  {...compProps}
                  disabled={disabled || disabledRadio}
                />
              );
            case 'number':
              return (
                <InputNumber
                  key={k}
                  {...compProps}
                  disabled={disabled || disabledRadio}
                  onChange={(val) => {
                    handleChange(val, name);
                  }}
                />
              );
            case 'date':
              return (
                <DatePicker
                  onChange={(val) => {
                    handleChange(val, name);
                  }}
                  key={k}
                  {...compProps}
                  disabled={disabled || disabledRadio}
                />
              );
            case 'dateRange':
              return (
                <RangePicker
                  onChange={(val) => {
                    handleChange(val, name);
                  }}
                  key={k}
                  {...compProps}
                  disabled={disabled || disabledRadio}
                />
              );
            default:
              return <span key={k}>{text}</span>;
          }
        })}
        {helpText && <span style={{ color: '#FA770A' }}>{helpText}</span>}
      </Space>
    );
  }

  return (
    <>
      {readonly ? (
        options.map((ele, k) => {
          return (
            <Space direction="vertical" key={k}>
              <Space>
                {ele.label}
                {ele.extras && Extra(ele, true)}
              </Space>
              {ele.bottomTooltip && (
                <span
                  onClick={(e) => e.preventDefault()}
                  style={{ color: '#8A9199', lineHeight: '22px' }}
                >
                  {ele.bottomTooltip}
                </span>
              )}
            </Space>
          );
        })
      ) : (
        <Space direction="vertical">
          {options.map((ele, k) => {
            const checked = value?.[id as string] === ele.value;
            return (
              <Radio
                key={k}
                onClick={() => handleChangeRadio(ele.value)}
                value={ele.value}
                disabled={disabled}
                checked={checked}
              >
                <Space direction="vertical">
                  <Space style={{ marginLeft: 2 }}>
                    {ele.label}
                    {/* 没有被选中的时候需要 disabled */}
                    {ele.extras && Extra(ele, !checked)}
                    {ele.tooltip && (
                      <Tooltip title={ele.tooltip}>
                        <QuestionCircleOutlined />{' '}
                      </Tooltip>
                    )}
                  </Space>
                  {ele.bottomTooltip && (
                    <span
                      onClick={(e) => e.preventDefault()}
                      style={{ color: '#8A9199', lineHeight: '22px' }}
                    >
                      {ele.bottomTooltip}
                    </span>
                  )}
                </Space>
              </Radio>
            );
          })}
        </Space>
      )}
    </>
  );
};

const RadioProFormItem: React.FC<FormItemProps> = (props) => {
  const { label, name, options } = props;

  const validator = (rule: any, val: any) => {
    // 如果radio没有值的话，就不在校验 extras
    if (!name || !val?.[name]) {
      return Promise.resolve();
    }

    // 1、得到选中的radio项的 extras
    const extras: ExtrasType = options.find((ele) => ele.value === val[name])?.extras;
    if (!extras) {
      return Promise.resolve();
    }

    // 2、 获取需要校验必填的字段
    const validatorNames: any[] = (extras as ExtrasOptionType[])
      .filter((ele) => ele.name)
      .map((ele) => ele.name);

    // 3、判断是否有值
    for (let i = 0; i < validatorNames.length; i++) {
      // 当值不存在的抛出错误
      if (!val[validatorNames[i]]) {
        return Promise.reject(new Error('必填'));
      }
    }

    return Promise.resolve();
  };

  return (
    <Form.Item
      label={label}
      name={name}
      rules={[{ required: true, message: '请选择' }, { validator }]}
    >
      <RadioPro {...props} />
    </Form.Item>
  );
};

export default RadioProFormItem;
