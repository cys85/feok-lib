/*
 * @Author: Yuanr 
 * @Date: 2018-08-13 15:03:52 
 * @Description 考勤表格组件
 */
<template>
  <div class="attendance-table">
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
        label="姓名"
        min-width="80">
      </el-table-column>
      <el-table-column
        prop="account"
        label="账号"
        min-width="120">
      </el-table-column>
      <el-table-column
        prop="total"
        min-width="100"
        label="已签/共计">
        <template slot-scope="{row}">
          <span>({{ row.signIn }}</span> / <span>{{ row.total }})</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="workHours"
        min-width="80"
        label="工时">
      </el-table-column>
      <el-table-column
        prop="status"
        min-width="120"
        label="状态">
        <template slot-scope="{row}">
          <!-- <span class="attendance-table_tag" :type="transTag(row.status)">{{ $t(`ATTENDANCE_STATUS.${row.status}`) }}</span> -->
          <el-tag :type="transTag(row.status)">{{ $t(`ATTENDANCE_STATUS.${row.status}`) }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="imgList"
        min-width="240"
        label="拍摄照片">
        <template slot-scope={row}>
          <PictureAlbum :picSmallList="row.imgList" :picList="row.imgList" :width='propWidth' :height='propHeight'></PictureAlbum>       
        </template>
      </el-table-column>
      <slot name="handle"/>
    </el-table>
  </div>
</template>
<script lang="ts">
import {Vue, Component, Prop, Emit} from 'vue-property-decorator';
import PictureAlbum from '@/components/PictureAlbum.vue';
export interface DataType {
  name: string; // 姓名
  account: string; // 账号
  total: number; // 共计
  signIn: number; // 签到
  status: string; // 状态
  imgList: string[]; // 拍摄照片
  workHours: string; // 工时
  [propName: string]: any; // 扩展属性
}
@Component({
  components: {
    PictureAlbum,
  },
})
export default class AttendanceTable extends Vue {
  @Prop() public data!: DataType[];
  @Prop() public loading!: boolean;
  // 显示数据
  public propWidth: number = 40;
  public propHeight: number = 40;
  public transTag(status: string) {
    let styleClass: string = '';
    switch (status) {
      case 'NORMAL':
        styleClass = 'success';
        break;
      case 'ABNORMAL':
        styleClass = 'danger';
        break;
      case 'SHIFT_AM':
        styleClass = 'warning';
      case 'SHIFT_PM':
        styleClass = 'warning';
      case 'SHIFT_ALL':
        styleClass = 'warning';
        break;
      case 'TRIP_AM':
        styleClass = '';
      case 'TRIP_PM':
        styleClass = '';
      case 'TRIP_ALL':
        styleClass = '';
        break;
      case 'OFF_DAY':
        styleClass = 'info';
      default:
        styleClass = '';
    }
    return styleClass;
  }
}
</script>
<style lang="less">
@import url('../assets/less/variables.less');
.attendance-table {
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
  .attendance-table_tag {
    display: inline-block;
    width: 78px;
    @h: 28px;
    height: @h;
    line-height: @h;
    border-radius: 3px;
    text-align: center;
    color: #fff;
    background: #66ccff;
  }
  .attendance-table_tag-normal {
    background: green;
  }
  .attendance-table_tag-abnormal {
    background: red;
  }
  .attendance-table_tag-shift_am,
  .attendance-table_tag-shift_pm,
  .attendance-table_tag-shift_all {
    background: yellow;
  }
  .attendance-table_tag-trip_am,
  .attendance-table_tag-trip_pm,
  .attendance-table_tag-trip_all {
    background: #66ccff;
  }
  .attendance-table_tag-off_day {
    background: #ef6aff;
  }
  //
  // SHIFT_AM
  // SHIFT_PM
  // SHIFT_ALL
  // TRIP_AM
  // TRIP_PM
  // TRIP_ALL
  // OFF_DAY
}
</style>

