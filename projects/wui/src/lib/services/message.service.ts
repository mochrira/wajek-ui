import { Injectable, signal, computed } from '@angular/core';
import { Observable } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private handler = signal<{ name: string; payload: any } | null>(null);

  set(name: string, payload: any) {
    this.handler.set({ name, payload });
  }

  get(name: string): Observable<any> {
    return toObservable(
      computed(() => {
        const msg = this.handler();
        return msg && msg.name === name ? msg.payload : null;
      })
    );
  }

}
