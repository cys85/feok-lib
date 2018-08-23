/**
 * 系统消息卡片组件-业务组件-leo
 *
 * @param {string[]} data - 数据数组
 *
 * @exprot MessageCardDataType - 数据interface
 *
 */
<template>
  <div class="message-card" @click="gotoJobProductQuality(data)">
    <div class="message-card--title">[{{data.title}}]</div>
    <ul>
      <li class="message-card--row">
        <b>任务名称：</b><p>{{data.planName}}</p>
      </li>
      <li class="message-card--row">
        <b>批次号：</b><p>{{data.batch}}</p>   
      </li>
      <li class="message-card--row">
        <b>车间：</b><p>{{data.workshop}}</p>
      </li>
      <li class="message-card--row">
        <b>品名：</b><p>{{data.proName}}</p>
      </li>
      <li class="message-card--row">
        <b>品号：</b><p>{{data.proNum}}</p>
      </li>
      <li class="message-card--row">
        <b>状态：</b><p>{{$t(`MESSAGECARD_STATUS.${data.state}`)}}</p>
      </li>
    </ul> 
  </div> 
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch, Emit } from 'vue-property-decorator';
export interface MessageCardDataType {
  title: string;                  // 任务分类
  batch: string;                  // 批次号
  workshop: string;               // 车间
  proName: string;                // 品名
  proNum: number;                 // 品号
  planName: string;               // 任务名称
  state: string;                  // 状态
}

@Component
export default class MessageCard extends Vue {
  @Prop() public data!: MessageCardDataType;

  @Emit()
  public gotoJobProductQuality(data: any) {
    // console.log(data);
    return true;
  }
}
</script>
<style lang="less">
@import url("../assets/less/variables.less");
  .message-card{
    border:1px dashed #ccc;
    padding:0 10px;
    cursor:pointer;
    &:hover{
        border-color: @2d8cf0;
        box-shadow: 0px 0px 8px #80b7f3 inset;
      }
    ul{
      width:100%;
      padding-bottom:15px;
    }
    li{
      display:block;
      overflow:hidden;
    }
    p{
      padding-top: 4px;
      padding-left: 60px;
      line-height: 1.5;
      line-height:1.5em;
      font-size:12px;
    }
    b{
      float:left;
      width:80px;
      text-align:right;
      line-height:2em;
      font-size:12px;
    }
    .message-card--row{
      display:block;
    }
    .message-card--title{
      color:@2d8cf0;
      line-height:2em;
      padding-top:10px;
    }
  }
</style>
