import React from 'react';
import type { DataItem, MenuTree } from './interface';
import styles from './style.module.less';
import { Button } from 'antd';

export default (props: MenuTree) => {
  const { trees, onSelect, layout = 'inline' } = props;

  const goRouter = (route: DataItem) => {
    onSelect?.(route);
  };

  return (
    <div className={styles[`${layout}TreeItem`]}>
      <span
        className={`${styles.treeItemTitle} ${trees.router && styles.cateMenuLk}`}
        onClick={() => goRouter(trees)}
      >
        {trees.name}
      </span>
      {trees.children?.length && (
        <div className={styles[`${layout}SubContent`]}>
          {trees.children.map((sub) => (
            <Button
              key={sub.key}
              className={styles.cateMenuLk}
              type="link"
              onClick={() => goRouter(sub)}
            >
              {sub.name}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};
