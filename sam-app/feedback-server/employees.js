// const axios = require('axios')
// const url = 'http://checkip.amazonaws.com/';
const querystring = require('querystring')

const AWS = require("aws-sdk")

// in case of prodcution release, comment out the following endpoint
AWS.config.update({
  endpoint: "http://192.168.0.27:8000"
})

const docClient = new AWS.DynamoDB.DocumentClient()

const response = {
  headers: {
    'Access-Control-Allow-Origin' : '*',
    'Access-Control-Allow-Methods' : 'GET, POST, OPTIONS, PUT, DELETE'
  }
}

const params = {
  TableName: 'Employees'
}

let body

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 *
 */
exports.lambdaHandler = async (event, context) => {
  try {
    switch (event.httpMethod) {
      case 'GET':
        // 'employee' is fetch by id
        if (event.path === '/employee' && event.queryStringParameters) {
          params.Key = {
            id: event.queryStringParameters.id
          }
          const employee = await docClient.get(params).promise()
          response.statusCode = 200
          response.body = JSON.stringify(employee.Item)
          return response
        } else {
          const employees = await docClient.scan(params).promise()
          response.statusCode = 200
          response.body = JSON.stringify(employees.Items)
          return response
        }
        break;
      case 'POST':
        const employees = await docClient.scan(params).promise()
        const ids = employees.Items.map(employee => Number(employee.id))
        const id = ids.length === 0 ? 1 : Math.max(...ids) + 1
        body = querystring.parse(event.body)
        params.Item = {
          id: String(id),
          name: body.name
        }
        await docClient.put(params).promise()
        response.statusCode = 200
        return response
        break;
      case 'PUT':
        body = querystring.parse(event.body)

        const reviews = body.reviews ? JSON.parse(body.reviews) : []

        params.Key = {
          id: body.id
        }
        params.UpdateExpression = 'set #n = :newName, #r = :newReviews'
        params.ExpressionAttributeNames = {'#n': 'name', '#r': 'reviews'}
        params.ExpressionAttributeValues =  {':newName': body.name, ':newReviews': reviews}
        await docClient.update(params).promise()
        response.statusCode = 200
        return response
        break;
      case 'DELETE':
        params.Key = {
          id: event.queryStringParameters.id
        }
        await docClient.delete(params).promise()
        response.statusCode = 200
        return response
        break;

      case 'OPTIONS':
        response.statusCode = 200
        response.body = ''
        return response
        break;
      default:
    }
    // const ret = await axios(url);
  } catch (err) {
    console.log(err)
  }
}
