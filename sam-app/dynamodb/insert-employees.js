const AWS = require("aws-sdk")

AWS.config.update({
  region: "us-west-2",
  endpoint: "http://localhost:8000"
})

const docClient = new AWS.DynamoDB.DocumentClient();

const params = {
  TableName: 'Employees',
  Item: {
    "id": "5",
    "name": "石井 太郎",
    "reviews": [
      {
        "employee_id": 4,
        "feedback": "頑張っています。"
      }
    ]
  }
}
docClient.put(params, function(err, data) {
  if (err) {
    console.log(err)
  } else {
    console.log(data)
  }
});
