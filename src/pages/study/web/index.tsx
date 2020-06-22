import React from 'react';
import { connect } from 'umi';
import styles from './index.less';

interface WebProps {}

const Web: React.FC<WebProps> = props => {
  return <div className={styles.teacher}>web前端内容</div>;
};

export default connect()(Web);
