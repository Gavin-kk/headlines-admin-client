import { Menu } from 'antd';
import React, { memo, FC, useMemo } from 'react';
import { IMenu, menuList } from '@src/config/menu.config';
import { NavLink, useLocation } from 'react-router-dom';
import { MenuWrapper } from './style';

const MMenu: FC = () => {
  const location = useLocation();

  const menuHandle = useMemo(
    () =>
      menuList.map((item: IMenu) => (
        <Menu.Item key={item.key} icon={item.icon}>
          <NavLink to={item.key}>{item.title}</NavLink>
        </Menu.Item>
      )),
    [menuList],
  );

  // 设置默认选中
  const defaultSelectedKeys = useMemo((): string => {
    const defaultSelected = menuList.find((item) => item.key.indexOf(location.pathname) !== -1);
    if (defaultSelected) {
      return defaultSelected.key;
    }
    return '/home';
  }, [location.pathname]);

  return (
    <MenuWrapper>
      <Menu selectedKeys={[defaultSelectedKeys]} mode="inline" theme="dark" className="menu-color" id="menu-color">
        {menuHandle}
      </Menu>
    </MenuWrapper>
  );
};

export default memo(MMenu);
