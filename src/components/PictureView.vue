<template>
  <div class="picture-view" ref='box1'>
    <div class="picture-view__img-wrap" ref="pic" @mouseover="showChildren = true" @mouseout="showChildren = false" :style="{
            width: `${width}px`,
            height: `${height}px`
          }">
      <template v-if="smallPath">
        <img v-lazy="smallPath" width="100%" height="100%">
      </template>
    </div>

    <div class="picture-view__bigimg" :style="newStyle" v-show="showChildren">
      <img v-lazy="path" width="100%" height="100%">
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from 'vue-property-decorator';

@Component
export default class PictureView extends Vue {
  @Prop({ type: Number, default: 45 })
  public width!: number;
  @Prop({ type: Number, default: 45 })
  public height!: number;
  @Prop({ type: String })
  public smallPath!: string;
  @Prop({ type: String })
  public path!: string;
  @Prop({ type: Boolean })
  public leftDisplay!: boolean;
  @Prop({ type: Number , default: 0})
  public scollTop!: number;

  public showChildren: boolean = false;
  public popperPositionOfTop: boolean = true;
  public absTop: number = 0; // 图片距离浏览器顶部的高度
  public absLeft: number = 0; // 图片距离浏览器左边的距离

  public updated() {
    const box1 = this.$refs.box1 as HTMLDivElement;

    const {top, left}: any =  box1.getBoundingClientRect();
    // let top: any = box1.offsetTop;
    // let left: any = box1.offsetLeft;
    // let cur: any = box1.offsetParent;

    // while (cur != null) {
    //   top += cur.offsetTop;
    //   left += cur.offsetLeft;
    //   cur = cur.offsetParent;
    // }
    this.absTop = top;
    this.absLeft = left;
  }

  get newLeft() {
    const left = this.leftDisplay
      ? this.absLeft - 200
      : this.absLeft + this.width;
    return left;
  }
  get newStyle() {
    const style = this.popperPositionOfTop
      ? {
          top: this.absTop - 200 + this.width + `px`,
          left: this.newLeft + `px`,
        }
      : {
          top: this.absTop + `px`,
          left: this.newLeft + `px`,
        };
    return style;
  }

  @Emit('mouseover')
  @Watch('showChildren', { deep: true })
  private watchShowChildren(newVal: boolean, oldVal: boolean) {
    if (newVal) {
      this.$nextTick(function() {
        const obj = this.$refs.pic as HTMLDivElement;
        const { top, height } = obj.getBoundingClientRect();
        const offsetTop = obj.scrollTop;
        this.popperPositionOfTop = this.getPositionOfTop(
          window.innerHeight,
          top,
          height,
        );
      });
    } else {
      this.popperPositionOfTop = false;
    }
  }
  private getPositionOfTop(
    windowHeight: number,
    popperTop: number,
    popperHeight: number,
  ) {
    const bottom = windowHeight - (popperHeight + popperTop); // 距离屏幕底部的距离，如果为负数认为超出底部

    return bottom <= 210;
  }


}
</script>
<style lang="less">
.picture-view {
  &__img-wrap {
    position: relative;
    cursor: pointer;
    width: 45px;
    height: 45px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
    }
  }
  .picture-view__bigimg {
    position: fixed;
    left: 45px;
    top: 45px;
    width: 200px;
    height: 200px;
    border: 1px solid #f2f2f2;
    background-color: #fff;
    z-index: 500;
  }
  .picture-view__bigimg-top {
    top: -155px;
  }
}
</style>

