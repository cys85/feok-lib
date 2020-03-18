/*
 * @Author: cys
 * @Date: 2018-10-30 21:53:16
 * @Last Modified by: cys
 * @Last Modified time: 2018-12-24 09:41:40
 * 基于rxjs重构
 */
import {Observable, timer, OperatorFunction, defer, of} from 'rxjs';
import {scan, delayWhen, retryWhen, tap, catchError} from 'rxjs/operators';
import { AxiosRequestConfig } from 'axios';
import pathToRegexp from 'path-to-regexp';

function compilePath(path: string, params: object) {
  try {
    const toPath = pathToRegexp.compile(path);
    return toPath(params);
  } catch (error) {
    return path;
  }
}

type Creator = () => {
    get: any,
    post: any,
    delete: any,
    put: any,
    patch: any;
    [pro: string]: any
  };

type Method = 'get' | 'post' | 'put' | 'patch' | 'delete';

interface Options {
  maxRetry?: number; // 最大重试次数
  initialDelay?: number; // 初始延迟重试时间
}

const defaultOptions = {
  maxRetry: 3, // 默认重试3次
  initialDelay: 1000, // 初始延迟重试时间为1秒
};

const retrySeletor = (maxRetry: number, initialDelay: number): any => {
  return (err$: Observable<number>) => {
    return err$.pipe(
      scan((errorCount, err) => {
        if (errorCount >= maxRetry) {
          throw err;
        }
        return errorCount + 1;
      }, 1),
    ).pipe(
      delayWhen((errorCount) => {
        const delayTime = Math.pow(2, errorCount - 1) * initialDelay;
        return timer(delayTime);
      }),
    );
  };
};


export type SequelizeObservable = (dataParam?: any, pathParam?: any, options?: AxiosRequestConfig ) => Observable<any>;
export type SequelizeAction = (api: string, ...middlewares: any[]) => SequelizeObservable;

class Sequelize {
  public static cache: {
    [pro: string]: any,
  } = {};

  public static setCache(key: string, content: any) {
    Sequelize.cache[key] = content;
  }
  public static getCache(key: string) {
    return Sequelize.cache[key];
  }
  public static delCache(key: string) {
    delete Sequelize.cache[key];
  }
  public static clearCache(key: string) {
    Sequelize.cache = {};
  }
  public get: SequelizeAction;
  public post: SequelizeAction;
  public delete: SequelizeAction;
  public patch: SequelizeAction;
  public put: SequelizeAction;
  public defaultOptions = defaultOptions;
  constructor(private options: Options, private creator: any) {
    this.defaultOptions = {
      ...this.defaultOptions,
      ...options,
    };

    this.get = this.fetch('get');
    this.post = this.fetch('post');
    this.delete = this.fetch('delete');
    this.patch = this.fetch('patch');
    this.put = this.fetch('put');
  }

  private installMiddle(source$: Observable<any>, middleware: OperatorFunction<{}, any> ) {
    return source$.pipe(middleware);
  }

  private fetch(method: Method): any {
    return (api: string, ...middlewares: any[]) => {
      return (dataParam: any, pathParam: any = dataParam, options: AxiosRequestConfig = {} ): Observable<any> => {
        const _api = compilePath(api, pathParam);
        // console.log('******************************************************************************');
        // console.log('api: ', _api);
        const source$ = defer(() => {
          return this.creator({
            method,
            url: _api,
            [['get', 'delete'].includes(method) ? 'params' : 'data']: dataParam,
            ...options,
          });
        }).pipe(
          // tap(console.log),
          retryWhen(retrySeletor(this.defaultOptions.maxRetry, this.defaultOptions.initialDelay)), // 延迟重试)
        );
        const return$ =
          middlewares && middlewares.length ?
            middlewares.reduce(
              (acc$, currentMiddleware) => this.installMiddle(acc$, currentMiddleware),
              source$) :
            source$;
        return return$;
      };
    };
  }
}

export default Sequelize;
