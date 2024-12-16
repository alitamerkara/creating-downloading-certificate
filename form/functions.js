import { PDFDocument, rgb } from 'pdf-lib';

// ...existing code...

async function createCertificate(data) {
  try {
    // Yeni PDF belgesi oluşturun
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([793, 1120]);

    // Arka plan görüntüsünü yükleyin
    const imageUrl = 'https://i.ibb.co/Hqm5DTz/Gelece-e-ye-il-bir-nefes-arma-an-etti-iniz-i-in-te-ekk-r-ederiz-her-fidan-umut-dolu-yar-nlar-n-simge.png'; // Arka plan görüntüsünün URL'si
    const imageBytes = await fetch(imageUrl).then(res => res.arrayBuffer());
    const image = await pdfDoc.embedPng(imageBytes);

    // Görüntüyü sayfaya ekleyin
    page.drawImage(image, {
      x: 0,
      y: 0,
      width: page.getWidth(),
      height: page.getHeight(),
    });

    // Verileri ekleyin
    const text = `${data.firstName} ${data.lastName}`;
    const textSize = 30;
    const textWidth = page.getWidth() / 2 - (text.length * textSize) / 4;
    const textHeight = page.getHeight() / 2 + textSize / 2 + 90;

    page.drawText(text, {
      x: textWidth,
      y: textHeight,
      size: textSize,
      color: rgb(0.5, 0.5, 0.5), // RGB rengi gri
    });

    // Yeni PDF'yi kaydedin
    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);

    console.log('PDF başarıyla oluşturuldu:', url);
    return url;
  } catch (error) {
    console.error('PDF oluşturma hatası:', error);
    throw error;
  }
}

export async function handleCreateCertificateButtonClick() {
  const firstName = document.getElementById('firstNameInput').value;
  const lastName = document.getElementById('lastNameInput').value;
  const data = { firstName, lastName };

  try {
    const pdfUrl = await createCertificate(data);
    const downloadButton = document.getElementById('downloadButton');
    downloadButton.style.display = 'block';
    downloadButton.onclick = () => {
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = 'customized.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };
  } catch (error) {
    console.error('Sertifika oluşturma hatası:', error);
  }
}

// ...existing code...