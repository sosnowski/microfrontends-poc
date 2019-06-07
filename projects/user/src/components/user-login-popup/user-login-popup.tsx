import { Component, Prop, Event, EventEmitter, h } from '@stencil/core';
import { IUser } from 'core';

@Component({
  tag: 'user-login-popup',
  styleUrl: 'user-login-popup.css',
  shadow: true
})
export class UserLoginPopup {
  @Prop() visible: boolean = false;

  @Event({
    bubbles: false,
    composed: false
  }) loggedIn: EventEmitter<IUser>;

  @Event({
    bubbles: false,
    composed: false
  })  closed: EventEmitter<void>;

  onLoginClick = (event: MouseEvent) => {
    event.preventDefault();
    // read form values, make server request
    // ...

    //notify parent that user has logged in
    console.log('Login form login');
    this.loggedIn.emit({
      name: 'Damian',
      saved: []
    });
  }

  close = (e: Event) => {
    e.preventDefault();
    this.closed.emit();
  }

  render() {
    return ([
        <div class={this.visible ? 'glass visible' : 'glass'} onClick={this.close}></div>,
        <div class={this.visible ? 'modal visible' : 'modal'}>
          <form>
            <header>Login</header>
            <section>
              <input type="password" name="login" placeholder="Type your password" />
            </section>
            <footer>
              <button class="login" onClick={this.onLoginClick}>Login</button>
              <button class="close" onClick={this.close}>Cancel</button>
            </footer>
          </form>
        </div>
    ]);
  }
}