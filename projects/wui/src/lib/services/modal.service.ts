import { Injectable } from '@angular/core';
import { ModalInterface } from '../interfaces/modal.interface';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  instances: Array<ModalInterface> = [];

  constructor() { }

  async open(instance: ModalInterface) {
    let zIndex = 99;
    if(this.instances.length > 0) {
      zIndex = this.instances[this.instances.length - 1].zIndex + 1;
      this.instances.forEach(instance => {
        instance.showBackdrop = false;
      });
    }
    instance.zIndex = zIndex;
    this.instances.push(instance);
    return await instance.openService(zIndex);
  }

  async close() {
    await this.instances[this.instances.length - 1].closeService();
    this.instances.pop();
    if(this.instances.length > 0) {
      this.instances[this.instances.length - 1].showBackdrop = true;
    }
  }

}
