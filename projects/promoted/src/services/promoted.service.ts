import { IItem } from 'core';

export const loadPromoted = async (): Promise<IItem[]> => {
  //this should be a server call but I'm lazy
  return [1, 2].map(id => ({
    id: `promoted-${id}`,
    name: `Promoted: ${id}`
  }));
}