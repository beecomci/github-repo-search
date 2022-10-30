import React from 'react';
import { graphql } from 'babel-plugin-relay/macro';
import { usePaginationFragment } from 'react-relay';
import {
  RelayEnvironmentProvider,
  loadQuery,
  useQueryLoader,
  PreloadedQuery,
} from 'react-relay/hooks';
import RelayEnvironment from './RelayEnvironment';
import './App.css';
import SearchResult from './components/SearchResult';
import {
  AppSearchRepositoryQuery as AppSearchRepositoryQueryType,
} from './__generated__/AppSearchRepositoryQuery.graphql';
import SearchSection from './components/SearchSection';

const { Suspense } = React;

// TODO 따로 graphql 파일에 query 정의 후에 relay로 graphql.ts 파일 생성은 어떻게 하지?
export const SearchRepositoryQuery = graphql`
  query AppSearchRepositoryQuery($keyword: String!, $after: String,) {
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

const preloadedQuery = loadQuery(RelayEnvironment, SearchRepositoryQuery, {
  /* query variables */
});

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

  function searchRepository(keyword: string): void {
    loadAppSearchRepositoryQuery({keyword});
  }

  function handleSubmit(keyword: string): void {
    searchRepository(keyword);
  }

  function handleClick(): void {

  }

  return (
    <div className="App">
      <header className="App-header">
        <SearchSection onSubmit={handleSubmit} /> 
        {appSearchRepositoryRef != null 
          ? <SearchResult queryRef={appSearchRepositoryRef} /> 
          : null}
        <button type="button" onClick={handleClick}>더보기</button>
      </header>
    </div>
  );
}

function AppRoot() {
  return (
    <RelayEnvironmentProvider environment={RelayEnvironment}>
      <Suspense fallback={'Loading...'}>
        <App preloadedQuery={preloadedQuery} />
      </Suspense>
    </RelayEnvironmentProvider>
  );
}

export default AppRoot;
