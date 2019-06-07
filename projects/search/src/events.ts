import { EVENT_TYPES } from 'core';

export class SearchQueryEvent extends CustomEvent<string> {
  constructor(query: string) {
    super(EVENT_TYPES.SEARCH_QUERY, {
      detail: query
    });
  }
}

export class SearchSaveEvent extends CustomEvent<string> {
  constructor(recordId: string) {
    super(EVENT_TYPES.SEARCH_SAVE, {
      detail: recordId
    });
  }
}

export class SearchRemoveEvent extends CustomEvent<string> {
  constructor(recordId: string) {
    super(EVENT_TYPES.SEARCH_REMOVE, {
      detail: recordId
    });
  }
}