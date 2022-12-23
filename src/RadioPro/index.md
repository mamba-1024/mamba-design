---
title: RadioPro
nav:
  title: 组件
  path: /components
  order: 0
group:
  path: /components/RadioPro
  title: RadioPro
  order: 5
---

# RadioPro

当使用 `Radio` 无法完全形容一个表单项而且也不想分成多个表单项的时候，可以使用

## API

### 作为 `FormItem` 使用时的属性 `FormItemProps`

| 参数     | 说明                                             | 类型                | 默认值 |
| -------- | ------------------------------------------------ | ------------------- | ------ |
| label    | 表单项的 label                                   | string              | -      |
| name     | 表单项字段的名称                                 | string              | -      |
| id       | radio 的字段名称， 默认就是 `FormItem` 的 `name` | string              | -      |
| options  | radioGroup 的 options                            | `OptionType`[]      | -      |
| onChange | 组件的 onChange 事件                             | (val?: any) => void | -      |
| value    | 组件的 value 值，配置 onChange 事件使用          | any                 | -      |
| readonly | 组件只读                                         | Boolean             | -      |
| disabled | 组件禁用                                         | Boolean             | -      |

### 作为一个单独的组件使用时 `IProps`

| 参数     | 说明                                             | 类型                | 默认值 |
| -------- | ------------------------------------------------ | ------------------- | ------ |
| id       | radio 的字段名称， 默认就是 `FormItem` 的 `name` | string              | -      |
| options  | radioGroup 的 options                            | `OptionType`[]      | -      |
| onChange | 组件的 onChange 事件                             | (val?: any) => void | -      |
| value    | 组件的 value 值，配置 onChange 事件使用          | any                 | -      |
| readonly | 组件只读                                         | Boolean             | -      |
| disabled | 组件禁用                                         | Boolean             | -      |

### OptionType

| 参数          | 说明                             | 类型                  | 默认值       |
| ------------- | -------------------------------- | --------------------- | ------------ | ---- | --- |
| value         | radioGroup 的 options 中的 value | any                   | -            |
| label         | radioGroup 的 options 中的 label | any                   | -            |
| extras        | 额外渲染的内容部分               | ExtrasOptionType[] \\ | undefined \\ | null | -   |
| helpText      | 每个 radio 尾部的帮助信息        | string                | -            |
| tooltip       | r 隐形气泡提示，显示在尾部       | string                | -            |
| bottomTooltip | 显性气泡提示，显示在下面         | string                | -            |

### ExtrasOptionType

| 参数      | 说明               | 类型                      | 默认值  |
| --------- | ------------------ | ------------------------- | ------- | ---- |
| text      | 显示的文本         | string                    | -       |
| fieldType | 需要渲染的元素类型 | `FieldType`               | `text`  |
| name      | 字段名称           | string                    | -       |
| show      | 控制是否显示       | (val?: any) => boolean \\ | boolean | true |
| compProps | 组件相关的属性     | -                         | -       |

## 代码演示

```tsx
import React, { useState, useMemo } from 'react';
import { Button, Form, Input } from 'antd';
import { RadioProFormItem } from 'mamba-design';

export default () => {
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const radioProProps = {
    label: '组合表单',
    name: 'FieldB',
    options: [
      {
        label: '不限',
        value: 'no',
      },
      {
        label: '限制',
        value: 'limit',
        extras: [
          {
            text: '每',
          },
          {
            text: '',
            fieldType: 'select',
            name: 'rate',
            compProps: {
              style: { width: 100 },
              options: [
                {
                  label: '周',
                  value: 'week',
                },
                {
                  label: '月',
                  value: 'month',
                },
              ],
            },
          },
          {
            text: '',
            fieldType: 'input',
            name: 'counts',
            compProps: {
              style: { width: 100 },
            },
          },
          {
            text: '次',
          },
        ],
      },
    ],
  };

  return (
    <Form
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      layout="vertical"
      initialValues={{}}
    >
      <Form.Item
        label="Field A"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <RadioProFormItem {...radioProProps} />

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
```
