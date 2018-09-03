<template>
  <section>
    <el-alert
      :style="{
        marginBottom: '8px'
      }"
      v-show="alertMessage"
      :title="alertMessage"
      type="error"
      show-icon>
    </el-alert>
    <el-upload
      :limit="limit"
      :action="action"
      :data="getData"
      :name="name"
      drag
      multiple
      :file-list="fileList"
      :headers="headers"
      :on-success="onSuccess"
      :before-upload="beforeUpload"
      :on-progress="uploadProcess"
      :on-exceed="onExceed"
      :on-remove="onRemove"
      :http-request="httpRequest"
      :on-error="onError">
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip"><slot name="tip"></slot></div>
    </el-upload>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator';
import {State, namespace} from 'vuex-class';
/**
 * 文件上传
 *
 * @param {string} moduleName - 模块名称
 * @param {string} action - 上传的地址
 * @param {object} data - 上传时附带的额外参数
 * @param {string} name - 上传的文件字段名
 * @param {object} headers - 设置上传的请求头部
 * @param {number} maxSize - 文件上传的大小上限 单位kb
 * @param {number} limit - 最大允许上传个数
 * @param {array} fileTypes - 上传文件的类型
 * @param {array} fileList - 上传的文件列表, 例如: [{name: 'food.jpg', url: 'https://xxx.cdn.com/xxx.jpg'}]
 *
 * @event on-success - 文件上传成功时的钩子 function(response, file, fileList)
 * @event on-error - 文件上传错误 function(errorType, file) errorType: typeError 类型不匹配；overSize: 超出大小上线; exceed: 超出最大个数
 */

@Component
export default class FileUpload extends Vue {
  @Prop({default() { return []; }}) public fileList!: any[]; // 上传的文件列表, 例如: [{name: 'food.jpg', url: 'https://xxx.cdn.com/xxx.jpg'}]
  @Prop({required: true}) public moduleName!: string; // 模块名称
  @Prop() public action!: string; // 必选参数，上传的地址
  @Prop({default() {
    return {};
  }}) public data!: object; // 上传时附带的额外参数
  @Prop({default: 'img'}) public name!: string; // 上传的文件字段名
  @Prop() public headers!: object; // 设置上传的请求头部
  @Prop(Number) public limit!: number; // 最大允许上传个数
  @Prop({
    default: 2 * 1024, // 2MB
  }) public maxSize!: number; // 文件上传的大小上线 单位kb
  @Prop({
    default() {
      return [];
    },
  }) public fileTypes!: any[];
  get getData() {
    return {
      path: this.moduleName,
      ...this.data,
    };
  }

  public alertMessage = ''; // 错误信息
  @Emit()
  public onSuccess(response: any, file: any, fileList: any) {
  }

  public beforeUpload(file: any) {
    file.percentage = 20;
    const isImg = this.fileTypes.some((item: string) => file.type === item);
    const enabledSize = file.size / 1024;
    if (!isImg && this.fileTypes.length) {
      this.$nextTick(function() {
        this.alertMessage = `文件只能上传 ${this.fileTypes.join('、')} 格式`;
      });
      // EventBus.$emit('error', this.alertMessage);
      this.$emit('on-error', 'typeError', file);
      return false;
    }
    if (enabledSize > this.maxSize) {
      this.$nextTick(function() {
        this.alertMessage = `文件大小不得超过${this.maxSize}kb`;
      });
      // EventBus.$emit('error', this.alertMessage);
      this.$emit('on-error', 'overSize', file);
      return false;
    }
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

  public onError(err: any, file: any, fileList: any) {
    this.alertMessage = process.env.production ? '网络异常，请稍后再试' : err;
    this.$emit('on-error', 'server', err, file, fileList);
  }
  public uploadProcess(event: any, file: any, fileList: any) {

  }
}


</script>

<style lang="less">
</style>