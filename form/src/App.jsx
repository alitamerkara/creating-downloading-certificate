import React, { useState, useEffect } from 'react';
import './App.css';
import logo from "./assets/dggeri.png";
import { toPng } from 'html-to-image';
import { FaInstagram, FaYoutube, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import { TbMail, TbPhone, TbWorldCode } from "react-icons/tb";
import phones from './phones.json'; // Import the JSON file
import { IoWarningOutline } from "react-icons/io5";
import { saveUserInfo, db } from './firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { handleDownloadPngButtonClick } from '../functions';



function App() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [disableCheck, setDisableCheck] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [warning, setWarning] = useState(false);

  setTimeout(() => {
    setShowModal(showModal=>!showModal);
  }, 700);
    
  const handleGeneratePng = async () => {
    if(!firstName || !lastName || !phone) {
      alert('Lütfen tüm alanları doldurun.');
    } else { 
      const q = query(collection(db, "info"), where("telefon", "==", phone));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        alert('Bu telefon numarası ile daha önce sertifika oluşturulmuş.');
        setLoading(false);
        return;
      }
      setLoading(true);
      const formattedPhone = `90${phone}`;
      // console.log(phones);
      const phoneExists = Array.isArray(phones) && phones.some(entry => {
        // console.log(entry.telefon, formattedPhone);
        return entry.telefon === formattedPhone
      });
      // console.log(phoneExists);
      if (!phoneExists) {
        alert('Girilen telefon numarası geçerli değil.');
        setLoading(false);
        return;
      }

      try {
        await saveUserInfo(firstName, lastName, phone); // Save user info to Firestore
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
        }, 0); // Increase the delay to ensure content is rendered
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

  const warningCheck =()=>{
    if(firstName && lastName && phone){
      setWarning(true);
  }
}

  return (
    <div className="container">
      {showCertificate && (
        <div className="overlay">
          <div id="certificate" className="certificate-container">
            {/* <!-- Certificate content here --> */}
          </div>
          <div id="highQualityCertificate" className="high-quality-certificate-container" style={{ display: 'none' }}>
            {/* <!-- High-quality certificate content here --> */}
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
              onChange={(e) =>{
                setFirstName(e.target.value)
                warningCheck()
              }
            }
              className="input"
            />
            <input
              type="text"
              id="lastNameInput"
              placeholder="Soyadınızı girin"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value)
                warningCheck()
              }}
              className="input"
            />
            <input
              type="phone"
              placeholder="Telefon Numaranızı girin +90..."
              value={phone}
              maxLength={10}
              onChange={(e) => {
                setPhone(e.target.value);
                warningCheck();
              }}
              className="input"
            />
            <div className='warning' style={{display: warning ? 'block' : 'none'}}>
            <IoWarningOutline />
                 Sertifika telefon numarasına özel 1 kez oluşturulmaktadır. Lütfen girilen bilgilerin doğruluğundan emin olun.
              <IoWarningOutline />
            </div>
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
          Değerli Doğa Dostu,
          </div>
          <div className='modal-content'>
          Her damla atık yağ, dönüşüm yolculuğunda bir umut tohumu olabilir. Siz, “Bitkisel Atık Yağlar Ormana Dönüşüyor” projemize destek vererek yalnızca çevremizi korumadınız; aynı zamanda geleceğe nefes, dünyaya yeşil bir miras bıraktınız.
          </div>
          <div className='modal-content'>
          Bu sertifika, sizin duyarlılığınızın ve doğaya olan sevginizin bir yansımasıdır. Toprağa kazandırdığınız her fidan, hem çevremiz için bir nefes olacak hem de yarınlara daha yaşanabilir bir dünya armağan edecek.
          </div>
          <div className='modal-content'>
            Birlikte dönüşüyoruz, birlikte büyüyoruz. Teşekkür ederiz!
            </div>
            <div className='modal-content'>
            Sevgi ve saygılarımızla,
            </div>
            <div className='modal-content'>
            DG Doğru Geri Kazanım
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
