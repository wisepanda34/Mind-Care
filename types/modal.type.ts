// types/modal.type.ts
import { extend } from "@vue/shared";
import axios from "axios";
const component = extend({});
type VueComponent = InstanceType<typeof component>;

export interface IModalProps {
  component: null | VueComponent;
  props?: IModalAvailableProps;
}

export interface IModalAvailableProps {
  title: string;
  text: string;
}
export interface IModalState {
  modalState: IModalProps;
}