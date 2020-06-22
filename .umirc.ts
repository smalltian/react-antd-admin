import { defineConfig } from 'umi';
import proxy from './config/proxy';

const { REACT_APP_ENV } = process.env;

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  theme: {
    '@primary-color': '#f19347',
  },
  // @ts-ignore
  proxy: proxy[REACT_APP_ENV || 'dev'],
  routes: [
    {
      path: '/user',
      component: '@/layouts/UserLayout',
      meta: { title: '登录' },
      routes: [
        {
          path: '/user',
          redirect: '/user/login',
        },
        {
          name: 'login',
          path: '/user/login',
          component: '@/pages/user/Login',
        },
      ],
    },
    {
      path: '/',
      component: '@/layouts/SecurityLayout',
      routes: [
        {
          path: '/',
          component: '@/layouts/BasicLayout',
          routes: [
            {
              path: '/',
              redirect: '/study',
              meta: { hideInMenu: true },
            },
            {
              path: '/study',
              name: 'study',
              component: '@/layouts/BlankLayout',
              meta: { title: '菜鸟教程', icon: 'iconkecheng' },
              permisson: { id: 1, parentId: 0 },
              routes: [
                {
                  path: '/study',
                  redirect: '/study/web',
                  meta: { hideInMenu: true, parent: 'study' },
                },
                {
                  path: '/study/web',
                  name: 'web',
                  meta: { title: 'WEB前端', icon: 'iconjiaoshi_banji' },
                  component: '@/pages/study/web',
                  permisson: { id: 2, parentId: 1 },
                },
              ],
            },
            {
              path: '/aiqyi',
              name: 'aiqyi',
              component: '@/layouts/BlankLayout',
              meta: { title: '爱奇艺', icon: 'iconshipin' },
              permisson: { id: 4, parentId: 0 },
              routes: [
                {
                  path: '/aiqyi',
                  redirect: '/aiqyi/kehuan',
                  meta: { hideInMenu: true, parent: 'study' },
                },
                {
                  path: '/aiqyi/kehuan',
                  name: 'kehuan',
                  meta: { title: '科幻电影', icon: 'iconfenlei' },
                  component: '@/pages/aiqyi/Kehuan',
                  permisson: { id: 5, parentId: 4 },
                },
                {
                  path: '/aiqyi/column',
                  name: 'column',
                  meta: { title: '栏目管理', icon: 'iconzixunlanmu' },
                  component: '@/layouts/BlankLayout',
                  permisson: { id: 6, parentId: 4 },
                  routes: [
                    {
                      path: '/aiqyi/column',
                      redirect: '/aiqyi/column/list',
                      meta: { hideInMenu: true, parent: 'column' },
                    },
                    {
                      path: '/aiqyi/column/list',
                      name: 'column',
                      meta: { title: '栏目列表', parent: 'column' },
                      component: '@/pages/aiqyi/column/ColumnList',
                      permisson: { id: 8, parentId: 6 },
                    },
                    {
                      path: '/aiqyi/column/add',
                      name: 'column',
                      meta: { title: '创建栏目', parent: 'column' },
                      component: '@/pages/aiqyi/column/AddColumn',
                      permisson: { id: 7, parentId: 6 },
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    { path: '/products', component: '@/pages/Products' },
    { component: '@/pages/404' },
  ],
});
