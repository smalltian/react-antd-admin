import React from 'react';
import { connect, Link } from 'umi';
import { ConnectState } from '@/models/connect';
import styles from './index.less';
import logo from '@/assets/logo.svg';

interface LogoProps {
  setting: any;
}

const Logo: React.FC<LogoProps> = props => {
  const { setting } = props;
  const { title } = setting;
  return (
    <div className={styles.logo}>
      <Link to="/">
        <img className={styles.logo_icon} src={logo} />
        <span className={styles.logo_title}>{title}</span>
      </Link>
    </div>
  );
};

export default connect(({ setting }: ConnectState) => ({
  setting,
}))(Logo);
