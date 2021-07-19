import React, { cloneElement } from 'react';
import classNames from 'classnames';
import { Spin, Space } from 'antd';
import Item from './item';
import './index.less';

export const MagicContext = React.createContext({});

// 最外层组件
const Magic = (props) => {
  const {
    wrapperClassName,
    footer,
    footerVisible = true,
    footerStyle,
    children,
    loading = false,
    left = 200,
    boxShadow = true,
    onCollapsed,
    ...rest
  } = props;

  const getItems = React.Children.map(children, ((child, index) => {
    if (child) {
      return cloneElement(child, {
        itemKey: child.props.itemKey || index,
        onCollapsed: child.props.onCollapsed || onCollapsed,
      });
    }

    return null;
  }));

  return (
    <MagicContext.Provider
      value={{
        boxShadow,
        onCollapsed,
      }}
    >
      <Spin
        wrapperClassName={classNames(wrapperClassName, 'td-magic-wrap', {
          'td-magic-wrap-padding-bottom': footerVisible && footer,
        })}
        style={{ paddingBottom: footer ? 64 : 0}}
        spinning={loading}
        {...rest}
      >
        {getItems}
        {footerVisible && <Space className="td-magic-footer" style={{ left, ...footerStyle }}>{footer}</Space>}
      </Spin>
    </MagicContext.Provider>
  );
};

Magic.Item = Item;

export default Magic;
