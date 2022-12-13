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

将被右键点击元素使用该组件进行包裹，组件加载的时候为组件挂载 `contextmenu` 事件，会透传到菜单的事件中，用于业务逻辑处理。

右键菜单是通过固定定位的方式显示在右键点击区域。

## 何时使用

针对一个小的区域，需要执行多个操作的时候

## 代码演示

```tsx
import React, { useState } from 'react';
import { Button, Col, message, Row, Space, Switch, Divider } from 'antd';
import { RightClick } from 'mamba-design';
import { ContextDataItem } from './interface.ts';

const rightMenus = [
  {
    title: '查看',
    onClick: (item) => {
      message.info(`右键 ${item.name}，点击了 查看`);
    },
  },
  {
    title: '重命名',
    onClick: (item) => {
      message.info(`右键 ${item.name}，点击了 重命名`);
    },
  },
  {
    title: '删除',
    onClick: (item) => {
      message.info(`右键 ${item.name}，点击了 删除`);
    },
  },
];

const clickData: ContextDataItem[] = Array.from({ length: 10 }).map((ele, index) => ({
  id: index,
  name: `data-${index}`,
}));

export default () => {
  const handleContextMenu = (data) => {
    console.log('ContextDataItem: ', data);
  };

  return (
    <div>
      <Divider orientation="left">使用 children 元素绑定鼠标右键事件</Divider>
      <Row gutter={[16, 24]}>
        {clickData.map((ele, index) => (
          <RightClick menus={rightMenus} data={ele} onContextMenu={handleContextMenu}>
            <Col
              style={{
                backgroundColor: '#0092ff',
                margin: '0 12px',
                height: '40px',
                lineHeight: '40px',
                textAlign: 'center',
              }}
              span={6}
            >
              {ele.name}
            </Col>
          </RightClick>
        ))}
      </Row>

      <Divider orientation="left">使用元素 id 绑定鼠标右键事件</Divider>
      <Button id="ContextMenu" type="primary">
        鼠标右键事件
      </Button>
      <RightClick
        id="ContextMenu"
        menus={rightMenus}
        data={{ name: '鼠标右键事件' }}
        onContextMenu={handleContextMenu}
      />
    </div>
  );
};
```

## API

### RightClick

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| menus | 右键菜单 | MenuItem[] | - |
| children | 响应鼠标右键的 dom 元素 | ReactNode | - |
| data | 传入 组件的 data 数据，可以用通过 onContextMenu 方法返回，用于逻辑处理 | any | - |
| onContextMenu | 鼠标右键的回调 | function(val: any) | - |
| id | 如果没有 children 元素的话，将鼠标右键事件挂载带对应 id 的 dom 元素上 | string | - |

### MenuItem

| 参数    | 说明           | 类型               | 默认值 |
| ------- | -------------- | ------------------ | ------ |
| title   | 菜单名称       | string             | -      |
| onClick | 菜单的点击事件 | (val: any) => void | -      |
