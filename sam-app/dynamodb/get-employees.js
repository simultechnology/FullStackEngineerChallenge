const AWS = require("aws-sdk")

AWS.config.update({
  region: "us-west-2",
  endpoint: "http://localhost:8000"
})

const docClient = new AWS.DynamoDB.DocumentClient();

const params = {
  TableName: 'Employees'
}
docClient.scan(params, function(err, data) {
  if (err) {
    console.log(err)
  } else {
    console.log(data)
  }
});
