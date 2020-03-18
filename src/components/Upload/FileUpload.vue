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
      :disabled="disabled"
      :on-preview="handlePreview"
      drag
      multiple
      :file-list="fileList"
      :headers="headers"
      :on-success="onSuccess"
      :before-upload="beforeUpload"
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
import { Component, Vue, Prop, Emit, Mixins } from 'vue-property-decorator';
import {State, namespace} from 'vuex-class';
import mixin from './mixin';

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
 * @param {function} onPreview - 点击文件列表中已上传的文件时的钩子 function(file)
 * @param {boolean} disabled - 是否禁用
 * @param {function} httpRequest - 覆盖默认的上传行为，可以自定义上传的实现
 * @param {array} fileList - 上传的文件列表, 例如: [{name: 'food.jpg', url: 'https://xxx.cdn.com/xxx.jpg'}]
 * @event on-success - 文件上传成功时的钩子 function(response, file, fileList)
 * @event on-remove - 文件列表移除文件时的钩子 function(file, fileList)
 * @event on-error - 文件上传错误 function(errorType, file) errorType: typeError 类型不匹配；overSize: 超出大小上线; exceed: 超出最大个数
 */

@Component
export default class FileUpload extends Mixins(mixin) {
  @Prop() public onPreview!: any;
  @Prop({
    default() {
      return [];
    },
  })
  public fileTypes!: any[];

  public handlePreview(file: any) {
    if (typeof this.onPreview === 'function') {
      this.onPreview(file);
    } else {
      this.downLoad(file);
    }
  }

  public downLoad(file: any) {
    const link = document.createElement('a');
    link.target = '_blank';
    link.href = file.url;
    link.download = file.name;
    const event = new MouseEvent('click');
    link.dispatchEvent(event);
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

}


</script>
