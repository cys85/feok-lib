// tslint:disable-next-line:no-var-requires
const querystring = require('querystring');

/*
 * @Author: chenyusheng
 * @Date: 2018-01-26 08:40:37
 * @Last Modified by: cys
 * @Last Modified time: 2018-06-28 14:28:12
 */

const AJAX_TYPE_PENDING = 'pending';
const AJAX_TYPE_RESOLVE = 'resolve';
const AJAX_TYPE_REJECT = 'reject';

// 执行区
const execution: any = {};
// 等候区
const waiting: any = {};
/**
 * API节流器
 * @param {object} fetch ajax
 */
const ajaxDebounce = function ajaxDebouncefn(fetch: any): any {
  return ({ method = '', url = '', data = {}, options = {} }) => {
    const key = `${method}:${url}?${querystring.stringify(data)}`;
    if (execution[key] === AJAX_TYPE_PENDING) {
      return new Promise((resolve, reject) => {
        if (waiting[key]) {
          waiting[key].push(resolve);
        } else {
          waiting[key] = [resolve];
        }
      });
    }
    execution[key] = AJAX_TYPE_PENDING;
    return fetch({
      url,
      method,
      params: ['get', 'delete'].indexOf(method) !== -1 ? data : {},
      data: ['post', 'put', 'patch'].indexOf(method) !== -1 ? data : {},
      ...options,
    })
      .then((res: any) => {
        execution[key] = AJAX_TYPE_RESOLVE;
        if (waiting[key]) {
          call(waiting[key], res);
        }
        clearWaiting(key);
        return res;
      })
      .catch((error: any) => {
        execution[key] = AJAX_TYPE_REJECT;
        clearWaiting(key);
        if (!fetch.isCancel(error)) {
          // 处理错误
          throw new Error(error);
        }
      });
  };
};

function call(queue = [], params = {}): void {
  queue.forEach((resolve: any) => {
    resolve(JSON.parse(JSON.stringify(params)));
  });
}

function clearWaiting(key: string): void {
  delete waiting[key];
}

export default ajaxDebounce;
