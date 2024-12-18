import html2canvas from 'html2canvas';
import { handleDownloadPngButtonClick } from './functions.js';

// Function to download the certificate as PNG
function downloadCertificateAsPNG() {
  const certificateElement = document.getElementById('certificate');
  html2canvas(certificateElement).then(canvas => {
    const link = document.createElement('a');
    link.download = 'certificate.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  });
}

// Add event listener to the button
document.getElementById('downloadPngButton').addEventListener('click', handleDownloadPngButtonClick);
