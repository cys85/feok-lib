<template>
<div class="authRole-table">
    <el-table
      v-loading="loading"
      :data="data"
      style="width: 100%">
      <el-table-column
        type="index"
        label="序号"
        width="70">
      </el-table-column>
      <el-table-column
        prop="jurisdiction_name"
        label="权限名称"
        min-width="200">
      </el-table-column>
      <el-table-column
        prop="task_describtion"
        label="权限介绍"
        min-width="250">
      </el-table-column>
      <el-table-column
        prop="creat_time"
        label="创建时间"
        width="120">
        <template slot-scope="scope">
          <el-tooltip v-if="scope.row.creat_time&&scope.row.creat_time!=='0000-00-00 00:00:00'" :content="scope.row.creat_time" placement="top-start">
            <span>{{$rt(scope.row.creat_time)}}</span>
          </el-tooltip>
          <span v-else>---</span>
        </template>
      </el-table-column>
      <slot></slot>
    </el-table>
</div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
export interface DataType {
  jurisdiction_name: string;  // 权限名称
  task_describtion: string;  // 权限介绍
  creat_time: string; // 创建时间
}

@Component
export default class AuthRoleTable extends Vue {
  @Prop() public loading!: boolean;
  @Prop() public data!: DataType[];
}
</script>

