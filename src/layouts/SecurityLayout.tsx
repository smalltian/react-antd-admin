import React from 'react';
import { PageLoading } from '@ant-design/pro-layout';
import { stringify } from 'querystring';
import { Redirect, ConnectProps, connect, Dispatch } from 'umi';
import { ConnectState } from '@/models/connect';

interface SecurityLayoutProps extends ConnectProps {
  loading?: boolean;
  dispatch: Dispatch;
}

interface SecurityLayoutState {
  isReady: boolean;
}

class SecurityLayout extends React.Component<
  SecurityLayoutProps,
  SecurityLayoutState
> {
  state: SecurityLayoutState = {
    isReady: false,
  };

  componentDidMount(): void {
    console.log('====获取用户信息====');
    this.setState({ isReady: true });
    const { dispatch } = this.props;
    dispatch({
      type: 'user/fetchCurrent',
    });
  }

  render() {
    const { isReady } = this.state;
    const { children, login }: any = this.props;
    const isToken = login.token;
    const queryString = stringify({
      redirect: window.location.href,
    });

    if (!isToken && !isReady) {
      return <PageLoading />;
    }

    if (!isToken && window.location.pathname !== '/user/login') {
      return <Redirect to={`/user/login?${queryString}`} />;
    }

    return children;
  }
}

export default connect(({ login }: ConnectState) => ({
  login,
}))(SecurityLayout);
