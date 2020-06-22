import React, { useState } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import LoginSubmit from './components/LoginSubmit';

import { connect, Dispatch, ConnectProps } from 'umi';
import { ConnectState } from '@/models/connect';
import { LoginParamsType } from '@/services/login';
import './Login.less';

interface LoginProps extends Partial<ConnectProps> {
  dispatch: Dispatch;
  submitting?: boolean;
  userLogin: any;
}

const Login: React.FC<LoginProps> = props => {
  console.log(props);
  const layout = { labelCol: { span: 8 }, wrapperCol: { span: 16 } };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };
  const { userLogin = {}, dispatch } = props;
  const { status, submitting } = userLogin;
  const [autoLogin, setAutoLogin] = useState(true);
  const [type] = useState<string>('account'); // 登录类型
  const [userName] = useState<string>('zjt44027');
  const [password] = useState<string>('zjt12345');

  const onFinish = (values: any) => {
    console.log('Success:', values);
    dispatch({
      type: 'login/loading',
      payload: { submitting: true },
    });

    dispatch({
      type: 'login/login',
      payload: { ...values, type, systemId: 5 },
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="login-main">
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          name="userName"
          rules={[{ required: true, message: '请输入账户名称!' }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="账户"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: '请输入账户密码!' }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="密码"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" noStyle>
            <Checkbox
              checked={autoLogin}
              onChange={e => setAutoLogin(e.target.checked)}
            >
              记住密码
            </Checkbox>
          </Form.Item>
          <a className="login-form-forgot" href="/user/register">
            注册账户
          </a>
        </Form.Item>

        <LoginSubmit className="login-form-button" loading={submitting}>
          登录
        </LoginSubmit>
      </Form>
    </div>
  );
};

export default connect(({ login, loading }: ConnectState) => ({
  userLogin: login,
}))(Login);
