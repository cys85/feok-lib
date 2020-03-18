/**
 * 弹出层组件（布局组件）-leo
 *
 * @param {boolean} border - okText
 * @param {boolean} transfer - cancelText
 * @param {boolean} loading - 是否在loading
 * @param {boolean} border - 内容区是否在有边框
 * @param {string} title - 标题
 * @param {number} minHeight - 150
 * 
 * @event cancel - 取消
 * @event ok - 确定
 */
<template>
  <div class="modal-layouts">
    <header class="modal-layouts__header-wrap re-md-sm-margin-bottom">
      <div class="modal-layouts__title" :class="{'modal-layouts__title-border': hasTitleBorder}" v-if="title">{{title}}</div>
      <div class="modal-layouts__header"><slot name="header"></slot></div>
    </header>
    <section
      ref="modal-layouts__body"
      class="modal-layouts__body"
      :class="{
        'modal-layouts__border': border
      }"
      :style="{minHeight:minHeight+'px'}"
      >
      <slot></slot>
    </section>
    <section class="modal-layouts__footer re-md-sm-margin-top" v-if="hasFooter">
      <slot name="footer">
        <el-button :loading="buttonLoading" type="primary" class="modal-layouts__footer__btn" @click="onOk">{{okText}}</el-button> 
        <el-button class="modal-layouts__footer__btn" @click="onCancel">{{cancelText}}</el-button> 
      </slot>
    </section>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import EventBus from '../../core/event-bus';

@Component
export default class ModalLayout extends Vue {
  @Prop({ type: String }) public title!: string;
  @Prop({ type: [Number, String], default: '确定' }) public okText!: number|string;
  @Prop({ type: [Number, String], default: '取消' }) public cancelText!: number|string;
  @Prop({ type: Boolean, default: false }) public border!: boolean;
  @Prop({ type: Boolean, default: false }) public loading!: boolean;
  @Prop({ type: Number }) public minHeight!: number;
  @Prop({ type: Boolean, default: true }) public isHeader!: boolean;
  @Prop({ type: Boolean, default: true }) public isFooter!: boolean;

  protected buttonLoading: boolean = this.loading;

  @Watch('loading', {deep: true})
  protected watchLoading(newVal: boolean, oldVal: boolean) {
    this.buttonLoading = newVal;
  }

  get hasHeader() {
    return this.title || this.$slots.header;
  }
  get hasTitleBorder() {
    return this.$slots.header;
  }

  get hasFooter() {
    return this.$slots.footer || this.$listeners.ok;
  }

  protected onClick() {
    this.$emit('click-modal-backdrop');
  }
  /**
   * 确定按钮事件
   */
  protected onOk() {
    this.$emit('ok');
  }
  /**
   * 取消按钮事件
   */
  protected onCancel() {
    this.$emit('cancel');
  }
}
</script>

<style lang="less" scoped>
.modal-layouts {
  display: flex;
  flex: 1;
  flex-direction: column;
  overflow: hidden;
  .modal-layouts__header-wrap {
    background:#fff;
    line-height: 40px;
    padding-right: 60px;
    min-height:40px;
    overflow: hidden;
  }
  .modal-layouts__title{
    font-size: 16px;
    float: left;
  }
  .modal-layouts__title-border{
    position: relative;
    padding-right: 60px;
    &:after{
      content: "";
      position: absolute;
      top: 8px;
      right: 30px;
      width: 0;
      height:24px;
      border-right:1px solid #ccc;
    }
  }
  .modal-layouts__header{
    float: left;
  }
  &__body {
    flex: 1;
    overflow: auto;
    &.modal-layouts__border {
      border: 1px solid #e9eaec;
      border-left: none;
      border-right: none;
      padding: 16px 0;
    }
  }
  &__footer {
    background:#fff;
    &__btn {
      min-width: 100px;
      margin-right: 8px;
    }
  }
}
@media screen and (min-width: 1366px){
  .modal-layouts {
    &__header-title {
      font-size: 18px;
      margin-right: 40px;
    }
  }
}
</style>
