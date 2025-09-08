import { Injectable, signal, computed } from '@angular/core';
import { Observable } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private handler = signal<{ name: string; payload: any } | null>(null);
  private handler$ = toObservable(this.handler);

  set(name: string, payload: any) {
    this.handler.set({ name, payload });
  }

  get(name: string): Observable<any> {
    return new Observable(observer => {
      this.handler$.subscribe(msg => {
        if (msg && msg.name === name) {
          observer.next(msg.payload);
        }
      });
    });
  }

}
