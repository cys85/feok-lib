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
      :headers="headers"
      list-type="picture-card"
      :on-success="onSuccess"
      :before-upload="beforeUpload"
      :on-exceed="onExceed"
      :on-preview="onPreview"
      :on-remove="onRemove"
      :on-progress="uploadProcess"
      :on-error="onError">
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible" width="35%">
      <img  width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator';
import {State, namespace} from 'vuex-class';
import CanvasCompress from 'canvas-compress';
/**
 * 图片上传
 *
 * @param {string} moduleName - 模块名称
 * @param {string} action - 上传的地址
 * @param {object} data - 上传时附带的额外参数
 * @param {string} name - 上传的文件字段名
 * @param {object} headers - 设置上传的请求头部
 * @param {number} maxSize - 图片上传的大小上限 单位kb
 * @param {number} limit - 最大允许上传个数
 * @param {array} pictureTypes - 上传图片的类型
 * @param {array} fileList - 上传的图片列表, 例如: [{name: 'food.jpg', url: 'https://xxx.cdn.com/xxx.jpg'}]
 *
 * @event on-success - 文件上传成功时的钩子 function(response, file, fileList)
 * @event on-error - 文件上传错误 function(errorType, file) errorType: isNotImg 不是图片；overSize: 超出大小上线; exceed: 超出最大个数
 */

@Component
export default class PictureUpload extends Vue {
  public dialogImageUrl = ''; // dialog中图片的url
  public dialogVisible = false; // 是否打开 dialog
  public alertMessage = ''; // 错误信息
  @Prop({required: true}) public moduleName!: string; // 模块名称
  @Prop({default() { return []; }}) public fileList!: any[]; // 上传的图片列表, 例如: [{name: 'food.jpg', url: 'https://xxx.cdn.com/xxx.jpg'}]
  @Prop() public action!: string; // 必选参数，上传的地址
  @Prop({default() {
    return {};
  }}) public data!: object; // 上传时附带的额外参数
  @Prop({default: 'img'}) public name!: string; // 上传的文件字段名
  @Prop() public headers!: object; // 设置上传的请求头部
  @Prop(Number) public limit!: number; // 最大允许上传个数
  @Prop({
    default: 4 * 1024, // 4MB
  }) public maxSize!: number; // 图片上传的大小上线 单位kb
  @Prop({
    default() {
      return ['jpeg', 'png'];
    },
  }) public pictureTypes!: any[];

  get getData() {
    return {
      path: this.moduleName,
      ...this.data,
    };
  }
  public uploadProcess(event: any, file: any, fileList: any) {
  }
  @Emit()
  public onSuccess(response: any, file: any, fileList: any) {}

  public async beforeUpload(file: any) {
    const isImg = this.pictureTypes.some((item: string) => file.type === `image/${item}`);
    const enabledSize = file.size / 1024;
    if (!isImg && this.pictureTypes.length) {
      this.$nextTick(function() {
        this.alertMessage = `图片只能上传 ${this.pictureTypes.join('、')} 格式`;
      });
      // EventBus.$emit('error', this.alertMessage);
      this.$emit('on-error', 'isNotImg', file);
      return Promise.reject(this.alertMessage);
    }
    if (enabledSize > this.maxSize) {
      this.$nextTick(function() {
        this.alertMessage = `图片大小不得超过${this.maxSize}kb`;
      });
      // EventBus.$emit('error', this.alertMessage);
      this.$emit('on-error', 'overSize', file);
      return Promise.reject(this.alertMessage);
    }
    this.alertMessage = '';
    if (enabledSize > 1024) {
      const compressor = new CanvasCompress({
        // type: CanvasCompress.MIME.JPEG,
        quality: 0.5,
      });
      const {source, result} = await compressor.process(file);
      return Promise.resolve(result.blob);
    }
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
   * 点击文件列表中已上传的文件时的钩子
   */
  public onPreview(file: any) {
    this.dialogImageUrl = file.url;
    this.dialogVisible = true;
  }

  public onError(err: any, file: any, fileList: any) {
    this.alertMessage = process.env.production ? '网络异常，请稍后再试' : err;
    this.$emit('on-error', 'server', err, file, fileList);
  }
}


</script>

<style lang="less">
</style>