const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const fs = require('fs');
const url = "mongodb+srv://lliangthomas:1JXpWCXDBSoZOp0S@madhackscluster.9ecahxo.mongodb.net/?retryWrites=true&w=majority";
import { Readable } from 'stream';

const client = new MongoClient(url);
const dbName = "MadHacksDB";

export async function POST(req, res) {
    try {
        await client.connect();
        const db = client.db(dbName);
        const bucket = new mongodb.GridFSBucket(db);
        const id = new mongodb.ObjectId();

        const data = await req.formData();
        const file = data.get("file");
        if (!file) {
          return Response.json({ success: true });
        }
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const stream = Readable.from(buffer);
        stream.pipe(bucket.openUploadStreamWithId(id, {
            metadata: { field: 'myField', value: 'myValue' }
        }));
            
        return Response.json({ success: true });
    } catch (err) {
        console.log(err.stack);
    }
    return Response.json({ "Hi":"I am message" })
}