import React, { useState } from 'react';
import './App.css';
import logo from "./assets/dggeri.png"
import { handleDownloadPngButtonClick } from '../functions';

function App() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [disableCheck, setDisableCheck] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);

  const handleGeneratePng = async () => {
    if(!firstName || !lastName || !phone) {
      alert('Lütfen tüm alanları doldurun.');
    } else {
      setLoading(true);
      try {
        setShowCertificate(true);
        setTimeout(async () => {
          const certificateElement = document.getElementById('certificate');
          certificateElement.innerHTML = `
            <div class="certificate">
              <div class="person">
                <p class="text">${firstName} ${lastName}</p>
              </div>
            </div>
          `;
          await handleDownloadPngButtonClick();
          setDisableCheck(true);
        }, 0);
        setTimeout(() => {
          alert('Sertifikanız oluşturuldu. İndirme işlemi başladı.');
        }, 350);
      } catch (error) {
        console.error("PNG oluşturma hatası:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="container">
      <div className="content">
        {!showCertificate && (
          <>
            <a href='https://dggerikazanim.com/' target="_blank">
              <img src={logo} alt="Logo" className="logo" />
            </a>
            <input
              type="text"
              id="firstNameInput"
              placeholder="Adınızı girin"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="input"
            />
            <input
              type="text"
              id="lastNameInput"
              placeholder="Soyadınızı girin"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="input"
            />
            <input
              type="number"
              placeholder="Telefon Numaranızı girin +90..."
              value={phone}
              maxLength={10}
              onChange={(e) => setPhone(e.target.value)}
              className="input"
            />
            <button
              onClick={handleGeneratePng}
              disabled={loading || disableCheck}
              style= {{cursor: loading || disableCheck ? 'not-allowed' : 'pointer'}}
              className={`button ${loading ? 'loading' : ''}`}
            >
              {loading ? 'Yükleniyor...' : 'Sertifika Oluştur'}
            </button>
          </>
        )}
        {showCertificate && (
          <div id="certificate" style={{ position: 'relative', zIndex: 1 }}>
            {/* <!-- Certificate content here --> */}
          </div>
        )}
        <button
          id="downloadButton"
          style={{ display: 'none', marginTop: '20px' }}
          className="button"
        >
          PDF İndir
        </button>
      </div>
    </div>
  );
}

export default App;
