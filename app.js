// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');

// Load your AWS credentials and try to instantiate the object.
AWS.config.loadFromPath(__dirname + '/config.json');

// Set the region 
AWS.config.update({region: 'set your region here'});
const docClient = new AWS.DynamoDB.DocumentClient({region:'set your region here'});

// Create an SQS service object
var sqs = new AWS.SQS({apiVersion: '2012-11-05'});

var queueURL = "Your URL";

function readData(){  

    var params = {
     AttributeNames: [
        "SentTimestamp"
     ],
     MaxNumberOfMessages:1,
     MessageAttributeNames: [
        "All"
     ],
     QueueUrl: queueURL,
     VisibilityTimeout: 0,
     WaitTimeSeconds: 0
    };
    
    //Receive Message

    sqs.receiveMessage(params, function(err, data) {
      if (err) {
        console.log("Receive Error", err);
      } else if (data.Messages) {
        
          var deleteParams = {
            QueueUrl: queueURL,
            ReceiptHandle: data.Messages[0].ReceiptHandle
          };
        
         
        
          //add to DynamoDB 
         	var param={
        		Item:{
              //example : put items to DB
        			MacAdress:data.Messages[0].MessageAttributesmacadress,
        			Data:data.Messages[0].Body
            },
            
        		TableName:'Your Table name in DB'
      
        	};
    	
        	docClient.put(param,function(err,data){
            	if(err){
                //callback(err,null);
               }
            	else{
                //callback(null,data);
              	}
        	});
       
         //Delete Message
         
         
          sqs.deleteMessage(deleteParams, function(err, data) {
            if (err) {
              console.log("Delete Error", err);
            } else {
              console.log("Message Deleted", data);
            }
          });        
      
    }     
  });    

  setTimeout(function() {
    readData();
},1000) 
}


//call the function
readData();