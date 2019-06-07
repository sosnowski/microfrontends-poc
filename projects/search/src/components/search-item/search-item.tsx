import { Component, h, Event, EventEmitter, Prop } from '@stencil/core';
import { IItem } from 'core';
import { StateTunnel } from '../state-tunnel/state-tunnel';
import { IState } from '../../state/state';

@Component({
  tag: 'search-item',
  styleUrl: 'search-item.css',
  shadow: true
})
export class SearchItem {

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
          return (
            <article>
              <img src="https://placeimg.com/170/170/tech/grayscale" alt="some image"/>
              <header>
                {this.record.name}
              </header>
              <section class="content">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam dapibus orci non tristique placerat. In massa orci, pretium non nulla vitae, iaculis gravida neque. Etiam sed venenatis ante. Donec tortor lacus, vehicula sed pulvinar non, bibendum ac dolor. Vestibulum interdum accumsan risus, eu sollicitudin ante dapibus eu.
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
