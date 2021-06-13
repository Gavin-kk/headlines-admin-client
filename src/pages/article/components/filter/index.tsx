import {
  Button, DatePicker, Form, Input, Radio, Select, Space,
} from 'antd';
import React, { memo, FC, useRef } from 'react';
import locale from 'antd/es/date-picker/locale/zh_CN';
import 'moment/locale/zh-cn';
import { stateConfig } from './state.config';
import { FormWrapper } from './style';

const { Option } = Select;
const { RangePicker } = DatePicker;

const Filter: FC = () => {
  const onFinish = (values: any) => {
    // 发送网路请求数据
    console.log('Success:', values);
  };

  return (
    <FormWrapper>
      <Form
        labelCol={{ span: 0 }}
        wrapperCol={{ span: 24 }}
        name="basic"
        onFinish={onFinish}
      >

        <Form.Item name="state" label="状态" initialValue={stateConfig[0]}>
          <Radio.Group>
            { stateConfig.map((item) => (<Radio key={item} value={item}>{item}</Radio>)) }
          </Radio.Group>
        </Form.Item>

        <Form.Item name="channel" label="频道">
          <Select
            style={{ width: 200 }}
            placeholder="请选择频道"
          >
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="tom">Tom</Option>
          </Select>
        </Form.Item>

        <Form.Item label="日期" name="date">
          <RangePicker
            showTime
            locale={locale}
            getPopupContainer={(node:HTMLElement) => node}
          />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 0, span: 24 }}>
          <Button type="primary" htmlType="submit" style={{ marginLeft: 40 }}>
            筛选
          </Button>
        </Form.Item>
      </Form>
      <div className="form-line" />
    </FormWrapper>
  );
};

export default memo(Filter);
