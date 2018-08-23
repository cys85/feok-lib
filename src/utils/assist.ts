import pathToRegexp from 'path-to-regexp';
import dayjs from 'dayjs';
import { Vue } from 'vue/types/vue';

/**
 * 查找父组件
 * @export
 * @param {any} context 上下文
 * @param {any} componentName 查找父组件名称
 * @param {any} componentNames 查找父组件名称集合
 * @returns 查找到的父组件
 */

export function findComponentUpward(
  context: any,
  componentName: string,
  componentNames: string[],
): any {
  if (typeof componentName === 'string') {
    componentNames = [componentName];
  } else {
    componentNames = componentName;
  }

  let parent = context.$parent;
  let name = parent.$options.name;
  while (parent && (!name || componentNames.indexOf(name) < 0)) {
    parent = parent.$parent;
    if (parent) {
      name = parent.$options.name;
    }
  }
  return parent;
}

/**
 * 查找第一个符合条件的子组件
 * @export
 * @param {any} context 上下文
 * @param {any} componentName 查找的子组件名称
 * @returns 第一个符合条件的子组件
 */
export function findComponentDownward(
  context: any,
  componentName: string,
): any | null {
  const childrens = context.$children;
  let children = null;

  if (childrens.length) {
    for (const child of childrens) {
      const name = child.$options.name;
      if (name === componentName) {
        children = child;
        break;
      } else {
        children = findComponentDownward(child, componentName);
        if (children) {
          break;
        }
      }
    }
  }
  return children;
}

/**
 * 查找所有满足条件的子组件
 * @export
 * @param {any} context 上下文
 * @param {any} componentName 查找的子组件名称
 * @returns 所有满足条件的子组件
 */
export function findComponentsDownward(
  context: any,
  componentName: string,
): any {
  // TODO: components 类型
  return context.$children.reduce((components: any, child: any) => {
    if (child.$options.name === componentName) {
      components.push(child);
    }
    const foundChilds = findComponentsDownward(child, componentName);
    return components.concat(foundChilds);
  }, []);
}

/**
 * 判断参数是否是其中之一
 * @param {String} value 值
 * @param {Array} validList 数组
 * @returns true or false
 * @example
 * import {oneOf} from @/util/assist
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
 * import {isFunction} from @/util/assist
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
 * import {isString} from @/util/assist
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
 * import {isNumber} from @/util/assist
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
 * import {isUndefined} from @/util/assist
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
 * import {isArray} from @/util/assist
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
 * import {isObject} from @/util/assist
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
 * import {deepClone} from @/util/assist
 * const newObject = deepClone(superObject)
 */
export function deepClone(obj: any): object {
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
/**
 * 首字符大写
 * @param {Sring} str 需要转换的字符串
 * @returns 转换后的字符串
 * @example
 * import {firstLetterToUpperCase} from @/util/assist
 * // return 'Cys'
 * firstLetterToUpperCase('cys')
 */
export function firstLetterToUpperCase(str: string) {
  return str.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase());
}
/**
 * 日期字符串格式化
 *
 * @export
 * @param {string} [date=''] 需要被格式化的字符串
 * @param {string} [pattern=process.env.process.env.DATE_PATTERN] 格式 详见参考 http://dayjsjs.cn/
 * @returns 格式化后的日期字符串
 */
export function formatDate(
  date: string = '',
  pattern: string = process.env.DATE_PATTERN as string,
) {
  if (!date) {
    return '';
  }
  return dayjs(date).format(pattern);
}

type JsonTree = (
  data: any,
  config: {
    id?: string;
    pid?: string;
    children?: string;
    [propName: string]: any;
  },
) => any;

export const jsonTree: JsonTree = (
  data,
  { id = 'id', pid = 'pid', children = 'children' } = {},
) => {
  const idMap: any[] = [];
  const treeData: any[] = [];
  data.forEach((v: any) => {
    idMap[v[id]] = v;
  });

  data.forEach((v: any) => {
    const parent = idMap[v[pid]];
    if (parent) {
      if (!parent[children]) {
        parent[children] = [];
      }
      v.__parent__ = parent;
      parent[children].push(v);
    } else {
      treeData.push(v);
    }
  });
  return treeData;
};

export const getEnums: any = (key: any) => {
  const o = require('@/locale/lang/zh-CN').default;
  return Object.keys(o[key] || {}).map((item) => ({
    value: item,
    label: o[key][item],
  }));
};

/**
 * 数组引用转对象引用
 */
export function arrayTransformObject(mapKey: string, data: any[]) {
  const o: any = {};
  data.forEach((item) => {
    o[item[mapKey]] = item;
  });
  return o;
}

/**
 * 列表按钮权限
 * @param {object} btnMap 权限清单
 * @param {string} btnKey 按钮key
 * @param {string} value 判定值
 *
 * @example
 *
 * btnMap: {edit_plan: {name: "修改生产计划", key: "edit_plan", status: ["INVALID"]}, delete_plan: {name: "删除生产计划", key: "delete_plan", status: ["INVALID"]}}
 * btnKey: edit_plan
 * value: 'INVALID'
 * return true
 */
export function btnPermission(btnMap: any, btnKey: any, value: any) {
  return btnMap[btnKey] ? btnMap[btnKey].status.includes(value) : false;
}

/**
 * // 利用车间班组对象数组，取出班组和班组负责人名称，转成字符串放在一个对象里return出去
 * @param {object[]} arr 车间班组
 */
export function workshopFormat(array: object[]) {
  const array1 = array.map((item: any) => {
    return item.leader_obj.name;
  });
  const array2 = array.map((item: any) => {
    return item.name;
  });
  const obj = {
    leader_obj_name: array1.join(','),
    workshop_group_name: array2.join(','),
  };
  return obj;
}
