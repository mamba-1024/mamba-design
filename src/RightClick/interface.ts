import { ReactNode } from 'react';

export interface MenuItem {
  title: string;
  onClick: (val: any) => void;
}

export interface ContextDataItem {
  [key: string]: any;
}
export interface IProps {
  // 要挂载有鼠标右键事件的 dom 元素的id
  id?: string;
  // 要使用鼠标右键的元素
  children: ReactNode;
  // 当前鼠标右键的节点数据
  data?: ContextDataItem;
  // 鼠标右键菜单
  menus: MenuItem[];
  // 右键事件
  onContextMenu?: (e: ContextDataItem | undefined) => void;
}
