import { parse } from 'querystring';
import { routes } from '@@/core/routes';

export const getPageQuery = () => parse(window.location.href.split('?')[1]);

export const queryCurrentMenus = (arrar: any, pathname: string) => {
  let result = null;

  const get = (list: any) => {
    for (let i = 0; i < list.length; i++) {
      if (list[i].path === pathname) {
        result = list[i];
        break;
      } else {
        if (list[i].routes && list[i].routes.length) {
          get(list[i].routes);
        }
      }
    }
  };

  get(arrar);

  return result;
};

// 过滤选中的菜单
export const queryAncestors = (array: any, current: any) => {
  let result = null;
  if (current) {
    const get = (list: any) => {
      for (let i = 0; i < list.length; i++) {
        if (
          list[i].permisson &&
          list[i].permisson.id === current.permisson.id
        ) {
          result = [list[i].permisson.id].map(String);
          break;
        } else {
          if (list[i].routes && list[i].routes.length) {
            get(list[i].routes);
          }
        }
      }
    };
    get(array);
  }

  return result ? result : [];
};

export const queryBreadMenu = (routes: any, current: any) => {
  return null;
};

export const queryBreadName = (current: any) => {
  const title = current.meta.title;
  if (title) return title;
  return null;
};
