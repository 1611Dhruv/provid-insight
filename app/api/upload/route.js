import { NextResponse } from "next/server";
import { Readable } from "stream";
import fs from "fs";
import util from "node:util"
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
    const file = data.get("file");
    const { email } = JSON.parse(data.get("user"));
    if (!file) {
      return Response.json({ success: true });
    }
    const id = new mongodb.ObjectId();
    const outfile = "data/" + id + ".mp4";
    const mp3 = "data/" + id + ".mp3";

    const bytes = await file.arrayBuffer();
    fs.appendFileSync(outfile, Buffer.from(bytes));
    const buffer = Buffer.from(bytes);
    const stream = Readable.from(buffer);

    const execPromise = util.promisify(exec)

    await execPromise("ffmpeg -i " + outfile + " " + mp3);

    await execPromise("python llm/annotator.py " + outfile + " " + mp3, async(err, stdout, stderr) => {
      try {
        console.log(stdout, stderr, err);
        const json_py = JSON.parse(stdout);
        await client.connect();
        const db = client.db(dbName);
        const bucket = new mongodb.GridFSBucket(db);
        
        stream.pipe(bucket.openUploadStreamWithId(id, file.name, {
            metadata: { user: email }
        }));
    
        const collection = db.collection(colName);
        collection.insertOne({
          user: email,
          fid: id,
          ftime: new Date().toISOString(),
          fname: file.name,
          data: json_py
        })
      } catch (err) {
        console.log(err.stack);
      }
      return Response.json({ success: true });

    }).then((res)=>{
      console.log(res)
    })
    console.log("X")



  } catch (err) {
    console.log(err.stack);
  } 
  return Response.json({ success: true });
}
