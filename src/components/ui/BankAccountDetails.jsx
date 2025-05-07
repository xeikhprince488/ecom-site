// frontend/src/components/BankAccountDetails.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BankAccountDetails = () => {
  const [bankDetails, setBankDetails] = useState(null);

  useEffect(() => {
    const fetchBankDetails = async () => {
      try {
        const isDevelopment = process.env.NODE_ENV === 'development';
        const baseURL = isDevelopment 
          ? "http://localhost:5000"
          : "https://ecom-site-beta.vercel.app";

        const response = await axios.get(`${baseURL}/api/payment/bank-transfer-details`);
        setBankDetails(response.data);
      } catch (error) {
        console.error('Error fetching bank details', error);
      }
    };

    fetchBankDetails();
  }, []);

  return (
    <div>
      <h3>Bank Transfer Payment Details</h3>
      {bankDetails ? (
        <div>
          <p><strong>Account Name:</strong> {bankDetails.accountName}</p>
          <p><strong>Account Number:</strong> {bankDetails.accountNumber}</p>
          <p><strong>Bank Name:</strong> {bankDetails.bankName}</p>
          <p><strong>Branch Code:</strong> {bankDetails.branchCode}</p>
          <p><strong>IBAN:</strong> {bankDetails.iban}</p>
          <p><strong>SWIFT Code:</strong> {bankDetails.swiftCode}</p>
        </div>
      ) : (
        <p>Loading bank details...</p>
      )}
    </div>
  );
};

export default BankAccountDetails;
