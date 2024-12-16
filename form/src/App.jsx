import React, { useState } from 'react';
import { handleCreateCertificateButtonClick } from '../functions';
import './App.css';
import logo from "./assets/dggeri.png"

function App() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [disableCheck, setDisableCheck] = useState(false);

  const handleGeneratePdf = async () => {
    if(!firstName || !lastName || !phone) {
      alert('Lütfen tüm alanları doldurun.');
    }else{
    setLoading(true);
    try {
      const name = `${firstName} ${lastName}`;
      const data = { name };
      await handleCreateCertificateButtonClick(data);
      setDisableCheck(true);
    } catch (error) {
      console.error("PDF oluşturma hatası:", error);
    } finally {
      setLoading(false);
    }
  }
  };

  return (
    <div className="container">
      <div className="content">
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
          onClick={handleGeneratePdf}
          disabled={loading || disableCheck}
          style= {{cursor: loading || disableCheck ? 'not-allowed' : 'pointer'}}
          className={`button ${loading ? 'loading' : ''}`}
        >
          {loading ? 'Yükleniyor...' : 'Sertifika Oluştur'}
        </button>
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
