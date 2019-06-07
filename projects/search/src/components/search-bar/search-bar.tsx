import { Component, State, Prop, h } from '@stencil/core';
import { IEventBus } from 'core';
import { SearchQueryEvent } from '../../events';

@Component({
  tag: 'search-bar',
  styleUrl: 'search-bar.css',
  shadow: true
})
export class SearchBar {

  @Prop() appEvents: IEventBus;
  @State() queryValue: string = '';

  emitSearchQuery = () => {
    this.appEvents.publish(new SearchQueryEvent(this.queryValue));
  }

  handleQueryInput = (event: Event) => {
    this.queryValue = (event.target as HTMLInputElement).value;
  }

  render() {
    return (
      <section class="container">
        <input placeholder="Search for items" type="text" name="search" value={this.queryValue} onInput={this.handleQueryInput}/>
        <button disabled={this.queryValue.length === 0} onClick={this.emitSearchQuery}>Search</button>
      </section>
    );
  }
}