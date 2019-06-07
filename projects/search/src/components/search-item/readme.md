# search-item



<!-- Auto Generated Below -->


## Properties

| Property              | Attribute | Description | Type            | Default     |
| --------------------- | --------- | ----------- | --------------- | ----------- |
| `record` _(required)_ | --        |             | `ISearchResult` | `undefined` |


## Events

| Event     | Description | Type                         |
| --------- | ----------- | ---------------------------- |
| `removed` |             | `CustomEvent<ISearchResult>` |
| `saved`   |             | `CustomEvent<ISearchResult>` |


## Dependencies

### Used by

 - [search-results](..\search-results)

### Graph
```mermaid
graph TD;
  search-results --> search-item
  style search-item fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
