// vite/src/components/Display.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import QRCode from 'qrcode.react';
import './Display.css'; // Import the CSS file
import Navbar from './Navbar'
const Display = () => {
  const [forms, setForms] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://apii-cyan.vercel.app/api/forms');
        setForms(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const generatePDF = async (form) => {
    try {
      const response = await axios.get(`https://apii-cyan.vercel.app/api/forms/${form._id}/pdf`, {
        responseType: 'blob',
      });
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'form_data.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  const printPDF = async (form) => {
    try {
      const response = await axios.get(`https://apii-cyan.vercel.app/api/forms/${form._id}/pdf`, {
        responseType: 'blob',
      });
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank');
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error printing PDF:', error);
    }
  };

  return (
    <div>
      <Navbar/>
      <h1 style={{fontSize:'30px',marginTop:'20px'}}><b>Disclosure Statement Prints</b></h1>
      {forms.map((form) => (
        <div key={form._id} className="display-data">
          <h2><b>Statement No: </b>{form?.formData?.الكشف_رقم || 'N/A'}</h2>
          <QRCode value={`https://apii-cyan.vercel.app/api/forms/${form._id}/pdf`} style={{width:'7%', height:'7%'}}/>
          <div className="buttons">
       
            <button onClick={() => generatePDF(form)}>Download PDF</button>
            <button onClick={() => printPDF(form)}>Print PDF</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Display;
