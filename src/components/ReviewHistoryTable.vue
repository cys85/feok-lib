/*
 * @Author: Yuanr 
 * @Date: 2018-08-13 14:59:04 
 * @Description 审核历史表格组件
 */
<template>
  <div class="review-history-table">
    <el-table
      :data="data"
      v-loading="loading"
      style="width: 100%">
      <el-table-column
        label="序号"
        type="index"
        align="center"
        width="70">
      </el-table-column>
      <el-table-column
        prop="name"
        label="审核人"
        min-width="180">
      </el-table-column>
      <el-table-column
        prop="time"
        label="审核时间"
        min-width="180">
      </el-table-column>
      <el-table-column
        prop="measure"
        label="处理措施"
        min-width="180">
        <template slot-scope="{row}">
          {{row.measure || '---'}}
        </template>
      </el-table-column>
      <el-table-column
        prop="status"
        label="任务状态">
        <template slot-scope="{row}">
          {{$t(`QUALITY_CHECK_STATUS.${row.status}`)}}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script lang="ts">
import {Vue, Component, Prop, Emit} from 'vue-property-decorator';
export interface DataType {
  name: string; // 审核人
  time: string; // 审核时间
  measure: string; // 处理措施
  status: string; // 任务状态
}
@Component
export default class ReviewHistoryTable extends Vue {
  @Prop() public data!: DataType[];
  @Prop() public loading!: boolean;
}

</script>

<style lang="less">
@import url('../assets/less/variables.less');
.review-history-table {
  .el-table {
    thead {
      tr {
        th {
          background: @table-background-color;
          color: #333;
        }
      }
    }
  }
}
</style>

