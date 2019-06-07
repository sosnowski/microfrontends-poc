import { IItem } from 'core';

export const loadSearchResults = async (query: string): Promise<IItem[]> => {
  //this should be a server call but I'm lazy
  return [1, 2, 3, 4].map(id => ({
    id: `search-${query}-${id}`,
    name: `Result: ${query} - ${id}`
  }));
}