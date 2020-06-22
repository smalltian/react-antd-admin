export type DefaultSettings = {
  navTheme: string;
  primaryColor: string;
  layout: string;
  contentWidth: string;
  fixedHeader: boolean;
  fixSiderbar: boolean;
  colorWeak: boolean;
  menu: any;
  title: string;
  pwa: boolean;
  iconfontUrl: string;
};

const defaultSettings: DefaultSettings = {
  navTheme: 'light',
  // 拂晓蓝
  primaryColor: '#f19347',
  layout: 'sidemenu',
  contentWidth: 'Fluid',
  fixedHeader: true,
  fixSiderbar: true,
  colorWeak: false,
  menu: {
    locale: true,
  },
  title: 'Tian管理系统',
  pwa: false,
  iconfontUrl: '',
};

export default defaultSettings;
