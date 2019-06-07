import { Component, h, State, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'header-theme-switcher',
  styleUrl: './header-theme-switcher.css',
  shadow: true
})
export class HeaderThemeSwitcher {

  themes: string[] = ['light', 'dark', 'domains'];

  @State() selectedTheme: string = this.themes[0];

  @Event() themeSelected: EventEmitter<string>;

  handleSelect = (event: Event) => {
    this.selectedTheme = (event.target as HTMLSelectElement).value;
    this.themeSelected.emit(this.selectedTheme);
  }

  render() {
    return ([
      <p>Theme:</p>,
      <select name="theme" onInput={this.handleSelect}>
        {this.themes.map(theme => (<option value={theme} selected={theme === this.selectedTheme}>{theme}</option>))}
      </select>
    ]);
  }
}