/**
 * 弹出层组件（基础组件）-leo
 *
 * @param {boolean} value - 显示/隐藏
 * @param {string} title - 标题
 * @param {number} maxHeight - 最大高度：20
 * @param {string} height - 高度
 * @param {boolean} closeDestroy - 是否销毁
 * @param {boolean} loading - 是否在loading
 * @param {boolean} border - 内容区是否在有边框
 * @param {boolean} transfer - 是否在flexed定位
 * @param {boolean} border - okText
 * @param {boolean} transfer - cancelText
 *
 * @event click-modal-backdrop - 关闭
 * @event cencel - 取消
 * @event visible-change - 状态发生变化
 */
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
          <header>
            <span class="content-modal__header-title"><slot name="title">{{title}}</slot></span>
            <div class="content-modal__header-extend"><slot name="header"></slot></div>
            <span class="content-modal__header-close" @click="onCancel"><slot name="close"><i class="iconfont icon-close"></i></slot></span>
          </header>
          <section
            ref="content-modal__body"
            class="content-modal__body"
            :class="{
              'content-modal__border': border
            }"
            >
            <slot></slot>
          </section>
          <section  class="content-modal__footer">
            <slot name="footer">
              <el-button :loading="buttonLoading" type="primary" class="content-modal__footer__btn" @click="onOk">{{okText}}</el-button> 
              <el-button class="content-modal__footer__btn" @click="onCancel">{{cancelText}}</el-button> 
              <!-- <Button :loading="buttonLoading" class="content-modal__footer__btn" @click="onOk"  type="success"></Button>
              <Button class="content-modal__footer__btn" @click="onCancel" type="ghost">{{cancelText}}</Button> -->
            </slot>
          </section>
        </div> 
      </div>
    </transition>
  </section>
</template>

<script lang="ts">
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

  /**
   * 切换body隐藏/显示
   */
  protected toggleBodyOverflow(val: boolean) {
    if (val) {
      EventBus.$emit('bodyOverflowHiden');
      document.documentElement.style.overflow = document.body.style.overflow = 'hidden';
    } else {
      EventBus.$emit ('bodyOverflowAuto');
      document.documentElement.style.overflow = document.body.style.overflow = null;
    }
  }

  protected onClick() {
    this.$emit('click-modal-backdrop');
    if (!this.buttonLoading) { // button loading 时候， 不能通过点击背景关闭
      this.modal = false;
    }
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
    this.modal = false; // 关闭
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
    }
  }
  protected beforeDestory() {
    if (this.transfer) {
      window.removeEventListener('resize', this.resizePosition);
      EventBus.$emit ('bodyOverflowAuto');
      document.documentElement.style.overflow = document.body.style.overflow = null;
    }
  }


}
</script>

<style lang="less" scoped>
.content-modal {
  &[data-fixed=true] {
    position: fixed;
    z-index: 910
  }
  header {
    padding: 8px 0;
    min-height: 45px;
  }
  &__header-title {
    font-size: 16px;
    color: #1c2438;
    margin-right: 30px;
  }
  &__header-extend {
    display: inline-block;
  }
  .content-modal__header-close{
    float:right;
    cursor: pointer;
  }
  &__backdrop {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 9990;
    background-color: #000;
    opacity: .1;
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
  &__win{
    display: flex;
    flex-direction: column;
    height: 100%;
    background: #fff;
    border-bottom: .5px solid #c2d8f5;
    box-shadow: 0 3px 8px rgba(0,0,0,.2);
    background-color: white;
    padding: 20px 30px;
  }
  &__body {
    flex: 1;
    min-height: 150px;
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
@media screen and (min-width: 1366px){
  .content-modal {
    .content-modal__win{
      header {
        padding: 13px 0;
        min-height: 60px;
      }
    }
    &__header-title {
      font-size: 18px;
      margin-right: 40px;
    }
  }
}
.content-modal-enter-active {
  transition: all .15s ease;
}
.content-modal-leave-active {
  transition: all .15s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.content-modal-enter, .content-modal-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
</style>
