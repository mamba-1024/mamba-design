---
title: 拿来即用
nav:
  path: /guide
  title: 积累
  order: 1
group:
  path: /guide
  order: 0
  title: 拿来即用
---

# 拿来即用

## 千分位格式化

通常我们前端拿到后端给的金额数据都是保留两位小数的字符串

此时就需要我们把它转为市面上标准的千分位显示格式

例如：将金额字符串转化为千分的逗号分隔形式 "1,000,000.00"

### 使用正则表达式

```
function toThousands (price) {
  return (price || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
}
```

## 四舍五入保留一位小数

```
  const discount = Math.round((lowPrice / highPrice) * 100) / 10;
  discount.toFixed(1);
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

## 数组去重

1. Array.from() + new Set

```
const arr1 = [1,2,3,4,2,3,5]
Array.from(new Set(arr1))  === [...new Set(arr1)]
```

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

## js 取余 %

一个数字除以一个单位数字后取余 `%`

```
 const otherLength = 36 % 7 ; // 1
```

## CSS

> CSS 的属性 vertical-align 用来指定行内元素（inline）或表格单元格（table-cell）元素的垂直对齐方式不能用它垂直对齐块级元素。

值：baseline | sub | super | text-top | text-bottom | middle | top | bottom

```
vertical-align: middle;
```

[官方说明](https://developer.mozilla.org/zh-CN/docs/Web/CSS/vertical-align)

## webpack-dev-server

保证服务可以通过 IP 访问到，可以在配置项`devServer`中增加 `host: '0.0.0.0'` 。

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

## react-native

> 需要在 `ios/{project}/info.plist` 中加入对应的 `key`

1. 使用相机和图库 [react-native-image-picker](https://github.com/react-native-image-picker/react-native-image-picker)

   - iOS 调用相机
     ```
     <key>NSPhotoLibraryUsageDescription</key>
     <string>photoLibraryUsageDescription</string>
     <key>NSCameraUsageDescription</key>
     <string>cameraDesciption</string>
     ```

   ```

   ```

2. 使用 icon [react-native-vector-icons](https://github.com/oblador/react-native-vector-icons)

```
<key>UIAppFonts</key>
<array>
  <string>AntDesign.ttf</string>
  <string>Entypo.ttf</string>
  <string>EvilIcons.ttf</string>
  <string>Feather.ttf</string>
  <string>FontAwesome.ttf</string>
  <string>FontAwesome5_Brands.ttf</string>
  <string>FontAwesome5_Regular.ttf</string>
  <string>FontAwesome5_Solid.ttf</string>
  <string>Foundation.ttf</string>
  <string>Ionicons.ttf</string>
  <string>MaterialIcons.ttf</string>
  <string>MaterialCommunityIcons.ttf</string>
  <string>SimpleLineIcons.ttf</string>
  <string>Octicons.ttf</string>
  <string>Zocial.ttf</string>
</array>
```

## react-native 实现虚线需求

```
height: 0,
width: '100%',
borderWidth: 1,
borderColor: '#EEE',
borderStyle: 'dashed',
```

在 web 端我们很容易就可以去实现一个**虚线**形式的分割线，只用一个上边框，设置 style 为`dashed`,

```
height: 0,
width: '100%',
borderTop: 1px dashed '#EEE',
```

但是在`react-native`中，以下代码你会很绝望的。

```
height: 0,
width: '100%',
borderTopWidth: 1,
borderColor: '#EEE',
borderStyle: 'dashed',
```

## 双问号 ??

当左边的值为 null 或者 undefined 时，就返回右边的值

const result = undefined ?? true // true

## 深拷贝

```
function deepCopy(data, hash = new WeakMap()) {
      if(typeof data !== 'object' || data === null){
            throw new TypeError('传入参数不是对象')
        }
      // 判断传入的待拷贝对象的引用是否存在于hash中
      if(hash.has(data)) {
            return hash.get(data)
        }
      let newData = {};
      const dataKeys = Object.keys(data);
      dataKeys.forEach(value => {
         const currentDataValue = data[value];
         // 基本数据类型的值和函数直接赋值拷贝
         if (typeof currentDataValue !== "object" || currentDataValue === null) {
              newData[value] = currentDataValue;
          } else if (Array.isArray(currentDataValue)) {
             // 实现数组的深拷贝
            newData[value] = [...currentDataValue];
          } else if (currentDataValue instanceof Set) {
             // 实现set数据的深拷贝
             newData[value] = new Set([...currentDataValue]);
          } else if (currentDataValue instanceof Map) {
             // 实现map数据的深拷贝
             newData[value] = new Map([...currentDataValue]);
          } else {
             // 将这个待拷贝对象的引用存于hash中
             hash.set(data,data)
             // 普通对象则递归赋值
             newData[value] = deepCopy(currentDataValue, hash);
          }
       });
      return newData;
  }
