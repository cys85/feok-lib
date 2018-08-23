<template>
  <div class="picture-album" >
    <ul>
      <li v-for="(item,index) in picSmallList" :key="index" 
        :style="{width: `${width}px`,height: `${height}px`}">
          <div class="video__wrap" v-if="checkTv(item)" >
            <div class="video_click" @click="playVideo(item)" ></div>
            <video :src="item" controls="controls" height="100%" width="100%">您的浏览器不支持。</video>
          </div>
          <img v-else v-lazy="item"  @click="getBigPic(index)"/>
      </li>
    </ul>
    <div class ='div1' v-show='showFlag'>
      <div class="div2" ></div>
      <div class="content_body" @click="closeBigPic">
        <a class="prev" href="javascript:;"  @click.stop="prevImg">&lt;</a>
        <img id="pic_album"  v-lazy='imgSrc'  ref="img"/>
        <a class="next" href="javascript:;" @click.stop="nextImg">&gt;</a>
        <span class="rotate" @click.stop="handleRotate"><i class="iconfont icon-xuanzhuan"></i></span>
      </div>
    </div>
    <el-dialog
      title="视频信息"
      :visible.sync="dialogVisible"
      height="600px"
      width="640px"
      append-to-body>
      <video v-if="dialogVisible" :src="videoUrl" autoplay controls="controls" height="400px" width="600px">您的浏览器不支持。</video>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit , Watch } from 'vue-property-decorator';

@Component
export default class PictureAlbum extends Vue {
  @Prop({ type: Array}) public picSmallList!: string[] ;
  @Prop({ type: Array}) public picList!: string[] ;
  @Prop({ type: Number, default: 60 }) public width!: number;
  @Prop({ type: Number, default: 60 }) public height!: number;


  public showFlag: boolean = false;
  public index: number = 0;
  public imgSrc: string = '';
  public rotate: number = 0;
  public videoUrl = '';

  public dialogVisible = false;

  public checkTv(url: string) {
    const index = url.lastIndexOf('.'); // 得到"."在第几位
    const ext = url.substring(index); // 截断"."之前的，得到后缀
    if (/(^.mp4|^.rmvb|^.avi|^.ts)/.test(ext)) { // 根据后缀，判断是否符合视频格式
      return true;
    }
    return false;
  }

  public playVideo(url: string) {
    this.videoUrl = url;
    this.dialogVisible = true;
  }

  private funTab(): void {
      this.$nextTick(function() {
          this.imgSrc = this.picList[this.index];
        });
  }

  private getBigPic(index: number): void {
    this.index = index;
    this.funTab();
    this.showFlag = true;
  }

  private nextImg() {
    this.index++; // 后一张,所以下标要增加1
    if (this.index > this.picList.length - 1) {// 如果移到到数组的最大下标
        this.index = 0; // 那么下标为0 . 这样就可以循环显示图片
    }
    this.funTab(); // 显示图片和搭配的文字信息
  }

  private prevImg() {
    this.index--; // 后一张,所以下标要增加1
    if (this.index < 0) {// 如果移到到数组的最大下标
        this.index =  this.picList.length - 1; // 那么下标为0 . 这样就可以循环显示图片
    }
    this.funTab(); // 显示图片和搭配的文字信息
  }

  private closeBigPic() {
    this.showFlag = false;
  }

  private handleRotate() {
     const $ele = this.$refs.img as HTMLInputElement;
     this.rotate += 90;
     $ele.style.transform = 'rotate(' + this.rotate + 'deg)';
  }
}
</script>
<style lang="less">
.picture-album {
  .video__wrap {
    height: 100%;
    width: 100%;
    position: relative;
  }
  .video_click {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 99;
  }
  ul {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    li {
      display: flex;
      align-items: center;
      justify-content: center;
      list-style: none;
      margin: 2px;
      border: 1px solid #c0ccda;
      cursor: pointer;
      border-radius: 6px;
      overflow: hidden;
      &:hover {
        box-shadow: 0 0 3px #c0ccda;
      }
      img {
        width: 100%;
      }
    }
  }
  .div1 {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 900;
    text-align: center;
    cursor: pointer;
    .div2 {
      position: fixed;
      left: 0;
      top: 0;
      bottom: 0;
      right: 0;
      opacity: 0.8;
      background: #000;
      z-index: -5;
    }
    .content_body {
      display: flex;
      width: 100%;
      height: 100%;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 100%;
    }
    a {
      /*设置链接的样式*/
      font-size: 40px;
      line-height: 40px;
      text-align: center;
      text-decoration: none;
      width: 40px;
      height: 40px;
      opacity: 0.8;
      color: #fff;
      top: 228px;
    }
    .next {
      /*后一张图片按钮的样式*/
      // position: absolute;
      // top: 50%;
      // right: 10px;
      // margin-top:-10px;
    }
    .prev {
      /*前一张图片按钮的样式*/
      // position: absolute;
      // top: 50%;
      // left: 10px;
      // margin-top:-10px;
    }

    #pic_album {
      /*图片的大小*/
      // position: relative;
      max-height: 500px;
      // top:50%;
      // margin-top:-250px;
      // border: 2px solid #ccc
    }
    .rotate {
      position: absolute;
      left: 50%;
      bottom: 30px;
      .iconfont {
        font-size: 40px;
      }
    }
  }
}
</style>

