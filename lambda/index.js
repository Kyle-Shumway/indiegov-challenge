const csv = require('fast-csv');
const AWS = require('aws-sdk');
const { MongoClient } = require('mongodb');

const headers = ["Email","FirstName","LastName","ZipCode"]
const jobs = [];

// This is an example of a lambda function that receives an event from Aws Event Bridge and then processes it by streaming the csv file from s3 to a mongodb instance.
// this approach will fail when dealing with large csv files, as aws lambda has a timeout of 15 minutes.
// In this scenario, lambda functions can check if they are about to time out and pause the stream and call itself recursively passing the last bit read from the file to complete the job.

async function exec(event) {
    const url = 'mongodb://localhost:27017';
    const mongoClient = new MongoClient(url);
    await client.connect();
    const db = mongoClient.db('igdb');
    const collection = db.collection('constituent_data');
    const s3 = new AWS.S3();
    const s3ReadStream = s3.getObject({ Bucket: event.bucket, Key: event.key }).createReadStream();
    const csvParseStream = csv.parse({ headers: true });
    
    csvParseStream.on('data', function (data) { 
        jobs.push(collection.insertOne(data));
    })

    s3ReadStream.pipe(csvParseStream);

    const completedJobs = await Promise.allSettled(jobs);
    const successJobs = completedJobs.filter(job => job.status === 'fulfilled');
    const errorJobs = completedJobs.filter(job => job.status === 'rejected');
    
    const result = {
        success_total: successJobs.length,
        error_total: errorJobs.length,
        success_jobs: successJobs,
        error_jobs: errorJobs
    }

    return {
        statusCode: 200,
        body: result
    };
}

module.exports = exec;