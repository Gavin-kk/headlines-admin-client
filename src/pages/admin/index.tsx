import React, { memo, FC } from 'react';
import { Layout } from 'antd';
import Sider from 'antd/lib/layout/Sider';
import { Content, Footer, Header } from 'antd/lib/layout/layout';
import { AdminWrapper } from './style';

interface IProps {

}

const Admin: FC<IProps> = ({}) => (
  <AdminWrapper>
    <Layout style={{ width: '100%' }}>
      <Sider>Sider</Sider>
      <Layout>
        <Header>Header</Header>
        <Content>Content</Content>
        <Footer>Footer</Footer>
      </Layout>
    </Layout>
  </AdminWrapper>
);

export default memo(Admin);
