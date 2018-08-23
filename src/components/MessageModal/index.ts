import { Vue, Watch, Component } from 'vue-property-decorator';
import MessageModal from './MessageModal.vue';
export default MessageModal;

@Component
export class MixMessageModal extends Vue {
  public messageModalValue: boolean = false;
  public messageModalLoading: boolean = false;
}
