/**
 * 员工表格组件-业务组件-leo
 *
 * @param {string[]} data - 表格数据
 * @param loading - loading状态
 *
 * @exprot AuthUserDataType - 表格数据interface
 *
 */
<template>
  <div class="authuser-table">
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
        prop="name"
        label="员工姓名"
        min-width="120">
      </el-table-column>
      <el-table-column
        prop="account"
        label="登录账号"
        min-width="180">
      </el-table-column>
      <el-table-column
        prop="authority"
        label="权限"
        min-width="200">
        <template slot-scope="scope">
          <!-- <span class="table-status" v-for="(item,index) in scope.row.authority" :key="index">{{item}}</span> -->
          <el-tag v-for="(item,index) in scope.row.authority" :key="index">{{item}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="lastTime"
        label="最后登录"
        min-width="120">
        <template slot-scope="scope">
          <el-tooltip v-if="scope.row.lastTime&&scope.row.lastTime!=='0000-00-00 00:00:00'" :content="scope.row.lastTime" placement="top-start">
            <span>{{$rt(scope.row.lastTime)}}</span>
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
export interface AuthUserDataType {
  name: string;       // 员工姓名
  account: string;    // 登录账号
  authority: string[];  // 权限
  lastTime: string;   // lastTime
}
@Component
export default class AuthUserTable extends Vue {
  @Prop() public data!: AuthUserDataType[];
  @Prop() public loading!: boolean;
}

</script>
<style lang="less">
@import url('../assets/less/variables.less');
.authuser-table {
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
    display: inline-block;
    border-radius: 4px;
    padding: 2px 6px;
    color: #fff;
    background-color: @2d8cf0;
    margin: 2px 0;
    margin-right: 4px;
  }
}
</style>

