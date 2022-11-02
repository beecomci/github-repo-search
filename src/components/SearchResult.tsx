import React, { memo } from 'react';
import { usePreloadedQuery, PreloadedQuery, usePaginationFragment, useMutation } from 'react-relay';
import { RepositoryListPaginationFragment, RepositoryListPaginationQuery, SearchRepositoryQuery, AddStarMutation, RemoveStarMutation } from '../App';
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
  addStar: (id: string) => void;
  removeStar: (id: string) => void;
  isAddMutationInFlight: boolean;
  isRemoveMutationInFlight: boolean;
};

const SearchResult = ({ queryRef, addStar, removeStar, isAddMutationInFlight, isRemoveMutationInFlight } : Props): JSX.Element => {
  const data = usePreloadedQuery<AppSearchRepositoryQueryType>(
    SearchRepositoryQuery,
    queryRef,
  );
  const repositoryListData = data?.search?.edges;
  const pageInfoData = data?.search?.pageInfo;
  
  // const {
  //   data,
  //   loadNext,
  //   hasNext,
  //   refetch,
  // } = usePaginationFragment<AppRepositoryListPaginationQueryType, AppRepositoryListComponent_repository$key>(
  //   RepositoryListPaginationFragment,
  //   ,
  // );

  function handleMoreClick(): void {

  }

  return (
    <>
      <ul>
        {(repositoryListData ?? []).map((edge, index) => {
          const node = edge?.node;
          
          return (
            <li key={index}>
              <h3>{node?.name}</h3>
              <p>{node?.description}</p>
              <button 
                type="button" 
                onClick={
                  node?.viewerHasStarred
                    ? () => removeStar(repositoryListData && repositoryListData[index]?.node?.id || '')
                    : () => addStar(repositoryListData && repositoryListData[index]?.node?.id || '')
                }
                disabled={isAddMutationInFlight || isRemoveMutationInFlight}
                >
                  ⭐️{node?.stargazerCount}
              </button>
            </li>
          );
        })}
      </ul>
      {pageInfoData?.hasNextPage && <button type="button" onClick={handleMoreClick}>더보기</button>}
    </>
  );
};

export default memo(SearchResult);
