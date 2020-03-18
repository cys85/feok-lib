/*
 * @Author: cys
 * @Date: 2018-07-23 10:36:04
 * @Last Modified by: cys
 * @Last Modified time: 2018-07-31 12:57:10
 * 表格视图混合
 */
import { Component, Vue } from 'vue-property-decorator';
import {debounce} from 'lodash';
import EventBus from '../../core/event-bus';

@Component
export default  class TableViewMix extends Vue {
  public data: any[] = []; // 当前页表格数据
  public preData = []; // 上一页表格数据
  public nextData = []; // 下一页表格数据
  public pageSize = 25; // 每页大小
  public pageNo = 1; // 当前页
  public query = {}; // 条件
  public loading = false; // 表格加载中
  public nomore = false; // 是否还有更多数据
  public pageChange = debounce(this._pageChange, 200);
  public fetchDataAction: any;

  /**
   * fetch 数据
   */
  public get emptyText() {
    let text = '';
    if (this.loading) {
      text = '正在拉取数据...';
    }
    if (this.data.length === 0) {
      text = '暂无数据';
    }
    return text;
  }
  /**
   * fetch 数据
   */
  public async fetchData() {
    this.loading = true;
    // 拉取当前页数据
    const data = await this.fetchDataAction({
      ...this.query,
      page_no: this.pageNo,
      page_num: this.pageSize,
    });

    this.data = data;

    this.$nextTick(function() {
      this.loading = false;
    });

    // 拉取下一页数据
    if (data.length >= this.pageSize) {
      this.fetchNextData();
      this.nomore = false;
    } else {
      this.nomore = true;
    }

    // 拉取上一页数据
    this.pageNo !== 1 && this.fetchProData();

  }

  /**
   * 搜索
   */
  public handleSearch() {
    this.pageNo = 1;
    this.fetchData();
  }

  /**
   * 拉取下一页数据
   */
  public fetchNextData() {
    this.fetchDataAction({
      ...this.query,
      page_no: this.pageNo + 1,
      page_num: this.pageSize,
    })
    .then((nextData: any) => {
      this.nextData = nextData;
      if (!this.nextData.length) { this.nomore = true; }
    });
  }

  /**
   * 拉取上一页数据
   */
  public fetchProData() {
    this.fetchDataAction({
      ...this.query,
      page_no: this.pageNo - 1,
      page_num: this.pageSize,
    })
    .then((preData: any) => {
      this.preData = preData;

    });
  }

  /**
   * 翻页
   * @param page - 新页码
   */
  public _pageChange(newPage: number) {
    if (Math.abs(newPage - this.pageNo) > 1) {
      this.pageNo = newPage;
      this.fetchData();
      return false;
    }
    // 向回翻页
    if (this.pageNo > newPage) {
      this.data = this.preData;
      this.preData = [];
    }
    // 向下翻页
    if (this.pageNo < newPage) {
      this.data = this.nextData;
      this.nextData = [];
    }
    this.pageNo = newPage;
    // 拉取下一页数据
    if (this.data.length >= this.pageSize) {
      this.fetchNextData();
      this.nomore = false;
    } else {
      this.nomore = true;
    }
    // 拉取上一页数据
    this.pageNo !== 1 && this.fetchProData();
    EventBus.$emit('tablePageChange');
  }
}
