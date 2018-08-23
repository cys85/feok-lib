<!-- 系统功能管理表格组件 -->
<template>
  <div class="function-manage-table">
    <el-table
      :data="menusData"
      v-loading="loading"
      style="width: 100%">
      <el-table-column
        type="sort"
        label="序号"
        width="100">
          <template slot-scope="scope" >
           <span :class="scope.row.level ===1?'':'ml20'">{{scope.row.tmpIndex}}</span>
         </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="功能名称"
        min-width="160">
        <template slot-scope="scope" >
           <span :class="scope.row.level ===1?'':'ml20'">{{scope.row.name}}</span>
         </template>
      </el-table-column>
      <el-table-column
        prop="url"
        label="URL"
        min-width="160">   
         <template slot-scope="scope" >
           <span :class="scope.row.level ===1?'':'ml20'">{{scope.row.url}}</span>
         </template>     
      </el-table-column>
      <el-table-column
        prop="sort"
        label="排序"
        width="160">
         <template slot-scope="scope">
          <el-input-number v-model="scope.row.sort" @change="handleChange(scope.row)" :min="0"></el-input-number>
         </template>
      </el-table-column>
      <el-table-column
        prop="icon_url"
        label="图标"
        width="120">
          <template slot-scope="scope">
            <i class="iconfont" :class="scope.row.icon_url"></i>
          </template>
      </el-table-column>
      <el-table-column
        prop="status"
        label="是否显示"
        width="120">
          <template slot-scope="scope">
           <el-switch :value="scope.row.status" active-value="SHOW" inactive-value="HIDDEN"  @change="val => changeSwitch(val, scope.row)">
            </el-switch>
          </template>
      </el-table-column>
      <slot name="handle"></slot>
    </el-table>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from 'vue-property-decorator';
import { watch } from 'fs';
export interface DataType {
  id: number;
  parent_id: number;
  name: string;  // 功能名称
  url: string;  // URL
  sort: number;   // 排序
  icon_url: string;   // 图标
  status: string;  // 是否显示
}
@Component
export default class FunctionManageTable extends Vue {

  @Prop() public data!: DataType[];
  @Prop({ type: Number, default: 0 }) public idProp!: number;
   @Prop() public loading!: boolean;
  public menusData: DataType[] = [];

  public handleChange(row: any): void {
    console.log(row.sort);
    row.sort = row.sort === undefined ? 0 : row.sort;
    this.$emit('on-change', row);
  }

  /*
  *  数组转Tree
  */
  public arryToTree(arr: any): any {
    const oneLiveSZ: any = [];
    arr.forEach((item: any, index: number) => {
      if ( item.parent_id === this.idProp) {// 第一级
      const oneLive = {
            ...item,
            children: [],
         };
        // 第一级放到数组里
      oneLiveSZ.push(oneLive);
      for (const itemChild of arr) {// 第二级
          if (itemChild.parent_id === oneLive.id) {
          // 把第2级放到第1级里
            oneLive.children.push(itemChild);
          }
        }
      }
    });
   // console.log(oneLiveSZ);
    return oneLiveSZ;
  }

  /*
  *  Tree转数组
  */
  public treeToArray(arr: any) {
    const newArr: any = [];
    arr.forEach((item: any, index: number) => {
         const first = {
            ...item,
            tmpIndex: index + 1,
            level: 1,
         };
         newArr.push(first);
         if (item.children.length > 0) {
              item.children.forEach((itemSecond: any, indexSecond: number) => {
                 const second = {
                      ...itemSecond,
                      tmpIndex: indexSecond + 1,
                       level: 2,
                  };
                 newArr.push(second);
              });
          }
      });
    return newArr;
  }

 @Watch('data', { deep: true })
  public dataWatch(val: any, oldVal: any) {
    // watch data变化同步到组件内部
    const treeData = this.arryToTree(this.data);
    this.menusData = this.treeToArray(treeData);
     // console.log(this.data);
  }

  public changeSwitch(val: string, row: any): void {
    row.status = val;
    const ids: any[] = [];
    ids.push(row.id);
    this.menusData.forEach((item: any) => {
      if (row.id === item.parent_id) {
        // 有子节点被点击
        ids.push(item.id);
        item.status = val;
      }
    });
    if (!row.children) {
       const pid = row.parent_id;
       const brothers = this.menusData.filter((element: any) =>
            element.parent_id === pid,
      );   // 获取所有兄弟元素
       let flag = true;
       brothers.forEach((e: any) => {
        if (e.status !== row.status) {
          flag = false;  // 如果有兄弟元素，状态不一致，父元素不变
        }
      });
       if (flag) {
        ids.push(pid);  // 如果兄弟元素状态全部一致，父元素也变状态
        const pidItem = this.menusData.find((res: any) => res.id = pid); // 帅选出父元素的项目
        if (pidItem !== undefined ) {
          pidItem.status = val;
        }
      }
    }
    this.$emit('on-change-show', val, ids);
  }
}

</script>

<style lang="less">
@import url('../assets/less/variables.less');
.function-manage-table {
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
  .el-input-number {
    width: 140px;
  }
  .ml20 {
    margin-left: 25px;
  }
}
</style>

