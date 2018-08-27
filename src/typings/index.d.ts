import { AxiosRequestConfig } from "axios";


export type AjaxFuns = (url: string | AxiosRequestConfig, ...args: Middleware[]) => Promise<any>

/**
 * 中间件
 */
export type Middleware = (...args: any[]) => void


declare namespace FeokLib {
  interface ORMInterface {
    get: AjaxFuns; 
    post: AjaxFuns;
    delete: AjaxFuns;
    patch: AjaxFuns;
    put: AjaxFuns;
  }
}