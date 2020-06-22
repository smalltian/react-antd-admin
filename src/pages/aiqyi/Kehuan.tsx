import React from 'react';
import { connect } from 'umi';

interface KehuanProps {}

const Kehuan: React.FC<KehuanProps> = props => {
  return <div>科幻电影内容</div>;
};

export default connect()(Kehuan);
