# [#STEP1]
``````
학습 키워드 : over-fetching, under-fetching, query
``````

## GraphQL 이걸 왜 배우는가?

- 예를들면 우리는 /users 유저들의 이름을 알고 싶음.
- 그래서 restful로 /users 정보를 요청하면
    * 프로필 주소
    * 집주소
    * 전화번호 등등의 값들을 던져 줌.
    * 우리는 단지 이름만 알고 싶었던건데!!!
        * Users 정보를 갖고온 다음에 console.log들어가서 필요한 컬럼값 확인해서 필요한 값만 사용. 자원낭비됨.
    * 그런걸 over-fetching이라고해.
        * 내가 요청한 정보보다, 많은 정보를 서버에서 받는 거.
        * 어떤 정보를 원하는지에 대해 통제가 가능하도록 할 수 있어 
        * Frontend 가 database에 오직 사용자명만 요청할 수 있음.
    * 요걸 graphQL에서 해결 할 수 있어.
* 반대로 under-fetching이란게 있어 그게 뭐냐?
    * 인스타그램 접속했을때
        * /feed
        * /notifications.
        * /users/1
        * 뭐 이런 정보가 모두 왔을 때 동작해야 되는 것 고걸 under-fetching이라고해
        * REST에서 하나를 완성하려고 많은 소스를 요청해.
* 하지만 그래프QL은 하나의 query에 원하는 정보만 받을 수 있음
    * GraphQL에서 URL은 존재하지 않음.
    * URL체계도 없고, 저런 URL도 당연히 없음
    * 하나의 종점만 있음 이걸 api로 하던 graphql로 하던 아무거나 가능해.
* E.g
예를들어 인스타그램 피드 정보 가져올때 피드만 갖고 오는게 아니라,
피드의 댓글, 좋아요 수도 갖고 와야 하며,
알림을 읽었는지,
유저의 이름과 프로필 이미지를 갖고와야 하는데 
이걸 하나씩 요청하는게 아니라 하나의 쿼리로 요청한다.

## graphQL 쿼리
```
Query {
    Feed {
        Comments
        likeNumber
    }
    Notifications {
        isRead
    }
    User {
        username
        profilePic
    }
}

## javascript
{
    feed: [
        {
            comments: 1, 
            likeNumber: 20
        }
    ],
    notifications: [
        {
            isRead: true
        },
        {
            isRead: false
        }
    ],
    user: [
        UserName: ‘baezzy’,
        profilePic: ‘http://avatar/asda/sdfasf.png'
    ]
}

```

# [#STEP2] GraphQL server 만든다. 
- (nodemon, graphQL-yoga -> create-react-app 이랑 비슷한거.)

``````
$ yarn global add nodemon
``````
- nodemon설치해 줌.
- 파일을 수정할 떄마다 서버를 재시작 해주려고 이거 설치

### 1. package.json
``````
“scripts”: “nodemon”

* nodemon이 index.js 파일을 주시하고 있다가 업데이트 하면 변경사항 적용해 줄 것.
``````

### 2. 해당코드에서 서버 설정 하려는데 ‘import'구문이 나와서 바벨 설치함.
``````
https://github.com/dotansimha/graphql-yoga <- 여기 들어가서 서버 세팅
$ yarn add babel-node —dev
$ yarn global add babel-cli
$ yarn global add babel-cli —ignore-engines
``````

### 3. scripts내용 수정해줘
``````
"scripts": {
   "start": "nodemon --exec babel-node index.js” // babel 추가와 watching해야 하는 파일 설정해줌.
},
``````

### 4. 재실행 해
``````
$yarn start
``````
콘솔에 메시지 출력될텐데 마지막에
``````
...
[nodemon] app crashed - waiting for file changes before starting…
… 이러면 문제 없이 잘 되는거.
``````

### 5. .babelrc 설정 env stage-3으로 해줘 deprecated 됨. “presets” : [ “babel-preset-env”] 로 변경해줌.
``````
{
   "presets": ["env","stage-3"]
}
``````

### 6. 필요 pacakage 설치
``````
$ yarn add babel-cli babel-preset-env babel-preset-stage-3 —dev 
Babel-preset-stage-3 deprecated 되었다고 함.
npm i nodemon -D
npm i @babel/cli -D
npm i @babel/core -D
npm i @babel/node -D
npm i @babel/preset-env -D
``````

바벨 설치가 귀찮다면 이렇게 해도 됨.
터미널에
```
yarn add typescript
yarn add ts-node
touch index.ts
```
package.json에서
"main":"index.ts"
해주시고 사용하시면 됩니당.


### 7. /index.js 
``````
import { GraphQLServer } from "graphql-yoga";

const server = new GraphQLServer({
})

server.start( () => console.log("Graphal server running"));
``````

### 8. yarn start

### 9. terminal에 에러 뜰 것.
``````
[nodemon] clean exit - waiting for changes before restart
[nodemon] restarting due to changes...
[nodemon] starting `babel-node index.js`
/Users/baejina/Projects/@normad/movieql/node_modules/graphql-yoga/dist/index.js:329
            throw new Error('No schema defined');
            ^
``````
Schema가 정의되어 있지 않다고 함.

### 10. 아래 파일 생성 graphql 

schema.graphql
```
type Query {
  name: String!
}
```    

graphql/resolvers.js
```
const resolvers = {
	Query: {
		name: () => 'baezzy'
	}
}

export default resolvers;
```
    
### 11 /index.js 추가

```
import { GraphQLServer } from "graphql-yoga";
import resolvers from "./graphql/resolvers";

const server = new GraphQLServer({
	typeDefs: "graphql/schema.graphql",
	resolvers
})

server.start( () => console.log("Graphal server running")); 
``````

### 12 graphql 문서 확인해 보면 알겠지만
localhost:4000 들어가면 그래프QL나오고 거기서 쿼리 날리면 끝.

### 13. Write your query or mutation here

```
query {
  name
}
```

-> 옆에 결과 나옴 끝. 
```
{
  "data": {
    "name": "baezzy"
  }
}
```


