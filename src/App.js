import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './assets/logo.png'; 

function App() {
  const [formData, setFormData] = useState({
    annual_ctc: 0,
    total_days: 0,
    lop_days: 0,
  });

  const [result, setResult] = useState(null);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: parseFloat(e.target.value),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:5000', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      setResult(data.result);
    } catch (error) {
      console.error('Error submitting the form:', error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="text-center">
              <img src={logo} alt="Reimburz Logo" width="80" height="80" />
              <h6 className="text-center">Reimburz💰</h6>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Annual CTC:</label>
                  <input
                    type="number"
                    className="form-control"
                    name="annual_ctc"
                    value={formData.annual_ctc}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Total Days:</label>
                  <input
                    type="number"
                    className="form-control"
                    name="total_days"
                    value={formData.total_days}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">LOP Days:</label>
                  <input
                    type="number"
                    className="form-control"
                    name="lop_days"
                    value={formData.lop_days}
                    onChange={handleInputChange}
                  />
                </div>
                <button type="submit" className="btn btn-primary">Calculate Reimbursement</button>
              </form>
            </div>
          </div>

          {result && (
            <div className="mt-4">
              <h2 className="text-center">Payroll Reimbursement</h2>
              <div className="table-responsive">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Category</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Total Reimbursement Amount</td>
                      <td>{result.total_reimburse_amount.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td>Monthly CTC</td>
                      <td>{result.monthly_ctc.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td>Conveyance Reimbursement</td>
                      <td>{result.conv_reimbursement.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td>Telecom Reimbursement</td>
                      <td>{result.telcom_reimbursement.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td>Meal Reimbursement</td>
                      <td>{result.meal_reimbursement.toFixed(2)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
