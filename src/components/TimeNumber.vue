<template>
  <div class="time-number">
    <el-select v-model="dateTime.day" placeholder="请选择" style="width: 100px;">
      <el-option
        v-for="item in dayArray"
        :key="item"
        :label="item"
        :value="item">
      </el-option>
    </el-select>
    <span class="time-number__tag">哪天</span>
    <el-select v-model="dateTime.hours" placeholder="请选择" style="width: 100px;">
      <el-option
        v-for="item in hoursArray"
        :key="item"
        :label="item"
        :value="item">
      </el-option>
    </el-select>
    <span class="time-number__tag">几时</span>
    <el-select v-model="dateTime.minutes" placeholder="请选择" style="width: 100px;">
      <el-option
        v-for="item in minutesArray"
        :key="item"
        :label="item"
        :value="item">
      </el-option>
    </el-select>
    <span class="time-number__tag">几分</span>
  </div>
</template>
<script lang="ts">
import {Vue, Component, Prop, Emit} from 'vue-property-decorator';
@Component
export default class TimeNumber extends Vue {
  public static arrayGenerator(n: number, s: number = 0) {
    const arr: string[] = [];
    for (let i = s; i <= n; i++) {
      arr.push((i < 10 ? '0' + i : i) + '');
    }
    return arr;
  }
  @Prop() public dateTime!: any;
  public dayArray: string[] = TimeNumber.arrayGenerator(31, 1);
  public hoursArray: string[] = TimeNumber.arrayGenerator(23, 0);
  public minutesArray: string[] = TimeNumber.arrayGenerator(59, 0);
}
</script>
<style lang="less">
.time-number {
  display: inline-block;
  margin-bottom: 10px;
  .time-number__tag {
    margin: 0 10px 0 5px;
  }
}
</style>

 
