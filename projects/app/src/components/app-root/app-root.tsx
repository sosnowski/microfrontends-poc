import { Component, h, State, Host } from '@stencil/core';
import { filter, map } from 'rxjs/operators';
import { IEventBus, EVENT_TYPES } from 'core';
import { EventBus } from '../../services/event-bus';


@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
  shadow: false,
  scoped: true
})
export class AppRoot {

  appEvents: IEventBus;

  @State() theme: string;

  componentWillLoad() {
    this.appEvents = new EventBus();
    this.appEvents.events$.subscribe((event) => {
      console.log('Global app event');
      console.log(event);
    });

    this.appEvents.events$.pipe(
      filter(event => event.type === EVENT_TYPES.THEME_UPDATE),
      map(event => event.detail as string)
    ).subscribe(theme => {
      console.log('NEW THEME!: ' + theme);
      this.theme = theme;
    });
  }

  render() {
    return (
      <Host class={this.theme}>
        <header-top-bar appEvents={this.appEvents}>
          <user-info appEvents={this.appEvents}></user-info>
        </header-top-bar>,
        <search-bar appEvents={this.appEvents}></search-bar>,
        <promoted-items appEvents={this.appEvents}></promoted-items>,
        <search-results appEvents={this.appEvents}></search-results>
      </Host>
    );
  }
}
