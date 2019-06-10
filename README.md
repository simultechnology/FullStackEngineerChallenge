# Full Stack Developer Challenge

## Technologies used

### Server side
* Node.js(AWS Lambda)
* Amazon API Gateway
* Amazon DynamoDB
* AWS SAM
* Amazon S3

### Client side
* Vue.js, Vue Router, Vue CLI
* Bootstrap

## API

|  API            |  method  | description         | url |
| ----            | ----     | ----                | --- |
| /employee/:id   |  GET     | get employee by id  ||
| /employees      |  GET     | get all employees   | [https://zcwhcd305k.execute-api.ap-northeast-1.amazonaws.com/Prod/employees](https://zcwhcd305k.execute-api.ap-northeast-1.amazonaws.com/Prod/employees)|
| /employee       |  POST    | create new employee ||
| /employee       |  PUT     | update employee     ||
| /employee       |  DELETE  | delete employee     ||

## About Projects

### feedbacks

This is Vue.js project.

- start this project

```
cd feedbacks
npm install
npm run serve
```

### sam-app

This project's goal is to make an aws environment on local machine
 
- start this local environment

```
sam local start-api

```
 
## Demo URL

### Admin URL

[https://vue-feedbacks.s3-ap-northeast-1.amazonaws.com/index.html#/admin](https://vue-feedbacks.s3-ap-northeast-1.amazonaws.com/index.html#/admin)

### Site URL

[https://vue-feedbacks.s3-ap-northeast-1.amazonaws.com/index.html#/](https://vue-feedbacks.s3-ap-northeast-1.amazonaws.com/index.html#/)


