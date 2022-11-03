# Github GraphQL Relay - Repository Search 

## 실행 방법 on local

```
$ git clone https://github.com/beecomci/github-repo-search
$ cd github-repo-search
```

- [github > Settings > Developer settings](https://github.com/settings/tokens/new)에서 `repo` 권한 체크하여 토큰 발급
- 발급받은 토큰을 `./github-repo-search/.env.local` 경로로 파일 생성하여 `<TOKEN>` 대체하여 입력
```
# ./github-repo-search/.env.local
REACT_APP_GITHUB_AUTH_TOKEN=<TOKEN>

# 이후 실행 (http://localhost:3000에서 확인 가능)
$ yarn start
```
