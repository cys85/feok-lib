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
      ref="upload"
      :limit="limit"
      :action="action"
      :data="getData"
      :disabled="disabled"
      :name="name"
      :headers="headers"
      list-type="picture-card"
      :on-success="onSuccess"
      :before-upload="beforeUpload"
      :on-exceed="onExceed"
      :on-preview="onPreview"
      :on-remove="onRemove"
      :http-request="httpRequest"
      :on-error="onError">
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible" width="35%">
      <img  width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit, Watch, Mixins } from 'vue-property-decorator';
import {State, namespace} from 'vuex-class';
import Mixin from './mixin';
import CanvasCompress from 'canvas-compress';

/**
 * 图片上传
 *
 * @param {string} action - 上传的地址
 * @param {object} data - 上传时附带的额外参数
 * @param {string} name - 上传的文件字段名
 * @param {object} headers - 设置上传的请求头部
 * @param {number} maxSize - 图片上传的大小上限 单位kb
 * @param {number} limit - 最大允许上传个数
 * @param {array} pictureTypes - 上传图片的类型
 * @param {boolean} disabled - 是否禁用
 * @param {function} httpRequest - 覆盖默认的上传行为，可以自定义上传的实现
 * @param {array} fileList - 上传的图片列表, 例如: [{name: 'food.jpg', url: 'https://xxx.cdn.com/xxx.jpg'}]
 *
 * @event on-success - 文件上传成功时的钩子 function(response, file, fileList)
 * @event on-remove - 文件列表移除文件时的钩子 function(file, fileList)
 * @event on-error - 文件上传错误 function(errorType, file) errorType: isNotImg 不是图片；overSize: 超出大小上线; exceed: 超出最大个数
 */

@Component
export default class PictureUpload extends Mixins(Mixin) {
  public dialogImageUrl = ''; // dialog中图片的url
  public dialogVisible = false; // 是否打开 dialog
  public alertMessage = ''; // 错误信息
  public $uploadButton!: any;

  @Prop({
    default() {
      return ['jpeg', 'png'];
    },
  })
  public pictureTypes!: any[];

  @Emit()
  public onSuccess(response: any, file: any, fileList: any) {
    this.checkUploadButton(fileList);
  }

  @Watch('fileList')
  public fileListChange() {
    this.$nextTick(function() {
      this.checkUploadButton();
    });
  }

  public checkUploadButton(fileList = this.fileList) {
    if (fileList.length >= this.limit) {
      this.$uploadButton.style.display = 'none';
    } else {
      this.$uploadButton.style.display = null;
    }
  }

  public async beforeUpload(file: any) {
    const isImg = this.pictureTypes.some((item: string) => file.type === `image/${item}`);
    const enabledSize = file.size / 1024;
    if (!isImg && this.pictureTypes.length) {
      this.$nextTick(function() {
        this.alertMessage = `图片只能上传 ${this.pictureTypes.join('、')} 格式`;
      });
      this.$emit('on-error', 'isNotImg', file);
      return Promise.reject(this.alertMessage);
    }
    if (enabledSize > this.maxSize) {
      this.$nextTick(function() {
        this.alertMessage = `图片大小不得超过${this.maxSize}kb`;
      });
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
   * 点击文件列表中已上传的文件时的钩子
   */
  public onPreview(file: any) {
    this.dialogImageUrl = file.url;
    this.dialogVisible = true;
  }

  /**
   * 文件列表移除文件时的钩子
   */
  @Emit()
  public onRemove(file: any, fileList: any) {
    this.alertMessage = '';
    this.checkUploadButton(fileList);
  }


  public mounted() {
    const $upload = this.$refs.upload as any;
    const $el = $upload.$el as HTMLElement;
    this.$uploadButton = $el.querySelector('.el-upload');
    this.checkUploadButton();
  }
}


</script>
