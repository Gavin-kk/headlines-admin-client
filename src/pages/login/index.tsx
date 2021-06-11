import React, {
  memo, FC, useEffect, Dispatch,
} from 'react';
import {
  Button, Checkbox, Form, Input,
} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import logo from '@assets/img/logo.svg';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { changeWhetherRememberAction, sendLoginRequestAction } from '@pages/login/store/actions';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { IRootReducer } from '@src/store/types/root-reducer.interface';
import { TOKEN_KEY } from '@common/constant/constant';
import { useHistory } from 'react-router';
import { ReducerActionType } from './types/action.type';
import { LoginWrapper } from './style';

export interface IValues {
  username:string;
  password:string;
  remember:boolean
}

const verifyEmail = (rule: any, value:string) => {
  const emailReg = /^[^_$].{4,}@(163|126|qq|sina)\.(com|cn|net)$/;
  if (!value) {
    return Promise.reject(new Error('邮箱不可为空'));
  }
  if (!emailReg.test(value)) {
    return Promise.reject(new Error('请输入正确的邮箱'));
  }
  return Promise.resolve();
};

const verifyPassword = (rule:any, value:string) => {
  if (!value) {
    return Promise.reject(new Error('密码不可为空'));
  } if (value.length < 5) {
    return Promise.reject(new Error('密码长度不足'));
  }
  return Promise.resolve();
};

const Login: FC = () => {
  const { whetherToLogIn } = useSelector((state:IRootReducer) => ({
    whetherToLogIn: state.auth.whetherToLogIn,
  }), shallowEqual);

  const dispatch = useDispatch<Dispatch<ReducerActionType>>();
  const history = useHistory();

  useEffect(() => {
    const token = window.localStorage.getItem(TOKEN_KEY);
    if (token) {
      history.replace('/home');
    }
  }, [whetherToLogIn]);

  const onFinish = (values: IValues) => {
    dispatch(sendLoginRequestAction(values));
  };

  const checkboxChange = (event:CheckboxChangeEvent) => {
    dispatch(changeWhetherRememberAction(event.target.checked));
  };
  return (
    <LoginWrapper>
      <div className="dialog">
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="login-form">
          <Form
            name="normal_login"
            className="form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: '' }, { validator: verifyEmail }]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入邮箱" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: '' }, { validator: verifyPassword }]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="请输入密码"
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox onChange={checkboxChange}>下次自动登录</Checkbox>
              </Form.Item>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">登录</Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </LoginWrapper>
  );
};

export default memo(Login);
