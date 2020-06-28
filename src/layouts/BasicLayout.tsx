import React, { Fragment, useState, useEffect } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import CommonIcon from '@/components/CommonIcon';
import HeaderMenu from '@/components/Header/HeaderMenu';
import Logo from '@/components/Header/Logo';
import HeadeUser from '@/components/Header/User';
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
  const headerMenus = routes.filter((item: any) => !item.meta.hideInMenu); // 顶部菜单

  // 布局
  const { Header, Footer, Sider, Content } = Layout;
  const { SubMenu } = Menu;

  // 动态样式
  const fixedHeaderStyle: object = fixedHeader
    ? { position: 'fixed', zIndex: 1, width: '100%' }
    : {};
  const fixedSiderStyle: object = fixSiderbar
    ? { overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }
    : {};
  const contentStyle: object =
    fixSiderbar && !collapsed ? { marginLeft: 180 } : { marginLeft: 80 };

  // 左侧路由菜单

  let leftMenus: any = [];
  let currentMenuObj: any = null;
  if (pathname !== '/') {
    currentMenuObj = routes
      .filter((item: any) => !item.meta.hideInMenu)
      .find((item: any) => {
        return pathname.indexOf(item.name) > -1;
      });
    leftMenus =
      currentMenuObj.routes &&
      currentMenuObj.routes.filter((item: any) => !item.meta.hideInMenu);
  }

  // 当前路由
  const currentMenu: any = currentMenuObj
    ? queryCurrentMenus(currentMenuObj.routes, pathname)
    : null;
  // 选中菜单
  const selectedKeys = currentMenu
    ? queryAncestors(leftMenus, currentMenu)
    : [];
  const breadcrumbTitle = currentMenu ? queryBreadName(currentMenu) : null;

  const handleCollapse = () => {
    dispatch &&
      dispatch({
        type: 'global/changeLayoutCollapsed',
        payload: { collapsed: !collapsed },
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
              <span>{item.meta.title}</span>
            </Link>
          </Menu.Item>
        );
      }
    });
  };

  useEffect(() => {
    console.log('==layout==');
  });

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
      <Layout style={{ marginTop: fixedHeader ? 64 : 0 }}>
        <Sider
          width={180}
          className="site-layout-background"
          style={fixedSiderStyle}
          collapsible
          collapsed={collapsed}
          onCollapse={handleCollapse}
        >
          {
            <Menu
              mode="inline"
              selectedKeys={selectedKeys}
              style={{ height: '100%', borderRight: 0 }}
            >
              {renderMenus(leftMenus)}
            </Menu>
          }
        </Sider>
        <Layout className="layout-main-conent" style={contentStyle}>
          {breadcrumbTitle && (
            <Breadcrumb className="breadcrumb">
              <Breadcrumb.Item>{breadcrumbTitle}</Breadcrumb.Item>
            </Breadcrumb>
          )}
          <div className="content">{children}</div>
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
