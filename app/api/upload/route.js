import { NextResponse } from "next/server";
import { Readable } from "stream";
const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const { spawnSync, exec } = require("child_process");

const url =
  "mongodb+srv://dhruv:fv3zByaFflLrV9zP@madhackscluster.9ecahxo.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(url);
const dbName = "MadHacksDB";
const colName = "Users";

export async function POST(req) {
  try {
    const data = await req.formData();
    console.log(data);
    const file = data.get("file");
    const { email } = JSON.parse(data.get("user"));
    if (!file) {
      return Response.json({ success: true });
    }

    exec("python llm/annotator.py ", (err, stdout, stderr) => {
      console.log(stdout);
      console.log(stderr);
    })

    console.log("Python Done")
    await client.connect();
    const db = client.db(dbName);
    const bucket = new mongodb.GridFSBucket(db);
    const id = new mongodb.ObjectId();

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const stream = Readable.from(buffer);
    stream.pipe(bucket.openUploadStreamWithId(id, file.name, {
        metadata: { user: email }
    }));

    const collection = db.collection(colName);
    collection.insertOne({
      user: email,
      fid: id,
      ftime: new Date().toISOString(),
      fname: file.name,
      score: "",
      description: ""
    })
  } catch (err) {
    console.log(err.stack);
  } finally {
    return Response.json({ success: true });
  }
}
