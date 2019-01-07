'use strict';
const mailer = require('./mailer');

module.exports.s3_notifications = (event, context, callback) => {
  // extract S3 data from the event object
  const uploadData = event.Records.map(record => {
    return {
      bucketName: record.s3.bucket.name,
      file: record.s3.object.key,
      fileSize: record.s3.object.size
    };
  })[0];
  
  // generate an email using the data above
  mailer.generateContent(uploadData)
    // send the email
    .then(content => mailer.sendEmail(content))
    // send a response
    .then(message => {
      
      console.log(`Successful S3 email sent.`);
      
      const response = {
        statusCode: 200,
        body: JSON.stringify({
          message: message
        }),
      };

      callback(null, response);
    })
    .catch(error => {
      const response = {
        statusCode: 500,
        body: JSON.stringify({
          error: error
        }),
      };

      console.error(`Something went wrong with the email process. :(`);

      callback(null, response);
    });
  
};
