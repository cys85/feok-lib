import ajaxDebounceCreator from './ajaxDebounce';
import storage from '../lib/store2';

import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosPromise,
  AxiosError,
  AxiosResponse,
} from 'axios';

// 接口
interface FetchCreatorInterface {
  CancelToken: any;
  isCancel: any;
  get(url: string, data: any, options: object): any;
  post(url: string, data: any, options: object): any;
  put(url: string, data: any, options: object): any;
  patch(url: string, data: any, options: object): any;
  delete(url: string, data: any, options: object): any;
}

class FetchCreator implements FetchCreatorInterface {
  public CancelToken: any;
  public isCancel: any;
  private ajaxConfig: {
    baseURL: string;
    timeout: number;
  };
  private axios: any;
  private fetch: any;
  private tokenCache: string; // token缓存方式
  constructor({
    ajaxBaseUrl = '',
    ajaxTimeout = 3000,
    tokenCache = 'session',
  }) {
    // init config
    this.ajaxConfig = {
      baseURL: ajaxBaseUrl,
      timeout: ajaxTimeout,
    };
    // init create axios
    this.CancelToken = axios.CancelToken;
    this.isCancel = axios.isCancel;
    this.tokenCache = tokenCache;
    this.axios = axios.create(this.ajaxConfig);
    this.axios.isCancel = axios.isCancel;
    this.axios.CancelToken = axios.CancelToken;
    this._initAxiosInterceptors(); // init axios Interceptors
    this.fetch = ajaxDebounceCreator(this.axios);
  }
  public get(url: string, data: any, options: object): any {
    return this.fetch({ method: 'get', url, data, options });
  }
  public post(url: string, data: any, options: object): any {
    return this.fetch({ method: 'post', url, data, options });
  }
  public put(url: string, data: any, options: object): any {
    return this.fetch({ method: 'put', url, data, options });
  }
  public patch(url: string, data: any, options: object): any {
    return this.fetch({ method: 'patch', url, data, options });
  }
  public delete(url: string, data: any, options: object): any {
    return this.fetch({ method: 'delete', url, data, options });
  }

  private _initAxiosInterceptors() {
    this.axios.interceptors.request.use(
      (config: AxiosRequestConfig): AxiosRequestConfig => {
        let token;
        switch (this.tokenCache) {
          case 'local':
            token = storage.get('token');
            break;
          case 'session':
            token = storage.session.get('token');
            break;
        }
        if (token) {
          config.headers.token = token;
        }
        return config;
      },
      (error: AxiosError): AxiosPromise => {
        // Do something with request error
        console.log(error); // for debug
        return Promise.reject(error);
      },
    );

    // respone拦截器
    this.axios.interceptors.response.use(
      (response: AxiosResponse): AxiosResponse => {
        return response;
      },
      (error: AxiosError): AxiosPromise => {
        if (process.env.NODE_ENV !== 'production') {
          console.log('出错了', error.response);
        } // for debug
        const res: any = error.response;
        return Promise.reject(
          JSON.stringify({
            status: res.status,
            statusText: res.statusText,
          }),
        );
      },
    );
  }
}

export default FetchCreator;
