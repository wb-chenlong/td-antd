---
title: LinkBtn
---

## LinkBtn

像 a 标签一样的按钮组件，语义化更好，可根据 @primary-color 进行颜色变更

## 代码演示

```jsx
/**
 * title: 默认样式
 */
import React from 'react';
import { LinkBtn } from 'td-antd';

export default () => {
  return(
    <LinkBtn onClick={() => {alert('add')}}>click</LinkBtn>
  );
}
```

```jsx
/**
 * title: 禁用状态
 */
import React from 'react';
import { LinkBtn } from 'td-antd';

export default () => {
  return(
    <LinkBtn disabled onClick={() => {alert('add')}}>click</LinkBtn>
  );
}
```

```jsx
/**
 * title: loading 状态
 */
import React, { useState } from 'react';
import { LinkBtn } from 'td-antd';

export default () => {
  const [loading, setLoading] = useState(false);

  return (
    <LinkBtn
      loading={loading}
      onClick={() => {
        setLoading(true);
        const timer = setTimeout(() => {
          setLoading(false);
          clearTimeout(timer);
        }, 2000)
      }}
    >click
    </LinkBtn>
  );
}
```

```jsx
/**
 * title: 危险按钮
 */
import React from 'react';
import { LinkBtn } from 'td-antd';

export default () => {
  return(
    <LinkBtn danger>click</LinkBtn>
  );
}
```

## API

|参数|说明|类型|默认值|
|:--|:--|:--|:--|
|className|样式类|String|-|
|loading|设置按钮载入状态|Boolean|false|
|danger|设置危险按钮|Boolean|false|
