const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const fs = require('fs');

const url = "mongodb+srv://lliangthomas:1JXpWCXDBSoZOp0S@madhackscluster.9ecahxo.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(url);
const dbName = "MadHacksDB";

export async function upload(username, filename) {
    try {
        await client.connect();
        const db = client.db(dbName);
        const bucket = new mongodb.GridFSBucket(db);
        const collection = db.collection("Users");
        const id = mongodb.ObjectId();
        let userDoc = {
            "email": "",
            "fid": id,
            "filename": 
            "data"
        }
        const progress = await collection.insertOne(userDoc);

        const timeN = new Date();

        fs.createReadStream('./upload-file.mov').
            pipe(bucket.openUploadStreamWithId(id, {
                metadata: {  }
            }));
    } catch (err) {
        console.log(err.stack);
    }
};