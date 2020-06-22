import React from 'react';
import CommonIcon from '@/components/CommonIcon';
import { Link } from 'umi';
import styles from './index.less';

interface HeaderMenuProps {
  menus: any;
  currentMenu: any;
}

const HeaderMenu: React.FC<HeaderMenuProps> = props => {
  const { menus, currentMenu } = props;

  return (
    <div className={styles.header_menu}>
      {menus.map((item: any) => {
        return (
          <Link
            to={item.path}
            key={item.permisson.id}
            className={[
              styles.item,
              currentMenu.path.indexOf(item.name) > -1 ? styles.selectd : '',
            ].join(' ')}
          >
            <CommonIcon type={item.meta.icon} style={{ color: '#ffffff' }} />
            <span>{item.meta.title}</span>
          </Link>
        );
      })}
    </div>
  );
};

export default HeaderMenu;
