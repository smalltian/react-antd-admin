import React from 'react';
import styles from './index.less';

interface DefaultFooter {}

const DefaultFooter: React.FC<DefaultFooter> = props => {
  return (
    <div className={styles.default_footer}>
      <span className={styles.title}>Copyright 2020 Tian出品</span>
    </div>
  );
};

export default DefaultFooter;
