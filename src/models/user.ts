import { Effect, Reducer } from 'umi';

export interface CurrentUser {
  avatar?: string;
  name?: string;
  userid?: string;
  token?: string;
}

export interface UserModelState {
  currentUser?: CurrentUser;
}

export interface UserModelType {
  namespace: string;
  state: UserModelState;
  effects: {
    fetchCurrent: Effect;
  };
  reducers: {
    saveCurrentUser: Reducer<UserModelState>;
  };
}

const UserModel: UserModelType = {
  namespace: 'user',
  state: {
    currentUser: {
      name: 'admin',
    },
  },
  effects: {
    *fetchCurrent({ payload }, { call, put }) {
      //调用接口获取用户信息
      // const response = yield call(apiGetuser,payload)
      const respone = { code: 0, data: { name: 'admin' } };
      yield put({
        type: 'saveCurrentUser',
        payload: respone,
      });
    },
  },
  reducers: {
    saveCurrentUser(state, action) {
      const { data } = action.payload;
      return {
        ...state,
        currentUser: { ...data } || {},
      };
    },
  },
};

export default UserModel;
