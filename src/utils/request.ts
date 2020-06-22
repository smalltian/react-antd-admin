/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */

import { extend } from 'umi-request';
import { message } from 'antd';
import NProgress from '@/components/NProgress';
import { getToken } from '@/utils/token';

const codeMessage: any = {
  200: '服务器成功返回请求的数据。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
};

const errorHandler = (error: { response: Response }): Response => {
  const { response } = error;
  console.log(response);
  const errorMessage = codeMessage[response.status];
  message.error(errorMessage);
  return response;
};

const request = extend({
  // prefix: '/api/v1',//前缀
  // errorHandler, //默认错误处理
  credentials: 'include', //默认请求是否带上cookie
  timeout: 90000, // 超时
});

interface RequestOptions {
  url: string;
  options: any;
}

request.interceptors.request.use(
  (url, options): RequestOptions => {
    let defaultHeaders = Object.assign({
      'Content-Type': 'application/json',
      appid: '510000001',
    });
    const headers = Object.assign({}, defaultHeaders, {
      Authorization: getToken(),
    });
    options.headers = headers;
    NProgress.start();
    return {
      url: `${url}`,
      options: { ...options, interceptors: true },
    };
  },
  { global: true },
);

request.interceptors.response.use(async response => {
  NProgress.done();
  const data = await response.clone().json();
  if (response.status !== 200) {
    errorHandler({ response });
  }
  if (response.status === 200 && data.code && Number(data.code) !== 0) {
    message.error(data.message);
  }
  return response;
});

export default request;
