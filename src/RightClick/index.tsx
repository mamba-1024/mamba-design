/**
 * 鼠标右键事件
 */

import React, { useEffect, useState, useRef, useCallback } from 'react';
import styles from './style.module.less';

import { IProps, MenuItem } from './interface';

const RightClick: React.FC<IProps> = (props) => {
  const { menus, children, data, onContextMenu, id } = props;
  const key = JSON.stringify(data || new Date().valueOf());

  const [style, setStyle] = useState<React.CSSProperties>({
    position: 'fixed',
    left: 0,
    top: 0,
    zIndex: -100,
    opacity: 0,
  });

  const rightClickRef = useRef<any>();

  const handleContextMenu = useCallback(
    (event: any) => {
      event.preventDefault();
      onContextMenu?.(data);

      // 获取点击的位置
      let { clientX, clientY } = event;
      // 文档显示区的宽度
      const screenW: number = window.innerWidth;
      const screenH: number = window.innerHeight;
      // 右键菜单的宽度
      const rightClickRefW: number = rightClickRef.current.offsetWidth;
      const rightClickRefH: number = rightClickRef.current.offsetHeight;

      // right为true，说明鼠标点击的位置到浏览器的右边界的宽度可以放下contextmenu。
      // 否则，菜单放到左边。
      const right = screenW - clientX > rightClickRefW;
      const top = screenH - clientY > rightClickRefH;
      // 赋值右键菜单离鼠标一些距离
      clientX = right ? clientX + 6 : clientX - rightClickRefW - 6;
      clientY = top ? clientY + 6 : clientY - rightClickRefH - 6;
      setStyle((pre) => ({ ...pre, zIndex: 2, opacity: 1, left: clientX, top: clientY }));
    },
    [data, onContextMenu],
  );

  const handleClick = (event: any) => {
    // 点击关闭菜单
    if (event.target.parentNode !== rightClickRef.current) {
      setStyle((pre) => ({ ...pre, zIndex: -100, opacity: 0 }));
    }
  };

  useEffect(() => {
    if (id) {
      document.getElementById(id)?.addEventListener('contextmenu', handleContextMenu, true);
      document.addEventListener('click', handleClick, true);
      return () => {
        document.getElementById(id)?.removeEventListener('contextmenu', handleContextMenu, true);
        document.removeEventListener('click', handleClick, true);
      };
    } else if (children) {
      document.addEventListener('click', handleClick, true);
      return () => {
        document.removeEventListener('click', handleClick, true);
      };
    }
  }, [children, id, handleContextMenu]);

  const handleMenu = (item: MenuItem) => {
    // 回传点击的数据
    item.onClick(data);
    // 隐藏菜单
    setStyle((pre) => ({ ...pre, zIndex: -100, opacity: 0 }));
  };

  const ContextMenu = (
    <div
      key={`${key}-item`}
      className={`${styles.rightContextMenu} ${id}`}
      style={style}
      ref={rightClickRef}
    >
      {menus.map((ele) => (
        <div
          key={`${JSON.stringify(ele)}-rightContext`}
          onClick={() => handleMenu(ele)}
          className={styles.rightContextMenuItem}
        >
          {ele.title}
        </div>
      ))}
    </div>
  );

  return (
    <React.Fragment key={`${key}-item-wrap`}>
      {children && React.cloneElement(children as any, { onContextMenu: handleContextMenu })}
      {ContextMenu}
    </React.Fragment>
  );
};

export default React.memo(RightClick);