```

## 版本号比较算法

给你两个版本号 version1 和 version2 ，请你比较它们。

版本号由一个或多个修订号组成，各修订号由一个 '.' 连接。每个修订号由 多位数字 组成，可能包含 前导零 。每个版本号至少包含一个字符。修订号从左到右编号，下标从 0 开始，最左边的修订号下标为 0 ，下一个修订号下标为 1 ，以此类推。例如，2.5.33 和 0.1 都是有效的版本号。

比较版本号时，请按从左到右的顺序依次比较它们的修订号。比较修订号时，只需比较 忽略任何前导零后的整数值 。也就是说，修订号 1 和修订号 001 相等 。如果版本号没有指定某个下标处的修订号，则该修订号视为 0 。例如，版本 1.0 小于版本 1.1 ，因为它们下标为 0 的修订号相同，而下标为 1 的修订号分别为 0 和 1 ，0 < 1 。

返回规则如下：

如果  version1 > version2  返回  1，如果  version1 < version2 返回 -1，除此之外返回 0。

示例 1：

```
输入：version1 = "1.01", version2 = "1.001"
输出：0
解释：忽略前导零，"01" 和 "001" 都表示相同的整数 "1"
```

示例 2：

```
输入：version1 = "1.0", version2 = "1.0.0"
输出：0
解释：version1 没有指定下标为 2 的修订号，即视为 "0
```

> 来源：力扣（LeetCode）链接：https://leetcode-cn.com/problems/compare-version-numbers

/\*\*

- @param {string} version1
- @param {string} version2
- @return {number} \*/ var compareVersion = function(version1, version2) {

};

## list 转为 tree

```
const arr = [
  {id: 1, name: 1, pId: 0 },
  {id: 2, name: 2, pId: 0 },
  {id: 3, name: 3, pId: 1 },
  {id: 4, name: 4, pId: 1 },
  {id: 5, name: 5, pId: 2 },
  {id: 6, name: 6, pId: 2 },
  {id: 7, name: 7, pId: 3 },
  {id: 8, name: 8, pId: 4 },
];

// 递归遍历
const list2tree1 = (list, pId) => {
  return list.filter(item => {
      if (item.pId === pId) {
          item.children = list2tree1(list, item.menuId)
          return true
      }
      return false
  })
}


const list2tree4 = (list, pId) => {
  // 暂存到一个对象中
  let menuObj = {}
  list.forEach(item => {
      item.children = []
      menuObj[item.id] = item
  })
  return list.filter(item => {
      if (item.pId !== pId) {
          menuObj[item.pId].children.push(item)
          return false
      }
      return true
  })
}
```

## 安卓设备连接

`adb devices` 查看可用设备

`npm run android` 生成 build 包（debug 模式）

`adb install android/app/build/outputs/apk/debug/app-debug.apk` debug 模式，安装应用

`adb reverse tcp:8081 tcp:8081` 应用连接设备

`npm run start:rn` 启动服务

## react native 元素绝对定位消失了？？？？

场景：子元素设置了绝对定位，同时子元素的位置设置为负值

```
parent: {
  width: 120,
  height: 60,
}
child: {
  width: '100%'
  height: 6,
  position: 'absolute',
  bottom: -6,  // 注意 bottom 设置为 -6 的时候，该元素已经超出了父元素的范围，
}
```

## mac 通过终端命令查看端口号

命令 lsof -i tcp:port （port 替换成端口号，比如 8081）可以查看该端口被什么程序占用，并显示 PID，方便 KILL（kill pid）

1. 查看端口被哪个程序占用 sudo lsof -i tcp:port 如： sudo lsof -i tcp:8081
2. 看到进程的 PID，可以将进程杀死。 sudo kill -9 PID 如：sudo kill -9 6767

## 点击其他地方隐藏内容

```
  useLayoutEffect(() => {
    document.addEventListener('click', () => {
      setVisible(false);
    })
  });
```

## RN Android 重新构建

```
cd android
./gradlew clean installDebug
```

## instanceof

`typeof`的用法，我们可以使用`typeof`来确认一个变量的数据类型，例如：字符串类型('string')、布尔类型('boolean')、数字类型('number')、`undefined`、`function`。

如果使用`new`操作符，除 `Function` 外的所有构造函数的类型都是 `'object'`。看下面的栗子：

```
var str = new String('String');
var num = new Number(66);

typeof str; // 'object'
typeof num; // 'object'

var func = new Function();

