import React, { memo, FC } from 'react';
import Weather from '@components/weather';
import { Popover } from 'antd';
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

  const exit = () => {
    window.localStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.removeItem(TOKEN_KEY);
    history.replace('/login');
  };

  const content = (
    <ContentWrapper>
      <NavLink to="/personal">个人中心</NavLink>
      <a onClick={exit}>退出登录</a>
    </ContentWrapper>
  );

  return (
    <HeaderWrapper>
      <Weather />
      <>
        <Popover placement="bottom" content={content} trigger="click">
          <div className="header-left-box">
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
