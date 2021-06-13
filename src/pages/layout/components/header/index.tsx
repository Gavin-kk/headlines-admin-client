import React, {
  memo, FC, useCallback, useMemo,
} from 'react';
import Weather from '@components/weather';
import { Popconfirm, Popover } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import { TOKEN_KEY } from '@common/constant/constant';
import { useHistory } from 'react-router';
import { shallowEqual, useSelector } from 'react-redux';
import { IRootReducer } from '@src/store/types/root-reducer.interface';
import { ContentWrapper, HeaderWrapper } from './style';

const MHeader: FC = () => {
  const { userinfo } = useSelector((state:IRootReducer) => ({
    userinfo: state.admin.userinfo,
  }), shallowEqual);

  const history = useHistory();

  const exit = useCallback(() => {
    window.localStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.removeItem(TOKEN_KEY);
    history.replace('/login');
  }, []);

  const content = useMemo(() => {
    const title = '确认退出吗?';
    return (
      <ContentWrapper>
        <NavLink to="/personal">个人中心</NavLink>
        <Popconfirm placement="bottom" title={title} onConfirm={exit} okText="是" cancelText="否">
          <a>退出登录</a>
        </Popconfirm>
      </ContentWrapper>
    );
  }, []);

  return (
    <HeaderWrapper>
      <Weather />
      <>
        <Popover placement="bottom" content={content} trigger="click">
          <div className="header-right-box">
            <img
              src={userinfo?.avatar}
              alt=""
            />
            <div className="username">
              {userinfo?.username}
            </div>
            <DownOutlined className="user-icon" />
          </div>
        </Popover>
      </>
    </HeaderWrapper>
  );
};

export default memo(MHeader);
