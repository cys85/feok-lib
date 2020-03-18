<template>
  <div class="picture-album" >
    <ul>
      <template v-for="(item,index) in picSmallList">
        <li
          v-if="!flod || index === 0"
          :key="item+index"
          @click="showImage(item)"
          :style="{width: `${width}px`,height: `${height}px`}">
            <div class="video__wrap" v-if="checkTv(item)" >
              <div class="video_click" @click="playVideo(item)" ></div>
              <video :src="item" controls="controls" height="100%" width="100%">您的浏览器不支持。</video>
            </div>
            <img v-else v-lazy="item" />
        </li>
      </template>
    </ul>
    <viewer
      style="display:none;"
      :images="picList"
      @inited="inited"
      ref="viewer">
      <template slot-scope="scope">
        <img v-for="src in scope.images" :src="src" :key="src">
      </template>
    </viewer>
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
import {Dialog, Button} from 'element-ui';
import { Vue, Component, Prop, Emit , Watch } from 'vue-property-decorator';
import VueLazyload from 'vue-lazyload';
import 'viewerjs/dist/viewer.css';
import Viewer from 'v-viewer';
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: require('../assets/images/error.png'),
  loading: require('../assets/images/loading.gif'),
  attempt: 1,
});
Vue.use(Viewer);
@Component({
  components: {
    'el-dialog': Dialog,
    'el-button': Button,
  },
})
export default class PictureAlbum extends Vue {
  @Prop({ type: Array}) public picSmallList!: string[] ;
  @Prop({ type: Array}) public picList!: string[] ;
  @Prop({ type: Number, default: 60 }) public width!: number;
  @Prop({ type: Number, default: 60 }) public height!: number;
  @Prop({
    default: false,
  }) public flod!: boolean;

  public videoUrl = '';

  public dialogVisible = false;
  public $viewer: any = null;
  public checkTv(url: string) {
    const index = url.lastIndexOf('.'); // 得到"."在第几位
    const ext = url.substring(index); // 截断"."之前的，得到后缀
    if (/(^.mp4|^.rmvb|^.avi|^.ts)/.test(ext)) { // 根据后缀，判断是否符合视频格式
      return true;
    }
    return false;
  }

  public inited(viewer: any) {
    this.$viewer = viewer;
  }
  public playVideo(url: string) {
    this.videoUrl = url;
    this.dialogVisible = true;
  }

  public showImage(data: string) {
    if (!this.checkTv(data)) {
      this.$viewer.show();
    }
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
}
</style>

