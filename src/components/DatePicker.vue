/**
 * 时间段选择器（基础组件）-leo
 *
 * @param {Array} defaultVal - 默认日期
 * @param {boolean} defaulTime - 默认时分秒
 * @param {string} align - 内容对其方式
 * @param {string} startPlaceholder
 * @param {string} endPlaceholder
 * @param {boolean} disabled - 是否可选
 * @param {boolean} clearable - 是否可清空
 * @param {string} format - 显示格式化
 * @param {string} type - 控件类型
 *
 * @event change - 日期发生变化
 */
<template>
  <el-date-picker
    v-model="value"
    :type="type"
    :align="align"
    :start-placeholder="startPlaceholder"
    :end-placeholder="endPlaceholder"
    :picker-options="pickerOptions"
    :default-time="defaulTime"
    :disabled="disabled"
    :value-format="format"
    :clearable="clearable"
    @change="inputChange">
  </el-date-picker>
</template>

<script lang="ts">
// 时间段选择器
import { Vue, Component, Prop, Watch, Emit } from 'vue-property-decorator';
import dayjs from 'dayjs';

@Component
export default class DatePicker extends Vue {
  @Prop({ type: Array }) public defaultVal!: string[];
  @Prop({ type: Array, default() { return ['00:00:00', '23:59:59']; }}) public defaulTime!: string[];
  @Prop({ type: String, default: 'left' }) public align!: string;
  @Prop({ type: String, default: '开始日期' }) public startPlaceholder!: string;
  @Prop({ type: String, default: '结束日期' }) public endPlaceholder!: string;
  @Prop({ type: Boolean }) public disabled!: boolean;
  @Prop({ type: Boolean }) public clearable!: boolean;
  @Prop({ type: String, default: 'yyyy-MM-dd' }) public format!: string;
  @Prop({ type: String, default: 'daterange' }) public type!: string;

  public pickerOptions: any = {
    shortcuts: [
      {
        text: '近30天',
        onClick: (picker: any) => {
          const start = dayjs().subtract(30, 'day').format('YYYY-MM-DD');
          const end = dayjs().format('YYYY-MM-DD');
          picker.$emit('pick', [start, end]);
        },
      }, {
        text: '上个月',
        onClick: (picker: any) => {
          const Month = dayjs().subtract(1, 'month');
          const end = Month.endOf('month').format('YYYY-MM-DD');
          const start = Month.startOf('month').format('YYYY-MM-DD');
          picker.$emit('pick', [start, end]);
        },
      }, {
        text: '本月',
        onClick: (picker: any) => {
          const end = dayjs().endOf('month').format('YYYY-MM-DD');
          const start = dayjs().startOf('month').format('YYYY-MM-DD');
          picker.$emit('pick', [start, end]);
        },
      }, {
        text: '上季度',
        onClick: (picker: any) => {
          const end = new Date();
          const start = new Date();
          const today = new Date();
          const year = today.getFullYear();
          const Month = today.getMonth() + 1;

          let starttime = '';
          let endtime = '';
          if (Month < 4) {
            starttime = year * 1 - 1 + '-10-1 00:00:00';
            endtime = year * 1 - 1 + '-12-31 23:59:59';
          } else if (Month < 7) {
            starttime = year + '-01-1 00:00:00';
            endtime = year + '-03-31 23:59:59';
          } else if (Month < 10) {
            starttime = year + '-04-1 00:00:00';
            endtime = year + '-06-30 23:59:59';
          } else {
            starttime = year + '-07-1 00:00:00';
            endtime = year + '-09-30 23:59:59';
          }

          start.setTime(new Date(starttime).getTime());
          end.setTime(new Date(endtime).getTime());
          picker.$emit('pick', [start, end]);
        },
      }, {
        text: '本季度',
        onClick: (picker: any) => {
          const end = new Date();
          const start = new Date();
          const today = new Date();
          const year = today.getFullYear();
          const Month = today.getMonth() + 1;

          let starttime = '';
          let endtime = '';
          if (Month < 4) {
            starttime = year + '-01-1 00:00:00';
            endtime = year + '-03-31 23:59:59';
          } else if (Month < 7) {
            starttime = year + '-04-1 00:00:00';
            endtime = year + '-06-30 23:59:59';
          } else if (Month < 10) {
            starttime = year + '-07-1 00:00:00';
            endtime = year + '-09-30 23:59:59';
          } else {
            starttime = year * 1 - 1 + '-10-1 00:00:00';
            endtime = year * 1 - 1 + '-12-31 23:59:59';
          }

          start.setTime(new Date(starttime).getTime());
          end.setTime(new Date(endtime).getTime());
          picker.$emit('pick', [start, end]);
        },
      }, {
        text: '上一年',
        onClick: (picker: any) => {
          const Month = dayjs().subtract(1, 'year');
          const end = Month.endOf('year').format('YYYY-MM-DD');
          const start = Month.startOf('year').format('YYYY-MM-DD');
          picker.$emit('pick', [start, end]);
        },
      }, {
        text: '本年',
        onClick: (picker: any) => {
          const end = dayjs().endOf('year').format('YYYY-MM-DD');
          const start = dayjs().startOf('year').format('YYYY-MM-DD');
          picker.$emit('pick', [start, end]);
        },
      },
    ],
  };

