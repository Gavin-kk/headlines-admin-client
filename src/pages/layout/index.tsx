import React, { memo, FC } from 'react';
import { Layout } from 'antd';
import Sider from 'antd/lib/layout/Sider';
import { Content, Footer, Header } from 'antd/lib/layout/layout';
import { renderRoutes, RouteConfigComponentProps } from 'react-router-config';
import MMenu from '@pages/layout/components/menu';
import { NavLink } from 'react-router-dom';
import MHeader from './components/header';
import { LayoutWrapper, LeftNavBarWrapper } from './style';

type IProps = RouteConfigComponentProps

const Admin: FC<IProps> = ({ route }) => {
  // 获取用户信息
  const a = 0;

  return (
    <LayoutWrapper>
      <Layout className="layout">
        <Sider className="layout-left" id="layout-left">
          <LeftNavBarWrapper>
            <NavLink to="/home" className="text">
              <span>头条内容发布系统</span>
            </NavLink>
          </LeftNavBarWrapper>
          {/* 菜单 */}
          <MMenu />
        </Sider>
        <Layout>
          <Header className="layout-header">
            {/* 头部组件 */}
            <MHeader />
          </Header>
          <Content style={{ padding: '0 50px' }}>
            {/* 渲染路由 */}
            {renderRoutes(route?.routes)}
          </Content>
          <Footer>Footer</Footer>
        </Layout>
      </Layout>
    </LayoutWrapper>

  );
};

export default memo(Admin);
