import React from 'react';
import './index.less';

import { LoadingProps } from './interface';

const Loading: React.FC<LoadingProps> = ({ loading, error }) => {
  // 使用1024数字文本生成数字
  if (loading) {
    return (
      <div className="wrap">
        <i className="number first">1</i>
        <i className="number second">0</i>
        <i className="number third">2</i>
        <i className="number fourth">4</i>
      </div>
    );
  }
  if (error) {
    return <div>Sorry, there was a problem loading the page.</div>;
  }
  return null;
};

export default Loading;
