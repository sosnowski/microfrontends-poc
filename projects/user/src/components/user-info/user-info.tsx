import { Component, State, Prop, h } from '@stencil/core';
import { filter, map } from 'rxjs/operators';
import { IUser, IEventBus, EVENT_TYPES } from 'core';
import { UserLoginEvent, UserUpdateEvent } from '../../events';

@Component({
  tag: 'user-info',
  styleUrl: './user-info.css',
  shadow: true
})
export class UserInfo {

  @Prop()
  appEvents: IEventBus;

  @State()
  user: IUser;

  @State()
  popupVisible: boolean = false;

  componentWillLoad() {
    this.appEvents.events$.pipe(
      filter(event => [EVENT_TYPES.PROMOTED_SAVE, EVENT_TYPES.SEARCH_SAVE].includes(event.type as EVENT_TYPES)),
      map(event => event.detail as string)
    ).subscribe(this.onSavedRecord)

    this.appEvents.events$.pipe(
      filter(event => [EVENT_TYPES.PROMOTED_REMOVE, EVENT_TYPES.SEARCH_REMOVE].includes(event.type as EVENT_TYPES)),
      map(event => event.detail as string)
    ).subscribe(this.onRemovedRecord)
  }

  onLoggedIn = (event: CustomEvent<IUser>) => {
    console.log('received login event');
    this.user = event.detail;
    this.popupVisible = false;
    this.appEvents.publish(new UserLoginEvent(this.user));
  }

  onSavedRecord = (recordId: string) => {
    console.log('new record is saved: ' + recordId);
    if (!this.user.saved.includes(recordId)) {
      this.user = {
        ...this.user,
        saved: [ ...this.user.saved, recordId ]
      };
      this.appEvents.publish(new UserUpdateEvent(this.user));
    }
    
  }

  onRemovedRecord = (recordId: string) => {
    if (this.user.saved.includes(recordId)) {
      this.user = {
        ...this.user,
        saved: this.user.saved.filter(savedId => savedId !== recordId)
      };
      this.appEvents.publish(new UserUpdateEvent(this.user));
    }
  }

  showLoginPopup = () => {
    this.popupVisible = true;
  }

  onLoginClose = () => {
    this.popupVisible = false;
  }

  render() {
    return this.user ? (
      <span class="hi">Hello {this.user.name}! - ({this.user.saved.length || 0} saved items)</span>
    ) : ([
      <button class="login" onClick={this.showLoginPopup}>Login</button>,
      <user-login-popup visible={this.popupVisible} onLoggedIn={this.onLoggedIn} onClosed={this.onLoginClose}></user-login-popup>
    ]);
  }
}