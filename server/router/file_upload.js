const file_router = require("express").Router();
const Grid = require("gridfs-stream");
const ObjectId = require("mongodb").ObjectId;
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const crypto = require("crypto");
const mongoose = require("mongoose");
const mongoURL = process.env.MONGO_URL;

const conn = mongoose.createConnection(mongoURL);

let gfs,gridfsBucket

conn.once("open", () => {
  // Stream
  gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db,{
    bucketName: 'uploads'
  })
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("uploads");
  return gfs;
});

// Storage Engine
const storage = new GridFsStorage({
  url: mongoURL,
  file: (req, file) => {
    console.log(req.params.groupid);
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = file.originalname + "_" + req.params.groupid;
        const fileInfo = {
          filename: filename,
          bucketName: "uploads",
        };
        resolve(fileInfo);
      });
    });
  },
});
const upload = multer({ storage });

file_router.post("/upload/:groupid", upload.single("file"), (req, res) => {
  return res.send("successful");
});

file_router.get("/metadata/:id", async (req, res) => {
  let groupid = req.params.id;
  // console.log(groupid)
  let data = await gfs.files
    .find({
      filename: { $regex: `${groupid}$` },
    })
    .toArray();

  if (data.length === 0) {
    return res.status(200).send({
      msg: "No files found",
    });
  }
  data = data.map((file) => {
    if (
      file.contentType === "image/jpeg" ||
      file.contentType === "image/png" ||
      file.contentType === "image/svg+xml"
    ) {
      file.isImage = true;
      file.canpreview = true;
    } else if (file.contentType === "application/pdf") {
      file.isPdf = true;
      file.canpreview = true;
    } else {
      file.canpreview = false;
    }
    file.filename = file.filename.substring(
      0,
      file.filename.length - groupid.length - 1
    );
    return file;
  });
  res.send(data);
});

file_router.get("/filedata/:id", async (req, res) => {
  let id = req.params.id;
  try {
    let objId = new ObjectId(id);
    let data = await gfs.files.find({ _id: objId }).toArray();
    if (data.length === 0) {
      return res.send({
        msg: "No file found",
      });
    }
    const readStream = gridfsBucket.openDownloadStream(data[0]._id)
    readStream.pipe(res)
  } catch (err) {
    res.send({
      msg: "Unable to find or retrieve file",
    });
  }
});

file_router.delete("/:id",async (req,res) => {
    let id = req.params.id
    let objId = new ObjectId(id)
    try {
      await gridfsBucket.delete(objId)
      res.send({
        msg: "Deletion successful",
      })
    }
    catch(err) {
      res.status(404).send({
        msg: "Unable to delete file",
      })
    }
})

module.exports = file_router;
