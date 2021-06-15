import {
  CopyOutlined,
  FileDoneOutlined,
  FolderOpenOutlined,
  FormOutlined,
  HomeOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import React from 'react';

export interface IMenu {
  icon: JSX.Element;
  key: string;
  title: string;
}

export const menuList: IMenu[] = [
  {
    icon: <HomeOutlined />,
    key: '/home',
    title: '首页',
  },
  {
    icon: <CopyOutlined />,
    key: '/article',
    title: '内容管理',
  },
  {
    icon: <FolderOpenOutlined />,
    key: '/material',
    title: '素材管理',
  },
  {
    icon: <FormOutlined />,
    key: '/publish',
    title: '发布文章',
  },
  {
    icon: <FileDoneOutlined />,
    key: '/discuss',
    title: '评论管理',
  },
  {
    icon: <TeamOutlined />,
    key: '/fans',
    title: '粉丝管理',
  },
  {
    icon: <UserOutlined />,
    key: '/personal',
    title: '个人设置',
  },
];
