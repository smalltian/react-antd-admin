import request from '@/utils/request';

export interface LoginParamsType {
  userName: string;
  password: string;
}

// 登录
export async function fetchLogin(params: LoginParamsType) {
  return request('/api/login', {
    method: 'post',
    data: params,
  });
}
