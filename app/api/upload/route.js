import { NextResponse } from "next/server";
import mongodb from "mongodb";
import { Readable } from "stream";
import User from "@/model/User";

export async function POST(req) {
  const data = await req.formData();
  console.log(data);
  const file = data.get("file");
  const { name, email } = JSON.parse(data.get("user"));
  if (!file) {
    return Response.json({ success: true });
  }

  const bucket = new mongodb.GridFSBucket();
  const id = new mongodb.ObjectId();

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const stream = Readable.from(buffer);
  stream.pipe(
    bucket.openUploadStreamWithId(id, {
      metadata: { field: "myField", value: "myValue" },
    })
  );
}
