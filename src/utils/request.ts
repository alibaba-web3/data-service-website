import axios, { InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import * as _ from 'lodash';

const requestInterceptor = async (config: InternalAxiosRequestConfig) => {
  return config;
};

const responseInterceptor = (response: AxiosResponse) => {
  if (response.data && response.data.code === 200) {
    return _.get(response, 'data.data');
  } else {
    Promise.reject(response.data);
  }
};

export const createRequest = (options: any) => {
  const instance = axios.create({
    baseURL: options.baseURL,
    timeout: 30000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  instance.interceptors.request.use(requestInterceptor, (error) => {
    return Promise.reject(error);
  });

  instance.interceptors.response.use(responseInterceptor, (error) => {
    return Promise.reject(error);
  });

  const get = (url: string, params: any = {}) => {
    return instance({
      method: 'get',
      url,
      params,
    });
  };

  const post = (url: string, params: any = {}, data: any = {}) => {
    return instance({
      method: 'post',
      url,
      params,
      data,
    });
  };

  const put = (url: string, params: any = {}, data: any = {}) => {
    return instance({
      method: 'put',
      url,
      params,
      data,
    });
  };

  const del = (url: string, params: any = {}) => {
    return instance({
      method: 'delete',
      url,
      params,
    });
  };

  return {
    get,
    post,
    put,
    del,
  };
};

export default createRequest({ baseURL: 'https://api.0x66.io/api' });
