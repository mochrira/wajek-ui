import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private handler = new Subject<any>();

  constructor() { }

  set(name: string, payload: any) {
    this.handler.next({ name: name, payload: payload });
  }

  get(name: string): Observable<any> {
    return this.handler.asObservable().pipe(
      filter(message => message.name === name),
      map(message => message.payload)
    );
  }

}
