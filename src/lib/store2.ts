import storage from 'store2';
import _Cookies from 'js-cookie';

export const Cookies = _Cookies;

export type setStorageInterface = (key: string, value: string) => void;

export type getStorageInterface = (key: string) => string;

/**
 * 补丁方案： 解决微信端在部分机型下 localstorage 无法长期存储的bug
 *
 * @param {any} key
 * @param {any} value
 */
export const setStorage: setStorageInterface = (key: string, value: string) => {
  Cookies.set(key, value, { expires: 365 });
  storage.set(key, value);
};

/**
 *  * 补丁方案： 解决微信端在部分机型下 localstorage 无法长期存储的bug
 *
 * @param {any} key
 * @returns
 */
export const getStorage: getStorageInterface = (key: string): string => {
  if (storage.get(key)) {
    return storage.get(key);
  }
  if (Cookies.get(key)) {
    try {
      return JSON.parse(Cookies.get(key));
    } catch (error) {
      return Cookies.get(key);
    }
  }
  return '';
};


/**
 * 存储token
 * @param {string} token - 要存储的token
 */
export const saveTokenToLocal = (token: string, tokenKey = 'token'): void => {
  if (process.env.VUE_APP_TOKEN_PATTERN === 'session') {
    storage.session.set(tokenKey, token);
  } else {
    storage.set(tokenKey, token);
  }
};

/**
 * 删除token
 */
export const deleteTokenFormLocal = (tokenKey = 'token'): void => {
  if (process.env.VUE_APP_TOKEN_PATTERN === 'session') {
    storage.session.remove(tokenKey);
  } else {
    storage.remove(tokenKey);
  }
};

export const getTokenFormLocal = (tokenKey = 'token') => {
  if (process.env.VUE_APP_TOKEN_PATTERN === 'session') {
    return storage.session.get(tokenKey);
  } else {
    return storage.get(tokenKey);
  }
};


export default storage;
