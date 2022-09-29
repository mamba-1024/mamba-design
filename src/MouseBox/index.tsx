import React, { useEffect, useRef } from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { outClick } from './outClick.js';

import styles from './style.module.less';

interface IProps {
  // 选择区域的 ID
  root: string;
  // 可选择元素的 className
  target: string;
  // 选中的回调函数
  onChange: (selected: any[]) => void;
}

function UseSelected({ root, target, onChange }: IProps) {
  // 框选容器
  let rootElement: HTMLElement;
  // 框选容器在视图中的位置
  const rootPos = useRef<any>();
  // 所有的可选目标元素
  const targets = useRef<any[]>();

  // 鼠标按下时相对于 root 容器的位置 开始和结束(实时移动的点)的坐标点可以构成一个选中的方形区域， 然后判断方形区域是否和 targets 元素有交集，有的话就选中，没有就不选中
  let startX: number;
  let startY: number;

  // modal 选中区域
  let modal: HTMLElement;

  // 选中的元素
  let selected: any[] = [];

  // 启用 shift + 左键
  let canClick = false;

  // 取消全选
  function cancelSelected() {
    selected = [];
    targets.current?.forEach((elem: HTMLElement) => {
      // eslint-disable-next-line no-param-reassign
      elem.style.border = 'none';
    });
    onChange?.(selected);
  }

  // 鼠标移动
  function OnMouseMove(e: { clientX: any; clientY: any }) {
    const { clientX, clientY } = e;

    modal.style.visibility = 'visible';

    // 获取鼠标移动过程中指针的实时位置
    const endX = clientX - rootPos.current.x;
    const endY = clientY - rootPos.current.y;
    // 这里使用绝对值是为了兼容鼠标从各个方向框选的情况
    const width = Math.abs(endX - startX);
    const height = Math.abs(endY - startY);
    // 根据初始位置和实时位置计算出 modal 的 left、top
    const MLeft = Math.min(startX, endX);
    const MTop = Math.min(startY, endY);
    modal.style.left = `${MLeft}px`;
    modal.style.top = `${MTop}px`;
    modal.style.height = `${height}px`;
    modal.style.width = `${width}px`;

    checkOptions(MLeft, MTop, width, height);
    return false;
  }

  // 鼠标移动，执行碰撞检测
  function checkOptions(left: number, top: number, width: number, height: number) {
    const modalRight = left + width;
    const modalBottom = top + height;

    targets.current?.forEach((elem) => {
      // 获取元素的数据
      const data = JSON.parse(elem.getAttribute('data-data'));
      // 获取元素的位置信息
      const opts = elem.getBoundingClientRect();
      // 获取被框选对象们的x、y、width、height
      const x: number = opts.x - rootPos.current.x;
      const y: number = opts.y - rootPos.current.y;
      const w: number = opts.width;
      const h: number = opts.height;

      const optionTop = y;
      const optionRight = x + w;
      const optionBottom = y + h;
      const optionLeft = x;

      // 碰撞检查
      if (
        top > optionBottom ||
        modalRight < optionLeft ||
        modalBottom < optionTop ||
        left > optionRight
      ) {
        // eslint-disable-next-line no-param-reassign
        elem.style.border = 'none';
        selected = selected.filter((item) => item.id !== data.id);
      } else {
        if (selected.length === 0 || !selected.some((item) => item.id === data.id)) {
          selected.push(data);
        }
        // eslint-disable-next-line no-param-reassign
        elem.style.border = '1px solid #0073ff';
      }
    });
  }

  // 点击页面空白区域取消全选
  function OnClickBox() {
    // dispatch({ type: 'updateSelectedData', value: [] });
    cancelSelected();
  }

  // 鼠标左键按下事件
  function OnMouseDown(e: MouseEvent) {
    if (e.which !== 1) {
      return;
    } // 左键
    // 点击前取消所有选中的
    selected.length = 0;
    cancelSelected();

    // 容器的位置
    const { x, y } = rootElement.getBoundingClientRect();
    rootPos.current = { x, y };

    // 记录点击的位置
    startX = e.clientX - rootPos.current.x;
    startY = e.clientY - rootPos.current.y;
    // 添加鼠标移动的事件
    rootElement.addEventListener('mousemove', OnMouseMove);
    modal = document.querySelector('#mouseModal') as HTMLElement;

    return false;
  }

  // 鼠标抬起事件
  function OnMouseUp(e: MouseEvent) {
    if (e.which !== 1) {
      return;
    } // 左键
    // 移除时间监听
    rootElement.removeEventListener('mousemove', OnMouseMove);
    // 重置 modal 的样式
    modal.style.visibility = 'hidden';
    modal.style.left = '0px';
    modal.style.top = '0px';
    modal.style.width = '0px';
    modal.style.height = '0px';
    // dispatch({ type: 'updateSelectedData', value: selected });
    onChange?.(selected);
    return false;
  }

  const OnKeyPress = (e: { key: string }) => {
    // 案件 shift 和 command
    if (e.key === 'Shift' || e.key === 'Meta') {
      canClick = true;
    }
  };

  const OnKeyUp = (e: { key: string }) => {
    if (e.key === 'Shift' || e.key === 'Meta') {
      canClick = false;
    }
  };

  const handleClick = (event: any) => {
    if (canClick) {
      const data = event.target.dataset?.data ? JSON.parse(event.target.dataset.data) : null;
      if (!data) {
        return;
      }
      if (selected.length === 0 || !selected.some((ele) => ele.id === data.id)) {
        selected.push(data);
        // dispatch({ type: 'updateSelectedData', value: selected });
        event.target.style.border = '1px solid #0073ff';
      } else {
        selected = selected.filter((item) => item.id !== data.id);
        // dispatch({ type: 'updateSelectedData', value: selected });
      }
      onChange?.(selected);
    }
  };

  useEffect(() => {
    // 注入 outclick js
    const outclickJs = document.querySelector('#out-click-js');
    if (!outclickJs) {
      const script = document.createElement('script');
      script.id = 'out-click-js';
      script.innerHTML = outClick;
      document.head.appendChild(script);
    }
  }, []);

  useEffect(() => {
    if (root) {
      window.getSelection()?.removeAllRanges();

      // 允许鼠标框选的容器
      // eslint-disable-next-line react-hooks/exhaustive-deps
      rootElement = document.querySelector(root) as HTMLElement;
      rootElement.style.position = 'relative';
      rootElement.style.cursor = 'pointer';
      // 鼠标框选容器中可被选中的子元素
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      targets.current = rootElement.querySelectorAll(target);

      // 页面加载的时候为容器添加鼠标按下事件监听
      rootElement.addEventListener('mousedown', OnMouseDown, false);
      rootElement.addEventListener('mouseup', OnMouseUp, false);
      document.body.addEventListener('keydown', OnKeyPress, false);
      document.body.addEventListener('keyup', OnKeyUp, false);

      rootElement.addEventListener('click', handleClick);

      // 将右键弹出菜单排除，点击不触发 OnClickBox
      const exceptions: any[] = [
        document.querySelector('.detail-drawer'), // 详情弹窗
        // document.querySelector('.ant-collapse-header'),
        document.querySelector('.check-indirect'),
        document.querySelector('.pk-select-category-popover'),
      ];
      document.querySelectorAll('.rightContextMenuItem').forEach((ele) => exceptions.push(ele));
      // 点击 rootElement 范围外的元素触发
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      rootElement.addEventListener('outclick', OnClickBox, exceptions);

      return () => {
        rootElement.removeEventListener('mousedown', OnMouseDown, false);
        rootElement.removeEventListener('mouseup', OnMouseUp, false);
        document.body.removeEventListener('keydown', OnKeyPress, false);
        document.body.removeEventListener('keyup', OnKeyUp, false);
        rootElement.removeEventListener('outclick', OnClickBox);
        rootElement.removeEventListener('click', handleClick);
      };
    }
  }, [root, target]);

  return <div className={`${styles.mouseModal}`} id="mouseModal" />;
}

export default UseSelected;
