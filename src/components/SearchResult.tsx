import React, { memo } from 'react';
import { usePreloadedQuery, PreloadedQuery, usePaginationFragment } from 'react-relay';
import { RepositoryListPaginationFragment, RepositoryListPaginationQuery, SearchRepositoryQuery } from '../App';
import type {
  AppRepositoryListPaginationQuery as AppRepositoryListPaginationQueryType,
  AppRepositoryListPaginationQuery$data,
} from '../__generated__/AppRepositoryListPaginationQuery.graphql';
import type {
  AppRepositoryListComponent_repository$key,
  AppRepositoryListComponent_repository$data,
} from '../__generated__/AppRepositoryListComponent_repository.graphql';
import type {
  AppSearchRepositoryQuery as AppSearchRepositoryQueryType,
} from '../__generated__/AppSearchRepositoryQuery.graphql';

type Props = {
  queryRef: PreloadedQuery<AppSearchRepositoryQueryType>;
};

const SearchResult = (props : Props): JSX.Element => {
  const data = usePreloadedQuery<AppSearchRepositoryQueryType>(
    SearchRepositoryQuery,
    props.queryRef,
  );
  
  // const {
  //   data,
  //   loadNext,
  //   hasNext,
  //   refetch,
  // } = usePaginationFragment<AppRepositoryListPaginationQueryType, AppRepositoryListComponent_repository$key>(
  //   RepositoryListPaginationFragment,
  //   ,
  // );

  function handleClick(): void {

  }

  function handleToggleStarClick(): void {

  }

  return (
    <>
      <ul>
        {(data?.search?.edges ?? []).map((edge, index) => {
          const node = edge?.node;
          
          return (
            <li key={index}>
            <h3>{node?.name}</h3>
            <p>{node?.description}</p>
            <button type="button" onClick={handleToggleStarClick}>⭐️{node?.stargazerCount}</button>
          </li>
          );
        })}
      </ul>
      {data?.search?.pageInfo?.hasNextPage && <button type="button" onClick={handleClick}>더보기</button>}
    </>
  );
};

export default memo(SearchResult);
