// App.js
import React, { useState } from 'react';
import './App.css';

function App() {
  const [annualCTC, setAnnualCTC] = useState('');
  const [monthlyCTC, setMonthlyCTC] = useState('');
  const [convReimb, setConvReimb] = useState('');
  const [teleReimb, setTeleReimb] = useState('');
  const [mealReimb, setMealReimb] = useState('');
  const [totalBillAmount, setTotalBillAmount] = useState(0);

  const handleUpload = (fileIndex, file) => {
    // Logic to handle file upload and calculate total bill amount
    console.log(`File ${fileIndex + 1} uploaded`);
  };

  const handleDownloadReport = () => {
    console.log('Downloading report...');
    // Logic to download the report file
  };

  return (
    <div className="app">
      <h2 className="title">Reimburz💰</h2>
      <br />
      <br />

      {/* Annual and Monthly CTC */}
      <div className="partA">
        <div>
          <label>Annual CTC</label>
          <input
            type="number"
            placeholder="₹ 2300000"
            value={annualCTC}
            onChange={(e) => setAnnualCTC(e.target.value)}
          />
        </div>
        <div>
          <label>Monthly CTC</label>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <input
              type="number"
              placeholder="₹ 191,667.67"
              value={monthlyCTC}
              onChange={(e) => setMonthlyCTC(e.target.value)}
            />
            <span style={{ marginLeft: '30px' }}>
              <b>Total days</b> = 31 <b>LOP days</b> = 0
            </span>
          </div>
        </div>
      </div>
      <br />
      {/* Payroll Reimbursement and Eligibility */}
      <div className="partB">
        <div className="part1">
          <table>
            <thead>
              <tr>
                <th>PAYROLL REIMB</th>
                <th>Eligibility</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Conv REIMB</td>
                <td>
                  <input
                    type="text"
                    placeholder="₹ 23,000.00"
                    value={convReimb}
                    onChange={(e) => setConvReimb(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td>Tele REIMB</td>
                <td>
                  <input
                    type="text"
                    placeholder="₹2,000.00"
                    value={teleReimb}
                    onChange={(e) => setTeleReimb(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td>Meal REIMB</td>
                <td>
                  <input
                    type="text"
                    placeholder="₹ 13,333.33"
                    value={mealReimb}
                    onChange={(e) => setMealReimb(e.target.value)}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* Bills Uploading and Total bill calculation */}
        <div className="part2">
          <table>
            <thead>
              <tr>
                <th>Upload Bills</th>
                <th>Total bill amount</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3].map((index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="file"
                      onChange={(e) => handleUpload(index, e.target.files[0])}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={totalBillAmount}
                      readOnly
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Download Report Button */}
      <button className="downloadButton" onClick={handleDownloadReport}>
        Download Report
      </button>
    </div>
  );
}

export default App;
