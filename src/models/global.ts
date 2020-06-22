import { Subscription, Reducer, Effect } from 'umi';

export interface GlobalModelState {
  appid?: string;
  collapsed?: boolean;
  currentRouteKey?: string;
}

export interface GlobalModelType {
  namespace: string;
  state: GlobalModelState;
  effects: {};
  reducers: {
    changeLayoutCollapsed: Reducer<GlobalModelState>;
    setCurrentRouteKey: Reducer<GlobalModelState>;
  };
  subscriptions: {
    setup: Subscription;
  };
}

const GlobalMode: GlobalModelType = {
  namespace: 'global',
  state: {
    collapsed: false,
    currentRouteKey: 'study',
    appid: '51000001',
  },
  effects: {},
  reducers: {
    changeLayoutCollapsed(
      state = { collapsed: true },
      { payoload },
    ): GlobalModelState {
      return {
        ...state,
        collapsed: payoload.collapsed,
      };
    },
    setCurrentRouteKey(state, { payoload }): GlobalModelState {
      return {
        ...state,
        currentRouteKey: payoload,
      };
    },
  },
  subscriptions: {
    setup({ history }): void {
      history.listen(({ pathname, search }): void => {
        // if (typeof window.ga !== 'undefined') {
        //   window.ga('send', 'pageview', pathname + search);
        // }
      });
    },
  },
};

export default GlobalMode;
