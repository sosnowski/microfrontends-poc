import { Component, State, Prop, h } from '@stencil/core';
import { IUser, IEventBus, EVENT_TYPES, IItem } from 'core';
import { filter, map } from 'rxjs/operators';
import { StateTunnel } from '../state-tunnel/state-tunnel';
import { IState } from '../../state/state';
import { loadSearchResults } from '../../services/search.service';
import { SearchSaveEvent, SearchRemoveEvent } from '../../events';

@Component({
  tag: 'search-results',
  styleUrl: './search-results.css',
  shadow: true
})
export class SearchResults {

  @Prop()
  appEvents: IEventBus;

  @State()
  state: IState;

  @State()
  results: IItem[] = [];

  onItemSaved = (event: CustomEvent<IItem>) => {
    this.appEvents.publish(new SearchSaveEvent(event.detail.id));
  }

  onItemRemoved = (event: CustomEvent<IItem>) => {
    this.appEvents.publish(new SearchRemoveEvent(event.detail.id));
  };

  onSearchQuery = async (query: string) => {
    this.results = await loadSearchResults(query);
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

    this.appEvents.events$.pipe(
      filter(event => event.type === EVENT_TYPES.SEARCH_QUERY),
      map(event => event.detail as string)
    ).subscribe(this.onSearchQuery)
  }

  render() {
    return this.results.length > 0 ? (
      <StateTunnel.Provider state={this.state}>
        <h1>Search results</h1>
        <section class="results">
          {this.results.map(result =>
              (<search-item record={result} onSaved={this.onItemSaved} onRemoved={this.onItemRemoved}></search-item>))}
        </section>
      </StateTunnel.Provider>
    ) : (
      <p class="empty">No search results to display</p>
    );
  }
}