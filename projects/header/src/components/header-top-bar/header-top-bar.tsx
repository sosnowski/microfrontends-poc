import { Component, Prop, h, State } from '@stencil/core';
import { Fragment, IEventBus, IUser } from 'core';
import { filter, map } from 'rxjs/operators';
import { ThemeUpdateEvent } from '../../events';

@Component({
  tag: 'header-top-bar',
  styleUrl: 'header-top-bar.css',
  shadow: true
})
export class TopBar {

  @Prop() appEvents: IEventBus;

  @State()
  user: IUser;

  onThemeSelected = (event: CustomEvent<string>) => {
    this.appEvents.publish(new ThemeUpdateEvent(event.detail));
  }

  componentWillLoad() {
    this.appEvents.events$.pipe(
      filter((event) => event.type === 'user:login'),
      map(event => event.detail as IUser)
    ).subscribe(user => {
      this.user = user;
    });
  }

  render() {
    return (
        <Fragment>
          <h1>Buy it!</h1>
          <section class="menu">
            <span>Home</span>
            <span>Premium</span>
            <span>About Us</span>
            { this.user ? (<span class="user-link">Your Account</span>) : null }
          </section>
          <section class="other">
            <slot />
          </section>
          <header-theme-switcher onThemeSelected={this.onThemeSelected}/>
        </Fragment>);
  }
}
