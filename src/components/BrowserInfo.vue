
<!-- 浏览器提示 -->
<template>
  <section class="browser-info">
    <p>
      请使用 最新版的<span>谷歌浏览器Chrome (强烈推荐)</span>  / 火狐浏览器Firefox  /  360浏览器极速模式 访问系统！
    </p>
    <p>
      <img @click="baodu" src="../assets/images/chrome-info.png" alt="">
    </p>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {State, namespace} from 'vuex-class';


@Component
export default class BrowserInfo extends Vue {
  public baodu() {
    window.open('https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&rsv_idx=1&tn=baidu&wd=%E8%B0%B7%E6%AD%8C%E6%B5%8F%E8%A7%88%E5%99%A8%E6%9C%80%E6%96%B0%E7%89%88%E6%9C%AC&oq=js%2520%25E5%2588%25A4%25E6%2596%25ADI%2526gt%253B&rsv_pq=f02771fd00011d4b&rsv_t=1cc37L6WghilGvd69gdHDhrSBvI3C5bURu1qenikxDKhoblmA%2Fjsrlk5SCY&rqlang=cn&rsv_enter=1&inputT=6088&rsv_sug3=43&rsv_sug1=42&rsv_sug7=100&bs=js%20%E5%88%A4%E6%96%ADIE');
  }
}

</script>

<style lang="less">
.browser-info {
  p {
    margin: 100px auto;
    color: #f56c6c;
    font-size: 20px;
    text-align: center;
    img {
      cursor: pointer;
    }
    span {
      font-size: 32px;
    }
    &:first-child {
      margin-top: 200px;
    }
  }
}
</style>