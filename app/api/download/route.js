import { NextResponse } from "next/server";
import { getSession } from '@auth0/nextjs-auth0';
import { Readable } from "stream";
const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

const url = "mongodb+srv://lliangthomas:1JXpWCXDBSoZOp0S@madhackscluster.9ecahxo.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(url);
const dbName = "MadHacksDB";
const colName = "Users";

export async function GET(req) {
  try {
    const { user } = await getSession();
    if (!user) {
      return Response.json({ success: false });
    }

    await client.connect();
    const db = client.db(dbName);

    const cursor = db.collection(colName).find({
      user: user.email
    });
    
    const arr = await cursor.toArray()
    console.log(arr)
    
    return Response.json({ data:arr })
  } catch (err) {
    console.log(err.stack);
  }
}
