<template>
  <div class="page-bar">
    <ul>
      <li @click="firstPage" :class="{'is-disabled' : p === 1}">&lt;</li>
      <li @click="prevPage" :class="{'is-disabled' : p === 1}">上一页</li>
      <li @click="firstPage"><i class="iconfont icon-home" /></li>
      <li @click="nextPage" :class="{'is-disabled' : p === totalPage}">下一页</li>
      <li @click="lastPage" :class="{'is-disabled' : p === totalPage}">&gt;</li>
    </ul>
    <div style="wdith: 140px;clear: both;">
      第 
      <el-input-number 
        style="width: 80px;" 
         
        v-model="p" 
        controls-position="right" 
        @change="handleChange" 
        :min="1"
        :max="totalPage" /> 
      页
    </div>
  </div>
</template>

<script lang="ts">
// 登录表单
import { Vue, Watch, Component, Prop } from 'vue-property-decorator';

@Component
export default class PageBar extends Vue {
  @Prop({required: true, type: Number, default: 1}) public pageNo!: number;
  @Prop({required: true, type: Number, default: 0}) public total!: number;
  @Prop({type: Number, default: 25}) public size!: number;
  public p = this.pageNo;
  public totalPage = Math.ceil(this.total / this.size) || 1;

  public handleChange(): void {
    console.log(this.p, 'click handleChange！！！！！！！！！！！！！！');
    this.$emit('page-change', this.p);
  }
  public firstPage(): void {
    if (this.p !== 1) {
      this.p = 1;
      console.log(this.p, 'click fistPage！！！！！！！！！！！！！！');
      this.$emit('page-change', this.p);
    }
  }
  public prevPage(): void {
    if (this.p > 1) {
      this.p --;
      console.log(this.p, 'click prevPage！！！！！！！！！！！！！！');
      this.$emit('page-change', this.p);
    }
  }
  public nextPage(): void {
    if (this.p !== this.totalPage) {
      this.p ++;
      console.log(this.p, 'click nextPage！！！！！！！！！！！！！！');
      this.$emit('page-change', this.p);
    }
  }
  public lastPage(): void {
    this.p = this.totalPage;
    console.log(this.p, 'click lastPage！！！！！！！！！！！！！！');
    this.$emit('page-change', this.p);
  }
  @Watch('total')
  protected watchTotal(newVal: number, oldVal: number) {
    this.total = newVal;
  }
  @Watch('size')
  protected watchSize(newVal: number, oldVal: number) {
    this.size = newVal;
  }
  @Watch('pageNo')
  protected watchPageNo(newVal: number, oldVal: number) {
    this.p = newVal;
  }
}

</script>

<style lang="less">
.page-bar {
  width: 210px;
  text-align: center;
  font-size: 14px;
  font-weight: 700;
  margin: 0 auto;
  color: #333;
  ul > li {
    float: left;
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
}
</style>

