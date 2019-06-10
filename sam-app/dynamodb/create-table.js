const AWS = require("aws-sdk")

AWS.config.update({
  region: "us-west-2",
  endpoint: "http://localhost:8000"
})

const dynamodb = new AWS.DynamoDB();

const params = {
  TableName: 'Employees',
  KeySchema: [
    {
      AttributeName: 'id',
      KeyType: 'HASH',
    }
  ],
  AttributeDefinitions: [
    {
      AttributeName: 'id',
      AttributeType: 'S',
    }
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 1,
    WriteCapacityUnits: 1,
  }
}
dynamodb.createTable(params, function(err, data) {
  if (err) {
    console.log(err)
  } else {
    console.log(data)
  }
});