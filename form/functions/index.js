const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { PDFDocument, rgb } = require('pdf-lib');
const fs = require('fs');
const path = require('path');
const cors = require('cors')({ origin: true });

admin.initializeApp();

exports.createPdf = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {
    const { firstName, lastName } = req.body;

    try {
      // Mevcut PDF dosyasını yükleyin
      const pdfPath = path.join(__dirname, 'template.pdf');
      console.log('PDF Path:', pdfPath); // Dosya yolunu kontrol edin
      if (!fs.existsSync(pdfPath)) {
        throw new Error('PDF template file not found');
      }
      const existingPdfBytes = fs.readFileSync(pdfPath);
      console.log('PDF template loaded successfully');

      // PDF'i yükleyin ve düzenleyin
      const pdfDoc = await PDFDocument.load(existingPdfBytes);
      const pages = pdfDoc.getPages();
      const firstPage = pages[0];
      console.log('PDF loaded and first page accessed');

      // Ad ve soyad kısmını ekleyin (koordinatları ayarlayın)
      firstPage.drawText(`${firstName} ${lastName}`, {
        x: 100, // X koordinatı
        y: 100, // Y koordinatı
        size: 24,
        color: rgb(0, 0, 0),
      });
      console.log('Text added to PDF');

      // Düzenlenmiş PDF'i alın
      const pdfBytes = await pdfDoc.save();
      const pdfBase64 = Buffer.from(pdfBytes).toString('base64');
      console.log('PDF saved and converted to base64');

      res.status(200).send({ pdfBytes: pdfBase64 });
    } catch (error) {
      console.error('Error generating PDF:', error);
      res.status(500).send({ error: error.message, stack: error.stack });
    }
  });
});
