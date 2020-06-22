import { notification } from 'antd';
import { stringify } from 'querystring';
import { getPageQuery } from '@/utils/utils';
import { getToken, removeToken, setToken } from '@/utils/token';
import { Effect, history, Reducer } from 'umi';
import { fetchLogin } from '@/services/login';

export interface LoginState {
  status?: 'ok' | 'error';
  token?: any;
  submitting: boolean;
}

export interface LoginModelType {
  namespace: 'login';
  state: LoginState;
  effects: {
    login: Effect;
    loading: Effect;
    logout: Effect;
  };
  reducers: {
    changeLoginStatus: Reducer<LoginState>;
    changeLoginSubmit: Reducer<LoginState>;
  };
}

const LoginModel: LoginModelType = {
  namespace: 'login',
  state: {
    status: undefined,
    token: getToken(),
    submitting: false,
  },
  effects: {
    *loading({ payload }, { put }) {
      yield put({
        type: 'changeLoginSubmit',
        payload,
      });
    },
    /**
     * d登录
     * @param payload
     * @param call
     * @param put
     */
    *login({ payload }, { call, put }) {
      //调用登录接口
      // const response = yield call(fetchLogin, payload);
      const response = { code: '0', value: 'xxx43fdfdaw232323dsd' };
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
      //登录成功
      if (response.code === '0') {
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params as { redirect: string };
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          }
          history.replace(redirect);
        } else {
          history.replace('/');
        }

        setTimeout(() => {
          notification.success({
            message: '登录成功',
            description: '欢迎登录',
          });
        }, 1200);
      }
    },
    /**
     * 退出
     */
    *logout() {
      removeToken();
      const { redirect } = getPageQuery();
      if (window.location.pathname !== '/user/login' && !redirect) {
        history.replace({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        });
      }
    },
  },
  reducers: {
    changeLoginStatus(state, { payload }) {
      setToken(payload.value);
      return {
        ...state,
        status: payload.code === '0' ? 'ok' : 'error',
        submitting: false,
      };
    },
    changeLoginSubmit(state, { payload }) {
      return {
        ...state,
        submitting: payload.submitting,
      };
    },
  },
};

export default LoginModel;
