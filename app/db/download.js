const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const fs = require("fs");

const url =
  "mongodb+srv://lliangthomas:1JXpWCXDBSoZOp0S@madhackscluster.9ecahxo.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(url);
const dbName = "Database";

export async function download(username, filename) {
<<<<<<< HEAD
    try {
        await client.connect();
        const db = client.db(dbName);
        const bucket = new mongodb.GridFSBucket(db);

        bucket.openDownloadStreamByName('sdaf_11/11/2023, 2:45:48 PM').
        pipe(fs.createWriteStream('./outputFile.mov'));   
    } catch (err) {
        console.log(err.stack);
    }

=======
  try {
    await client.connect();
    const db = client.db(dbName);
    const bucket = new mongodb.GridFSBucket(db);

    bucket
      .openDownloadStreamByName("sdaf_11/11/2023, 2:45:48 PM")
      .pipe(fs.createWriteStream("./outputFile.mov"));
  } catch (err) {
    console.log(err.stack);
  }
>>>>>>> b357a214231b08e0b6a4a92bef2841613d16527e
}
