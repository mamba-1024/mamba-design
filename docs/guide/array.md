---
title: 数组相关
nav:
  path: /guide
  title: 积累
  order: 1
group:
  path: /guide/array
  order: 5
  title: 数组相关
---

## js 创建一个空数组

- es6 方式
  ```
  Array.from(new Array(100).keys());
  ```
- ... 扩展运算符

  ```
  [...Array(100).keys()]

  [...Array.from({ length: 100 }).keys()]
  ```

## 判断变量是否是一个数组

1. 原型链方法

检测 `constructor.prototype` 是否存在于参数 `object` 的原型链上

```
var arr = [1,2,3];

<!-- 判断对象的构造函数是否是数组。这两行代码是一样的 -->
console.log(arr.__proto__.constructor === Array); //true
console.log(arr.constructor === Array); // true

<!--如果对象的原型是数组原型（Array.prototype）,也可以确定对象就是数组。Object.getPrototypeOf(object) 方法返回指定对象的原型 -->
console.log(Object.getPrototypeOf(arr) === Array.prototype);// true

<!-- isPrototypeOf()  方法用于测试一个对象是否存在于另一个对象的原型链上 -->
console.log(Array.prototype.isPrototypeOf(arr)); // true
```

2. `isArray()`

`isArray()` 是 [Array](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array) 类型的一个静态方法，使用它可以判断一个值是否为数组

```
var arr = [1,2,3];
console.log(typeof arr);  //返回 “object”, 显然是不行，typeof 可以判断基础类型，不能判断引用类型
console.log(Array.isArray(arr));  // true
```

3. `instanceof` 判断

```
var arr = [1,2,3];
console.log(arr instanceof Array); // true
```

4. 通用的 [Object.prototype.toString](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/toString)

```
var arr = [1, 3];
console.log(Object.prototype.toString.call(arr) === '[object Array]')
```

## 数组去重

1. Array.from() + new Set

```
const arr1 = [1,2,3,4,2,3,5]
Array.from(new Set(arr1));

<!-- 运算扩展符，代码量最少的方式-->
[...new Set(arr1)]
```

2. 使用数组的 api 去迭代

比如说：`Array.prototype.filter`

[JavaScript 数组去重的方法（12 种方法，史上最全）](https://segmentfault.com/a/1190000016418021)

## Array 常用的 API

1. `Array.prototype.unshift()` `unshift()` 方法将一个或多个元素添加到数组的开头，并返回该数组的新长度(该方法修改原有数组)。

   ```
   const array = [];
   ```

2. `Array.prototype.shift()` `shift()` 方法从数组中删除第一个元素，并返回该元素的值。此方法更改数组的长度

   ```
   const array = [1,2,4,6];
   const firstElement = array.shift(); // 得到数组的第一个元素吗，同时原数组array的被改变
   console.log('firstElement: ', firstElement) // 1
   console.log('array: ', array) // [2,4,6]
   ```

## 将一个数组分成几个同等长度的数组

```
/*
 * 将一个数组分成几个同等长度的数组
 * array[分割的原数组]
 * size[每个子数组的长度]
 */

function sliceArray(array, size) {
  let result = [];
  for (let x = 0; x < Math.ceil(array.length / size); x++) {
    const start = x * size;
    const end = start + size;
    result.push(array.slice(start, end));
  }
  return result;
}
```
