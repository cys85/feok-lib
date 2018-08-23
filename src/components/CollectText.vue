/*
 * @Author: Yuanr 
 * @Date: 2018-08-13 14:57:42 
 * @Description 汇总文字无状态组件
 */
<template>
  <div class="collect-text" @click="clickItem">
    <div class="collect-text__title">{{title}}</div>
    <div class="collect-text__content">{{content}}</div>
  </div>
</template>
<script lang="ts">
import {Vue, Component, Prop, Emit} from 'vue-property-decorator';
@Component
export default class CollectText extends Vue {
  @Prop({required: true}) public title!: string; // 标题
  @Prop({type: [String, Number], required: true}) public content!: string | number; // 副标题
  @Emit('click')
  public clickItem(): void {
    // 点击事件
  }
}

</script>

<style lang="less">
.collect-text {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  user-select: none;
  & > div {
    flex: 1;
    display: flex;
    align-items: center;
  }
  .collect-text__content {
    font-weight: bold;
    font-size: 24px;
  }
}
</style>

