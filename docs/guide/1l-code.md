---
title: 一行代码
nav:
  path: /guide
  title: 积累
  order: 1
group:
  path: /guide/1l-code
  order: 8
  title: 一行代码
---

用最少得代码，实现常见的逻辑

## 使用正则表达式实现千分位格式化

通常我们前端拿到后端给的金额数据都是保留两位小数的字符串

此时就需要我们把它转为市面上标准的千分位显示格式

例如：将金额字符串转化为千分的逗号分隔形式 "1,000,000.00"

```
const toThousands = (price) => (price || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
```

## 四舍五入保留一位有效数字

```
const round = (number) => Math.round(number * 10) / 10;
```

## 四舍五入保留一位数字，没有小数需要补 0，例如：1.0

```
const round = (number) => (Math.round(number * 10) / 10).toFixed(1);
```

## 四舍五入保留 n 位有效数字

```
const round = (number, n) => Math.round(number * Math.pow(10, n)) / Math.pow(10, n);
```

## 四舍五入保留 n 位数字，没有小数需要补 0，例如：1.120、1.000

```
const round = (number, n) => (Math.round(number * Math.pow(10, n)) / Math.pow(10, n)).toFixed(n);
```

## moment.js API

官方地址 [isSame](http://momentjs.cn/docs/#/query/is-same/)

使用方式

```
moment().isSame(Moment|String|Number|Date|Array, String);
```

当包含第二个参数时，则它将会匹配所有等于或更大的单位。 传入 month 将会检查 month 和 year。 传入 day 将会检查 day、month 和 year

- `isSame`

  ```
  const isToday = moment(time).isSame(moment(), 'day');
  ```

- `isAfter`
  ```
   const isAfter = moment(time).isAfter(moment(), 'day');
  ```
- `moment().date()`
  ```
  const dayInMonth = moment().date(); // 获取当天日期（几号）
  ```
- `moment().day()`
  ```
  const weekDay = moment().day(); // 确定某天是周几
  ```

## js 取余 %

一个数字除以一个单位数字后取余 `%`

```
const remainder = (number, unit) => number % unit;

remainder(36, 5) // 1
```

## 推荐两个地址可以直接使用的简约代码

- [1loc](https://1loc.dev/)
- [seconds of code](https://www.30secondsofcode.org/)
