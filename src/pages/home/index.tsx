import React, { memo, FC } from 'react';
import { DatePicker, Form, Space } from 'antd';

const Home: FC = () => (
  <>
    <Form.Item label="DatePicker">
      <Space direction="vertical" size={12}>
        <DatePicker size="small" />
      </Space>
    </Form.Item>
  </>
);

export default memo(Home);
