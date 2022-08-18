export interface IProps {
  /**
   * 数据源
   */
  dataSource?: DataItem[];
  /**
   * 选中菜单事件
   */
  onSelect?: (val: DataItem) => void;
  /**
   * 折叠格式
   */
  collapsed?: boolean;
  /**
   * 布局方式
   */
  layout?: 'inline' | 'grid';
  /**
   * 搜索功能
   */
  search?: boolean;
  /**
   * 子元素
   * 当 collapsed 为 true 的时候，组件显示的内容
   */
  children?: any;
}

export interface DataItem {
  /**
   * 名称
   */
  name: string;
  /**
   * 标识key
   */
  key: string;
  /**
   * 路由地址
   */
  router?: string;
  /**
   * 菜单的子节点
   */
  children?: DataItem[];
}

export interface Position {
  x: number;
  y: number;
}

export interface MenuTree {
  // 菜单数据
  trees: DataItem;
  /**
   * 布局方式
   */
  layout?: 'inline' | 'grid';
  /**
   * onSelect事件
   */
  onSelect?: (val: DataItem) => void;
}

export interface SearchProps {
  /**
   * 可选数据
   */
  data?: SearchItem[];
}

export interface SearchItem {
  value: string;
  label: string;
}
