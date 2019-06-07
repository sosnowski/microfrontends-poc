import { Component, h, Event, EventEmitter, Prop } from '@stencil/core';
import { StateTunnel } from '../state-tunnel/state-tunnel';
import { IState } from '../../state/state';
import { IItem } from 'core';

@Component({
  tag: 'promoted-item',
  styleUrl: 'promoted-item.css',
  shadow: true
})
export class PromotedItem {

  @Prop()
  record!: IItem;

  @Event()
  saved: EventEmitter<IItem>;

  @Event()
  removed: EventEmitter<IItem>;

  onSaveClick = () => {
    this.saved.emit(this.record);
  }

  onRemoveClick = () => {
    this.removed.emit(this.record);
  }

  render() {
    return (
      <StateTunnel.Consumer>
        {({ user }: IState) => {
          console.log(user);
          return (
            <article>
              <img src="https://placeimg.com/200/200/tech/grayscale" alt="some image"/>
              <header>
                Some promoted item
              </header>
              <section class="content">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vitae nisl lacinia, varius quam eget, molestie massa. Sed iaculis faucibus aliquam.
              </section>
              <footer>
                { user && !user.saved.includes(this.record.id) ? (<button class="save" onClick={this.onSaveClick}>Save</button>) : null }
                { user && user.saved.includes(this.record.id) ? (<button class="saved" onClick={this.onRemoveClick}>Remove</button>) : null }
              </footer>
            </article>
        )}}
      </StateTunnel.Consumer>
    );
  }
}