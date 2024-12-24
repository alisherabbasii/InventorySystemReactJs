import React, { useState } from 'react';
import CustomerStatement from './CustomerStatement';
import SupplierStatement from './SupplierStatement';

const GeneralAccounts = () => {
  const [activeTab, setActiveTab] = useState('customer');
  

  return (
    <div className="p-6 max-w-6xl mx-auto bg-white">
      <div className=" rounded-t-lg">
        <h1 className="text-2xl text-[#217AA6] font-bold mb-6">
        Account Statement
      </h1>

        <div className="flex gap-4">
          <button
            className={`px-4 py-2 ${
              activeTab === 'customer'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700'
            }`}
            onClick={() => setActiveTab('customer')}
          >
            Customer Statement
          </button>
          <button
            className={`px-4 py-2 ${
              activeTab === 'supplier'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700'
            }`}
            onClick={() => setActiveTab('supplier')}
          >
            Supplier Statement
          </button>
        </div>

        {activeTab === 'customer' ? (
          <CustomerStatement    />
        ) : (
          <SupplierStatement    />
        )}
       
      </div>
    </div>
  );
};

export default GeneralAccounts;