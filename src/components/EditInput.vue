<template>
  <section class="base-edit-input">
    <!-- text -->
    <span v-if="!editStatus" @click.stop="itemClick">{{val}}</span>
    <!-- edit input -->
    <div class="base-edit-input__wrap" v-else>
      <el-tooltip
        :disabled="!errors.length"
        :hide-after="0"
        :content="errors.length ? errors[0].message || '' : ''"
        placement="top-start">
          <div>
            <el-input
              ref="input"
              v-model="val"
              :disabled="loading"
              :style="{
                width: `${inputWidth}px`
              }"
              :placeholder="placeholder"
              :maxlength="maxlength"
              @keyup.native.enter="handleSave" />
            <!-- 状态切换 -->
            <EditInput
              class="base-edit-input__loading"
              v-if="loading"
              :fix="false"
              text="" />
            <!-- 保存 -->
            <i
              v-else
              class="base-edit-input__button iconfont icon-duigou"
              @click.stop="handleSave" />
          </div>
      </el-tooltip>
    </div>
    <i
      v-if="!editStatus"
      class="base-edit-input__button iconfont icon-bianji"
      @click.stop="handleEdit" />
  </section>
</template>
<script lang="ts">
/**
 * 切换输入
 *
 * @param {array} rules - 验证规则，与iview一致
 * @param {number} width - 宽度
 * @param {number} height - 高度
 * @param {number} maxlength - 最大输入长度
 * @param {number | string} value - 值
 * @param {boolean} loading - 处理中
 * @param {boolean} editStatus - 是否为编辑状态
 * @param {string | number} placeholder - 原生 input placeholder
 *
 * @event ok 点击确定时触发
 * @event edit 点击编辑触发
 */
import {Vue, Component, Prop, Emit, Watch } from 'vue-property-decorator';
import Schema from 'async-validator';
import Loading from './Loading.vue';
@Component({
  components: {
    Loading,
  },
})
export default class EditInput extends Vue {
  @Prop({type: [String, Number]}) public value!: string|number;
  @Prop({default: () => []}) public rules!: any [];
  @Prop({default: 100}) public width!: number;
  @Prop() public maxlength!: number;
  @Prop({default: false}) public loading!: boolean;
  @Prop({default: false}) public editStatus!: boolean;
  @Prop({type: [String, Number]}) public placeholder!: string|number;
  public val: string|number = this.value;
  public errors: any [] = [];
  get inputWidth() {
    return this.width;
  }
  @Watch('value')
  public watchValue(val: any, oldVal: any) {
    this.val = val;
  }

  @Emit('input')
  @Watch('val')
  public watchVal(val: any, oldVal: any) {
    // Emit
    if (this.rules.length) { // 需要验证
      this.errors = [];
      for (const rule of this.rules) {
        if (this.errors.length) { // 验证失败
          break;
        }
        this.validator(rule, (errors: any, fields: any) => {
          if (errors) { // 验证失败
            this.errors = errors;
            return false;
          }
          this.errors = []; // 验证通过
        });
      }
    }
  }
  @Watch('editStatus')
  public watchEditStatus(val: any) {
    if (val) {
      this.$nextTick(function() {
        const $input = this.$refs.input as any;
        $input.focus();
        $input.select();
      });
    }
  }
  @Emit('edit')
  public handleEdit() {
      // Emit
  }
  public handleSave() {
      if (this.loading) { return false; } // 防止多次提交
      if (this.rules.length) { // 需要验证
        this.errors = [];
        for (const rule of this.rules) {
          if (this.errors.length) { // 验证失败
            break;
          }
          this.validator(rule, (errors: any, fields: any) => {
            if (errors) { // 验证失败
              this.errors = errors;
              return false;
            }
            this.errors = []; // 验证通过
            this.$emit('ok', this.val);
          });
        }
      } else {
        this.$emit('ok', this.val);
      }
    }
  public validator(rule: any, callback: any) {
    const descriptor = {
      value: rule,
    };
    const validator = new Schema(descriptor);
    validator.validate({value: this.val}, callback);
  }
  public mounted() {
    if (this.editStatus) {
      this.$nextTick(function() {
        const $input = this.$refs.input as any;
        $input.focus();
        $input.select();
      });
    }
  }
  @Emit('on-click')
  public itemClick() {
    // Emit
  }
}

</script>
<style lang="less">
.base-edit-input {
  position: relative;
  display: inline-block;
  line-height: 40px;
  &__loading {
    position: absolute;
    top: 2px;
    right: 8px;
    // padding: 1px 0;
  }
  &__wrap {
    position: relative;
    display: inline-block;
  }
  &__button {
    cursor: pointer;
    margin-left: 4px;
    // position: absolute;
    // top: 0;
    // right: -15px;
    &:hover {
      color: green;
    }
    &.icon-bianji {
      color: green;
    }
    &.icon-duigou {
      position: absolute;
      top: 2px;
      right: 8px;
      color: green;
      // padding: 1px 0;
      // background-color: #fff;
      &:hover {
        color: #ed3f14;
      }
    }
  }
}
</style>

