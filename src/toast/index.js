import { message } from 'antd';

message.config({maxCount: 1});

export default function toast(props) {
  const {
    type = 'success',
    text = '',
    time = 3,
  } = props;
  return message[type](text, time);
}
