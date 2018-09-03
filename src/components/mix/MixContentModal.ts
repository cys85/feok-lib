import { Vue, Component } from 'vue-property-decorator';

@Component
export class MixContentModal extends Vue {
  public contentModalValue: boolean = false;
  public modalLoading: boolean = false;
}
