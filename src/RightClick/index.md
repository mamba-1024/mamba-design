---
title: RightClick
nav:
  title: 组件
  path: /components
  order: 0
group:
  path: /components/RightClick
  title: RightClick
  order: 1
---

# RightClick 鼠标右键菜单

鼠标右键展示对应的菜单

## 设计思路

组件加载的时候为容器组件挂载 `contextmenu` 事件，渲染的时候为有点点击区域增加 `data-click` 和 `data-data` 的属性，其中 `data-click` 是控制该区域是否响应右键事件（弹出右键菜单），`data-data`为该点击区域的数据值，会透传到菜单的事件中，用于业务逻辑处理。

右键菜单是通过固定定位的方式显示在右键点击区域。

## 何时使用

针对一个小的区域，需要执行多个操作的时候

## 代码演示

```tsx
import React, { useState } from 'react';
import { Button, Col, message, Row, Space, Switch } from 'antd';
import { RightClick } from 'mamba-design';
import { ContextDataItem } from './interface.ts';

const rightMenus = [
  {
    title: '查看',
    onClick: (item) => {
      message.info('点击了 查看');
      console.log('item: ', item);
    },
  },
  {
    title: '重命名',
    onClick: (item) => {
      message.info('点击了 重命名');
      console.log('item: ', item);
    },
  },
  {
    title: '删除',
    onClick: (item) => {
      message.info('点击了 删除');
      console.log('item: ', item);
    },
  },
];

const clickData: ContextDataItem[] = Array.from({ length: 10 }).map((ele, index) => ({
  id: index,
  name: `data-${index}`,
}));

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
    <>
      <Row gutter={[16, 24]} id="handleContextMenuLeft">
        {clickData.map((ele) => (
          <Col
            style={{
              backgroundColor: '#0092ff',
              margin: '0 12px',
              height: '40px',
              lineHeight: '40px',
              textAlign: 'center',
            }}
            data-click={true}
            data-data={JSON.stringify(ele)}
            span={6}
            key={ele.id}
          >
            {ele.name}
          </Col>
        ))}
      </Row>
      <RightClick menus={rightMenus} id="handleContextMenuLeft" />
    </>
  );
};
```

## API

### RightClick

| 参数                  | 说明               | 类型                           | 默认值 |
| --------------------- | ------------------ | ------------------------------ | ------ |
| menus                 | 右键菜单           | MenuItem[]                     | -      |
| id                    | 挂载的 dom 元素 id | string                         | -      |
| onContextMenuCallback | 点击菜单的回调     | function(val: ContextMenuItem) | -      |

### MenuItem

| 参数    | 说明           | 类型               | 默认值 |
| ------- | -------------- | ------------------ | ------ |
| title   | 菜单名称       | string             | -      |
| onClick | 菜单的点击事件 | (val: any) => void | -      |

### ContextMenuItem

右键点击的区域的 data 数据，可以从右键菜单中拿到，用于业务逻辑处理
