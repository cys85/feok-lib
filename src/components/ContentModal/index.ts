import { Vue, Watch, Component } from 'vue-property-decorator';
import ContentModal from './ContentModal.vue';
import EventBus from '@/core/event-bus';
export default ContentModal;

@Component
export class MixContentModal extends Vue {
  public contentModalValue: boolean = false;
  public modalLoading: boolean = false;
}