typeof func;  // 'function'
```

我们可以得出一个简单的结论：

1. 基本类型数据，除 `null`（返回 `object` 类型）以外，都可以返回正确的结果类型。
2. 引用类型数据，除 `function`（返回 `function` 类型） 以外，一律返回 `object` 类型。

> 那么如果要检测某个对象是什么类型，我们可以用 `instanceof` 来检测某个对象是不是另一个对象的实例。

[instanceof](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/instanceof) 运算符用于检测构造函数的 `prototype` 属性是否出现在某个实例对象的原型链上。

### 基本语法：

```
object instanceof constructor
```

`instanceof` 是用来判断 L 是否为 R 的实例，表达式为：L instanceof R，如果 L 是 R 的实例，则返回 true,否则返回 false。

```
function instance_of(L, R) { //L 表示左表达式，R 表示右表达式
  var O = R.prototype; // 取 R 的显示原型
  L = L.__proto__; // 取 L 的隐式原型
  while (true) {
    if (L === null)
      return false;
    if (O === L) // 这里重点：当 O 严格等于 L 时，返回 true
      return true;
    L = L.__proto__;
  }
}
// 代码示例来源于：https://blog.csdn.net/luzhaopan/article/details/107505745
```

在 JavaScript 中，万物皆对象（通过`new`操作符得到对象）

```
new String('sss') instanceof Object;  // true

new Boolean(true) instanceof Object; // true

new Number(2) instanceof Object; // true

new Function() instanceof Object; // true

new Array([]) instanceof Object; // true
```

### instanceof 的常用例子

我们通常用来确认一个变量是不是数组。

检测 `constructor.prototype` 是否存在于参数 `object` 的原型链上。

```
var arr = [1, 2];

arr instanceof Array;
```

### Object.prototype.toString.call(\*\*\*)

使用`instanceof`和`typeof`判断数据类型都有局限性

- `instanceof` 用于判断**引用类型**的数据
- `typeof` 用于判断**基础数据类型**和**函数**
- `Object.prototype.toString.call()`，每个对象都有一个 `toString()` 方法，toString() 返回 `"[object type]"`，其中 `type` 是对象的类型。`Function.prototype.call()`的方式来调用，被检查的对象作为第一个参数。

```
var o = new Object();
o.toString();  // '[object Object]'

Object.prototype.toString.call(true); // '[object Boolean]'
Object.prototype.toString.call(1);  // '[object Number]'
Object.prototype.toString.call('1');  // '[object String]'
Object.prototype.toString.call(undefined); // '[object Undefined]'
Object.prototype.toString.call(null); // '[object Null]'
Object.prototype.toString.call([1]); // '[object Array]'
Object.prototype.toString.call({a: 1});   // '[object Object]'
Object.prototype.toString.call(Symbol(1)); // '[object Symbol]'
Object.prototype.toString.call(() => {}); // '[object Function]'
```

## React Hooks

`useEffect`effects 的心智模型和`componentDidMount`以及其他生命周期函数式不同的。它的心智模型更接近于状态同步，而不是响应生命周期事件

`react Hooks`性能优化：

- 减少`rerender次数` 。当父组件重新属性更新触发重新渲染的时候，子组件也会重新渲染
  1. 其实我们的子组件属性没有任何变化，此时我们不希望子组件重新渲染，我们可以将子组件使用`memo`将子组件包一下。
  2. 当父组件的方法通过`props`传给了子组件是，对子组件只使用`memo`是不行的，我们需要将父组件的方法通过`useCallback`钩子包一下，同时需要将钩子的依赖设置为`[]`空依赖。
- 减少`render复杂度`。使用`memoize-one`，来减少数据计算，如果入参不发生变化的话

  ```
  // 只有在list或filterText改变的时候才会重新调用真正的filter方法（memoize入参）
  filter = memoize((list, filterText) =>
    list.filter(item => item.text.includes(filterText))
  );

  // 在上一次render后，如果参数没有发生改变，memoize-one 会重复使用上一次的返回结果
    const filterList = this.filter(this.props.list, this.state.filterText);
  ```

> 我们可以说`useEffect`和`useCallback`是有返回值的，它的返回称之为`memoize`，它可以根据钩子的第二个参数(依赖数组)，来确定是否重新执行钩子中的函数。

## React Native

动画 [animated](https://reactnative.cn/docs/animated)

### CSS 文本两行显示省略号

> 文本内容需要顶宽 width: 156 关键属性 display: '-webkit-box' 关键属性 lineClamp: 2 关键属性 textOverflow: 'ellipsis' 关键属性 overflow: 'hidden'

```
  {
    display: '-webkit-box',
    width: 156,
    height: 36,
    lineHeight: 18,
    fontSize: 14,
    color: '#363433',
    textOverflow: 'ellipsis',
    lineClamp: 2,
    overflow: 'hidden',
  }


  <!-- 单行显示 -->
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;

```

### flex 布局

横向排列，如果占满自动换行

```
  {
    width: '100%',
    flex-direction: 'row',
    flex-wrap: 'warp',
  }
  可简写为：
  {
    width: '100%',
    flex-flow: row warp,
  }
```

### css 实现实现文字删除线效果

```
text-decoration: none|underline|overline|line-through|blink|inherit;
```

### FlatList 组件

[FlatList](https://reactnative.cn/docs/flatlist)

### react-intl

国际化方案，通过`provider`的注入形式实现项目国际化语音的切换
