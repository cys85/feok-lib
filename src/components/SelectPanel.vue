/*
 * @Author: Yuanr 
 * @Date: 2018-08-13 14:56:43 
 * @Description select面板无状态组件
 */
<template>
  <div class="select-panel">
    <div class="select-panel__title" v-html="label"></div>
    <div class="select-panel__tag">{{value}}</div>
  </div>
</template>
<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator';
@Component
export default class SelectPanel extends Vue {
  @Prop({required: true}) public label!: string;
  @Prop({type: [String, Number]}) public value!: string | number;
}

</script>

<style lang="less">
.select-panel {
  display: flex;
  align-items: center;
  width: 100%;
  .select-panel__title {
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 14px;
    color: #606266;
  }
  .select-panel__tag {
    text-align: right;
    color: rgb(132, 146, 166);
    font-size: 13px;
  }
}
</style>

