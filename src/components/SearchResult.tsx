import React, { memo } from 'react';
import { usePreloadedQuery, PreloadedQuery } from 'react-relay';
import { SearchRepositoryQuery } from '../App';
import {
  AppSearchRepositoryQuery,
} from '../__generated__/AppSearchRepositoryQuery.graphql';

type Props = {
  queryRef: PreloadedQuery<AppSearchRepositoryQuery>;
};

const SearchResult = (props : Props): JSX.Element => {
  const data = usePreloadedQuery<AppSearchRepositoryQuery>(
    SearchRepositoryQuery,
    props.queryRef,
  );

  return (
    <ul>
      {(data?.search.edges ?? []).map((edge, index) => {
        const node = edge?.node;
        
        return (
          <li key={index}>
          <h3>{node?.name}</h3>
          <p>{node?.description}</p>
          <span>⭐️{node?.stargazerCount}</span>
        </li>
        );
      })}
    </ul>
  );
};

export default memo(SearchResult);
