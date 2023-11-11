const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const fs = require('fs');

const url = "mongodb+srv://lliangthomas:1JXpWCXDBSoZOp0S@madhackscluster.9ecahxo.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(url);
const dbName = "Database";

async function upload(username, filename) {
    try {
        await client.connect();
        const db = client.db(dbName);
        const bucket = new mongodb.GridFSBucket(db);

        const timeN = new Date();

        fs.createReadStream('./upload-file.mov').
            pipe(bucket.openUploadStream(username + "_" + timeN.toLocaleString(), {
                metadata: { user: username, time: timeN, file: filename}
            }));
    } catch (err) {
        console.log(err.stack);
    }

}

upload("sdaf", "asdfasdf");