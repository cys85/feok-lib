import pathToRegexp from 'path-to-regexp';

export const resfilter = (options: any) => {
  const format = options.format.split('.');
  let index = 0;
  return function fn(res: any): any {
    if (format[index]) {
      const newRes = res[format[index]];
      index++;
      return fn(newRes);
    } else {
      index = 0;
      return res;
    }
  };
};

export function replaceNullOrUndefined(obj: any): any {
  if (isArray(obj)) {
    return obj.map(replaceNullOrUndefined);
  } else if (obj && isObject(obj)) {
    const newOb: any = {};
    const keys = Object.keys(obj);
    for (let i = 0, l = keys.length; i < l; i++) {
      const key = keys[i];
      newOb[key] = replaceNullOrUndefined(obj[key]);
    }
    return newOb;
  } else {
    return isUndefined(obj) || obj === null ? '' : obj;
  }
}

/**
 * path路径补全
 * @param {String} path 补全路径
 * @param {Object} params 参数
 * @returns 完整path
 * @example
 * //  return '/user/123'
 * compilePath('/user/:id', { id: 123 })
 */
export function compilePath(path: string, params: object) {
  try {
    const toPath = pathToRegexp.compile(path);
    return toPath(params);
  } catch (error) {
    return path;
  }
}

/**
 * 判断参数是否是其中之一
 * @param {String} value 值
 * @param {Array} validList 数组
 * @returns true or false
 * @example
 * // return true
 * oneOf('no', ['yes', 'no'])
 * // return false
 * oneOf('hello', ['yes', 'no'])
 */
export function oneOf(
  value: string | number,
  validList: string[] | number[],
): boolean {
  for (const valid of validList) {
    if (value === valid) {
      return true;
    }
  }
  return false;
}

/**
 * 判断参数的类型是否为function
 * @param {*} valid 参数
 * @returns true or false
 * @example
 * // return true
 * const funs = function () {}
 * isFunction(funs)
 * // return false
 * const str = 'str111'
 * isFunction(str)
 */
export function isFunction(valid: any): boolean {
  return typeof valid === 'function';
}

/**
 * 是否为字符串验证
 * @param {*} param 需验证的参数
 * @returns {Boolean}
 * @example
 * // return true
 * isString('cys')
 * // return false
 * isString({name: 'cys'})
 */
export function isString(param: any) {
  return typeof param === 'string';
}

/**
 * 是否为数字验证
 * @param {*} param 需验证的参数
 * @returns {Boolean}
 * @example
 * // return true
 * isString(111)
 * // return false
 * isString('cys')
 */
export function isNumber(param: any): boolean {
  return typeof param === 'number';
}

/**
 * 是否为undefined验证
 * @param {*} param 需验证的参数
 * @returns {Boolean}
 * @example
 * // return true
 * isUndefined(undefined)
 * // return false
 * isUndefined({name: 'cys'})
 */
export function isUndefined(param: any): boolean {
  return typeof param === 'undefined';
}

/**
 * 是否为数组验证
 * @param {*} param 需验证的参数
 * @returns {Boolean}
 * @example
 * // return true
 * isArray(['cys'])
 * // return false
 * isArray({name: 'cys'})
 */
export function isArray(param: any): boolean {
  return Array.isArray(param);
}

/**
 * 是否为对象验证
 * @param {object} param 需验证的参数
 * @returns {boolean}
 * @example
 * // return true
 * isObject({name: 'cys'})
 * // return false
 * isObject(['cys'])
 */
export function isObject(param: object): boolean {
  return Object.prototype.toString.call(param) === '[object Object]';
}

/**
 * 深度克隆
 * @param {*} obj 需要clone的对象
 * @returns 新的对象
 * @example
 * const newObject = deepClone(superObject)
 */
export function deepClone(obj: any): any {
  if (isArray(obj)) {
    return obj.map(deepClone);
  } else if (obj && isObject(obj)) {
    const cloned: any = {};
    const keys = Object.keys(obj);
    for (let i = 0, l = keys.length; i < l; i++) {
      const key = keys[i];
      cloned[key] = deepClone(obj[key]);
    }
    return cloned;
  } else {
    return obj;
  }
}
