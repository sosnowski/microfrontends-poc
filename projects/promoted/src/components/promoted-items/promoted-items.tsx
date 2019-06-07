import { Component, h, Prop, State } from '@stencil/core';
import { IEventBus, IUser, IItem, EVENT_TYPES } from 'core';
import { filter, map } from 'rxjs/operators';
import { StateTunnel } from '../state-tunnel/state-tunnel';
import { IState } from '../../state/state';
import { PromotedSaveEvent, PromotedRemoveEvent } from '../../events';
import { loadPromoted } from '../../services/promoted.service';

@Component({
  tag: 'promoted-items',
  styleUrl: './promoted-items.css',
  shadow: true
})
export class PromotedItems {

  @Prop()
  appEvents: IEventBus;

  @State()
  state: IState;

  @State()
  records: IItem[] = [];

  onItemSaved = (event: CustomEvent<IItem>) => {
    this.appEvents.publish(new PromotedSaveEvent(event.detail.id));
  }

  onItemRemoved = (event: CustomEvent<IItem>) => {
    this.appEvents.publish(new PromotedRemoveEvent(event.detail.id));
  }

  componentWillLoad() {
    this.appEvents.events$.pipe(
      filter((event) => [ EVENT_TYPES.USER_LOGIN, EVENT_TYPES.USER_UPDATE ].includes(event.type as EVENT_TYPES)),
      map(event => event.detail as IUser)
    ).subscribe(user => {
      this.state = {
        ...this.state,
        user: user
      };
    });
  }

  async componentDidLoad() {
    this.records = await loadPromoted();
  }

  render() {
    return (
      <StateTunnel.Provider state={this.state}>
        <h1>You might like</h1>
        <section class="items">
          {this.records.map(record => (
            <promoted-item record={record} onSaved={this.onItemSaved} onRemoved={this.onItemRemoved}></promoted-item>
          ))}
        </section>
      </StateTunnel.Provider>
    );
  }
}