<template>
  <div class="the-task-card" >
    <div class="the-task-card__title">
        <h5>{{title}}</h5>
        <span><slot name="rightHandle" /></span>
    </div>
    <div class="the-task-card__content">
        <slot name="content" />
    </div>
  </div>
</template>
<script lang="ts">
import {Vue, Component, Prop, Emit} from 'vue-property-decorator';
@Component
export default class TheTaskCard extends Vue {
  @Prop({type: String}) public title!: string; // 标题

}

</script>

<style lang="less">
@import url("../assets/less/variables.less");
.the-task-card{
  width: 100%;
  border: 1px dashed @table-background-color;
  &__title {
    height: 40px;
    font-size: 12px;
    line-height: 40px;
    padding: 0 10px;
    background-color: @table-background-color;
    h5 {
      font-size: 14px;
      font-weight: 400;
      display: inline-block;
    }
    > span {
      float: right;
    }
  }
  &__content {
    background: #fff;
    padding: 10px;
    border-top: 1px dashed @table-background-color;
  }
}
</style>

