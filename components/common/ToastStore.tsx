// stores/ToastStore.ts
import { makeAutoObservable } from "mobx";

export default class ToastStore {
  message = "";
  visible = false;

  constructor() {
    makeAutoObservable(this);
  }

  show(message: string, duration = 3000) {
    this.message = message;
    this.visible = true;
    setTimeout(() => {
      this.visible = false;
    }, duration);
  }
}