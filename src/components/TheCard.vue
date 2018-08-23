<template>
  <div class="the-card" >
    <div class="the-card__left">
        <i class="iconfont" :class="propIcon"></i>
        <span>{{propTitle}}</span>
    </div>
    <div class="the-card__right">
        <slot name="rightHandle" />
    </div>
  </div>
</template>
<script lang="ts">
import {Vue, Component, Prop, Emit} from 'vue-property-decorator';
@Component
export default class TheCard extends Vue {
  @Prop({type: String}) public propIcon!: string; // 图标
  @Prop({type: String}) public propTitle!: string; // 标题

}

</script>

<style lang="less">
.the-card {
  overflow: hidden;
  line-height: 40px;
  .the-card__left {
    float: left;
    i {
      margin-right: 10px;
      color: #409eff;
    }
  }
  .the-card__right {
    float: right;
    .el-select {
      // margin-right: 12px;
    }
  }
}
</style>

