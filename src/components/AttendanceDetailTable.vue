/**
 * 考勤详情表格组件-业务组件-leo
 *
 * @param {string[]} data - 表格数据
 * @param loading - loading状态
 *
 * @exprot AttendanceDetailDataType - 表格数据interface
 *
 */
<template>
  <div class="attendance-detail-table">
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
        prop="date"
        label="日期"
        min-width="180">
      </el-table-column>
      <el-table-column
        prop="time"
        label="时段"
        min-width="100">
        <template slot-scope="scope">
          <span class="table-status" :class="$t(`ATTENDANCEDETAIL_DATE_CLASS.${scope.row.time}`)">{{$t(`ATTENDANCEDETAIL_DATE.${scope.row.time}`)}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="position"
        label="位置"
        min-width="300">
      </el-table-column>
      <el-table-column
        prop="photo"
        label="拍照照片"
        min-width="120">
        <template slot-scope="scope">
          <PictureView 
            :smallPath='scope.row.photo' 
            :path='scope.row.bigphoto' 
            :width='40' 
            :height='40' 
            leftDisplay>
          </PictureView>
        </template>
      </el-table-column>
      <slot name="handle"></slot>
    </el-table>
  </div>
</template>
<script lang="ts">
import {Vue, Component, Prop, Emit} from 'vue-property-decorator';
import PictureView from '@/components/PictureView.vue';

export interface AttendanceDetailDataType {
  date: string;           // 日期
  time: string;           // 时段
  position: string;       // 权限
  photo: string;          // 拍照照片
  bigphoto: string;       // 拍照照片
}

@Component({
  components: {
    PictureView,
  },
})
export default class AttendanceDetailTable extends Vue {
  @Prop() public data!: AttendanceDetailDataType[];
  @Prop() public loading!: boolean;
}
</script>
<style lang="less">
@import url("../assets/less/variables.less");
.attendance-detail-table{
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
  .clock-in{
    background:@1abe6b;
  }
  .clock-out{
    background:@2d8cf0;
  }
  .table-status{
    border-radius:4px; 
    padding: 2px 6px;
    color:#fff;
  }
}
</style>

