<template>
  <section class="delete-message-box">
    <div class="delete-message-box__title">
      <i class="iconfont icon-questioncircle" /> 删除确认
    </div>
    <div class="delete-message-box__body" >
      <p>{{message}}</p>
      <p>是否继续删除？</p>
    </div>
    <!-- <div class="delete-message-box__footer">
      <el-button
        class="delete-message-box__btn"
        type="danger"
        icon="el-icon-delete"
        @click="e => this.$emit('delete', e)">删除</el-button>
    </div> -->
  </section>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import {State, namespace} from 'vuex-class';


@Component
export default class DeleteMessageBox extends Vue {
  @Prop() public message!: string;
  @Prop({default: false}) public loading!: boolean;
}

</script>

<style lang="less" scoped>
.delete-message-box {
  &__title {
    color:#F56C6C;
    text-align:center;
    font-size: 18px;
    margin-bottom: 32px;
  }
  &__body {
    margin-bottom: 32px;
    p {
      text-align:center;
    }
  }
  &__footer {
    text-align: center;
  }
  &__btn {
    width: 90%;
  }
}
</style>