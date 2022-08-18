import './search.less';

import { SearchOutlined } from '@ant-design/icons';
import { Input, message } from 'antd';
import React, { ChangeEvent, useState } from 'react';

import type { SearchItem, SearchProps } from './interface';

export default (props: SearchProps) => {
  const { data = [] } = props;
  const [value, setValue] = useState<string>(''); // 输入框的值
  const [options, setOptions] = useState<SearchItem[]>([]); // 可选项
  const [canBeActive, setCanBeActive] = useState<boolean>(false); // 搜索框是否是激活状态

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setValue(val);
    if (!val) {
      setCanBeActive(false);
      setOptions([]);
    } else {
      // 动态设置options
      const searchData = data?.filter((ele) => {
        return val && ele.label.includes(val);
      });
      setOptions(searchData);
      setCanBeActive(true);
    }
  };

  function handleFocus() {
    setCanBeActive(true);
  }
  function handleBlur() {
    setTimeout(() => {
      setCanBeActive(false);
    }, 200);
  }

  function handleItem(item: SearchItem) {
    setValue(item.label);
    message.info(`选择了 ${item.label}`);
  }

  return (
    <div className="search-wrap">
      <SearchOutlined className={`search-icon ${canBeActive ? 'active' : ''}`} />
      <Input
        value={value}
        className="search-input"
        onChange={handleChange}
        onFocus={() => handleFocus()}
        onBlur={() => handleBlur()}
        placeholder="请输入搜索内容"
      />
      {canBeActive &&
        (options?.length ? (
          <div className="search-dropdown">
            <ul className="dropdown-list">
              {options.map((item: SearchItem) => (
                <li className="item" key={item.value} onClick={() => handleItem(item)}>
                  {item.label}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="search-dropdown-no">
            <span>没有搜到结果，请重新输入</span>
          </div>
        ))}
    </div>
  );
};
