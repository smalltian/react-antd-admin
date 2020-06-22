import React from 'react';
import { connect } from 'umi';

interface KehuanProps {}

const AddColumn: React.FC<KehuanProps> = props => {
  return <div>添加栏目</div>;
};

export default connect()(AddColumn);
