<template>
  <div class="touch-bar">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {State, namespace} from 'vuex-class';


@Component
export default class TouchBar extends Vue {
}

</script>

<style lang="less">
.touch-bar {
  background: #fff;
  height: 25px;
}
</style>