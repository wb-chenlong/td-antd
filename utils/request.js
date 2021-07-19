import { fetch } from 'dva';
import { message } from 'antd';

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

export default function request(props) {
  const {
    url,
    method = 'GET',
    headers = { 'pragma': 'no-cache' },
    body,
    onSuccess,
  } = props;
  const newOptions = { credentials: 'include', method, body, headers };
  const methodArr = ['POST', 'PUT', 'DELETE'];
  if (methodArr.indexOf(method) > -1) {
    if (!(newOptions.body instanceof FormData)) {
      newOptions.headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        ...newOptions.headers,
      };
      newOptions.body = JSON.stringify(newOptions.body);
    } else {
      // newOptions.body is FormData
      newOptions.headers = {
        Accept: 'application/json',
        ...newOptions.headers,
      };
    }
  }

  return fetch(url, newOptions)
    .then(checkStatus)
    .then(response => response.json())
    .then((data) => {
      if (data && data.success) {
        return onSuccess ? onSuccess(data) : data;
      }
      throw new Error(data?.errorMessage);
    })
    .catch(err => message.error(err.message));
}
