import React, { memo, useEffect, useState } from 'react';
import { usePreloadedQuery, PreloadedQuery, usePaginationFragment } from 'react-relay';
import { SearchRepositoryQuery } from '../App';
import type {
  AppSearchRepositoryQuery as AppSearchRepositoryQueryType,
  AppSearchRepositoryQuery$data
} from '../__generated__/AppSearchRepositoryQuery.graphql';
import { useSkipFirstEffect } from '../utils/hooks';

type Props = {
  queryRef: PreloadedQuery<AppSearchRepositoryQueryType>;
  addStar: (repositoryId: string, dataLength: number) => void;
  removeStar: (repositoryId: string, dataLength: number) => void;
  moreData: (lastItemCursor: string) => void;
  isAddMutationInFlight: boolean;
  isRemoveMutationInFlight: boolean;
};

const SearchResult = ({ queryRef, addStar, removeStar, moreData, isAddMutationInFlight, isRemoveMutationInFlight } : Props): JSX.Element => {
  const data: AppSearchRepositoryQuery$data = usePreloadedQuery<AppSearchRepositoryQueryType>(
    SearchRepositoryQuery,
    queryRef,
  );
  const repositoryListData = data?.search?.edges || [];
  const pageInfoData = data?.search?.pageInfo;

  const isDisabledBtn = isAddMutationInFlight || isRemoveMutationInFlight;

  const [repositoryListState, setRepositoryListState] = useState(repositoryListData);
  const [clickedItemIndex, setClickedItemIndex] = useState('');
  
  useEffect(() => {
    if (repositoryListState[0]?.cursor !== repositoryListData[0]?.cursor) {
      setRepositoryListState(repositoryListState.concat(repositoryListData));
    } else {
      setRepositoryListState(repositoryListData);
    }
  }, [data]);

  // const {
  //   data,
  //   loadNext,
  //   hasNext,
  //   refetch,
  // } = usePaginationFragment<AppRepositoryListPaginationQueryType, AppRepositoryListComponent_repository$key>(
  //   RepositoryListPaginationFragment,
  //   ,
  // );

  function onStarClick(viewerHasStarred: boolean, repositoryId: string): void {
    const dataLength = repositoryListState.length;
    setClickedItemIndex(repositoryId);
    
    viewerHasStarred ? removeStar(repositoryId, dataLength) : addStar(repositoryId, dataLength);
  }

  return (
    <>
      <ul>
        {(repositoryListState ?? []).map((edge, index) => {
          const node = edge?.node;
          const repositoryId = repositoryListState && repositoryListState[index]?.node?.id || '';
          
          return (
            <li key={index}>
              <h3>{node?.name}</h3>
              <p>{node?.description}</p>
              <button 
                type="button" 
                onClick={() => onStarClick(node?.viewerHasStarred || false, repositoryId)}
                disabled={(clickedItemIndex === repositoryId) && isDisabledBtn}
                >
                  ⭐️{node?.stargazerCount}
              </button>
            </li>
          );
        })}
      </ul>
      {pageInfoData?.hasNextPage && 
        <button type="button" onClick={() => moreData(repositoryListData && repositoryListData[9]?.cursor || '')}>
          더보기
        </button>
      }
    </>
  );
};

export default memo(SearchResult);
