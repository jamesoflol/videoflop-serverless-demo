# VideoFlop Serverless Demo
This code base is a simple demo to show off a serverless architecture, using the Serverless.com framework.

It contains:

1. Backend: A node.js API built using Serverless framework, which you deploy to AWS Lambda and stores its data in DynamoDB
2. Frontend: A Vue.js web app, which gets videos from the backend. You run this from your own computer, for now

What does Serverless framework do for you? Via the `serverless.yml` file, you tell it what resources you want (e.g., DynamoDB tables) and provide it with some application code, and it will create those resources, put the code in Lambda functions, and put API Gateway resources in front of the Lambda functions.

This app currently only does a single thing: allow the web app visitor to enter a single video id (e.g.: "1"), and be told the title and description of that video.

The intention is that an eager student can take this demo and expand upon it - add new functionality such as:
- Listing all videos
- Adding new videos
- Create another S3 bucket where actual video files are stored. Include the URL of these videos in the DynamoDB video records, e.g., { "id": 1, "title": Dogs with silly hats", "s3Key": "dogs.mp4" }. Display the video in the web app
- Host the frontend app in an s3 bucket, instead of running it locally


## Dev environment setup
Your own computer will need a couple of things installed:

- git command line util. (Either the github.com desktop app, or just the plain "git" command-line util)
- AWS CLI (with a configured admin user, run `aws configure`)
- Node.js 12.x w/ NPM https://nodejs.org/en/download/


## Backend setup / deploy
In a terminal: Enter these commands to get the Videoflop code and set up your serverless backend stack:

	# download the videoflop code / serverless configuration
	git clone https://github.com/jamesoflol/videoflop-serverless-demo

	cd videoflop-serverless-demo/backend-node-api

	# initialise the code/dependencies that you just downloaded
	npm install

	# install the serverless framework so that you can run `serverless deploy`
	npm install -g serverless

	# deploy the backend to AWS!
	serverless deploy

You will now have a DynamoDB table, a Lambda function, and an API Gateway resource which points to the Lambda function.

Your DynamoDB table is currently empty. Run the following command to put a couple of dummy records in it: (make sure you're still in the `backend-node-api` folder)

	aws dynamodb batch-write-item --request-items file://dynamodb-dummy-records.json

Now, log into the AWS Console, go to DynamoDB, and inspect your two records.
Also open up other services to explore and see what was created: AWS Lambda, API Gateway, Cloudwatch Logs, CloudFormation.


## Frontend
Your frontend is a simple Vue.js (like React.js) web app, which connects to the backend API Gateway, asking for one video record.

### Frontend setup
First up, your frontend needs to know the address of the backend! Edit the file `frontend-vuejs/.env` and update the value for `VUE_APP_API_GATEWAY_URL`. You will have been assigned a new gateway URL when you deployed your serverless backend with `serverless deploy` - check your terminal for a string that looks like `https://1234asdf.execute-api.ap-southeast-2.amazonaws.com`. (Don't include `/video/{id}` on the end.)

Then install nodejs dependencies like we did for the backend. In a terminal: From the root of folder `videoflop-serverless-demo`:

	cd frontend-vuejs
	npm install

### Frontend run

	npm run serve

This will run a local copy of the web app - no need to "host" it in the cloud yet. (Local frontend connecting to online backend.)
To view your web app, go to http://localhost:8080
