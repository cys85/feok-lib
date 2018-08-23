<template>
  <section class="no-data">
    <i class="iconfont icon-wushuju" /> 暂无数据
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {State, namespace} from 'vuex-class';


@Component
export default class NoData extends Vue {
}

</script>

<style lang="less" scoped>
.no-data {
  font-size: 24px;
  color: #606266;
  text-align: center;
  height: 70px;
  line-height: 70px;
  .iconfont {
    font-size: 24px;
  }
}
</style>