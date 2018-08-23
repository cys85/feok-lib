<template>
  <el-menu
    class="the-menu"
    :default-openeds="defaultOpeneds"
    :default-active="defaultActive"
    :background-color="backgroundColor"
    text-color="#fff"
    @select="select"
    @open="handleOpen"
    @close="handleClose"
    :collapse="collapse">
    <template v-for="item1 in data">
      <el-submenu v-if="item1.children && item1.children.length" :index="item1.path || item1.id" :key="item1.id">
        <template slot="title">
          <i class="iconfont" :class="item1.icon" />
          <span slot="title">{{item1.name}}</span>
        </template>
        <template v-for="item2 in item1.children">
          <el-menu-item-group v-if="item2.children && item2.children.length" :key="item2.id">
            <span slot="title">{{item2.name}}</span>
            <el-menu-item v-for="item3 in item2.children" :index="item3.path || item3.id" :key="item3.id">{{item3.name}}</el-menu-item>
          </el-menu-item-group>
          <el-menu-item v-else :index="item2.path || item2.id" :key="item2.id">
            <i class="iconfont" :class="item2.icon" />
            <span slot="title">{{item2.name}}</span>
          </el-menu-item>
        </template>
      </el-submenu>
      <el-menu-item v-else :key="item1.id">
        <i class="iconfont" :class="item1.icon" />
        <span slot="title">{{item1.name}}</span>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script lang="ts">
// 菜单
import {Vue, Component, Prop, Emit} from 'vue-property-decorator';

export interface DataType {
  id: number; // 菜单ID
  name: string; // 菜单名称
  children: DataType[]; // 子菜单
  parent: DataType[]; // 父菜单
  path: string; // 菜单的path
  icon: string; // 菜单图标
}

@Component
export default class TheMenu extends Vue {
  @Prop({required: true}) public data!: DataType[];
  @Prop({default: ''}) public defaultActive!: string;
  @Prop({default: '#445268'}) public backgroundColor!: string;
  @Prop() public defaultOpeneds!: string[];
  @Prop({default: false}) public collapse!: boolean;

  public handleOpen(key: string, keyPath: string[]) {
    // console.log(key, keyPath);
  }
  public handleClose(key: string, keyPath: string[]) {
    console.log(key, keyPath);
  }
  @Emit()
  public select(index: string, indexPath: string) {
    return true;
  }
}

</script>

<style lang="less">
.the-menu {
  color: #fff;
  &.el-menu {
    border-right:none
  }
  .iconfont {
    color: #fff;
    margin-right: 8px;
  }
}
@media screen and (max-width: 1366px){
  .the-menu {
    .el-menu-item, .el-submenu__title{
      height: 44px;
      line-height: 44px;
    }
  }   
}
</style>
