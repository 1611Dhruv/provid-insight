import { NextResponse } from "next/server";
import mongoose from "mongoose";
import User from "@/model/User";

export async function POST(req) {
  const data = await req.formData();
  console.log(data);
  const file = data.get("file");
  const { name, email } = JSON.parse(data.get("user"));
  if (!file) {
    return Response.json({ success: true });
  }
  console.log(file.name);

  let client = null;
  try {
    client = await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to db");
  } catch (err) {
    console.log(err);
    return new NextResponse("Internal Server Error");
  }

  try {
    console.log(User);
    await User.create({
      name: name,
      email: email,
    });
    console.log("Message sent");
    return new NextResponse("Success");
  } catch (err) {
    console.log(err);
    return new NextResponse("Internal Server Error");
  }
}
