---
title: Loading
nav:
  title: 组件
  path: /components
group:
  path: /components/Loading
  title: Loading
  order: 2
---

# Loading 加载中
用于页面和区块的加载中状态。

## 何时使用
页面局部处于等待异步数据或正在渲染过程时，合适的加载动效会有效缓解用户的焦虑。

## 代码演示

```tsx
import React from 'react';
import { Loading } from 'my-comp';

export default () => <Loading loading={true} />;
```

<!-- More skills for writing demo: https://d.umijs.org/guide/basic#write-component-demo -->

## API
### Loading
| 参数 | 说明 | 类型 | 默认值 |
| ---- | ---- | ---- | ---- |
| loading | 加载中 | boolean | - |
| error | 是否出错 | boolean | - |
