import React from 'react';
import { Form, Button } from 'antd';
// @ts-ignore
import classNames from 'classnames';
import styles from './index.less';

const FormItem = Form.Item;

interface LoginSubmitProps {
  className?: string;
  loading: boolean;
}

const LoginSubmit: React.FC<LoginSubmitProps> = ({ className, ...rest }) => {
  const clsString = classNames(styles.submit, className);
  return (
    <FormItem>
      <Button
        type="primary"
        htmlType="submit"
        className={clsString}
        {...rest}
      />
    </FormItem>
  );
};

export default LoginSubmit;
