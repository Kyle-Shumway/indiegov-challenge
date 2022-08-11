const { MongoClient } = require('mongodb');

export default function(app){
    app.get('/constituent-data', async function(req,res) {
        const url = 'mongodb://localhost:27017';
        const mongoClient = new MongoClient(url);
        await client.connect();
        const db = mongoClient.db('igdb');
        const collection = db.collection('constituent_data');
       
        return res.send(collection.find({}).toArray());
    });
  }
  