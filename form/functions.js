import { PDFDocument, rgb } from 'pdf-lib';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// ...existing code...

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function createCertificate(data) {
  try {
    const templatePath = path.resolve(__dirname, './functions/template.pdf');
    console.log('Şablon şu konumdan yükleniyor:', templatePath);

    if (!fs.existsSync(templatePath)) {
      throw new Error(`Şablon dosyası şu konumda bulunamadı: ${templatePath}`);
    }

    const templateBytes = fs.readFileSync(templatePath);
    if (!templateBytes || templateBytes.length === 0) {
      throw new Error('Şablon dosyası okunamadı veya dosya boş');
    }

    // PDF belgesini yükleyin
    const pdfDoc = await PDFDocument.load(templateBytes);

    // İlk sayfayı alın
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];

    // Verileri ekleyin
    firstPage.drawText(data.name, {
      x: 100,
      y: 100,
      size: 12,
      color: rgb(0, 0, 0),
    });

    // Yeni PDF'yi kaydedin
    const pdfBytes = await pdfDoc.save();
    const outputPath = path.resolve(__dirname, './path/to/output/certificate.pdf');
    fs.writeFileSync(outputPath, pdfBytes);

    console.log('PDF başarıyla oluşturuldu:', outputPath);
  } catch (error) {
    console.error('PDF oluşturma hatası:', error);
  }
}

// ...existing code...

// Örnek veri
const data = { name: 'John Doe' };

// createCertificate fonksiyonunu çağırın
createCertificate(data);

// ...existing code...