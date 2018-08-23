<template>
  <el-dropdown class="sys-management">
    <span class="sys-management__link" :style="{
        height: asideCollapse ? '44px': '59px',
        width : asideCollapse ? '44px': '59px'
      }">
      <i class="iconfont icon-xitongshezhi" />
    </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item 
        v-for="item in data"
        :key="item.key"
        @click.native="clickItem(item.key, item)">
        <i class="iconfont" :class="switchIcon(item.key)" /> {{item.name}}
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script lang="ts">
import {Vue, Component, Prop, Emit} from 'vue-property-decorator';
import {namespace} from 'vuex-class';

export interface Data {
  name: string;
  key: string;
}
const appModule = namespace('app');

@Component
export default class SysManagement extends Vue {
  @Prop() public data!: Data[];
  @appModule.State('asideCollapse') public asideCollapse!: boolean;

  @Emit()
  public clickItem(key: string, item: Data) {
    //
  }

  public switchIcon(key: string) {
    switch (key) {
      case 'auth_setting':
        return 'icon-quanxianguanli';
      case 'function_setting':
        return 'icon-gongneng';
      case 'system_setting':
        return 'icon-xitongshezhixianxing';
      default:
        return '';
    }
  }
}

</script>

<style lang="less">
@import url("../assets/less/variables.less");
.sys-management {
  &:hover &__link{
    background-color: #f5f7fa;
  }
  &__link {
    color: @text_color_lv1;
    cursor: pointer;
    display: block;
    position: relative;
  }
  .iconfont{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%)
  }
}
</style>

