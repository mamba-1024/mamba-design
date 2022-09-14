/**
 * 鼠标右键事件
 */

import React, { useEffect, useState, useRef, useCallback } from 'react';
import styles from './style.module.less';

import { IProps, MenuItem, ContextDataItem } from './interface';

const RightClick: React.FC<IProps> = (props) => {
  const { menus, id, onContextMenuCallback } = props;

  const [style, setStyle] = useState<React.CSSProperties>({
    position: 'fixed',
    left: 0,
    top: 0,
    zIndex: -100,
    opacity: 0,
  });

  const rightClickRef = useRef<any>();
  const rightClickDataRef = useRef<ContextDataItem>();

  const handleContextMenu = useCallback(
    (event: any) => {
      event.preventDefault();
      const isCategoryMenu = event.target.dataset.click;
      if (isCategoryMenu === 'false' || isCategoryMenu === undefined) return;
      const data = JSON.parse(event.target.dataset.data);
      onContextMenuCallback?.(data);
      console.log('handleContextMenu: data ', isCategoryMenu, data);

      rightClickDataRef.current = data;

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
    [onContextMenuCallback],
  );

  const handleClick = (event: any) => {
    // 点击关闭菜单
    if (event.target.parentNode !== rightClickRef.current) {
      setStyle((pre) => ({ ...pre, zIndex: -100, opacity: 0 }));
    }
  };

  useEffect(() => {
    if (id) {
      document.getElementById(id).addEventListener('contextmenu', handleContextMenu);
      document.addEventListener('click', handleClick, true);
      return () => {
        document.getElementById(id).removeEventListener('contextmenu', handleContextMenu);
        document.removeEventListener('click', handleClick, true);
      };
    } else {
      document.addEventListener('contextmenu', handleContextMenu);
      document.addEventListener('click', handleClick, true);
      return () => {
        document.removeEventListener('contextmenu', handleContextMenu);
        document.removeEventListener('click', handleClick, true);
      };
    }
  }, [handleContextMenu, id]);

  const handleMenu = (item: MenuItem) => {
    // 回传点击的数据
    item.onClick(rightClickDataRef.current);
    // 隐藏菜单
    setStyle((pre) => ({ ...pre, zIndex: -100, opacity: 0 }));
  };

  const ContextMenu = (
    <div className={`${styles.rightContextMenu} ${id}`} style={style} ref={rightClickRef}>
      {menus.map((ele, index) => (
        <div
          key={`${ele.title}-${index}`}
          onClick={() => handleMenu(ele)}
          className={styles.rightContextMenuItem}
        >
          {ele.title}
        </div>
      ))}
    </div>
  );

  return ContextMenu;
};

export default React.memo(RightClick);
