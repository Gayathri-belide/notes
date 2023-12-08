const mongoose = require('mongoose');
const pdfSchema = new mongoose.Schema({
  name: String,
  data: Buffer,
  contentType: String,
});

const PdfModel = mongoose.model('Pdf', pdfSchema);

module.exports = PdfModel;
