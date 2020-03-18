import { Component, Vue, Prop, Emit, Watch } from 'vue-property-decorator';
import ajax from '../../utils/ajaxForUpload';

@Component
export default class Mixin extends Vue {
  @Prop({
    default() {
      return [];
    },
  })
  public fileList!: any[]; // 上传的图片列表, 例如: [{name: 'food.jpg', url: 'https://xxx.cdn.com/xxx.jpg'}]

  @Prop({
    default: '',
  })
  public action!: string; // 必选参数，上传的地址

  @Prop() public data!: object; // 上传时附带的额外参数

  @Prop() public name!: string; // 上传的文件字段名

  @Prop() public headers!: object; // 设置上传的请求头部

  @Prop(Number) public limit!: number; // 最大允许上传个数

  @Prop({
    default: 4 * 1024, // 4MB
  })
  public maxSize!: number; // 图片上传的大小上线 单位kb

  @Prop({
    default() {
      return ajax;
    },
  })
  public httpRequest!: any;

  @Prop(Boolean)
  public disabled!: boolean; // 是否禁用， 禁用：true； 启用：true

  public alertMessage = ''; // 错误信息

  // clone
  get getData() {
    return {
      ...this.data,
    };
  }

  @Emit()
  public onSuccess(response: any, file: any, fileList: any) {}
  /**
   * 文件列表移除文件时的钩子
   */
  @Emit()
  public onRemove(file: any, fileList: any) {
    this.alertMessage = '';
  }

  /**
   * 文件超出个数限制时的钩子
   */
  public onExceed(files: any, fileList: any) {
    // EventBus.$emit('warning', `超出最大上传数量${this.limit}` );
    this.alertMessage = `超出最大上传数量${this.limit}`;
    this.$emit('on-error', 'exceed', files, fileList);
  }

  /**
   * 异常处理
   * @param err 错误信息
   * @param file 出错的文件
   * @param fileList 当前文件列表
   */
  public onError(err: any, file: any, fileList: any) {
    this.alertMessage = process.env.production ? '网络异常，请稍后再试' : err;
    this.$emit('on-error', 'server', err, file, fileList);
  }
}
