import Vue, { VNodeData, VNode } from 'vue';
import DeleteMessageBoxVue from '../components/DeleteMessageBox';
import { relativeTime as rt } from '@/lib/dayjs';
/**
 * 获取枚举
 * @param {String} formName 表单名称
 */
const getEnums: any = (key: any) => {
  const o = require('@/locale/lang/zh-CN').default;
  return Object.keys(o[key] || {}).map((item) => ({
    key: item,
    text: o[key][item],
  }));
};

/**
 * 日期差
 * @param time 时间
 */
const relativeTime: any = (time: string) => rt(time);

class DeleteMessageBox extends Vue {
  public loading = false;
  public del(msg: string) {
    return new Promise((resolve, reject) => {
      const h = this.$createElement;
      const vnode: any = h(DeleteMessageBoxVue, {
        props: {
          message: msg,
        },
      });
      this.$msgbox({
        message: vnode,
        title: '',
        confirmButtonText: ' 确定删除 ',
        confirmButtonClass: 'delete-btn-class el-button--danger',
        center: true,
        closeOnClickModal: false,
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = '删除中...';
            instance.showClose = false;
            resolve(() => {
              done();
              instance.confirmButtonLoading = false;
            });
          } else {
            done();
          }
        },
      });
    });
  }
}

// 添加全局方法
// Vue.tl = getEnums;
// 添加实例方法
Vue.prototype.$tl = getEnums;
Vue.prototype.$rt = relativeTime;
Vue.prototype.$del = new DeleteMessageBox().del;

export default {
  getEnums,
};
