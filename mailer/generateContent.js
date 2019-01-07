const momentTimeZone = require("moment-timezone");

module.exports = (data) => {
    return new Promise((resolve, reject) => {
        try {
            // timestamp
            const timestamp = `${momentTimeZone
                .tz('America/Denver')
                .format('MMMM Do, h:mm:ss a')} MT.`;
            
            // subject
            const subject = `New upload to S3 bucket: ${data.bucketName}`;
            
            // text body
            const textBody = `
            Automated notification:
            
            Someone has uploaded ${data.file} (${data.fileSize} bytes) to your AWS S3 bucket "${data.bucketName}" on ${timestamp}.
            
            Congrats!
            
            Sincerely,
            
            Your Serverless S3 event notifier.
            `;
            
            // html body
            const htmlBody = `
                <div style="max-width: 600px; margin: 20px auto">
                  <h1>Great news!</h1>
                  <p style="line-height: 22px; font-size: 16px;">Someone uploaded <b>${data.file}</b> (${data.fileSize} bytes) to your AWS S3 bucket "${data.bucketName}" on ${timestamp}.</p>
                  <p style="line-height: 22px; font-size: 16px;">Congrats!</p>
                  <p style="line-height: 22px; font-size: 16px;">Sincerely,</p>
                  <p style="line-height: 22px; font-size: 16px;"><i>Your Serverless Function</i></p>
                </div>
              `;
            
            console.log("Generated content.");
            resolve({
                subject,
                textBody,
                htmlBody
            });
            
        } catch (error) {
            console.error("Error generating email content.", error);
            
            reject(new Error(JSON.stringify(error)));
        }
    });
};