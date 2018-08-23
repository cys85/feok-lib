<!--投诉任务表格-->
<template>
  <div class="complaint-task-table">
    <el-table
      v-loading="loading"
      :data="data"
      style="width: 100%">
      <el-table-column
        label="序号"
        type="index"
        align="center"
        width="70">
      </el-table-column>
      <el-table-column
        prop="status"
        label="任务状态"
        min-width="100">
        <template slot-scope="scope">
          <!-- <el-tag class="table-status" :class="$t(`TASK_STATUS_CLASS.${scope.row.status}`)">{{$t(`TASK_STATUS.${scope.row.status}`)}}</el-tag> -->
          <el-tag :type="$t(`TASK_STATUS_TYPE.${scope.row.status}`)">{{$t(`TASK_STATUS.${scope.row.status}`)}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="batch_number"
        label="批次号"
        min-width="100">
      </el-table-column>
      <el-table-column
        prop="pno"
        label="品号"
        min-width="100">
      </el-table-column>
      <el-table-column
        prop="product_name"
        label="品名"
        min-width="200">
      </el-table-column>
      <el-table-column
        prop="create_time"
        label="提交时间"
        min-width="80">
        <template slot-scope="scope">
          <el-tooltip v-if="scope.row.create_time&&scope.row.create_time!=='0000-00-00 00:00:00'" :content="scope.row.create_time" placement="top-start">
            <span>{{$rt(scope.row.create_time)}}</span>
          </el-tooltip>
          <span v-else>---</span>
        </template>
      </el-table-column>
      <slot name="handle"></slot>
    </el-table>
  </div>
</template>
<script lang="ts">
import {Vue, Component, Prop, Emit} from 'vue-property-decorator';
export interface DataType {
  status: string;           // 状态
  batch_number: string;     // 批次号
  pno: string;              // 品号
  product_name: string;     // 品名
  create_time: string;      // 提交时间
}
@Component
export default class ComplaintTaskTable extends Vue {
  @Prop() public loading!: boolean;
  @Prop() public data!: DataType[];
}

</script>

<style lang="less">
@import url('../assets/less/variables.less');
.complaint-task-table {
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
  .table-status {
    width: 70px;
    text-align: center;
    // border-radius:4px;
    // padding: 2px 6px;
    // font-size: 12px;
    // display: inline-block;
    color: #fff;
  }
  .bg-primary {
    background-color: #2d8cf0;
  }
  .bg-info {
    background-color: #66ccff;
  }
  .bg-success {
    background-color: #1abe6b;
  }
  .bg-warning {
    background-color: #ff9900;
  }
  .bg-error {
    background-color: #ed3f14;
  }
}
</style>

