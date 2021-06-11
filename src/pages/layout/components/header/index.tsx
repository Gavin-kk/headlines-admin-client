import React, { memo, FC } from 'react';
import Weather from '@components/weather';
import { Popover } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import { TOKEN_KEY } from '@common/constant/constant';
import { useHistory } from 'react-router';
import { ContentWrapper, HeaderWrapper } from './style';

const MHeader: FC = () => {
  const history = useHistory();
  const exit = () => {
    window.localStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.removeItem(TOKEN_KEY);
    history.replace('/login');
  };

  const content = (
    <ContentWrapper>
      <NavLink to="/home">个人中心</NavLink>
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
              src="http://localhost:5000/static/863d67fdf411bc619ef522e2e0eedd5eb299ec2d.jpg@52w_52h.png"
              alt=""
            />
            <div className="username">
              admin
            </div>
            <DownOutlined className="user-icon" />
          </div>
        </Popover>
      </>
    </HeaderWrapper>
  );
};

export default memo(MHeader);
