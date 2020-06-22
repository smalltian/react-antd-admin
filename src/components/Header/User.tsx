import React from 'react';
import { Dropdown, Menu, Avatar } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { connect, ConnectProps, Dispatch } from 'umi';
import { ConnectState } from '@/models/connect';

import styles from './index.less';

interface UserProps extends Partial<ConnectProps> {
  dispatch: Dispatch;
}

const User: React.FC<UserProps> = props => {
  // @ts-ignore
  const { currentUser, dispatch } = props;
  const { name } = currentUser;
  const handleClickItem = (value: any) => {
    console.log(value);
    if (value.key === 'logout') {
      dispatch({
        type: 'login/logout',
      });
    }
  };

  const menu = () => {
    return (
      <Menu
        onClick={e => {
          handleClickItem(e);
        }}
      >
        <Menu.Item key="github">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/smalltian?tab=repositories"
          >
            个人GitHub
          </a>
        </Menu.Item>
        <Menu.Item key="project">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="http://www.taobao.com/"
          >
            项目地址
          </a>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="logout">退出登录</Menu.Item>
      </Menu>
    );
  };

  return (
    <div className={styles.header_user}>
      {/*<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>*/}
      <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>
        T
      </Avatar>
      <Dropdown
        overlay={menu}
        className={styles.user_dropdown}
        placement="bottomRight"
      >
        <a className={styles.btn} onClick={e => e.preventDefault()}>
          {name} <DownOutlined />
        </a>
      </Dropdown>
    </div>
  );
};

export default connect(({ user }: ConnectState) => ({
  currentUser: user.currentUser,
}))(User);
