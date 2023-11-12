const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const fs = require("fs");

const url =
  "mongodb+srv://lliangthomas:1JXpWCXDBSoZOp0S@madhackscluster.9ecahxo.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(url);
const dbName = "Database";

<<<<<<< HEAD
export async function download(username, filename) {
    try {
        await client.connect();
        const db = client.db(dbName);
        const bucket = new mongodb.GridFSBucket(db);

        bucket.openDownloadStreamByName('sdaf_11/11/2023, 2:45:48 PM').
        pipe(fs.createWriteStream('./outputFile.mov'));   
    } catch (err) {
        console.log(err.stack);
    }

}
=======
async function download(username, filename) {
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
}

export default download;
>>>>>>> 13dd719d624fe9060acf2a3feeef57938afd129d
