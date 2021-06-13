import React, { memo, FC } from 'react';
import { DatePicker, Form, Space } from 'antd';

interface IProps {

}

const Home: FC<IProps> = ({}) => (
  <>
    <Form.Item label="DatePicker">
      <Space direction="vertical" size={12}>
        <DatePicker size="small" />
      </Space>
    </Form.Item>
  </>
);

export default memo(Home);
