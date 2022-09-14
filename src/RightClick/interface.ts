export interface MenuItem {
  title: string;
  onClick: (val: any) => void;
}

export interface IProps {
  // 鼠标右键菜单
  menus: MenuItem[];
  // 挂载的 dom 元素 id，如果没有就挂载到 document 上
  id?: string;
  // 右键事件
  onContextMenuCallback?: (e: MenuItem) => void;
}

export interface ContextDataItem {
  [key: string]: any;
}
