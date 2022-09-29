---
title: MouseBox
nav:
  title: 组件
  path: /components
  order: 0
group:
  path: /components/MouseBox
  title: MouseBox
  order: 4
---

# MouseBox 鼠标移动选择

在指定的区域内，按下鼠标左键然后移动鼠标形成一个方形的小区域，选中小区域内的子元素。

## 设计思路

1. 当按下鼠标左键的时候，我们记录鼠标的初始位置
2. 移动鼠标，监听 `move` 事件，然后绘制一个方形的区域
3. 遍历所有子元素进行碰撞检查，判断子元素是否在方形区域内，如果在的话就选中，不在的话取消选中

## 何时使用

有很多子元素，进行批量选择的时候

## 代码演示

```tsx
import React, { useState, useMemo } from 'react';
import { Button, Col, message, Row, Space, Switch } from 'antd';
import { MouseBox, RightClick } from 'mamba-design';

const data: any[] = Array.from({ length: 20 }).map((ele, index) => ({
  id: index,
  name: `data-${index}`,
}));

const rightMenus = [
  {
    title: '查看',
    onClick: (item) => {
      message.info('点击了 查看');
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
  {
    title: '重命名',
    onClick: (item) => {
      message.info('点击了 重命名');
      console.log('item: ', item);
    },
  },
];

export default () => {
  const [checked, setChecked] = useState([]);
  const MouseBoxProps = {
    root: '.mouse-choose-box',
    target: '.mouse-choose-item',
    onChange: (v) => setChecked(v),
  };

  const rightClickMenu = useMemo(() => {
    if (checked.length > 1) {
      return rightMenus.slice(0, 2);
    }
    return rightMenus;
  }, [checked.length]);

  return (
    <div className="mouse-choose-box" id="mouse-choose-box" style={{ background: '#ddd' }}>
      <Row gutter={[16, 24]}>
        {data.map((ele) => (
          <Col
            style={{
              margin: '0 12px',
              height: '40px',
              lineHeight: '40px',
              textAlign: 'center',
            }}
            data-click={true}
            data-data={JSON.stringify(ele)}
            span={6}
            key={ele.id}
            className="mouse-choose-item"
          >
            {ele.name}
          </Col>
        ))}
      </Row>
      <MouseBox {...MouseBoxProps} />
      <RightClick menus={rightClickMenu} id="mouse-choose-box" />
    </div>
  );
};
```
