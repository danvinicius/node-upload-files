const express = require("express");
const app = express();
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    //we put a date.now to differentiate each file name
    cb(null, file.originalname + Date.now() + path.extname(file.originalname));
  },
});
//it's gonna be a middleware
const upload = multer({ storage });

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.render("index");
});

//file is the html form's file name
app.post("/upload", upload.single("file"), (req, res) => {
  res.render("success");
});

app.listen(8081, () => {
  console.log("running");
});
