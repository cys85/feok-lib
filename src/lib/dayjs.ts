import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
dayjs.locale('zh-cn');
import rt from 'dayjs/plugin/relativeTime'; // 按需加载

dayjs.extend(rt); // 使用插件

export const relativeTime = (time: string) => {
  const d: any = dayjs(time);
  return d.fromNow();
};

export default dayjs;
