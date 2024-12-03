import React, { useState } from 'react';
import { RecieptVoucher } from './RecieptVoucher';
import { PaymentVoucher } from './PaymentVoucher';

const PaymentVouchers = () => {
  const [activeTab, setActiveTab] = useState('receipt');
  

  return (
    <div className="p-6 max-w-6xl mx-auto bg-white">
      <div className=" rounded-t-lg">
        <h1 className="text-2xl text-[#217AA6] font-bold mb-6">
        Payment and Receipt Vouchers
      </h1>

        <div className="flex gap-4">
          <button
            className={`px-4 py-2 ${
              activeTab === 'receipt'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700'
            }`}
            onClick={() => setActiveTab('receipt')}
          >
            Receipt Voucher
          </button>
          <button
            className={`px-4 py-2 ${
              activeTab === 'payment'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700'
            }`}
            onClick={() => setActiveTab('payment')}
          >
            Payment Vouchers
          </button>
        </div>

        {activeTab === 'receipt' ? (
          <RecieptVoucher    />
        ) : (
          <PaymentVoucher    />
        )}
       
      </div>
    </div>
  );
};

export default PaymentVouchers;