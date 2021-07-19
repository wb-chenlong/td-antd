---
title: Magic
---

## Magic

魔法卡片

## 代码演示

```jsx
/**
 * title: 基础用法
 * desc: 可以使用 footerStyle:{justifyContent:'center'} 控制按钮的位置
 */
import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import { Magic } from 'td-antd';

export default () => {
  const [loading, setLoading] = useState(false);
  const [itemLoading, setItemLoading] = useState(false);
  
  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoading(false);
      }, 2000)
    }
  }, [loading])
  
  useEffect(() => {
    if (itemLoading) {
      setTimeout(() => {
        setItemLoading(false);
      }, 2000)
    }
  }, [itemLoading])

  return (
    <Magic
      loading={loading}
      left={260}
      footerStyle={{ justifyContent: 'flex-end' }}
      onCollapsed={(bool, key) => { console.log(bool, key) }}
      footer={(
        <>
          <Button size="large">保存草稿</Button>
          <Button size="large" type="primary">提交</Button>
        </>
      )}
    >
      <Magic.Item
        isCollapsed
        // title="项目A"
        titleExtra="自定义title"
        extra={<Button type="primary">新增</Button>}
        footer={<Button type="primary" onClick={() => { setLoading(true) }}>全局loading</Button>}
      >
        这里是内容
      </Magic.Item>
      <Magic.Item
        itemKey="haha"
        isCollapsed
        title="项目B"
        loading={itemLoading}
        extra={<Button type="primary">新增</Button>}
        onCollapsed={(bool, key) => { console.log('子组件的 onCollapsed', key) }}
        footer={<Button type="primary" onClick={() => { setItemLoading(true) }}>卡片loading</Button>}
      >
        这里是内容
      </Magic.Item>
      {null}
    </Magic>
  );
}
```

```jsx
/**
 * title: 无 header 用法
 * desc: 当没有 title、extra、isCollapsed 时，不会展示头部
 */
import React, { useState, useEffect } from 'react';
import { Button, DatePicker } from 'antd';
import { Magic, SearchForm, SelectMap } from 'td-antd';

export default () => {
  const [shadow, setShadow] = useState(true);

  return (
    <Magic.Item
      boxShadow={shadow}
      footer={<Button onClick={() => { setShadow(!shadow) }}>{shadow ? '关闭' : '开启'}阴影效果</Button>}
    >
      <SearchForm
        span={8}
        columns={[
          {
            title: '手机',
            dataIndex: 'phone',
            inputProps: { placeholder: '请输入手机号' },
          }, {
            title: '地址',
            dataIndex: 'address',
          }, {
            title: '年龄',
            dataIndex: 'age',
          }, {
            title: '状态',
            dataIndex: 'status',
            component: <SelectMap data={['很长的一个枚举值哟呵', '已完成']} />
          }, {
            title: '时间',
            dataIndex: 'date',
            component: <DatePicker style={{ width: '100%' }} />
          },
        ]}
      />
    </Magic.Item>
  );
}
```

```jsx
/**
 * title: 无阴影
 * desc: 在 Magic 中使用的 boxShadow 会传递给子组件。权重：子组件的优先级大于父组件
 */
import React, { useState, useEffect } from 'react';
import { Button, DatePicker } from 'antd';
import { Magic, SearchForm, SelectMap } from 'td-antd';

export default () => {
  return (
    <div style={{ background: '#f0f2f5', padding: 24 }}>
      <Magic boxShadow={false}>
        <Magic.Item>
          <SearchForm
            span={8}
            columns={[
              {
                title: '手机',
                dataIndex: 'phone',
                inputProps: { placeholder: '请输入手机号' },
              }, {
                title: '地址',
                dataIndex: 'address',
              }, {
                title: '年龄',
                dataIndex: 'age',
              }, {
                title: '状态',
                dataIndex: 'status',
                component: <SelectMap data={['很长的一个枚举值哟呵', '已完成']} />
              }, {
                title: '时间',
                dataIndex: 'date',
                component: <DatePicker style={{ width: '100%' }} />
              },
            ]}
          />
        </Magic.Item>
        <Magic.Item
          boxShadow
          isCollapsed
          title="项目B"
          extra={<Button type="primary">新增</Button>}
          footer={<Button type="primary">卡片loading</Button>}
        >
          这里是内容
        </Magic.Item>
      </Magic>
    </div>
  );
}
```

## API

|参数|说明|类型|默认值|
|:--|:--|:--|:--|
|wrapperClassName|Spin容器类名称|String|-|
|footer|页脚内容，会固定在底部|ReactNode|-|
|footerVisible|页脚内容是否展示|Boolean|true|
|loading|加载效果|Boolean|false|
|left|定位时距离左侧的值|Number|200|
|footerStyle|固定页脚的样式|Object|-|
|boxShadow|控制子组件是否有阴影效果|Boolean|true|
|onCollapsed|子组件 展开/收起 时的回调函数|Function(isCollapsed, itemKey)|-|

### Magic.Item

|参数|说明|类型|默认值|
|:--|:--|:--|:--|
|wrapperClassName|Spin容器类名称|String|-|
|title|标题|ReactNode|-|
|titleExtra|额外的标题内容|ReactNode|-|
|footer|页脚内容|ReactNode|-|
|footerVisible|页脚内容是否展示|Boolean|true|
|loading|加载效果|Boolean|false|
|isCollapsed|是否有折叠按钮|Boolean|false|
|extra|卡片右上角的操作区域|ReactNode|-|
|boxShadow|该权限大于父组件属性|Boolean|true|
|itemKey|组件的唯一标示|String/Number|-|
|onCollapsed|面板 展开/收起 的回调函数，权重大于父组件|Function(isCollapsed, itemKey)|-|
