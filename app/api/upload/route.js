import { NextResponse } from "next/server";
import { Readable } from "stream";
const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

const url = "mongodb+srv://lliangthomas:1JXpWCXDBSoZOp0S@madhackscluster.9ecahxo.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(url);
const dbName = "MadHacksDB";

export async function POST(req) {
  try {
    const data = await req.formData();
    console.log(data);
    const file = data.get("file");
    const { email } = JSON.parse(data.get("user"));
    if (!file) {
      return Response.json({ success: true });
    }
  
    await client.connect();
    const db = client.db(dbName);
    const bucket = new mongodb.GridFSBucket(db);
    const id = new mongodb.ObjectId();

    
  
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const stream = Readable.from(buffer);
    stream.pipe(bucket.openUploadStreamWithId(id, {
        metadata: { field: 'myField', value: 'myValue' }
    }));
  } catch (err) {
    console.log(err.stack);
  } finally {
    return Response.json({ success: true });
  }
}
