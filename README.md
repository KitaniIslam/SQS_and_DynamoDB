# SQS-and-DynamoDB
Reading Messages from SQS and put them in DynamoDB before delete the message from the queue .


#Things to know

. This app ready to Implement
. You neet to creat an EC2 Instance for exemple
. Clone this project (git clone "The URL")
. Config : 
    + config-sample.json  (nano config-sample.json)
    + Add your Queue URL in " app.js "
    + Add your Region too in " app.js "
. Use Forever-Service to make sure your app running even after Rebooting the instance .