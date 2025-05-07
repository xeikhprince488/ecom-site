// frontend/src/components/BankTransferButton.jsx
import React, { useState } from 'react';
import axios from 'axios';

const BankTransferButton = ({ amount, orderID }) => {
  const [paymentStatus, setPaymentStatus] = useState('');
  const [referenceNumber, setReferenceNumber] = useState('');
  const [receiptImage, setReceiptImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handlePaymentVerification = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append('orderID', orderID);
    formData.append('amountPaid', amount);
    formData.append('referenceNumber', referenceNumber);
    formData.append('transactionReceipt', receiptImage);

    try {
      const response = await axios.post('http://localhost:5000/api/payment/verify-bank-transfer', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        setPaymentStatus('Payment successfully verified!');
      } else {
        setPaymentStatus('Payment verification failed.');
      }
    } catch (error) {
      console.error('Payment Error:', error);
      setPaymentStatus('An error occurred while processing the payment.');
    }
    setLoading(false);
  };

  return (
    <div>
      <h3>Bank Transfer Payment</h3>
      <p>Amount: {amount}</p>
      <label>Reference Number:</label>
      <input
        type="text"
        value={referenceNumber}
        onChange={(e) => setReferenceNumber(e.target.value)}
        placeholder="Enter reference number"
      />
      <label>Upload Receipt:</label>
      <input
        type="file"
        onChange={(e) => setReceiptImage(e.target.files[0])}
      />
      <button onClick={handlePaymentVerification} disabled={loading}>
        {loading ? 'Verifying Payment...' : 'Verify Payment'}
      </button>
      {paymentStatus && <p>{paymentStatus}</p>}
    </div>
  );
};

export default BankTransferButton;
