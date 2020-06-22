import React, { Fragment, useState } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import CommonIcon from '@/components/CommonIcon';
import HeaderMenu from '@/components/Header/HeaderMenu';
import Logo from '@/components/Header/Logo';
import HeadeUser from '@/components/Header/User';
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from '@ant-design/icons';
import DefaultFooter from '@/components/DefaultFooter/index';
import { connect, ConnectProps, Link } from 'umi';
import {
  queryAncestors,
  queryCurrentMenus,
  queryBreadMenu,
  queryBreadName,
} from '@/utils/utils';
import { ConnectState } from '@/models/connect';
import './BasicLayout.less';

export interface BasicLayoutProps extends Partial<ConnectProps> {}

const BasicLayout: React.FC<BasicLayoutProps> = props => {
  // console.log(props);
  // @ts-ignore
  const {
    dispatch,
    children,
    setting,
    collapsed,
    route = { routes: [] },
    location,
  }: any = props;
  const { primaryColor, navTheme, fixedHeader, fixSiderbar } = setting;
  const { pathname } = location;
  const { routes } = route;

  // 顶部菜单
  const headerMenus = route.routes.filter((item: any) => !item.meta.hideInMenu);
  // 侧边菜单
  let leftMenus: any = [];

  const { Header, Footer, Sider, Content } = Layout;
  const { SubMenu } = Menu;

  const fixedHeaderStyle: object = fixedHeader
    ? { position: 'fixed', zIndex: 1, width: '100%' }
    : {};
  const fixedSiderStyle: object = fixSiderbar
    ? { overflow: 'auto', height: '100vh', position: 'fixed', left: '10px' }
    : {};
  const contentStyle: object =
    fixSiderbar && !collapsed ? { marginLeft: 200 } : { marginLeft: 80 };

  // 左侧路由菜单
  if (pathname !== '/') {
    const menuList = routes
      .filter((item: any) => !item.meta.hideInMenu)
      .find((item: any) => {
        return pathname.indexOf(item.name) > -1;
      });
    leftMenus =
      menuList.routes &&
      menuList.routes.filter((item: any) => !item.meta.hideInMenu);
  }

  // 当前路由
  const currentMenu: any = queryCurrentMenus(leftMenus, pathname);
  // 选中菜单
  const selectedKeys = currentMenu
    ? queryAncestors(leftMenus, currentMenu)
    : [];
  const breadcrumbTitle = currentMenu ? queryBreadName(currentMenu) : null;

  const handleCollapse = () => {
    dispatch &&
      dispatch({
        type: 'global/changeLayoutCollapsed',
        payoload: { collapsed: !collapsed },
      });
  };

  const renderMenus = (data: any) => {
    return data.map((item: any) => {
      if (item.routes && item.routes.length) {
        const children = item.routes.filter((_: any) => !_.meta.hideInMenu);
        return (
          <SubMenu
            key={item.permisson.id}
            title={
              <Fragment>
                {item.meta.icon && (
                  <CommonIcon
                    type={item.meta.icon}
                    style={{
                      fontSize: '14px',
                      color:
                        pathname.indexOf(item.name) > -1
                          ? primaryColor
                          : '#333333',
                    }}
                  />
                )}
                <span>{item.meta.title}</span>
              </Fragment>
            }
          >
            {renderMenus(children)}
          </SubMenu>
        );
      } else {
        return (
          <Menu.Item key={item.permisson.id}>
            <Link to={item.path}>
              {item.meta.icon && (
                <CommonIcon
                  type={item.meta.icon}
                  style={{
                    fontSize: '14px',
                    color:
                      pathname.indexOf(item.name) > -1
                        ? primaryColor
                        : '#333333',
                  }}
                />
              )}
              {/*{item.meta.icon && <UserOutlined/>}*/}
              <span>{item.meta.title}</span>
            </Link>
          </Menu.Item>
        );
      }
    });
  };

  return (
    <Layout>
      <Header className="header" style={fixedHeaderStyle}>
        <div className="header_left_box">
          <Logo />
          {currentMenu && (
            <HeaderMenu menus={headerMenus} currentMenu={currentMenu} />
          )}
        </div>
        <div className="header_right_box">
          <HeadeUser />
        </div>
      </Header>
      <Layout style={{ marginTop: fixedHeader ? 74 : 0 }}>
        <Sider
          width={200}
          className="site-layout-background"
          style={fixedSiderStyle}
          collapsible
          collapsed={collapsed}
          onCollapse={handleCollapse}
        >
          {selectedKeys.length > 0 && (
            <Menu
              mode="inline"
              defaultSelectedKeys={selectedKeys}
              style={{ height: '100%', borderRight: 0 }}
            >
              {renderMenus(leftMenus)}
            </Menu>
          )}
        </Sider>
        <Layout className="layout-main-conent" style={contentStyle}>
          {breadcrumbTitle && (
            <Breadcrumb>
              <Breadcrumb.Item>{breadcrumbTitle}</Breadcrumb.Item>
            </Breadcrumb>
          )}
          <Content className="content">{children}</Content>
          <Footer style={{ marginTop: '20px' }}>
            <DefaultFooter />
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default connect(({ setting, global }: ConnectState) => ({
  setting,
  collapsed: global.collapsed,
  currentRouteKey: global.currentRouteKey,
}))(BasicLayout);
