import { Breadcrumb } from 'antd';
import React, { memo, FC, useMemo } from 'react';
import { IMenu, menuList } from '@src/config/menu.config';
import { NavLink, useLocation } from 'react-router-dom';

interface IProps {
  child?: JSX.Element;
}
const Bread: FC<IProps> = ({ child }) => {
  const location = useLocation();
  const handleBread: IMenu | undefined = useMemo(
    () => menuList.find((item) => item.key.indexOf(location.pathname) !== -1),
    [location.pathname],
  );
  return (
    <Breadcrumb>
      <Breadcrumb.Item>
        <NavLink to="/home">首页</NavLink>
      </Breadcrumb.Item>
      {handleBread && (
        <Breadcrumb.Item>
          <NavLink to={handleBread.key}>{handleBread?.title}</NavLink>
        </Breadcrumb.Item>
      )}
      {child && <Breadcrumb.Item>{child}</Breadcrumb.Item>}
    </Breadcrumb>
  );
};

export default memo(Bread);
