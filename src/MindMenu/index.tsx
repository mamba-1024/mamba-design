import { Popover } from 'antd';
import React, { useCallback, useMemo, useRef, useState } from 'react';

import type { DataItem, IProps, Position, SearchItem } from './interface';
import MenuTree from './menuTree';
import Search from './search';
import styles from './style.module.less';

/**
 * 将数据铺平，作为 search 的数据
 * @param array
 * @returns {Array}
 */
function getOptions(array: DataItem[]): DataItem[] {
  const arr: DataItem[] = [];

  function loop(a: DataItem[]) {
    a.forEach((ele) => {
      if (ele.children && ele.children.length) {
        loop(ele.children);
      } else {
        arr.push(ele);
      }
    });
  }

  loop(array);

  return arr;
}

export default function MindMenu(props: IProps) {
  const {
    dataSource = [],
    collapsed = false,
    layout = 'inline',
    search = false,
    children,
    onSelect,
  } = props;

  const [active, setActive] = useState<string>(''); // 选中的菜单
  const [showSub, setShowSub] = useState<boolean>(false); // 是否显示子菜单
  const timeout = useRef<any>(null); //  设置延迟定时器，防止鼠标移到tab内容经过菜单时的切换
  const mouseLocs: Position[] = useMemo(() => [], []); // 记录鼠标移动时的坐标数组
  let firstSlope: Position = useMemo(() => ({ x: 0, y: 0 }), []); // 菜单栏的固定点1， 根据菜单栏和内容的位置而改变
  let secondSlope: Position = useMemo(() => ({ x: 0, y: 0 }), []); // 菜单栏的固定点2， 根据菜单栏和内容的位置而改变
  const refNavigation = useRef<HTMLDivElement>(null);
  const refNav = useRef<HTMLUListElement>(null);
  const refSubnav = useRef<HTMLDivElement>(null);

  const options: SearchItem[] = useMemo(() => {
    return getOptions(dataSource).map((item) => {
      return {
        label: item.name,
        value: item.key,
      };
    });
  }, [dataSource]);

  /**
   * 根据内容栏相对于菜单栏的位置，判断移动过程中的点是否在三角形内
   * @param {Position} p1 开始位置
   * @param {Position} p2 菜单栏固定点1
   * @param {Position} p3 菜单栏固定点2
   * @param {Position} m 结束位置
   * @return {boolean} 是否在三角形内
   */
  function proPosInTriangle(p1: Position, p2: Position, p3: Position, m: Position) {
    // 结束时鼠标坐标位置
    const { x, y } = m;
    // 开始鼠标坐标位置
    const x1 = p1.x;
    const y1 = p1.y;
    // 菜单栏包裹层右上角坐标
    const x2 = p2.x;
    const y2 = p2.y;
    // 右下角坐标
    const x3 = p3.x;
    const y3 = p3.y;
    // (y2 - y1) / (x2 - x1)为两坐标连成直线的斜率
    // 因为直线的公式为y=kx+b;当斜率相同时，只要比较
    // b1和b2的差值就可以知道该点是在
    // (x1,y1),(x2,y2)的直线的哪个方向
    // 当r1大于0，说明该点在直线右侧，其它以此类推
    const r1 = y - y1 - ((y2 - y1) / (x2 - x1)) * (x - x1);
    const r2 = y - y2 - ((y3 - y2) / (x3 - x2)) * (x - x2);
    const r3 = y - y3 - ((y1 - y3) / (x1 - x3)) * (x - x3);

    const compare = r1 * r2 * r3 < 0 && r1 > 0;
    // 返回是否在三角形内的结果
    return compare;
  }

  /**
   * 获取元素相对于整个网页左上角的位置
   * @param { HTMLElement } element
   * @return {Position}
   * @constructor
   */
  function LocFromdoc(element: HTMLElement): Position {
    /**
     * getBoundingClientRect, https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect
     * 则可以将当前的滚动位置（可通过 window.scrollX 和 window.scrollY 获得）添加到 y / top 和 x / left 属性上
     */
    const { x, y } = element.getBoundingClientRect();
    return { x: x + window.scrollX, y: y + window.scrollY };
  }
  /**
   * 记录元素的位置信息
   * @param {HTMLElement} element
   * @return {{top: *, topAndHeight: number, left: *, leftAndWidth: number}}
   */
  function getInfo(element: HTMLElement) {
    const location = LocFromdoc(element);
    return {
      top: location.y,
      topAndHeight: location.y + element.offsetHeight, // offsetHeight 元素的像素高度, 高度包含该元素的垂直内边距和边框，且是一个整数
      left: location.x,
      leftAndWidth: location.x + element.offsetWidth,
    };
  }
  /**
   * 根据内容栏相对于菜单栏的位置， 返回菜单栏的固定点1，和固定点2，保存在firstSlope和secondSlope对象里
   * 即 左侧菜单栏的右上角和右下角的位置
   */
  function ensureTriangleDots() {
    // 获取菜单栏的位置
    const info = getInfo(refNav.current as HTMLUListElement);
    const x1 = info.leftAndWidth;
    const y1 = info.top;
    const x2 = x1;
    const y2 = info.topAndHeight;

    firstSlope = {
      x: x1,
      y: y1,
    };
    secondSlope = {
      x: x2,
      y: y2,
    };
  }

  const onMouseOver = useCallback(
    (obj: DataItem) => {
      let diff;
      try {
        // 是否在指定三角形内
        diff = proPosInTriangle(mouseLocs[0], firstSlope, secondSlope, mouseLocs[2]);
      } catch (ex) {
        console.log(ex);
      }
      // 是就启动延迟显示，
      // 否则不延迟
      if (diff) {
        timeout.current = setTimeout(() => {
          setActive(obj.key);
          setShowSub(true);
        }, 300);
      } else {
        setActive(obj.key);
        setShowSub(true);
      }
    },
    [timeout, mouseLocs, firstSlope, secondSlope],
  );

  const onMouseEnter = () => {
    // 计算位置
    if (refNav.current) {
      ensureTriangleDots();
    }
    // setShowSub(true);
  };

  // 移出菜单所在区域
  const onMouseLeave = () => {
    if (refSubnav.current) {
      setActive('');
      setShowSub(false);
    }
  };

  // 记录鼠标在菜单栏中移动的最后三个坐标位置，相对于整个网页左上角的位置
  const onMousemove = (event: React.MouseEvent) => {
    /**
     * pageX/Y 兼容性：除IE6/7/8不支持外，其余浏览器均支持
     * clientX/Y 兼容性：所有浏览器均支持。获取的是相对于当前屏幕的坐标，忽略页面滚动因素。但是我们需要考虑页面滚动，也就是相对于文档（body元素）的坐标，加上滚动的位移就可以了
     */
    const e = event || window.event;
    const scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
    const scrollY = document.documentElement.scrollTop || document.body.scrollTop;
    const x = e.pageX || e.clientX + scrollX;
    const y = e.pageY || e.clientY + scrollY;

    mouseLocs.push({ x, y });

    if (mouseLocs.length > 3) {
      // 移除超过三项的数据
      mouseLocs.shift();
    }
  };
  // 鼠标移出的时候，清除延时器
  const onMouseout = () => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
  };

  const content = (
    <div
      className={`${collapsed ? styles.popover : styles.navigation}`}
      ref={refNavigation}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <ul className={styles.menu} ref={refNav}>
        {dataSource?.map((ele) => (
          <li key={ele.key}>
            <div
              key={ele.key}
              className={`${styles.cateMenuItem} ${
                ele.key === active && styles.cateMenuItemActive
              }`}
              onMouseOver={() => onMouseOver(ele)}
              onMouseMove={onMousemove}
              onMouseOut={onMouseout}
              onFocus={() => {}}
              onBlur={() => {}}
            >
              {ele.name}
            </div>
          </li>
        ))}
      </ul>
      <div
        className={`${styles.tabContent} ${showSub && styles.tabContentActive} ${
          search && styles.search
        }`}
        ref={refSubnav}
      >
        {search ? <Search data={options} /> : null}
        {dataSource?.map((ele) => (
          <div
            key={ele.key}
            className={`${styles.items} ${ele.key === active && styles[`${layout}Active`]}`}
          >
            {ele.children?.map((item) => (
              <MenuTree key={item.key} trees={item} layout={layout} onSelect={onSelect} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );

  return collapsed ? (
    <Popover content={content} title={null} placement="bottomLeft">
      {children}
    </Popover>
  ) : (
    content
  );
}
