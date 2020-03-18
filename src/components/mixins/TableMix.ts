/*
 * @Author: cys
 * @Date: 2018-07-23 10:36:04
 * @Last Modified by: leo
 * @Last Modified time: 2018-08-29 17:32:58
 * 表格视图混合
 */
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default  class TableMix extends Vue {
  @Prop() public loading!: boolean;
  @Prop() public data!: any;
  @Prop() public refName!: string;

  /**
   * emptyText 数据
   */
  public get emptyText() {
    let text = '正在拉取数据...';
    if (this.loading) {
      text = '正在拉取数据...';
    } else if (!this.data || (this.data && this.data.length === 0)) {
      text = '暂无数据';
    }
    return text;
  }

  public doAction(eventName: string) {
    const table = this.$refs[this.refName] as any;
    return table[eventName]();
  }
}
