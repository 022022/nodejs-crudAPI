# Simple CRUD API #

Task: https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/crud-api/assignment.md

Done: 03.07.2023 / deadline 04.07.2023


## How To Start ##

0) Initially clone, switch to dev branch, install dependencies
```
https://github.com/022022/nodejs-crudAPI.git
git checkout dev
npm i
```

1) Add .env

Put your .env file with port number in the root directory according to the example in provided env-example file. 

2) Run 
```
npm run start:dev 
```

3) Run Tests
```
npm run test
```


## Score ##
162 / 222

### Basic Scope

- **+10** The repository with the application contains a `Readme.md` file containing detailed instructions for installing, running and using the application
- **+10** **GET** `api/users` implemented properly
- **+10** **GET** `api/users/{userId}` implemented properly
- **+10** **POST** `api/users` implemented properly
- **+10** **PUT** `api/users/{userId}` implemented properly. **PATCH** also works (but not included into scoring).
- **+10** **DELETE** `api/users/{userId}` implemented properly
- **+6** Users are stored in the form described in the technical requirements
- **+6** Value of `port` on which application is running is stored in `.env` file

### Advanced Scope
- **+30** Task implemented on Typescript 
- **+10** Processing of requests to non-existing endpoints implemented properly
- **+10** Errors on the server side that occur during the processing of a request should be handled and processed properly
- **+10** Development mode: `npm` script `start:dev` implemented properly

### Hacker Scope
- **+30** There are tests for API (not less than **3** scenarios)

### Forfeits
none

Complete scoring guide is here - https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/crud-api/score.md
