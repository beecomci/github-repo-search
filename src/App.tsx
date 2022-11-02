import React, { useEffect, useState } from 'react';
import { graphql } from 'babel-plugin-relay/macro';
import {
  RelayEnvironmentProvider,
  loadQuery,
  useQueryLoader,
  PreloadedQuery,
} from 'react-relay/hooks';
import RelayEnvironment from './RelayEnvironment';
import './App.css';
import SearchResult from './components/SearchResult';
import type {
  AppRepositoryListPaginationQuery as AppRepositoryListPaginationQueryType,
} from './__generated__/AppRepositoryListPaginationQuery.graphql';
import type {
  AppSearchRepositoryQuery as AppSearchRepositoryQueryType,
} from './__generated__/AppSearchRepositoryQuery.graphql';
import SearchSection from './components/SearchSection';

const { Suspense } = React;

export const SearchRepositoryQuery = graphql`
  query AppSearchRepositoryQuery($keyword: String!, $after: String) {
    search(query: $keyword, type: REPOSITORY, first: 10, after: $after) {
      edges {
        cursor
        node {
          ... on Repository {
            name
            nameWithOwner
            description
            stargazerCount
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

// usePaginationFragment로 페이지네이션 구현을 위한 쿼리문 -> 실패
export const RepositoryListPaginationFragment = graphql`
  fragment AppRepositoryListComponent_repository on Query
    @argumentDefinitions(
      keyword: {type: "String!"}
      first: {type: "Int"}
      after: {type: "String"}
    )
    @refetchable(queryName: "RepositoryListPaginationQuery") {
      search(query: $keyword, type: REPOSITORY, first: $first, after: $after) @connection(key: "AppRepositoryListComponent_search") {
        edges {
          cursor
          node {
            ... on Repository {
              name
              description
              stargazerCount
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

export const RepositoryListPaginationQuery = graphql`
  query AppRepositoryListPaginationQuery($keyword: String!, $first: Int, $after: String) {
    ...AppRepositoryListComponent_repository @arguments(keyword: $keyword, first: $first, after: $after)
  }
`;

const preloadedQuery = loadQuery(RelayEnvironment, RepositoryListPaginationQuery, {});

type Props = {
  initialQueryRef: PreloadedQuery<AppSearchRepositoryQueryType>,
};

function App(props: any) {
  const [
    appSearchRepositoryRef,
    loadAppSearchRepositoryQuery,
  ] = useQueryLoader<AppSearchRepositoryQueryType>(
    SearchRepositoryQuery,
    props.initialQueryRef,
  );

  function handleSubmit(keyword: string): void {
    loadAppSearchRepositoryQuery({keyword});
  }

  return (
    <div className="App">
      <header className="App-header">
        <SearchSection onSubmit={handleSubmit} /> 
        <Suspense fallback={'Loading...'}>
          {appSearchRepositoryRef != null 
            ? <SearchResult queryRef={appSearchRepositoryRef} /> 
            : null}
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
