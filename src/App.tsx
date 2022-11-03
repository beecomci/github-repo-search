import React, { useState } from 'react';
import { graphql } from 'babel-plugin-relay/macro';
import {
  RelayEnvironmentProvider,
  loadQuery,
  useQueryLoader,
  useMutation,
} from 'react-relay/hooks';
import RelayEnvironment from './RelayEnvironment';
import './App.css';
import SearchResult from './components/SearchResult';
import type {
  AppSearchRepositoryQuery as AppSearchRepositoryQueryType,
} from './__generated__/AppSearchRepositoryQuery.graphql';
import type {
  AppAddStarMutation as AppAddStarMutationType,
} from './__generated__/AppAddStarMutation.graphql';
import type {
  AppRemoveStarMutation as AppRemoveStarMutationType,
} from './__generated__/AppRemoveStarMutation.graphql';
import SearchSection from './components/SearchSection';

const { Suspense } = React;

export const SearchRepositoryQuery = graphql`
  query AppSearchRepositoryQuery($keyword: String!, $first: Int!, $after: String) {
    search(query: $keyword, type: REPOSITORY, first: $first, after: $after) {
      edges {
        cursor
        node {
          ... on Repository {
            id
            name
            description
            stargazerCount
            viewerHasStarred
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;

// add star mutation
export const AddStarMutation = graphql`
  mutation AppAddStarMutation($input: AddStarInput!) {
    addStar(input: $input) {
      starrable {
        ... on Starrable {
          stargazerCount
          viewerHasStarred
        }
      }
    }
  }
`;

// remove star mutation
export const RemoveStarMutation = graphql`
  mutation AppRemoveStarMutation($input: RemoveStarInput!) {
    removeStar(input: $input) {
      starrable {
        ... on Starrable {
          stargazerCount
          viewerHasStarred
        }
      }
    }
  }
`;

// TODO : usePaginationFragment로 페이지네이션 구현을 위한 쿼리문 -> 실패
// export const RepositoryListPaginationFragment = graphql`
//   fragment AppRepositoryListComponent_repository on Query
//     @argumentDefinitions(
//       keyword: {type: "String!"}
//       first: {type: "Int"}
//       after: {type: "String"}
//     )
//     @refetchable(queryName: "RepositoryListPaginationQuery") {
//       search(query: $keyword, type: REPOSITORY, first: $first, after: $after) @connection(key: "AppRepositoryListComponent_search") {
//         edges {
//           cursor
//           node {
//             ... on Repository {
//               name
//               description
//               stargazerCount
//             }
//           }
//         }
//         pageInfo {
//           endCursor
//           hasNextPage
//         }
//       }
//     }
// `;

// export const RepositoryListPaginationQuery = graphql`
//   query AppRepositoryListPaginationQuery($keyword: String!, $first: Int, $after: String) {
//     ...AppRepositoryListComponent_repository @arguments(keyword: $keyword, first: $first, after: $after)
//   }
// `;

const preloadedQuery = loadQuery(RelayEnvironment, SearchRepositoryQuery, {});
const PAGINATION_PAGE = 10;

function App(props: any) {
  const [
    appSearchRepositoryRef,
    loadAppSearchRepositoryQuery,
  ] = useQueryLoader<AppSearchRepositoryQueryType>(
    SearchRepositoryQuery,
    props.initialQueryRef,
  );

  const [keyword, setKeyword] = useState('');

  const [addCommitMutation, isAddMutationInFlight] = useMutation<AppAddStarMutationType>(AddStarMutation);
  const [removeCommitMutation, isRemoveMutationInFlight] = useMutation<AppRemoveStarMutationType>(RemoveStarMutation);

  // refetch data
  function refetchData(dataLength: number): void {
    loadAppSearchRepositoryQuery({keyword, first: dataLength});
  }

  // search input
  function onSearchInputSumbmit(keyword: string): void {
    setKeyword(keyword);
    loadAppSearchRepositoryQuery({keyword, first: PAGINATION_PAGE});
  }

  // click '더보기' 버튼
  function onMoreDataClick(lastItemCursor: string): void {
    loadAppSearchRepositoryQuery({keyword, first: PAGINATION_PAGE, after: lastItemCursor});
  };

  // add star
  async function onAddStarClick(repositoryId: string, dataLength: number): Promise<void> {    
    const result = await addCommitMutation({
      variables: {
        input: { starrableId: repositoryId }
      }
    });

    if (result) {
      await refetchData(dataLength);
    }
  }

  // remove star
  async function onRemoveStarClick(repositoryId: string, dataLength: number): Promise<void> {    
    const result = await removeCommitMutation({
      variables: {
        input: { starrableId: repositoryId }
      }
    });

    if (result) {
      await refetchData(dataLength);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <SearchSection searchInput={onSearchInputSumbmit} /> 
        <Suspense fallback={'Loading...'}>
          {appSearchRepositoryRef &&
            <SearchResult 
              queryRef={appSearchRepositoryRef} 
              addStar={onAddStarClick}
              removeStar={onRemoveStarClick}
              moreData={onMoreDataClick}
              isAddMutationInFlight={isAddMutationInFlight}
              isRemoveMutationInFlight={isRemoveMutationInFlight}
              />
            }
        </Suspense>
      </header>
    </div>
  );
}

function AppRoot() {
  return (
    <RelayEnvironmentProvider environment={RelayEnvironment}>
      <App preloadedQuery={preloadedQuery} />
    </RelayEnvironmentProvider>
  );
}

export default AppRoot;
