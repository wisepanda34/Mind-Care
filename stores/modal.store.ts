// stores/modal.store.ts
import { defineStore } from "pinia";

// import type { IModalProps, IModalAvailableProps } from "~/types/modal.type";
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

// базовое состояние для модального окна
const basicState = { component: null, props: { title: "", text: "" } };

export const useModalStore = defineStore("modalStore", {
  state: ():IModalState => ({ modalState: basicState }),
  actions: {
    async fetchModalData() {
      try {
        const response = await axios.get("/api/login");
        const { title, text } = response.data;
        this.modalState.props = { title, text };
      } catch (error) {
        console.error("Error fetching modal data:", error);
      }
    },
  },
})