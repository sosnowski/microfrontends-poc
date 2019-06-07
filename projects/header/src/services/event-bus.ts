import { Observable } from 'rxjs';

export interface IEventBus {
  events$(): Observable<CustomEvent>;
  publish(event: CustomEvent): void;
}