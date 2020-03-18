<template>
  <section
    class="content-modal"
    :data-fixed="transfer"
    v-show="modal"
    :style="{
      left: `${position.left}px`,
      top: `${position.top}px`,
      right: `${position.right}px`,
      bottom: 0
    }">
    <div class="content-modal__backdrop" v-if="!closeDestroy || modal" v-show="modal" @click="onClick"></div>
    <transition name="content-modal">
      <div class="content-modal__win-wrap re-md-sm-padding" v-if="!closeDestroy || modal" v-show="modal">
        <div class="content-modal__win">
          <span class="content-modal__header-close" @click="onCancel"><slot name="close"><i class="iconfont icon-close"></i></slot></span>
          <template v-if="!hasCustom"> 
            <div class="content-modal__header-wrap re-md-sm-margin-bottom" v-if="hasHeader">
              <div class="content-modal__title" :class="{'content-modal__title-border': hasTitleBorder}"><slot name="title">{{title}}</slot></div>
              <div class="content-modal__header"><slot name="header"></slot></div>
            </div>
            <section
              ref="content-modal__body"
              class="content-modal__body"
              :class="{
                'content-modal__border': border
              }"
              >
              <slot></slot>
            </section>
            <section  class="content-modal__footer re-md-sm-margin-top" v-if="hasFooter">
              <slot name="footer">
                <el-button size="small" :loading="buttonLoading" type="primary" class="content-modal__footer__btn" @click="onOk">{{okText}}</el-button> 
                <el-button size="small" class="content-modal__footer__btn" @click="onCancel">{{cancelText}}</el-button> 
              </slot>
            </section>
          </template>
          <slot v-if="hasCustom" name="custom"></slot>
        </div> 
      </div>
    </transition>
  </section>
</template>

<script lang="ts">
/**
 * @description ContentModal 弹出层组件（基础组件）
 * @author leo
 *
 * @param {boolean} value - 显示/隐藏状态
 * @param {string} title - 标题
 * @param {boolean} closeDestroy - 关闭是否销毁modal组件 -默认值：true
 * @param {boolean} loading - 按钮loading状态 -默认值：false
 * @param {boolean} border - 内容区边框  -默认值：false
 * @param {boolean} transfer - flexed定位 -默认值：true
 * @param {boolean} border - okText
 * @param {boolean} transfer - cancelText
 *
 * @event click-modal-backdrop - 遮罩层点击关闭事件
 * @event ok - 确定事件
 * @event cencel - 取消事件
 * @event visible-change - modal变量状态改变事件
 *
 * @slot close      - 关闭按钮插槽
 * @slot title      - title插槽
 * @slot header     - title右侧插槽
 * @slot custom     - 自定义布局组件插槽
 * @slot footer     - 底部按钮插槽
 */

// 弹出框
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import EventBus from '../core/event-bus';

@Component
export default class ContentModal extends Vue {
  @Prop({ type: Boolean, default: false }) public value!: boolean;
  @Prop({ type: String }) public title!: string;
  @Prop({ type: Number }) public maxHeight!: number;
  @Prop({ type: [Number, String], default: 'auto' }) public height!: number|string;
  @Prop({ type: Boolean, default: true }) public closeDestroy!: boolean;
  @Prop({ type: Boolean, default: false }) public loading!: boolean;
  @Prop({ type: [Number, String], default: '确定' }) public okText!: number|string;
  @Prop({ type: [Number, String], default: '取消' }) public cancelText!: number|string;
  @Prop({ type: Boolean, default: false }) public border!: boolean;
  @Prop({ type: Boolean, default: true }) public transfer!: boolean;
  @Prop({ type: String, default: '#layout_body' }) public reference!: string;

  protected modal: boolean =  this.value;
  protected buttonLoading: boolean = this.loading;
  protected $reference: any = null;
  protected fixedBodyMaxHeight: number = 0;
  protected position: any = {
    left: 0,
    top: 0,
    right: 0,
  };

  @Watch('value', {deep: true})
  protected watchValue(newVal: boolean, oldVal: boolean) {
    this.modal = newVal;
  }
  @Watch('modal', {deep: true})
  protected watchModal(newVal: boolean, oldVal: boolean) {
    this.$emit('input', newVal);
    this.$emit('visible-change', newVal);         // 显示状态发生变化时触发 true / false
    if (newVal) { this.resizePosition(); }
    if (!newVal) {
      this.buttonLoading = false;
    }       // 每次关闭重置loading

    this.toggleBodyOverflow(newVal);               // 因此body overflow
  }
  @Watch('loading', {deep: true})
  protected watchLoading(newVal: boolean, oldVal: boolean) {
    this.buttonLoading = newVal;
  }

