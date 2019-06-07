/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import { HTMLStencilElement, JSXBase } from '@stencil/core/internal';
import {
  IEventBus,
  IItem,
} from 'core';


export namespace Components {
  interface PromotedItem {
    'record': IItem;
  }
  interface PromotedItems {
    'appEvents': IEventBus;
  }
}

declare namespace LocalJSX {
  interface PromotedItem extends JSXBase.HTMLAttributes {
    'onRemoved'?: (event: CustomEvent<IItem>) => void;
    'onSaved'?: (event: CustomEvent<IItem>) => void;
    'record': IItem;
  }
  interface PromotedItems extends JSXBase.HTMLAttributes {
    'appEvents'?: IEventBus;
  }

  interface IntrinsicElements {
    'promoted-item': PromotedItem;
    'promoted-items': PromotedItems;
  }
}

export { LocalJSX as JSX };


declare module "@stencil/core" {
  export namespace JSX {
    interface IntrinsicElements extends LocalJSX.IntrinsicElements {}
  }
}


declare global {



  interface HTMLPromotedItemElement extends Components.PromotedItem, HTMLStencilElement {}
  var HTMLPromotedItemElement: {
    prototype: HTMLPromotedItemElement;
    new (): HTMLPromotedItemElement;
  };

  interface HTMLPromotedItemsElement extends Components.PromotedItems, HTMLStencilElement {}
  var HTMLPromotedItemsElement: {
    prototype: HTMLPromotedItemsElement;
    new (): HTMLPromotedItemsElement;
  };

  interface HTMLElementTagNameMap {
    'promoted-item': HTMLPromotedItemElement;
    'promoted-items': HTMLPromotedItemsElement;
  }

  interface ElementTagNameMap extends HTMLElementTagNameMap {}
}
