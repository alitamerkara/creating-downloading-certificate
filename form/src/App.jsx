import React, { useState } from 'react';
import './App.css';
import logo from "./assets/dggeri.png";
import { handleDownloadPngButtonClick } from '../functions';
import { FaInstagram, FaYoutube, FaLinkedin, FaWhatsapp, FaMailBulk, FaMailchimp } from 'react-icons/fa';
import { TbMail, TbPhone, TbWorldCode } from "react-icons/tb";

function App() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [disableCheck, setDisableCheck] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);
  const [showModal, setShowModal] = useState(false);

  setTimeout(() => {
    setShowModal(showModal=>!showModal);
  }, 700);
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
            <div class="certificate" style="background-image: url('https://i.ibb.co/MM7qh5L/certificate00.png'); background-size: contain; background-position: center; width: 210mm; height: 297mm;">
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
      {showCertificate && (
        <div className="overlay">
          <div id="certificate" className="certificate-container">
            {/* <!-- Certificate content here --> */}
          </div>
        </div>
      )}
      <div className="content">
        {!showCertificate && (
          <div className='form'>
              <img src={logo} alt="Logo" className="logo" />
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
              type="phone"
              placeholder="Telefon Numaranızı girin +90..."
              value={phone}
              maxLength={10}
              onChange={(e) => setPhone(e.target.value)}
              className="input"
            />
            <button
              onClick={handleGeneratePng}
              disabled={loading || disableCheck}
              style={{ cursor: loading || disableCheck ? 'not-allowed' : 'pointer', display: 'block', margin: '20px auto', visibility: 'visible' }}
              className={`button ${loading ? 'loading' : ''}`}
            >
              {loading ? 'Yükleniyor...' : 'Sertifika Oluştur'}
            </button>
          </div>
        )}
        <button
          id="downloadButton"
          style={{ display: 'none', marginTop: '20px' }}
          className="button"
        >
          PDF İndir
        </button>
        <div className={`modal ${showModal ? 'modal-show' : 'modal-hide'}`}>
          <div className='modal-content'>
          DG Doğru Geri Kazanım olarak, bitkisel atık yağların doğru geri kazanımıyla hem doğal kaynakları koruyor hem de daha yeşil bir geleceğe katkı sağlıyoruz. Çevre dostu çalışmalarımızla sürdürülebilirlik için adımlar atmaya devam ediyoruz.
          Bu kapsamda, Ankara Atatürk Orman Çiftliği arazisinde adınıza bir fidan bağışı gerçekleştirilmiştir. Bu fidan, çevre bilincinize olan katkınızı temsil ederek doğaya nefes olacak ve gelecek nesillere daha yaşanabilir bir dünya bırakmamıza destek olacaktır.
          </div>
          <div className='modal-content'>Bu kapsamda, Ankara Atatürk Orman Çiftliği arazisinde adınıza bir fidan bağışı gerçekleştirilmiştir. Bu fidan, çevre bilincinize olan katkınızı temsil ederek doğaya nefes olacak ve gelecek nesillere daha yaşanabilir bir dünya bırakmamıza destek olacaktır.
          </div>
        <button className='closeButton' onClick={()=>setShowModal(showModal=>!showModal)}>Kapat</button>
        </div>
        
      </div>
      <footer className='footer'>
      <p>Bize Ulaşın:</p>
      <div className="social-media-icons">
                <a href="tel:4440791" target="_blank" rel="noopener noreferrer">
                  <TbPhone />
                </a>
                <a href="https://wa.me/message/ETHWI6A37HASA1" target="_blank" rel="noopener noreferrer">
                  <FaWhatsapp />
                </a>
                <a href="mailto:bilgi@dggerikazanim.com" target="_blank" rel="noopener noreferrer">
                  <TbMail/>
                </a>
                <a href="https://dggerikazanim.com/" target='_blank'>
              <TbWorldCode />
               </a>
                <a href="https://www.instagram.com/dggerikazanim/#" target="_blank" rel="noopener noreferrer">
                  <FaInstagram />
                </a>
                <a href="https://www.linkedin.com/company/dg-do%C4%9Fru-geri-kazan%C4%B1m/" target="_blank" rel="noopener noreferrer">
                  <FaLinkedin/>
                </a>
                <a href="https://www.youtube.com/@NagihanYlmzDg" target="_blank" rel="noopener noreferrer">
                  <FaYoutube />
                </a>
              </div>
            </footer>
    </div>
  );
}

export default App;
