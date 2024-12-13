import React, { useState } from 'react';
import { PDFDocument, rgb } from 'pdf-lib'; // pdf-lib kütüphanesini ekleyin

function App() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [loading, setLoading] = useState(false);
  const [pdfUrl, setPdfUrl] = useState('');

  const handleGeneratePdf = async () => {
    setLoading(true);
    console.log('PDF oluşturuluyor:', firstName, lastName);

    try {
      // template.pdf dosyasını yükleyin
      const templateBytes = await fetch('/path/to/template.pdf').then(res => res.arrayBuffer());
      const pdfDoc = await PDFDocument.load(templateBytes);

      // İlk sayfayı alın
      const pages = pdfDoc.getPages();
      const firstPage = pages[0];

      // Ad ve soyadı ekleyin
      firstPage.drawText(`${firstName} ${lastName}`, {
        x: 50,
        y: 500,
        size: 30,
        color: rgb(0, 0, 0),
      });

      // Yeni PDF'i oluşturun
      const pdfBytes = await pdfDoc.save();
      const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });
      const pdfUrl = URL.createObjectURL(pdfBlob);

      setPdfUrl(pdfUrl);
    } catch (error) {
      console.error("PDF oluşturma hatası:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>PDF Sertifikası Oluştur</h1>
      <input
        type="text"
        placeholder="Adınızı girin"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Soyadınızı girin"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <button onClick={handleGeneratePdf} disabled={loading}>
        {loading ? 'Yükleniyor...' : 'Sertifika Oluştur'}
      </button>

      {pdfUrl && (
        <a href={pdfUrl} download="sertifika.pdf">PDF İndir</a>
      )}
    </div>
  );
}

export default App;
