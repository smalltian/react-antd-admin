import React from 'react';
import ReactDOM from 'react-dom';

import './index.less';

interface NProgressProps {}

interface NProgressState {
  show: boolean;
}

class NProgress extends React.Component<NProgressProps, NProgressState> {
  constructor(props: NProgressProps) {
    super(props);
    this.state = {
      show: false,
    };
  }

  start() {
    this.setState({ show: true });
  }

  done() {
    this.setState({ show: false });
  }

  render() {
    return (
      <div
        className="nprogress"
        style={this.state.show ? { display: 'block' } : { display: 'none' }}
      >
        <div className="bar">
          <div className="peg"></div>
        </div>
        <div className="spinner">
          <div className="spinner-icon"></div>
        </div>
      </div>
    );
  }
}

let div = document.createElement('div');
let props: any = {};
document.body.appendChild(div);

let NPBox = ReactDOM.render(React.createElement(NProgress, props), div);

export default NPBox;
