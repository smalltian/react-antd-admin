import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import DefaultFooter from '@/components/DefaultFooter/index';
import { connect, ConnectProps, Link } from 'umi';
import { ConnectState } from '../models/connect';

import logo from '../assets/logo.svg';
import styles from './UserLayout.less';

export interface UserLayoutProps extends Partial<ConnectProps> {}

const UserLayout: React.FC<UserLayoutProps> = props => {
  // console.log(props)
  const { route = { routes: [] } } = props;
  const { routes } = route;
  const { children, location = { pathname: '' } } = props;
  const title = route.meta.title;
  return (
    <HelmetProvider>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={title} />
      </Helmet>
      <div className={styles.container}>
        <div className={styles.lang}>选择语言</div>
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.header}>
              <Link to="/">
                <img src={logo} className={styles.logo} />
                <span className={styles.title}>XXXX管理系统</span>
              </Link>
            </div>
            <div className={styles.desc}>XXXX系统描述</div>
          </div>
          {children}
        </div>
        <DefaultFooter />
      </div>
    </HelmetProvider>
  );
};

// @ts-ignore
export default connect(({ setting }: ConnectState) => ({ setting }))(
  UserLayout,
);
