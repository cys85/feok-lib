<!--生产计划表格组件-->
<template>
  <div class="choose-production-plan-table">
    <el-table
      :data="data"
      v-loading="loading"
      :height="height"
      @row-click="rowClick"
      @select="tableSelect"
      @selection-change="tableSelectChange"
      @select-all="tableSelectAll"
      style="">
      <el-table-column
        label="序号"
        type="index"
        align="center"
        width="70">
      </el-table-column>
      <el-table-column
        prop="batchno"
        label="批次号"
        min-width="120">
      </el-table-column>
      <el-table-column
        prop="productPno"
        label="品号"
        min-width="80">
      </el-table-column>
      <el-table-column
        prop="productName"
        label="品名"
        min-width="300">
      </el-table-column>
      <el-table-column
        prop="num"
        label="数量"
        min-width="80">
      </el-table-column>
      <el-table-column
        prop="workshopName"
        label="车间"
        min-width="120">
      </el-table-column>
      <el-table-column
        prop="lastTime"
        label="创建时间"
        min-width="180">
      </el-table-column>
      <slot name="handle"></slot>
    </el-table>
  </div>
</template>
<script lang="ts">
import {Vue, Component, Prop, Emit} from 'vue-property-decorator';
export interface ChooseProductionPlanDataType {
  batchno: string;
  productPno: string;
  productName: string;
  num: number;
  workshopName: string;
  lastTime: string;
}
@Component
export default class ChooseProductionPlanTable extends Vue {
  @Prop() public data!: ChooseProductionPlanDataType[];
  @Prop() public loading!: boolean;
  @Prop() public height!: number;
  @Emit('select')
  public tableSelect(selection: any, row: any): void {
    // 选中某项
  }
  @Emit('select-change')
  public tableSelectChange(selection: any): void {
    // 选中项变化
  }
  @Emit('select-all')
  public tableSelectAll(selection: any): void {
    // 全选
  }

  public rowClick(row: any, event: any, column: any) {
    this.$emit('rowClick', row, event, column);
  }
}
</script>

<style lang="less">
@import url("../assets/less/variables.less");
.choose-production-plan-table{
  .el-table{
    thead{
      tr{
        th{
          background: @table-background-color;
          color: #333;
        }
      }
    }
  }
}
</style>

