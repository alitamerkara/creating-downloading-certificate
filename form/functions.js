import html2canvas from 'html2canvas';
// ...existing code...

// PNG indirme işlevi
export async function handleDownloadPngButtonClick() {
  const certificateElement = document.getElementById('certificate');
  if (!certificateElement) {
    console.error('Certificate element not found');
    return;
  }
  html2canvas(certificateElement, { useCORS: true }).then(canvas => {
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = 'certificate.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }).catch(error => {
    console.error('PNG indirme hatası:', error);
  });
}

// ...existing code...