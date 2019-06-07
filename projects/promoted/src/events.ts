import { EVENT_TYPES } from 'core';

export class PromotedSaveEvent extends CustomEvent<string> {
  constructor(recordId: string) {
    super(EVENT_TYPES.PROMOTED_SAVE, {
      detail: recordId
    });
  }
}

export class PromotedRemoveEvent extends CustomEvent<string> {
  constructor(recordId: string) {
    super(EVENT_TYPES.PROMOTED_REMOVE, {
      detail: recordId
    });
  }
}