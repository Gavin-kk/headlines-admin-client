import React, { memo, FC, useCallback, useMemo } from 'react';
import Weather from '@components/weather';
import { Popconfirm, Popover } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import { useHistory } from 'react-router';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { IRootReducer } from '@src/store/types/root-reducer.interface';
import { Dispatch } from 'redux';
import { ReducerActionType } from '@pages/layout/types/action.type';
import { exitLoginAction } from '@pages/layout/store/actions';
import { ContentWrapper, HeaderWrapper } from './style';

const MHeader: FC = () => {
  const { userinfo } = useSelector(
    (state: IRootReducer) => ({
      userinfo: state.admin.userinfo,
    }),
    shallowEqual,
  );

  const history = useHistory();
  const dispatch = useDispatch<Dispatch<ReducerActionType>>();
  const exit = useCallback(() => {
    // 派发退出行为
    dispatch(exitLoginAction);
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
            <img src={userinfo?.avatar} alt="" />
            <span className="username">{userinfo?.nickname || userinfo?.username}</span>
            <DownOutlined className="user-icon" />
          </div>
        </Popover>
      </>
    </HeaderWrapper>
  );
};

export default memo(MHeader);
