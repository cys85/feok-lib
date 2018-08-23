<template>
  <div class="page-bar">
    <ul>
      <li @click="prevPage" :class="{'is-disabled' : p === 1}">&lt; 上一页</li>
      <li @click="firstPage"><i class="iconfont icon-home" /></li>
      <li @click="nextPage" :class="{'is-disabled' : noMoreData}">下一页 &gt;</li>
    </ul>
    <!-- <div style="wdith: 140px;clear: both;">
      第 
      <el-input-number
        :max="max"
        :controls="false"
        style="width: 60px;" 
        size="small"
        v-model="p" 
        controls-position="right" 
        @change="handleChange" 
        :min="1" /> 
      页
    </div> -->
  </div>
</template>

<script lang="ts">
// 登录表单
import { Vue, Watch, Component, Prop } from 'vue-property-decorator';

@Component
export default class PageBar extends Vue {
  @Prop({required: true, type: Number, default: 1}) public pageNo!: number;
  @Prop({required: true, type: Boolean, default: false}) public noMoreData!: boolean;
  public p = this.pageNo;

  public handleChange(): void {
    this.$emit('page-change', this.p);
  }
  public firstPage(): void {
    if (this.p !== 1) {
      this.p = 1;
      this.$emit('page-change', this.p);
    }
  }
  public prevPage(): void {
    if (this.p > 1) {
      this.p --;
      this.$emit('page-change', this.p);
    }
  }
  public nextPage(): void {
    if (!this.noMoreData) {
      this.p ++;
      this.$emit('page-change', this.p);
    }
  }

  get max() {
    return this.noMoreData ? this.pageNo : Number.POSITIVE_INFINITY;
  }

  @Watch('noMoreData')
  protected watchNoMoreData(newVal: boolean, oldVal: boolean) {
    this.noMoreData = newVal;
  }
  @Watch('pageNo')
  protected watchPageNo(newVal: number, oldVal: number) {
    this.p = newVal;
  }
}

</script>

<style lang="less">
.page-bar {
  width: 186px;
  text-align: center;
  font-size: 14px;
  font-weight: 700;
  margin: 0 auto;
  color: #333;
  ul > li {
    display: inline-block;
    padding: 8px;
    user-select: none;
    list-style: none;
    cursor: pointer;
    color: #333;
    -webkit-tap-highlight-color:transparent; 
  }
  .is-disabled {
    color: #c0c4cc;
    cursor: not-allowed;
  }
  .el-input-number.is-controls-right .el-input__inner {
    padding: 10px;
  }
}
</style>

