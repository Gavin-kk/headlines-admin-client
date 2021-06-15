import { Button, DatePicker, Form, Radio, Select } from 'antd';
import React, { memo, FC, useEffect, useCallback } from 'react';
import 'moment/locale/zh-cn';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import moment from 'moment';
import { useForm } from 'antd/es/form/Form';
import { stateConfig } from './state.config';
import { FormWrapper } from './style';
import { ReducerActionType } from '../../types/action.type';
import { changeArticlesListLoadAction, getArticleListAction, getChannelListAction } from '../../store/actions';
import { IRootReducer } from '../../../../store/types/root-reducer.interface';
import { IGetArticleListLoad } from '../../types/request.interface';
import { ArticleStatus } from '../table';

const { Option } = Select;
const { RangePicker } = DatePicker;

interface IValue {
  state: ArticleStatus;
  channel: number;
  date: string[];
}

const Filter: FC = () => {
  const { channelList } = useSelector(
    (state: IRootReducer) => ({
      channelList: state.article.channelList,
    }),
    shallowEqual,
  );
  const [form] = useForm();

  const dispatch = useDispatch<Dispatch<ReducerActionType>>();

  useEffect(() => {
    // 获取所有频道
    dispatch(getChannelListAction);
  }, []);
  const onFinish = (values: IValue) => {
    const value: IGetArticleListLoad = {
      status: values.state,
      channelId: values.channel,
      startTime: values.date ? moment(values.date[0]).valueOf() : undefined,
      endTime: values.date ? moment(values.date[1]).valueOf() : undefined,
    };
    // 把本次请求的数据派发到 redux 中 方便点击分页时
    dispatch(changeArticlesListLoadAction(value));
    // 发送网路请求数据
    dispatch(getArticleListAction(value));
  };
  // 清除筛选
  const clearFilter = useCallback(() => {
    dispatch(changeArticlesListLoadAction(null));
    dispatch(getArticleListAction({}));
    form.resetFields();
  }, []);

  return (
    <FormWrapper>
      <Form
        labelCol={{ span: 0 }}
        wrapperCol={{ span: 24 }}
        name="basic"
        onFinish={onFinish}
        initialValues={{ state: 'all' }}
        form={form}
      >
        <Form.Item name="state" label="状态">
          <Radio.Group>
            {stateConfig.map((item) => (
              <Radio key={item.key} value={item.key}>
                {item.value}
              </Radio>
            ))}
          </Radio.Group>
        </Form.Item>
        <Form.Item name="channel" label="频道">
          <Select style={{ width: 200 }} placeholder="请选择频道" allowClear>
            {channelList?.map((item) => (
              <Option key={item.id} value={item.id}>
                {item.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="日期" name="date">
          <RangePicker showTime getPopupContainer={(node: HTMLElement) => node} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 0, span: 24 }}>
          <Button type="primary" htmlType="submit" style={{ marginLeft: 40 }}>
            筛选
          </Button>
          <Button type="primary" style={{ marginLeft: 20 }} onClick={clearFilter}>
            清除筛选
          </Button>
        </Form.Item>
      </Form>
      <div className="form-line" />
    </FormWrapper>
  );
};

export default memo(Filter);
