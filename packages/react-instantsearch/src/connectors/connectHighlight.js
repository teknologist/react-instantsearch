import createConnector from '../core/createConnector';
import parseAlgoliaHit from '../core/highlight';

import highlightTags from '../core/highlightTags.js';

const highlight = ({ attribute, hit, highlightProperty }) =>
  parseAlgoliaHit({
    attribute,
    hit,
    preTag: highlightTags.highlightPreTag,
    postTag: highlightTags.highlightPostTag,
    highlightProperty,
  });

/**
 * connectHighlight connector provides the logic to create an highlighter
 * component that will retrieve, parse and render an highlighted attribute
 * from an Algolia hit.
 * @name connectHighlight
 * @kind connector
 * @category connector
 * @providedPropType {function} highlight - function to retrieve and parse an attribute from a hit. It takes a configuration object with 3 attributes: `highlightProperty` which is the property that contains the highlight structure from the records, `attribute` which is the name of the attribute (it can be either a string or an array of strings) to look for and `hit` which is the hit from Algolia. It returns an array of objects `{value: string, isHighlighted: boolean}`. If the element that corresponds to the attribute is an array of strings, it will return a nested array of objects.
 * @example
 * import React from 'react';
 * import { connectHighlight } from 'react-instantsearch/connectors';
 * import { InstantSearch, Hits } from 'react-instantsearch/dom';
 *
 * const CustomHighlight = connectHighlight(
 *   ({ highlight, attribute, hit, highlightProperty }) => {
 *     const parsedHit = highlight({ attribute, hit, highlightProperty: '_highlightResult' });
 *     const highlightedHits = parsedHit.map(part => {
 *       if (part.isHighlighted) return <mark>{part.value}</mark>;
 *       return part.value;
 *     });
 *     return <div>{highlightedHits}</div>;
 *   }
 * );
 *
 * const Hit = ({hit}) =>
 * <p>
 *   <CustomHighlight attribute="description" hit={hit} />
 * </p>;
 *
 * export default function App() {
 *   return (
 *     <InstantSearch
 *        appId="latency"
 *        apiKey="6be0576ff61c053d5f9a3225e2a90f76"
 *        indexName="ikea">
 *       <Hits hitComponent={Hit} />
 *     </InstantSearch>
 *   );
 * }
 */
export default createConnector({
  displayName: 'AlgoliaHighlighter',

  propTypes: {},

  getProvidedProps() {
    return { highlight };
  },
});
