/*
 * @Author: Yuanr 
 * @Date: 2018-08-13 14:58:27 
 * @Descrption 数值检测表格组件
 */
<template>
  <div class="numerical-detection-table">
    <el-table
      :data="data"
      :default-expand-all="defaultExpandAll"
      v-loading="loading"
      :height="height"
      style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="{row}">
          <div v-if="row.imgList">
            <span v-if="!row.imgList.length">暂无图片</span>
            <PictureAlbum :picSmallList="row.imgList" :picList="row.imgList" :width='imgWidth' :height='imgHeight'></PictureAlbum>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="检测项目"
        prop="detectionProject">
        <template slot-scope="{row}">
          <span :class="row.isCheck === 1 ? 'numerical-detection-table__wait' : ''">{{row.detectionProject}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="检测标准"
        prop="testingStandard">
        <template slot-scope="{row}">
          <span :class="row.isCheck === 1 ? 'numerical-detection-table__wait' : ''">{{row.testingStandard}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="检测结果"
        prop="detectionResult">
        <template slot-scope="{row}">
          <span :class="row.isCheck === 1 ? 'numerical-detection-table__wait' : ''">{{row.detectionResult}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="单项结论"
        prop="singleConclusion">
        <template slot-scope="{row}">
          <span class="numerical-detection-table__tag" :class="returnSingleConclusionClass(row.singleConclusion)">{{row.singleConclusion?$t(`SINGLE_CONCLUSION.${row.singleConclusion}`):''}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="处理措施"
        prop="treatmentMeasures">
        <template slot-scope="{row}">
          <span>{{row.treatmentMeasures || '---'}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="审核状态"
        prop="status">
        <template slot-scope="{row}">
          <span class="numerical-detection-table__tag" :class="returnStatusClass(row.status)">{{$t(`EXAMINE_STATUS.${row.status}`)}}</span>
        </template>
      </el-table-column>
      <slot name="handle"></slot>
    </el-table>
  </div>
</template>
<script lang="ts">
import {Vue, Component, Prop, Emit} from 'vue-property-decorator';
import PictureAlbum from '@/components/PictureAlbum.vue';
export interface DataType {
  detectionProject: string; // 检测项目
  testingStandard: string; // 检测标准
  detectionResult: string; // 检测结果
  singleConclusion: string; // 单项结论
  treatmentMeasures: string; // 处理措施
  status: string; // 审核状态
  imgList: string []; // 图片列表
  isCheck: number; // 是否审核通过
  [propName: string]: any; // 扩展属性
}
@Component({
  components: {
    PictureAlbum,
  },
})
export default class NumericalDetectionTable extends Vue {
  @Prop({required: true}) public data!: DataType[]; // 表格数据
  @Prop() public loading!: boolean; // 表格loading
  @Prop() public height!: number; // 表格高度
  @Prop({default: 50, type: [String, Number]}) public imgWidth!: number|string; // 图片宽度
  @Prop({default: 50, type: [String, Number]}) public imgHeight!: number|string; // 图片高度
  @Prop({default: false}) public isEdit!: boolean; // 是否审核通过
  @Prop({default: true}) public defaultExpandAll!: boolean; // 是否默认展开所有行
  private returnStatusClass(status: string) {
    // 根据不同状态线上不同背景色
    let className: string = '';
    switch (status) {
      case 'U':
        className = 'numerical-detection-table__s0';
        break;
      case 'Y':
        className = 'numerical-detection-table__s1';
        break;
      case 'N':
        className = 'numerical-detection-table__s2';
        break;
      case 'W':
        className = 'numerical-detection-table__s3';
        break;
      default:
        className = 'numerical-detection-table__s0';
    }
    return className;
  }
  private returnSingleConclusionClass(status: string) {
    // 根据不同状态线上不同背景色
    let className: string = '';
    switch (status) {
      case 'Y':
        className = 'numerical-detection-table__sc0';
        break;
      case 'N':
        className = 'numerical-detection-table__sc1';
        break;
      case 'U':
        className = 'numerical-detection-table__sc2';
        break;
      case 'R':
        className = 'numerical-detection-table__sc3';
        break;
      default:
        className = 'numerical-detection-table__sc0';
    }
    return className;
  }
}

</script>

<style lang="less">
@import url('../assets/less/variables.less');
.numerical-detection-table {
  .numerical-detection-table__tag {
    display: inline-block;
    width: 80px;
    line-height: 24px;
    text-align: center;
    color: #fff;
    &:hover {
      opacity: 0.5;
    }
  }
  .numerical-detection-table__s3 {
    background: #ff9900;
  }
  .numerical-detection-table__s2 {
    background: #ed3f14;
  }
  .numerical-detection-table__s1 {
    background: #19be6b;
  }
  .numerical-detection-table__s0 {
    background: #2d8cf0;
  }
  .numerical-detection-table__sc0 {
    background: #19be6b;
  }
  .numerical-detection-table__sc1 {
    background: #ff9900;
  }
  .numerical-detection-table__sc2 {
    background: #66ccff;
  }
  .numerical-detection-table__sc3 {
    background: #ed3f14;
  }
  .numerical-detection-table__wait {
    color: red;
  }
  .el-table {
    thead {
      tr {
        th {
          background: @table-background-color;
          color: #333;
        }
      }
    }
  }
}
</style>

