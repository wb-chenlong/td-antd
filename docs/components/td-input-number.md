---
title: TdInputNumber
---

## TdInputNumber

基于 InputNumber 的二次封装，实现带单位的数字输入框

## 代码演示

```jsx
import React from 'react';
import { TdInputNumber } from 'td-antd';

export default () => {
  return (
    <>
      <TdInputNumber defaultValue={1000} />
      <br />
      <br />
      <TdInputNumber defaultValue={1000} unit="元" />
      <br />
      <br />
      <TdInputNumber defaultValue={1000} unit="$" />
      <br />
      <br />
      <TdInputNumber defaultValue={1000} unit="¥" />
    </>
  );
}
```

## API

支持原 [InputNumber](https://ant-design.gitee.io/components/input-number-cn/) API

|参数|说明|类型|默认值|
|:--|:--|:--|:--|
|unit|单位|String|无|

## 支持的货币符号

> 注意：以下货币符号会被前置，且金额在展示上会进行千位符格式化，不影响获取的值。

|符号|解释|
|:--|:--|
|¥|人民币/日元|
|$|美元|
|NT$|新台币|
|zł|波兰兹罗提|
|€|欧元|
