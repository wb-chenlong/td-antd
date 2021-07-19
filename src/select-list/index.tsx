import React, { useState, useRef, useImperativeHandle } from 'react';
import { Select, Spin } from 'antd';
import { SelectProps, SelectValue } from 'antd/es/select';
import { stringify } from 'qs';
import useDebounce from '../tools/useDebounce';
import localConfig from '../local-config';

interface IResponseType<DT = any> {
  success: boolean;
  dataObject: { values: DT[], totalCnt: number } | DT[];
  errorMessage?: string;
}

interface IPropTypes<DT> extends SelectProps<SelectValue> {
  url?: string;
  method?: 'GET' | 'POST';
  pageSize?: number;
  fields?: DT extends Record<string, string> ? [keyof DT, keyof DT] : null;
  searchField?: string;
  localData?: DT[];
  defaultParams?: Record<string, any>;
  getOptions?: (d: DT[]) => DT[];
  filterOptionChildren?: (item: DT, index: number) => React.ReactChild;
}

const { Option } = Select;

function SelectList<DataType extends Record<string, string> | string>(
  props: IPropTypes<DataType>,
  ref: React.Ref<any>
) {
  const {
    url,
    method = 'GET',
    pageSize = 200,
    fields = ['key', 'value'],
    searchField = fields[1],
    localData = [],
    defaultParams,
    getOptions = (d) => d,
    onSelect: propOnSelect,
    onFocus: propOnFocus,
    filterOptionChildren,
    ...restProps
  } = props;

  const focusRef = useRef(false);
  const { request } = localConfig.newInstance();
  const [data, setData] = useState<DataType[]>(localData);
  const [more, setMore] = useState<boolean>(true);
  const [params, setParams] = useState<Record<string, any>>();
  const [searchValue, setSearchValue] = useState<string>();
  const [loading, setLoading] = useState<boolean>(localData.length === 0);
  const [allDataLoaded, setAllDataLoaded] = useState<boolean>(localData.length > 0);

  useImperativeHandle(ref, () => ({
    fetchList,
  }))

  const fetchList = (param = {}, action) => {
    if (!url) {
      return;
    }
    let reqParams = defaultParams;
    if (pageSize) {
      reqParams = { ...reqParams, pageNum: 1, pageSize }
    }
    if (action !== 'reset') {
      reqParams = { ...reqParams, ...params };
    }
    if (action === 'loadmore') {
      reqParams = { ...reqParams, pageNum: reqParams.pageNum + 1 };
    }
    reqParams = { ...reqParams, ...param };
    let reqConfig = {};
    if (method === 'POST') {
      reqConfig = {
        url,
        method,
        body: reqParams,
      }
    }
    setLoading(true);
    request({
      url: `${url}?${stringify(reqParams)}`,
      ...reqConfig,
      onSuccess: ({ dataObject }: IResponseType<DataType>) => {
        const values = Array.isArray(dataObject) ? dataObject : dataObject.values;
        const totalCnt = Array.isArray(dataObject) ? dataObject.length : dataObject.totalCnt;
        const d = action === 'loadmore'
          ? data.concat(values)
          : values;
        const m = d.length < totalCnt;
        setData(d);
        setMore(m);
        setParams(reqParams);
        setAllDataLoaded(!m && !reqParams[searchField]);
      },
    }).finally(() => {
      setLoading(false);
    });
  }

  // 首次获得焦点时请求数据
  const onFocus = (e) => {
    if (!focusRef.current && !localData.length) {
      focusRef.current = true;
      fetchList({}, 'reset');
    }
    if (propOnFocus) {
      propOnFocus(e);
    }
  }

  // 选中搜索结果项时，重置搜索文本和选项数据
  const onSelect = (selectValue, option) => {
    if (!allDataLoaded && searchValue) {
      setSearchValue(undefined);
      fetchList({}, 'reset');
    }
    if (propOnSelect) {
      propOnSelect(selectValue, option);
    }
  }

  // 搜索资源项
  const search = useDebounce(v => {
    if (v.length === 0 || /\S+/.test(v)) {
      setData([]);
      fetchList({ [searchField]: v.trim() }, 'reset');
    }
  }, 600)

  // 文本框值变化时回调
  const onSearch = (v) => {
    if (!allDataLoaded) {
      setSearchValue(v);
      search(v);
    }
  }

  // 滚动加载更多资源
  const loadMore = (e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    if (!loading
      && more
      && el.scrollTop > el.scrollHeight - 300
    ) {
      fetchList({}, 'loadmore');
    }
  }

  return (
    <Select
      showSearch
      filterOption={allDataLoaded}
      optionFilterProp="label"
      placeholder="支持搜索"
      onSelect={onSelect}
      onSearch={onSearch}
      onFocus={onFocus}
      searchValue={searchValue}
      onPopupScroll={loadMore}
      dropdownMatchSelectWidth={false}
      {...restProps}
    >
      {getOptions(data).map((item, index) => {
        if (typeof item === 'string') {
          return <Option key={item} value={item} label={item}>{item}</Option>;
        }
        if (item && typeof item === 'object' && fields[0] in item) {
          return (
            <Option
              key={item[fields[0]]}
              value={item[fields[0]]}
              label={item[fields[1]]}
              {...item as Record<string, string>}
            >
              {filterOptionChildren?.(item, index) || item[fields[1]]}
            </Option>
          );
        }
        return null;
      })}
      {loading && <Option key="loading" value="loading" disabled><Spin size="small" /></Option>}
    </Select>
  );
}

export default React.forwardRef(SelectList);
