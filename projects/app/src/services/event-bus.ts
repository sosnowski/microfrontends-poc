import { ReplaySubject, Observable } from 'rxjs';
import { IEventBus } from 'core';

export class EventBus implements IEventBus {
  private subject: ReplaySubject<CustomEvent> = new ReplaySubject();
  private observable?: Observable<CustomEvent>;

  get events$(): Observable<CustomEvent> {
    if (!this.observable) {
      this.observable = this.subject.asObservable();
    }
    return this.observable;
  }

  publish(event: CustomEvent) {
    console.log('Publish event ' + event.type);
    console.log(event.detail);
    this.subject.next(event);
  }
}