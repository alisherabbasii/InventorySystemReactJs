import React, { useState } from "react";
import { OpenModal } from "../Generic/OpenModal";

const CustomersTable = () => {
  const [customers] = useState([
    { id: 1, accountNo: "1103120", name: "Ali Sher", balance: "1,105", address: "Jeddah kilo 8", phone: "+966512548568", date: "11/01/2024" },
    { id: 2, accountNo: "1103112", name: "Abbasi", balance: "1,105", address: "Jeddah kilo 8", phone: "+966512548568", date: "11/01/2024" },
    { id: 3, accountNo: "1103111", name: "Abif", balance: "1,105", address: "Jeddah kilo 8", phone: "+966512548568", date: "11/01/2024" },
    { id: 4, accountNo: "1103110", name: "Saad", balance: "1,105", address: "Jeddah kilo 8", phone: "+966512548568", date: "11/01/2024" },
    { id: 5, accountNo: "1103114", name: "Talha", balance: "1,105", address: "Jeddah kilo 8", phone: "+966512548568", date: "11/01/2024" },
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  return (
    
    <div className="p-4 ">
      {/* <h2 className="text-2xl font-bold mb-4">Customers</h2> */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block mb-2 font-medium">Customer Account no</label>
          <div className="flex">
            <input
              type="text"
              placeholder="Enter Account No"
              className="border border-[#c1c5cd] rounded-l px-3 py-1 flex-1"
            />
            <button className="bg-blue-500 border-[#c1c5cd] text-white px-4 py-1 rounded-r">
              🔍
            </button>
          </div>
        </div>
        <div>
          <label className="block mb-2 font-medium">Customer Name</label>
          <div className="flex">
            <input
              type="text"
              placeholder="Enter the Name"
              className="border border-[#c1c5cd] rounded-l px-3 py-1 flex-1"
            />
            <button className="bg-blue-500 text-white px-4 py-1 rounded-r">
              🔍
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse ">
          <thead className="bg-blue-100">
            <tr>
              <th className="border-r border-[#c1c5cd] px-4 py-2">Customer Acc no</th>
              <th className="border-r border-[#c1c5cd] px-4 py-2">Customer Name</th>
              <th className="border-r border-[#c1c5cd] px-4 py-2">Balance</th>
              <th className="border-r border-[#c1c5cd] px-4 py-2">Address</th>
              <th className="border-r border-[#c1c5cd] px-4 py-2">Phone No</th>
              <th className="border-r border-[#c1c5cd] px-4 py-2">Date</th>
              <th className=" px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {customers
              .slice(
                (currentPage - 1) * itemsPerPage,
                currentPage * itemsPerPage
              )
              .map((customer) => (
                <tr key={customer.id} className="text-center bg-slate-50">
                  <td className="border-b border-[#EAECF0] px-4 py-2">{customer.accountNo}</td>
                  <td className="border-b border-[#EAECF0] px-4 py-2">{customer.name}</td>
                  <td className="border-b border-[#EAECF0] px-4 py-2">{customer.balance}</td>
                  <td className="border-b border-[#EAECF0] px-4 py-2">{customer.address}</td>
                  <td className="border-b border-[#EAECF0] px-4 py-2">{customer.phone}</td>
                  <td className="border-b border-[#EAECF0] px-4 py-2">{customer.date}</td>
                  <td className="border-b border-[#EAECF0] px-4 py-2">
                    <button className="bg-blue-500 text-white px-3 py-1 rounded">
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-4">
        <span>Total {customers.length} items</span>
        <div className="flex items-center gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            &lt;
          </button>
          {Array.from(
            { length: Math.ceil(customers.length / itemsPerPage) },
            (_, i) => i + 1
          ).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 border rounded ${
                currentPage === page ? "bg-blue-500 text-white" : ""
              }`}
            >
              {page}
            </button>
          ))}
          <button
            disabled={
              currentPage === Math.ceil(customers.length / itemsPerPage)
            }
            onClick={() =>
              setCurrentPage((prev) =>
                Math.min(prev + 1, Math.ceil(customers.length / itemsPerPage))
              )
            }
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            &gt;
          </button>
        </div>
        <select
          value={itemsPerPage}
          onChange={(e) => console.log("Items per page:", e.target.value)}
          className="border px-2 py-1 rounded"
        >
          <option value={5}>5 / page</option>
          <option value={10}>10 / page</option>
        </select>
      </div>
    </div>
  );
};

export default CustomersTable;
