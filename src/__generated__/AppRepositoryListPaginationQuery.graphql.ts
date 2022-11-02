/**
 * @generated SignedSource<<ba8a5de7997993195ad9804d2eaec330>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AppRepositoryListPaginationQuery$variables = {
  after?: string | null;
  first?: number | null;
  keyword: string;
};
export type AppRepositoryListPaginationQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"AppRepositoryListComponent_repository">;
};
export type AppRepositoryListPaginationQuery = {
  response: AppRepositoryListPaginationQuery$data;
  variables: AppRepositoryListPaginationQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "after"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "first"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "keyword"
},
v3 = {
  "kind": "Variable",
  "name": "after",
  "variableName": "after"
},
v4 = {
  "kind": "Variable",
  "name": "first",
  "variableName": "first"
},
v5 = [
  (v3/*: any*/),
  (v4/*: any*/),
  {
    "kind": "Variable",
    "name": "query",
    "variableName": "keyword"
  },
  {
    "kind": "Literal",
    "name": "type",
    "value": "REPOSITORY"
  }
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "AppRepositoryListPaginationQuery",
    "selections": [
      {
        "args": [
          (v3/*: any*/),
          (v4/*: any*/),
          {
            "kind": "Variable",
            "name": "keyword",
            "variableName": "keyword"
          }
        ],
        "kind": "FragmentSpread",
        "name": "AppRepositoryListComponent_repository"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v2/*: any*/),
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "AppRepositoryListPaginationQuery",
    "selections": [
      {
        "alias": null,
        "args": (v5/*: any*/),
        "concreteType": "SearchResultItemConnection",
        "kind": "LinkedField",
        "name": "search",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "SearchResultItemEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "cursor",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": null,
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "__typename",
                    "storageKey": null
                  },
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "name",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "description",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "stargazerCount",
                        "storageKey": null
                      }
                    ],
                    "type": "Repository",
                    "abstractKey": null
                  },
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "id",
                        "storageKey": null
                      }
                    ],
                    "type": "Node",
                    "abstractKey": "__isNode"
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "PageInfo",
            "kind": "LinkedField",
            "name": "pageInfo",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "endCursor",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "hasNextPage",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v5/*: any*/),
        "filters": [
          "query",
          "type"
        ],
        "handle": "connection",
        "key": "AppRepositoryListComponent_search",
        "kind": "LinkedHandle",
        "name": "search"
      }
    ]
  },
  "params": {
    "cacheID": "11a1b37fa397ed9c77f73dc90204f582",
    "id": null,
    "metadata": {},
    "name": "AppRepositoryListPaginationQuery",
    "operationKind": "query",
    "text": "query AppRepositoryListPaginationQuery(\n  $keyword: String!\n  $first: Int\n  $after: String\n) {\n  ...AppRepositoryListComponent_repository_3aPcrv\n}\n\nfragment AppRepositoryListComponent_repository_3aPcrv on Query {\n  search(query: $keyword, type: REPOSITORY, first: $first, after: $after) {\n    edges {\n      cursor\n      node {\n        __typename\n        ... on Repository {\n          name\n          description\n          stargazerCount\n        }\n        ... on Node {\n          __isNode: __typename\n          id\n        }\n      }\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "259bca498da723813dd8d335ffb9467c";

export default node;
