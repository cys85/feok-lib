declare module 'js-cookie' {
  export function set(key: string, value: string, options: { expires: number }): void;
  export function get(key: string): any;
}
