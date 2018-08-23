/**
 * 附件下载组件-leo
 *
 * @param {string} fileName - 文件显示名称
 * @param {string} url - 文件地址
 *
 */

<template>
  <div class="base-file">
    <a :href="url" target="_blank"><i class="iconfont icon-fujian"/>{{fileName}}</a>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class BaseFile extends Vue {
  @Prop() public fileName!: string;
  @Prop() public url!: string;
}
</script>

<style lang="less">
  .base-file{
    i{
      margin-right: 8px;
    }
    a{
      color: #000;
      &:hover{
        color: #409EFF;
      }
    }
  }
</style>

