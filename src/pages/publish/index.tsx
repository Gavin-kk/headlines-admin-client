import React, {
  memo, FC, useState, useCallback, useEffect, useRef,
} from 'react';
import Bread from '@components/bread';
import {
  Button, Card, Form, Input, notification, Select,
} from 'antd';
import { ArgsProps } from 'antd/lib/notification';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { RuleObject } from 'rc-field-form/lib/interface';
import { ISubmit } from '@src/store/types/request.interface';
import { Dispatch } from 'redux';
import { useForm } from 'antd/lib/form/Form';
import BraftEditor from 'braft-editor';
import RichBraftEditor from './components/braft-editor';
import CoverUpload from './components/cover-upload';
import { changeSubmissionStatusAction, getChannelListAction, submitArticleAction } from './store/actions';
import { IRootReducer } from '../../store/types/root-reducer.interface';
import { ReducerActionType } from './types/action.type';
import { ArticleStatus } from '../article/components/table';

const layout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 21 },
};
const tailLayout = {
  wrapperCol: { offset: 2, span: 21 },
};

const { Option } = Select;

const Publish: FC = () => {
  const { channelList, submissionStatus } = useSelector((state:IRootReducer) => ({
    channelList: state.publish.channelList,
    submissionStatus: state.publish.submissionStatus,
  }), shallowEqual);

  const [richBraftEditorHtml, setRichBraftEditorHtml] = useState<string | null>(null);
  const [imageUrl, setImgUrl] = useState<string>('');
  const [status, setStatus] = useState<ArticleStatus>(ArticleStatus.pendingReview);
  const [disabled, setDisabled] = useState<boolean>(false);

  const [form] = useForm();
  const dispatch = useDispatch<Dispatch<ReducerActionType>>();
  const richTextEditorRef = useRef<BraftEditor>(null);

  useEffect(() => {
    if (submissionStatus) {
      setTimeout(() => {
        dispatch(changeSubmissionStatusAction(false));
      }, 1000);
      form.resetFields();
      setImgUrl('');
      setRichBraftEditorHtml('');
      setDisabled(false);
      richTextEditorRef.current?.clearEditorContent();
    }
  }, [submissionStatus]);

  useEffect(() => {
    dispatch(getChannelListAction);
    const args: ArgsProps = {
      message: '温馨提示',
      description:
          '请注意 **内容** 区域上传视频文件 仅支持.h264视频编码 AAC音频编码 格式的mp4视频文件, 否则不能保证可以正常预览或播放',
      duration: 0,
    };
    notification.warn(args);
  }, []);

  const onFinish = useCallback((values: { title: string; channel: number }) => {
    const submit: ISubmit = {
      ...values,
      content: richBraftEditorHtml,
      cover: imageUrl,
      status,
    };
    dispatch(submitArticleAction(submit));
  }, [status, imageUrl, richBraftEditorHtml]);

  // 存为草稿
  const draft = useCallback(() => {
    setStatus(ArticleStatus.draft);
    form.submit();
  }, []);

  const richBraftEditorChange = useCallback((html:string) => {
    setRichBraftEditorHtml(html);
  }, []);

  const titleCheck = useCallback(async (rule:RuleObject, value:string) => {
    if (!value) {
      await Promise.reject(new Error('标题不可为空'));
    }
    if (value.length < 3) {
      await Promise.reject(new Error('标题长度不足'));
    }
    await Promise.resolve();
  }, []);

  const coverUploadImg = useCallback((imgUrl:string) => {
    setImgUrl(imgUrl);
    setDisabled(true);
  }, []);

  return (
    <Card title={<Bread />}>
      <Form
        {...layout}
        name="basic"
        onFinish={onFinish}
        form={form}
      >
        <Form.Item
          label="标题"
          name="title"
          rules={[{ required: true, message: '' }, { validator: titleCheck }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="内容"
        >
          <RichBraftEditor onChange={richBraftEditorChange} value={richBraftEditorHtml} ref={richTextEditorRef} />
        </Form.Item>
        <Form.Item
          label="封面"
        >
          <CoverUpload onChange={coverUploadImg} imageUrl={imageUrl} disabled={disabled} />
        </Form.Item>
        <Form.Item
          label="频道"
          name="channel"
          rules={[{ required: true, message: '频道不可为空' }]}
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
          <Button type="primary" htmlType="submit" style={{ marginRight: 20 }}>
            提交文章
          </Button>
          <Button type="primary" onClick={draft}>
            存为草稿
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default memo(Publish);