  get hasHeader() {
    return this.title || this.$slots.title || this.$slots.header;
  }
  get hasTitleBorder() {
    return this.$slots.header;
  }
  get hasFooter() {
    return this.$slots.footer || this.$listeners.ok;
  }
  get hasCustom() {
    return this.$slots.custom;
  }

  /**
   * 切换body隐藏/显示
   */
  protected toggleBodyOverflow(val: boolean) {
    if (val) {
      EventBus.$emit('bodyOverflowHiden');
      document.documentElement.style.overflow = document.body.style.overflow = 'hidden';
    } else {
      EventBus.$emit ('bodyOverflowAuto');
      document.documentElement.style.overflow = document.body.style.overflow = 'visible';
    }
  }
  /**
   * 遮罩层点击事件
   */
  protected onClick() {
    this.$emit('click-modal-backdrop');
    this.$emit('cancel');
    this.$emit('on-cancel');
    if (!this.buttonLoading) { // button loading 时候， 不能通过点击背景关闭
      this.modal = false;
    }
  }
  /**
   * 确定按钮事件
   */
  protected onOk() {
    this.$emit('ok');
    this.$emit('on-done');
  }
  /**
   * 取消按钮事件
   */
  protected onCancel() {
    this.$emit('cancel');
    this.$emit('on-cancel');
    this.modal = false; // 关闭
  }
  /**
   * esc取消按钮事件
   */
  protected onCancel2(res: any) {
    if (res.keyCode === 27) {
      this.$emit('cancel');
      this.$emit('on-cancel');
      this.modal = false; // 关闭
    }
  }
  /**
   * 调整位置
   */
  protected resizePosition() {
    const w = document.documentElement.clientWidth || document.body.clientWidth;
    const {left, top, right, bottom} = this.$reference.getBoundingClientRect();
    const r = w - right;
    this.position = {
      left: left < 0 ? 0 : left,
      top: top < 0 ? 0 : top,
      right:  r < 0 ? 0 : r,
    };
    this.fixedBodyMaxHeight = bottom - top - 148 || 400;
  }

  protected mounted() {
    if (this.transfer) {
      this.$reference = document.querySelector(this.reference) || null;
      if (this.$reference) {
        this.resizePosition();
      }
      window.addEventListener('resize', this.resizePosition);
      window.addEventListener('keyup', this.onCancel2);
    }
  }
  protected beforeDestroy() {
    if (this.transfer) {
      window.removeEventListener('resize', this.resizePosition);
      window.removeEventListener('keyup', this.onCancel2);
      EventBus.$emit ('bodyOverflowAuto');
      document.documentElement.style.overflow = document.body.style.overflow = 'visible';
    }
  }


}
</script>

<style lang="less" scoped>
.content-modal {
  &[data-fixed='true'] {
    position: fixed;
    z-index: 910;
  }
  .content-modal__header-wrap {
    min-height: 40px;
    line-height: 40px;
    min-height: 40px;
    padding-right: 60px;
    overflow: hidden;
  }
  .content-moda__title {
    font-size: 16px;
    float: left;
  }
  .content-moda__title-border {
    position: relative;
    padding-right: 60px;
    &:after {
      content: '';
      position: absolute;
      top: 8px;
      right: 30px;
      width: 0;
      height: 24px;
      border-right: 1px solid #ccc;
    }
  }
  .content-moda__header {
    float: left;
  }
  .content-modal__header-close {
    position: absolute;
    top: 30px;
    right: 35px;
    cursor: pointer;
    &:hover {
      color: #409eff;
    }
  }
  &__backdrop {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 9990;
    background-color: #000;
    opacity: 0.1;
  }
  &__win-wrap {
    position: absolute;
    z-index: 9999;
    top: 0;
    left: 0;
    right: 0;
    min-height: 100px;
    overflow: hidden;
    max-height: 98%;
    display: flex;
    flex-direction: column;
  }
  &__win {
    position: relative;
    display: flex;
    flex-direction: column;
    height: 100%;
    background: #fff;
    border-bottom: 0.5px solid #c2d8f5;
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
    background-color: white;
    padding: 20px 30px;
    overflow: hidden;
  }
  &__body {
    flex: 1;
    overflow: auto;
    &.content-modal__border {
      border: 1px solid #e9eaec;
      border-left: none;
      border-right: none;
      padding: 16px 0;
    }
  }
  &__footer {
    &__btn {
      min-width: 100px;
      margin-right: 8px;
      // transform: translateY(12px)
    }
  }
}
@media screen and (min-width: 1366px) {
}
.content-modal-enter-active {
  transition: all 0.15s ease;
}
.content-modal-leave-active {
  transition: all 0.15s cubic-bezier(1, 0.5, 0.8, 1);
}
.content-modal-enter,
.content-modal-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
</style>
