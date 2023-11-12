export async function POST(req) {
  const data = await req.formData();
  const file = data.get("file");
  if (!file) {
    return Response.json({ success: true });
  }
  console.log(file.name);
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  //   console.log(buffer.toString());

  return Response.json({ success: true });
}
