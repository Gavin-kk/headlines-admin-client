import React, {
  memo, FC, useState, useCallback, useEffect,
} from 'react';
import Bread from '@components/bread';
import {
  Button, Card, Form, Input, message, notification, Select, Upload,
} from 'antd';
import { ArgsProps } from 'antd/lib/notification';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import RichBraftEditor from './components/braft-editor';
import CoverUpload from './components/cover-upload';
import { getChannelListAction } from './store/actions';
import { IRootReducer } from '../../store/types/root-reducer.interface';

const layout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 21 },
};
const tailLayout = {
  wrapperCol: { offset: 2, span: 21 },
};

const { Option } = Select;

const Publish: FC = () => {
  const { channelList } = useSelector((state:IRootReducer) => ({
    channelList: state.publish.channelList,
  }), shallowEqual);

  const [richBraftEditorHtml, setRichBraftEditorHtml] = useState<string>('');

  const disabled = useDispatch();
  useEffect(() => {
    disabled(getChannelListAction);
    const args: ArgsProps = {
      message: '温馨提示',
      description:
          '请注意 **内容** 区域上传视频文件 仅支持.h264视频编码 AAC音频编码格式的 mp4视频文件, 否则不能保证可以正常预览或播放',
      duration: 0,
    };
    notification.warn(args);
  }, []);

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const richBraftEditorChange = useCallback((html:string) => {
    setRichBraftEditorHtml(html);
  }, []);

  return (
    <Card title={<Bread />}>
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="标题"
          name="title"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="内容"
          name="content"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <RichBraftEditor onChange={richBraftEditorChange} value={richBraftEditorHtml} />
        </Form.Item>
        <Form.Item
          label="封面"
        >
          <CoverUpload />
        </Form.Item>
        <Form.Item
          label="频道"
        >
          <Select
            style={{ width: 200 }}
            placeholder="请选择频道"
            allowClear
          >
            { channelList?.map((item) => <Option key={item.id} value={item.id}>{item.name}</Option>) }
          </Select>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default memo(Publish);
