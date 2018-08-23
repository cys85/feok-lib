/*
 * @Author: Yuanr 
 * @Date: 2018-07-24 10:11:19
 */
<template>
  <div class="variable-input">
    <el-input v-if="isEdit" @blur="blurItem" :type="type" ref="input" v-model="valueTemp" placeholder="请输入内容"></el-input>
    <div @dblclick="editItem" v-else>{{value}}</div>
  </div>
</template>
<script lang="ts">
import {Vue, Component, Prop, Emit, Watch} from 'vue-property-decorator';
import { watch } from 'fs';
@Component
export default class VariableInput extends Vue {
  @Prop({default: 'text'}) public type!: string;
  @Prop() public value!: string;
  @Prop({default: false}) public keepEdit!: boolean; // 是否显示输入域
  @Prop({default: false}) public defaultEdit!: boolean; // 默认编辑状态
  public valueTemp: string = this.value;
  // 是否为编辑状态
  public isEdit: boolean = this.defaultEdit;
  // 固定展开不收起
  @Emit('blur')
  public blurItem(): void {
    if (!this.keepEdit) {
          this.isEdit = false;
    }
    const $input = this.$refs.input as HTMLInputElement;
    $input.blur();
  }
  public editItem(): void {
    //
    this.isEdit = true;
    this.$nextTick(() => {
      const $input = this.$refs.input as HTMLInputElement;
      $input.focus();
      $input.select();
    });
  }
  @Watch('valueTemp')
  public valueTempWatch(val: string, oldVal: string): void {
    this.valueInput(val);
  }
  @Watch('value')
  public valueWatch(val: string, oldVal: string): void {
    this.valueTemp = val;
  }
  @Watch('defaultEdit')
  public defaultEditWatch(val: boolean, oldVal: boolean): void {
    this.isEdit = val;
  }
  @Emit('input')
  public valueInput(val: string): void {
    // 实现v-model
  }
}
</script>


