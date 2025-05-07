// frontend/src/pages/CheckoutPage.jsx
import React, { useState } from 'react';
import BankTransferButton from '../../components/ui/BankAccountDetails';
import BankAccountDetails from '../../components/ui/BankTransferButton';

const CheckoutPage = () => {
  const [orderID] = useState('123456'); // This should come from the backend or cart system
  const [amount] = useState(5000); // Example amount

  return (
    <div>
      <h2>Checkout</h2>
      <BankAccountDetails />
      <BankTransferButton amount={amount} orderID={orderID} />
    </div>
  );
};

export default CheckoutPage;
