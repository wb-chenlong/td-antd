## td-antd

- 业务开发中沉淀下来的组件，基于 antd 的封装。
- 请确保在宿主项目中引入了 antd 依赖以及在代码中引入了 antd 样式。
- [API](http://td-antd.zhugelong.cn/)

### Install

```
npm install --save td-antd
```

### Usage

```
import { FormItem } from 'td-antd';
```

### Development

```
$ git clone https://github.com/long-zhuge/td-antd.git
$ npm i
$ npm run build
$ sudo npm link

// 宿主项目中
$ npm link td-antd

// Usage
import { FormItem } from 'td-antd';

// 单个组件引入
import FormItem from 'td-antd/es/form-item';

// 卸载测试组件
npm unlink td-antd
```
