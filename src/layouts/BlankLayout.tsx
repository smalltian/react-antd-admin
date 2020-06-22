import React from 'react';
import { connect } from 'umi';

const BlankLayout: React.FC = ({ children }) => <>{children}</>;

export default connect()(BlankLayout);
