import React, {
  memo, FC, useEffect, Dispatch, useState,
} from 'react';
import {
  Button, Checkbox, Form, Input,
} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import logo from '@assets/img/logo.svg';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { changeLoginBtnLoadingAction, changeWhetherRememberAction, sendLoginRequestAction } from '@pages/login/store/actions';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { IRootReducer } from '@src/store/types/root-reducer.interface';
import { TOKEN_KEY } from '@common/constant/constant';
import { useHistory } from 'react-router';
import { useForm } from 'antd/es/form/Form';
import { CSSTransition } from 'react-transition-group';
import { ReducerActionType } from './types/action.type';
import { LoginWrapper, Video } from './style';

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
  const { whetherToLogIn, isLoading } = useSelector((state:IRootReducer) => ({
    whetherToLogIn: state.auth.whetherToLogIn,
    isLoading: state.auth.loading,
  }), shallowEqual);

  const dispatch = useDispatch<Dispatch<ReducerActionType>>();
  const history = useHistory();
  const [form] = useForm();

  useEffect(() => {
    // 组件加载时显示动画
    setFlag(true);
  }, []);

  // 以后删除
  useEffect(() => {
    console.log();
    form.setFieldsValue({
      username: 'admin@qq.com',
      password: 'admin',
    });
  }, [form]);

  useEffect(() => {
    const token = window.localStorage.getItem(TOKEN_KEY) || window.sessionStorage.getItem(TOKEN_KEY);
    if (token) {
      history.replace('/home');
    }
  }, [whetherToLogIn]);

  const onFinish = (values: IValues) => {
    // 更改btn loading 状态
    dispatch(changeLoginBtnLoadingAction(true));
    // 发送登录请求
    dispatch(sendLoginRequestAction(values));
  };

  const checkboxChange = (event:CheckboxChangeEvent) => {
    dispatch(changeWhetherRememberAction(event.target.checked));
  };

  const onFinishFailed = () => {
    dispatch(changeLoginBtnLoadingAction(false));
  };
  const [flag, setFlag] = useState<boolean>(false);

  return (
    <>
      <Video src="http://localhost:5000/static/welcome-video.mp4" autoPlay muted loop />
      <LoginWrapper>

        <CSSTransition
          in={flag}
          timeout={2000}
          classNames="login"
        >
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
                onFinishFailed={onFinishFailed}
                form={form}
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
                  <Button
                    type="primary"
                    loading={isLoading}
                    htmlType="submit"
                    className="login-form-button"
                  >
                    登录
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </CSSTransition>
      </LoginWrapper>
    </>

  );
};

export default memo(Login);
