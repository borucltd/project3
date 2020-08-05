const AWS = require("aws-sdk");
const region = process.env.AWSREGION;
const accessKeyId = process.env.AWSAccessKeyId;
const secretAccessKey = process.env.AWSSecretKey;
const bucket =  process.env.AWSittBUCKET;

// creating S3 bucket - just for test

// const news3 = new AWS.S3({
//     accessKeyId: accessKeyId,
//     secretAccessKey: secretAccessKey
// })
// const params ={
//     Bucket: bucket,
//     CreateBucketConfiguration :{
//         LocationConstraint: region
//     }
// }
// news3.createBucket(params,function(err,data) {
//     if (err) console.log(err)
//     else console.log('Bucket created in', data.Location)
// })

// initiate credentials to AWS
AWS.config.update({
    region: region,
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey
})

module.exports = {
    
    getS3uploadurl: function(req,res) {

    // file parameters for API request
    const fileName = req.body.fileName;
    const fileType = req.body.fileType;
    console.log("File name",fileName);
    console.log("File type",fileType);
    // s3 configuration
    const s3 = new AWS.S3();
    const s3params = {
        Bucket: bucket,
        Key: `${fileName}.${fileType}`,
        Expires: 500,
        ContentType: fileType,
        ACL: 'public-read'
    }

    // we  need URL we will be able to PUT our file to
    s3.getSignedUrl('putObject', s3params, (err, data) => {
        if(err){
          console.log(err);
          res.json({success: false, error: err})
        }

        const returnData = {
            signedRequest: data,
            url: `https://${bucket}.s3.amazonaws.com/${fileName}.${fileType}`
          };
          // Send it all back
          res.json({success:true, data:{returnData}});
        })
    }
}