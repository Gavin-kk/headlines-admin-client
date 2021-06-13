import { Breadcrumb } from 'antd';
import React, { memo, FC, useMemo } from 'react';
import { menuList } from '@src/config/menu.config';
import { NavLink, useLocation } from 'react-router-dom';

const Bread: FC = () => {
  const location = useLocation();
  const handleBread = useMemo(() => menuList.find((item) => item.key.indexOf(location.pathname) !== -1), [location.pathname]);
  return (
    <Breadcrumb>
      <Breadcrumb.Item><NavLink to="/home">首页</NavLink></Breadcrumb.Item>
      { handleBread
      && (
      <Breadcrumb.Item>
        <NavLink to={handleBread.key}>{handleBread?.title}</NavLink>
      </Breadcrumb.Item>
      ) }
    </Breadcrumb>
  );
};

export default memo(Bread);
