/**
 * 系统消息弹出层组件-业务组件-leo
 *
 * @param {boolean} value - 显示/隐藏
 * @param {string} title - 标题
 * @param {number} maxWidth - 最大宽度：20
 * @param {string} width - 宽度
 * @param {boolean} closeDestroy - 是否销毁
 * @param {boolean} loading - 是否在loading
 * @param {boolean} border - 内容区是否在有边框
 * @param {boolean} transfer - 是否在flexed定位
 *
 * @event click-modal-backdrop - 关闭
 * @event visible-change - 状态发生变化
 */
<template>
  <section
    class="message-modal"
    :data-fixed="transfer"
    >
    <div class="message-modal__backdrop" v-if="!closeDestroy || modal" v-show="modal" @click="onClick"></div>
    <transition name="message-modal">
      <div class="message-modal--wrap"  v-if="!closeDestroy || modal" v-show="modal">
        <div class="message-modal--title">
          <slot name="title">{{title}}</slot>
          <slot name="switch"></slot>
          <span class="message-modal__header-close" @click="onClick">
            <slot name="close"><i class="iconfont icon-close"></i></slot>
          </span>
        </div>
        <section
          class="message-modal__body"
          :class="{
            'message-modal__border': border
          }"
          :style="{
            maxWidth: `${maxWidth}px`,
            width: width
          }">
          <slot></slot>
        </section>
      </div> 
    </transition>
  </section>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch, Emit } from 'vue-property-decorator';

@Component
export default class Messagemodal extends Vue {
  @Prop({ type: Boolean, default: false }) public value!: boolean;
  @Prop({ type: String }) public title!: string;
  @Prop({ type: Number }) public maxWidth!: number;
  @Prop({ type: String, default: 'auto' }) public width!: string;
  @Prop({ type: Boolean, default: false }) public closeDestroy!: boolean;
  @Prop({ type: Boolean, default: false }) public loading!: boolean;
  @Prop({ type: Boolean, default: false }) public border!: boolean;
  @Prop({ type: Boolean, default: true }) public transfer!: boolean;

  protected modal: boolean =  this.value;
  protected buttonLoading: boolean = this.loading;

  @Watch('value', {deep: true})
  protected watchValue(newVal: boolean, oldVal: boolean) {
    this.modal = newVal;
  }
  @Watch('modal', {deep: true})
  protected watchModal(newVal: boolean, oldVal: boolean) {
    this.$emit('input', newVal);
    this.$emit('visible-change', newVal);         // 显示状态发生变化时触发 true / false
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
      document.documentElement.style.overflow = document.body.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = document.body.style.overflow = null;
    }
  }
  // 关闭
  protected onClick() {
    this.$emit('click-modal-backdrop');
    if (!this.buttonLoading) { // button loading 时候， 不能通过点击背景关闭
      this.modal = false;
    }
  }
}
</script>

<style lang="less">
.message-modal {
  right: 0;
  bottom: 0;
  top: 0;
  &[data-fixed=true] {
    position: fixed;
    z-index: 910
  }
  .message-modal--title {
    font-size: 16px;
    color: #1c2438;
    padding: 8px 0;
    min-height: 50px;
    position: relative;
    z-index: 999;
  }
  .message-modal__header-close{
    float:right;
    cursor: pointer;
  }
  &__backdrop {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 990;
    background-color: #fff;
    opacity: .1;
  }
  &--wrap {
    position: absolute;
    z-index: 999;
    height: 100%;
    border-bottom: .5px solid #c2d8f5;
    box-shadow: 0 3px 8px rgba(0,0,0,.2);
    background-color: white;
    top: 0;
    right: 0;
    bottom: 0;
    background: #fff;
    padding: 20px 30px;
    overflow: hidden;
  }
  &__body {
    height:  ~"calc(100% - 60px)";
    min-width: 350px;
    overflow: auto;
    &.message-modal__border {
      border: 1px solid #e9eaec;
      border-left: none;
      border-right: none;
      padding: 20px 0;
    }
  }
}
.message-modal-enter-active {
  transition: all .15s ease;
}
.message-modal-leave-active {
  transition: all .15s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.message-modal-enter, .message-modal-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>

