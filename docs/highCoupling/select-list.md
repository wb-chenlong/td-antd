---
title: SelectList
---

## SelectList

### 基于 Select 封装的下拉框组件，支持分页请求和搜索数据。可用于 Form 的受控组件

- 仅在首次`onFocus`时触发数据请求
- 传入`localData`不会触发数据请求，进行本地搜索
- 基于返回数据结构存储数据并判断数据是否已全部加载（进行本地搜索）

## 代码演示

```jsx
/**
 * title: 接口支持分页，分页请求，服务端搜索
 */
import React from 'react';
import { localConfig, SelectList } from 'td-antd';
import request from '../../utils/request';

localConfig.config({ request });

export default () => {
  return (
    <SelectList
      style={{ width: 240 }}
      url="http://rap2api.taobao.org/app/mock/95250/get/api/random/qryByPage.json"
      pageSize={10}
      searchField="label"
      fields={['id', 'label']}
      mode="multiple"
      onChange={(v, o) => { console.log(v, o); }}
      placeholder="请选择随机生成的项，支持搜索"
    />
  );
}
```

```jsx
/**
 * title: 接口支持分页，数据量不是非常大，建议设置pageSize一次性获取全部数据，本地搜索
 */
import React from 'react';
import { localConfig, SelectList } from 'td-antd';
import request from '../../utils/request';

localConfig.config({ request });

export default () => {
  return (
    <SelectList
      style={{ width: 240 }}
      url="http://rap2api.taobao.org/app/mock/95250/get/api/random/qryOnePage.json"
      pageSize={200}
      fields={['id', 'label']}
      mode="multiple"
      onChange={(v, o) => { console.log(v, o); }}
      placeholder="请选择随机生成的项，支持搜索"
    />
  );
}
```

```jsx
/**
 * title: 接口不分页
 */
import React from 'react';
import { localConfig, SelectList } from 'td-antd';
import request from '../../utils/request';

localConfig.config({ request });

export default () => {
  return (
    <SelectList
      style={{ width: 240 }}
      url="http://rap2api.taobao.org/app/mock/95250/get/api/random/qry.json"
      pageSize={null}
      fields={['id', 'label']}
      onChange={(v, o) => { console.log(v, o); }}
      placeholder="请选择随机生成的项，支持搜索"
    />
  );
}
```

```jsx
/**
 * title: 本地数据
 */
import React from 'react';
import { localConfig, SelectList, tools } from 'td-antd';
import request from '../../utils/request';

localConfig.config({ request });

const localData = [];
for (let i = 0; i < 20; i++) {
  const id = tools.genNonDuplicateID(10);
  localData.push(id);
}

export default () => {
  return (
    <SelectList
      style={{ width: 240 }}
      localData={localData}
      onChange={(v, o) => { console.log(v, o); }}
      placeholder="请选择随机生成的项，支持搜索"
    />
  );
}
```

```jsx
/**
 * title: 自定义下拉展示option
 */
import React from 'react';
import { localConfig, SelectList, tools } from 'td-antd';
import request from '../../utils/request';

localConfig.config({ request });

const localData = [];
for (let i = 0; i < 20; i++) {
  const id = tools.genNonDuplicateID(10);
  localData.push(id);
}

export default () => {
  return (
    <SelectList
      style={{ width: 240 }}
      url="http://rap2api.taobao.org/app/mock/286633/get/country.json"
      pageSize={null}
      fields={['english', 'country']}
      onChange={(v, o) => { console.log(v, o); }}
      placeholder="请选择，支持搜索"
      filterOptionChildren={(item, index) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span>{item.country}--</span>
          <span>{item.english}</span>
        </div>
      )}
    />
  );
}
```

## API

支持原 [Select](https://ant-design.gitee.io/components/select-cn/) API

|参数|说明|类型|默认值|
|:--|:--|:--|:--|
|url|请求地址，由于内置使用 request 是从 localConfig 中获取的，不必再使用 proxy|String|-|
|method|请求方式|"GET" \| "POST"|"GET"|
|pageSize|不分页接口请设置`falsely`，不会生成分页请求参数|Number|200|
|fields|`Select.Option`的`key`和`value`，数据项为对象类型时请正确设置|[String, String]|['key', 'value']|
|searchField|搜索字段，数据未全部加载时从服务端获取搜索结果|String|fields[1]|
|localData|本地数据项，不再触发数据请求，进行本地搜索|Array|[]|
|defaultParams|默认请求参数|Object|-|
|getOptions|对数据项进行过滤|Function(d: DT[]) => DT[]|(d) => d|
|onChange|`option`参数保留完整数据项|Function(value, option: Option \| Array\<Option\>)|-|
|filterOptionChildren|自定义渲染下拉框内容 |Function(item, index) => ReactChild|-|

### Ref，使用 ref.current 进行调用

|参数|说明|类型|默认值|
|:--|:--|:--|:--|
|fetchList|通常用于重置数据|Function(param, action)|-|

> 注意：需要 localConfig.config 设置 request 后才能正常使用