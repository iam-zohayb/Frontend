import React, { useEffect, useState } from 'react';
import axios from 'axios';
import QRCode from 'qrcode.react';
import './Display.css'; // Import the CSS file
import Navbar from './Navbar';

const Display = () => {
  const [forms, setForms] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://apii-cyan.vercel.app/api/forms/get');
        console.log('Fetched forms:', response.data); // Log the data
        setForms(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);

  const deleteForm = async (statementNo) => {
    try {
      await axios.delete(`https://apii-cyan.vercel.app/api/forms/${statementNo}`);
      setForms(forms.filter((form) => form.formData.الكشف_رقم !== statementNo));
    } catch (error) {
      console.error('Error deleting form:', error);
    }
  };
  
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
      <Navbar />
      <h1 style={{ fontSize: '30px', marginTop: '20px' }}><b>Stored Forms</b></h1>
      {forms.map((form) => (
        <div key={form._id} className="display-data">
          <div style={{width:'20%'}}>
            <h2><b>Statement No: </b>
            <label className='label-color'>{form?.formData?.الكشف_رقم || 'N/A'}</label></h2>
          </div>
          <QRCode value={`https://apii-cyan.vercel.app/api/forms/${form._id}/pdf`} style={{ width: '7%', height: '7%' }} />
          <div className="buttons">
            <button onClick={() => generatePDF(form)}>Download PDF</button>
            <button onClick={() => printPDF(form)}>Print PDF</button>
            <button onClick={() => deleteForm(form.formData.الكشف_رقم)}>Delete Form</button> {/* Delete Button */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Display;
