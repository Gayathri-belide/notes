// app.js
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const PdfModel = require('./models/pdfmodel');

const app = express();
const port = 3000;

mongoose.connect('mongodb://localhost:27017/collegedb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/upload', upload.single('pdf'), async (req, res) => {
  try {
    const { originalname, buffer } = req.file;

    const newPdf = new PdfModel({
      name: originalname,
      data: buffer,
      contentType: 'application/pdf', // Adjust as needed
    });
     const fd=await mongoose.connection.db.collection("pdfs")
     fd.find({}).toArray(async function(err,d)
     {
        if(err) console.log("error")
        else console.log(d)
     })
    await newPdf.save();

    res.status(200).send('File uploaded successfully.');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
