import { EVENT_TYPES } from 'core';

export class ThemeUpdateEvent extends CustomEvent<string> {
  constructor(theme: string) {
    console.log('NEW THEME UPDATE EVENT');
    console.dir(EVENT_TYPES);
    super(EVENT_TYPES.THEME_UPDATE, {
      detail: theme
    });
  }
}