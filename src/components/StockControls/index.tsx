import React, { useState } from 'react';
import { Form } from './Form';
import { ManageStock } from './ManageStock';

const StockManagementForm = () => {
    const [activeTab, setActiveTab] = useState("addItem");
  

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
      <div className=" rounded-t-lg">
        <div className="bg-white p-4">
          <div className="flex items-center gap-4 border-b pb-4">
            <button 
             onClick={() => setActiveTab("addItem")}
             className={
               "px-4 py-1 rounded " +
               (activeTab === "addItem"
                 ? "bg-blue-500 text-white"
                 : "bg-zinc-100 text-black")
             }
            >
              Add Item
            </button>
            <button onClick={() => setActiveTab("manage")}
             className={
               "px-4 py-1 rounded " +
               (activeTab === "manage"
                 ? "bg-blue-500 text-white"
                 : "bg-zinc-100 text-black")
             }>
            Manage Stock
            </button>
            {/* <span className="text-gray-600">Manage Stock</span> */}
          </div>

          
            {activeTab === "addItem" &&   <Form />}
            {activeTab === "manage" && <ManageStock  />}
        </div>
      </div>
     
    </div>
  );
};

export default StockManagementForm;