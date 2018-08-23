<template>
  <section class="the-breadcrumb">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <template v-for="item in data">
        <el-breadcrumb-item v-if="item.name !== ''"  :key="item.path">
          <a @click="clickItem(item.path, item)">{{item.name}}</a>
        </el-breadcrumb-item>
      </template>
    </el-breadcrumb>
    <i title="返回" v-show="showBackBtn" class="iconfont icon-fanhui back-btn" @click="$router.go(-1)" />
  </section>
</template>

<script lang="ts">
// 面包屑组件
import {Vue, Component, Prop, Emit} from 'vue-property-decorator';
import { Getter } from 'vuex-class';
import { Route } from 'vue-router';

export interface DataType {
  path: string; // 路径
  name: string; // 名称
}

@Component
export default class TheBreadcrumb extends Vue {
  @Prop() public data!: DataType[];
  @Prop({
    default: false,
  }) public showBackBtn!: boolean;

  @Emit()
  public clickItem(path: string, item: DataType) {
    return true;
  }
}

</script>



<style lang="less">
.the-breadcrumb{
  display: flex;
}
  .breadcrumb-home{
    vertical-align: text-top;
    position: relative;
    top: -1px;
    margin-right: 2px;
  }
  .back-btn {
    cursor: pointer;
    margin-left: 8px;
    margin-top: -2px;
    &:hover {
      color: #409EFF;
    }
  }
</style>