  public value: string[] = this.defaultVal ? this.defaultVal : [];

  @Watch('defaultVal', {deep: true})
    private watchDefaultVal(newVal: string[], oldVal: string[]) {
      this.value = newVal;
    }

  @Watch('format', {deep: true})
    private watchFormat(newVal: string, oldVal: string) {
      const str = (newVal === 'yyyy-MM-dd') ? 'YYYY-MM-DD' : 'YYYY-MM-DD HH:mm:ss';

      this.pickerOptions = {
        shortcuts: [
          {
            text: '近30天',
            onClick: (picker: any) => {
              const start = dayjs().subtract(30, 'day').format(str);
              const end = dayjs().format(str);
              picker.$emit('pick', [start, end]);
            },
          }, {
            text: '上个月',
            onClick: (picker: any) => {
              const Month = dayjs().subtract(1, 'month');
              const end = Month.endOf('month').format(str);
              const start = Month.startOf('month').format(str);
              picker.$emit('pick', [start, end]);
            },
          }, {
            text: '本月',
            onClick: (picker: any) => {
              const end = dayjs().endOf('month').format(str);
              const start = dayjs().startOf('month').format(str);
              picker.$emit('pick', [start, end]);
            },
          }, {
            text: '上季度',
            onClick: (picker: any) => {
              const end = new Date();
              const start = new Date();
              const today = new Date();
              const year = today.getFullYear();
              const Month = today.getMonth() + 1;

              let starttime = '';
              let endtime = '';
              if (Month < 4) {
                starttime = year * 1 - 1 + '-10-1 00:00:00';
                endtime = year * 1 - 1 + '-12-31 23:59:59';
              } else if (Month < 7) {
                starttime = year + '-01-1 00:00:00';
                endtime = year + '-03-31 23:59:59';
              } else if (Month < 10) {
                starttime = year + '-04-1 00:00:00';
                endtime = year + '-06-30 23:59:59';
              } else {
                starttime = year + '-07-1 00:00:00';
                endtime = year + '-09-30 23:59:59';
              }

              start.setTime(new Date(starttime).getTime());
              end.setTime(new Date(endtime).getTime());
              picker.$emit('pick', [start, end]);
            },
          }, {
            text: '本季度',
            onClick: (picker: any) => {
              const end = new Date();
              const start = new Date();
              const today = new Date();
              const year = today.getFullYear();
              const Month = today.getMonth() + 1;

              let starttime = '';
              let endtime = '';
              if (Month < 4) {
                starttime = year + '-01-1 00:00:00';
                endtime = year + '-03-31 23:59:59';
              } else if (Month < 7) {
                starttime = year + '-04-1 00:00:00';
                endtime = year + '-06-30 23:59:59';
              } else if (Month < 10) {
                starttime = year + '-07-1 00:00:00';
                endtime = year + '-09-30 23:59:59';
              } else {
                starttime = year * 1 - 1 + '-10-1 00:00:00';
                endtime = year * 1 - 1 + '-12-31 23:59:59';
              }

              start.setTime(new Date(starttime).getTime());
              end.setTime(new Date(endtime).getTime());
              picker.$emit('pick', [start, end]);
            },
          }, {
            text: '上一年',
            onClick: (picker: any) => {
              const Month = dayjs().subtract(1, 'year');
              const end = Month.endOf('year').format(str);
              const start = Month.startOf('year').format(str);
              picker.$emit('pick', [start, end]);
            },
          }, {
            text: '本年',
            onClick: (picker: any) => {
              const end = dayjs().endOf('year').format(str);
              const start = dayjs().startOf('year').format(str);
              picker.$emit('pick', [start, end]);
            },
          },
        ],
      };
    }

  @Emit('change')
    private inputChange(val: string[]) {
      return val;
    }
  }
</script>

