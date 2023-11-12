const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const fs = require('fs');
const { Readable } =  require('stream')

const url = "mongodb+srv://lliangthomas:1JXpWCXDBSoZOp0S@madhackscluster.9ecahxo.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(url);
const dbName = "MadHacksDB";

export async function POST(req) {
    try {
        await client.connect();
        const db = client.db(dbName);
        const bucket = new mongodb.GridFSBucket(db);
        const id = new mongodb.ObjectId();
        const body = await req;
        console.log(body);
        const timeN = new Date();
        //stream.pipe();
        // bucket.openUploadStreamWithId(id, {
        //     metadata: {  }
        // })
        const save = fs.createWriteStream("test.mp4");
        
        // const collection = db.collection("Users");

        // let userDoc = {
        //     "email": "",
        //     "fid": id,
        //     "filename": 
        // }
        // const res = await collection.insertOne(userDoc);
    } catch (err) {
        console.log(err.stack);
    }
    return Response.json({ "Hi":"I am message" })
}