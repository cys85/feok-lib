<template>
  <el-dropdown class="user-avatar">
    <span class="user-avatar__link" :style="{
        height: asideCollapse ? '44px': '59px',
        lineHeight: asideCollapse ? '44px': '59px'
      }">
      {{name}}<i class="iconfont icon-fl-renyuan" />
    </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item @click.native="clickUpdatePassword">
        <i class="iconfont icon-iconfontmima" /> 修改密码
      </el-dropdown-item>
      <el-dropdown-item @click.native="clickLogout">
        <i class="iconfont icon-tuichudenglu1" /> 退出登录
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script lang="ts">
import {Vue, Component, Prop, Emit} from 'vue-property-decorator';
import {namespace} from 'vuex-class';

const appModule = namespace('app');
@Component
export default class UserAvatar extends Vue {
  @Prop(String) public name!: string;
  @appModule.State('asideCollapse') public asideCollapse!: boolean;

  @Emit()
  public clickUpdatePassword() {
    //
  }
  @Emit()
  public clickLogout() {
    //
  }
}

</script>

<style lang="less" scoped>
@import url("../assets/less/variables.less");

.user-avatar {
  &:hover &__link{
    background-color: #f5f7fa;
  }
  &__link{
    color: @text_color_lv1;
    cursor: pointer;
    display: block;
    padding: 0 15px;
  }
}
</style>

