import { isObject, compilePath, replaceNullOrUndefined } from './utils';
import Fetch from './Fetch';
// import {compilePath} from '@/utils/assist'
interface ORMInterface {
  get(): any; // get method of ajax
  post(): any; // post method of ajax
  delete(): any; // delete method of ajax
  patch(): any; // patch method of ajax
  put(): any; // put method of ajax
}

class ORM implements ORMInterface {
  public get: any;
  public post: any;
  public delete: any;
  public patch: any;
  public put: any;
  private module: any;
  private plugins: any;
  constructor({
    ajaxBaseUrl = '',
    ajaxTimeout = 3000,
    tokenCache = 'session',
  }) {
    this.module = {};
    this.plugins = [];
    const fetch = new Fetch({ ajaxBaseUrl, ajaxTimeout, tokenCache });
    this.get = this._ajax('get', fetch)();
    this.post = this._ajax('post', fetch)();
    this.delete = this._ajax('delete', fetch)();
    this.patch = this._ajax('patch', fetch)();
    this.put = this._ajax('put', fetch)();
  }

  // 插件装载
  public use(plugins: any) {
    this.plugins.push(plugins);
    this.plugins.forEach((Plugin: any) => {
      const plugin = new Plugin();
      plugin.apply.call(plugin, this);
    });
  }

  public next(module: any) {
    const self = this;
    let index = 0;
    const nxt = async () => {
      if (index >= module.middlewares.length) {
        return;
      }
      const middleware = module.middlewares[index];
      index++;
      await middleware(module, nxt.bind(self));
    };
    return nxt;
  }

  public _ajax(method: any, fetch: any) {
    return () => (config: any, ...middlewares: any[]) => {
      const source = fetch.CancelToken.source();
      const configObject = isObject(config)
        ? config
        : {
            url: config,
          };
      const { url } = configObject;
      const key = Symbol(url);
      this.module[key] = this.module[key] || {
        middlewares: middlewares || [],
        req: {
          body: {},
        },
        res: {},
      };
      const module = this.module[key];
      const self = this;
      const fn: any = async function funs(params: any, query: any) {
        const nParams = replaceNullOrUndefined(params);
        configObject.url = compilePath(url, nParams);
        module.req.body = nParams;
        try {
          module.res = await fetch[method](configObject.url, query || nParams, {
            cancelToken: source.token,
            ...config,
          });
        } catch (error) {
          const err: any = JSON.parse(error.message);
          module.res = {
            code: err.status,
            message: err.statusText,
          };
        }
        await self.next(module)();
        return module.res;
      };
      fn.source = source;
      return fn;
    };
  }
}

export default ORM;
