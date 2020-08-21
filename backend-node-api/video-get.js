'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient({ region: 'ap-southeast-2' });

module.exports.handler = async (event) => {
  // Extract id from API path: /video/{id}
  const videoId = event.pathParameters.id;

  // Get record from database
  const dynamoDbResponse = await dynamoDb.get({
    TableName: process.env.VIDEO_TABLE_NAME, // Defined in serverless.yml
    Key: { id: videoId },
  }).promise();
  const videoRecord = dynamoDbResponse.Item;

  if (!videoRecord) throw new Error(`No video with id: ${videoId}`);

  // Send (return) the record back to the frontend web app
  return {
    statusCode: 200, // HTTP status code https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
    body: JSON.stringify(videoRecord),
  };
};
