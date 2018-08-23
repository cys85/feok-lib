/*
 * @Author: Yuanr 
 * @Date: 2018-08-13 14:59:59 
 * @Description 投诉任务过程记录表格组件
 */
<template>
  <div class="complaint-tast-table">
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
        prop="status"
        label="任务状态"
        min-width="180">
        <template slot-scope="scope">
          <span>{{$t(`TASK_STATUS.${scope.row.status}`)}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="result"
        label="处理结果"
        min-width="180">
      </el-table-column>
      <el-table-column
        prop="time"
        label="操作时间"
        min-width="180">
      </el-table-column>
      <el-table-column
        prop="user"
        label="操作人">
      </el-table-column>
    </el-table>
  </div>
</template>
<script lang="ts">
import {Vue, Component, Prop, Emit} from 'vue-property-decorator';
export interface DataType {
  status: string; // 车间名称
  result: string; // 过期档案
  time: string; // 新增时间
  user: string; // 新增时间
}
@Component
export default class ComplaintTastTable extends Vue {
  @Prop() public data!: DataType[];
  @Prop() public loading!: boolean;
}

</script>

<style lang="less">
@import url('../assets/less/variables.less');
.complaint-tast-table {
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

