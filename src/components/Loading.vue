<template>
  <div class="baseLoading">
    <div class="baseLoading-load">
      <i class="iconfont icon-loading"/>
    </div>
    <div>{{text}}</div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
@Component
export default class BaseLoading extends Vue {
   @Prop({default: '加载中...'}) public text!: string;
}
</script>

<style lang="less">
.baseLoading {
  .baseLoading-load {
    margin-bottom: 3px;
    text-align: center;
    animation: BaseLoading-load-spin 1s linear infinite;
  }
  z-index: 800;
}
@keyframes BaseLoading-load-spin {
    from { transform: rotate(0deg);}
    50%  { transform: rotate(180deg);}
    to   { transform: rotate(360deg);}
}
</style>

