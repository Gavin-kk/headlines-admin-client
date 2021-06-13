import React, {
  memo, FC, useEffect, useState, useCallback, Suspense,
} from 'react';
import { Layout } from 'antd';
import Sider from 'antd/lib/layout/Sider';
import { Content, Footer, Header } from 'antd/lib/layout/layout';
import { renderRoutes, RouteConfigComponentProps } from 'react-router-config';
import MMenu from '@pages/layout/components/menu';
import { NavLink, useLocation } from 'react-router-dom';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { ReducerActionType } from '@pages/layout/types/action.type';
import { Dispatch } from 'redux';
import { IRootReducer } from '@src/store/types/root-reducer.interface';
import { TOKEN_KEY } from '@common/constant/constant';
import logo from '@assets/img/logo.svg';
import Loading from '@components/loading';
import MHeader from './components/header';
import { LayoutWrapper, LeftNavBarWrapper } from './style';
import { getUserInfoAction } from './store/actions';

type IProps = RouteConfigComponentProps

const Admin: FC<IProps> = ({
  route,
  history,
}) => {
  const { isLogin } = useSelector((state:IRootReducer) => ({
    isLogin: state.auth.whetherToLogIn,
  }), shallowEqual);
  // 侧边导航是否折叠
  const [collapsed, setCollapsed] = useState<boolean>(true);

  const dispatch = useDispatch<Dispatch<ReducerActionType>>();
  const location = useLocation();

  useEffect(() => {
    const token:string | null = window.localStorage.getItem(TOKEN_KEY);
    if (token) {
      // 获取用户信息
      dispatch(getUserInfoAction);
    } else {
      history.replace('/login');
    }
  }, [isLogin, location]);

  // 处理折叠菜单
  const handleCollapsed = useCallback(() => {
    setCollapsed(!collapsed);
  }, [collapsed]);

  return (
    <LayoutWrapper>
      <Layout className="layout">
        <Sider
          className="layout-left"
          id="layout-left"
          collapsible
          collapsed={collapsed}
          onCollapse={handleCollapsed}
          width={230}
        >
          <LeftNavBarWrapper>
            <NavLink to="/home" className="text">
              {
                !collapsed ? <span>头条内容发布系统</span> : <div className="img-box"><img src={logo} alt="logo" /></div>
              }
            </NavLink>
          </LeftNavBarWrapper>
          {/* 菜单 */}
          <MMenu />
        </Sider>
        <Layout style={{ overflow: 'auto' }}>
          <Header className="layout-header">
            {/* 头部组件 */}
            <MHeader />
          </Header>
          <Content style={{ padding: '0 50px' }}>
            {/* 渲染路由 */}
            <Suspense fallback={<Loading />}>
              {renderRoutes(route?.routes)}
            </Suspense>
          </Content>
          <Footer>Footer</Footer>
        </Layout>
      </Layout>
    </LayoutWrapper>

  );
};

export default memo(Admin);
