import pymongo
import gridfs
vid_name = "vid.mp4"
client = pymongo.MongoClient("mongodb+srv://lliangthomas:1JXpWCXDBSoZOp0S@madhackscluster.9ecahxo.mongodb.net/?retryWrites=true&w=majority") 

db = client["Database"]
fs = gridfs.GridFSBucket(db)
file = open(vid_name, "wb+")
fs.download_to_stream_by_name("sdaf_11/11/2023, 2:45:48 PM", file)
file.seek(0)