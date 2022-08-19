---
title: MindMenu
nav:
  title: 组件
  path: /components
group:
  path: /components/MindMenu
  title: MindMenu
  order: 0
---

# MindMenu 智能菜单

鼠标移入展示对应的子菜单

## 设计思路

请参考以往文章 [react 版模拟亚马逊人机交互菜单](https://juejin.cn/post/7061905434352812040)

## 何时使用

菜单量比较大的时候，可以采用动态展示的方式。根据分类方便用户看到需要的菜单

## 代码演示

```tsx
import React, { useState } from 'react';
import { Button, Col, message, Row, Space, Switch } from 'antd';
import { MindMenu } from 'mamba-design';

const resource: any[] = [
  {
    name: '菜单1',
    key: 'm1',
    children: [
      {
        name: '子菜单1',
        key: 'k1',
        children: [
          { name: '手机', key: 'mobile', children: [], router: '/mobile' },
          { name: '拍照手机', key: 'mmmm', children: [], router: '/mmmm' },
        ],
      },
      {
        name: '子菜单11',
        key: 'k111',
        children: [
          { name: '手机111', key: 'mobile111', children: [], router: '/mobile' },
          { name: '拍照手机111', key: 'mmmm11', children: [], router: '/mmmm' },
        ],
      },
    ],
  },
  {
    name: '菜单2',
    key: 'm2',
    children: [
      {
        name: '子菜单2',
        key: 'k2',
        children: [
          { name: '手机2', key: 'mobile2', children: [], router: '/mobile' },
          { name: '拍照手机2', key: 'mmmm2', children: [], router: '/mmmm' },
        ],
      },
      {
        name: '子菜单22',
        key: 'k22',
        children: [
          { name: '手机22', key: 'mobile22', children: [], router: false },
          { name: '拍照手机22', key: 'mmmm22', children: [], router: '/mmmm' },
        ],
      },
    ],
  },
  {
    name: '菜单3',
    key: 'm3',
    children: [
      {
        name: '子菜单3',
        key: 'k3',
        children: [
          { name: '手机3', key: 'mobile3', children: [], router: '/mobile' },
          { name: '拍照手机3', key: 'mmmm3', children: [], router: '/mmmm' },
        ],
      },
      {
        name: '子菜单33',
        key: 'k33',
        children: [
          { name: '手机33', key: 'mobile33', children: [], router: '/mobile' },
          { name: '拍照手机33', key: 'mmmm33', children: [], router: '/mmmm' },
        ],
      },
    ],
  },
  {
    name: '菜单4',
    key: 'm4',
    children: [
      {
        name: '子菜单4',
        key: 'k4',
        children: [
          { name: '手机4', key: 'mobile4', children: [], router: '/mobile' },
          { name: '拍照手机4', key: 'mmmm4', children: [], router: '/mmmm' },
        ],
      },
      {
        name: '子菜单44',
        key: 'k44',
        children: [
          { name: '手机44', key: 'mobile44', children: [], router: '/mobile' },
          { name: '拍照手机44', key: 'mmmm44', children: [], router: '/mmmm' },
        ],
      },
    ],
  },
];

export default () => {
  const [control, setControl] = useState<{
    collapsed: boolean;
    isSearch: boolean;
  }>({
    collapsed: false,
    isSearch: false,
  });
  const [layout, setLayout] = useState<'inline' | 'grid'>('inline');
  const onSelect = (route: any) => {
    message.success('click ' + route.name);
  };

  const handleChange = (key: string) => (checked: boolean) => {
    setControl({ ...control, [key]: checked });
  };

  const handleChangeLayout = (checked: boolean) => {
    setLayout(checked ? 'inline' : 'grid');
  };
  return (
    <Row gutter={[12, 24]}>
      <Col span={24}>
        <Space>
          <Switch
            checkedChildren="折叠菜单"
            unCheckedChildren="导航菜单"
            onChange={handleChange('collapsed')}
            checked={control.collapsed}
          />
          <Switch
            checkedChildren="展示搜索"
            unCheckedChildren="隐藏搜索"
            onChange={handleChange('isSearch')}
            checked={control.isSearch}
          />
          <Switch
            checkedChildren="行内布局"
            unCheckedChildren="grid布局"
            onChange={handleChangeLayout}
            checked={layout === 'inline'}
          />
        </Space>
      </Col>
      <Col span={24}>
        <MindMenu
          dataSource={resource}
          collapsed={control.collapsed}
          search={control.isSearch}
          onSelect={onSelect}
          layout={layout}
        >
          {control.collapsed && <Button type="primary">折叠菜单</Button>}
        </MindMenu>
      </Col>
    </Row>
  );
};
```

## API

### MindMenu

| 参数       | 说明                                    | 类型                    | 默认值   |
| ---------- | --------------------------------------- | ----------------------- | -------- |
| dataSource | 数据源                                  | DataItem[]              | -        |
| collapsed  | 是否折叠                                | boolean                 | false    |
| search     | 是否显示搜索框                          | boolean                 | false    |
| onSelect   | 点击菜单的回调                          | function(val: DataItem) | -        |
| layout     | 菜单布局                                | String                  | 'inline' |
| children   | 子元素，当 collapsed 为 true 的时候展示 | ReactNode               | -        |

### DataItem

| 参数     | 说明           | 类型       | 默认值 |
| -------- | -------------- | ---------- | ------ |
| name     | 菜单名称       | string     | -      |
| key      | 菜单的唯一标识 | string     | -      |
| router   | 菜单的路由     | string     | -      |
| children | 子菜单         | DataItem[] | -      |
