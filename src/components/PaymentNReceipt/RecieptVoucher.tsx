import { useState } from "react";


export const RecieptVoucher = () => {
    const [selectedPaymentType, setSelectedPaymentType] = useState('Bank');
  const [formData, setFormData] = useState({
    date: '20/11/2024',
    account: '12101-35987456101',
    entries: [
      {
        id: 1,
        accountNo: '112489-Riyadh Cables',
        description: 'Transferred in Cash Receipt no 1422',
        amount: '1200'
      }
    ]
  });

  // Create 15 empty rows for the grid
  const gridRows = Array.from({ length: 15 }, (_, index) => ({
    id: index + 1,
    accountNo: index === 0 ? formData.entries[0]?.accountNo : '',
    description: index === 0 ? formData.entries[0]?.description : '',
    amount: index === 0 ? formData.entries[0]?.amount : ''
  }));

  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

    function onHandleDelete() {
        throw new Error('Function not implemented.');
    }

    function onHandleModify() {
        throw new Error('Function not implemented.');
    }

    function onHandlePrint() {
        throw new Error('Function not implemented.');
    }
    return (
        <div>
             <div className="p-4">
          <h2 className="text-lg font-medium mb-4">
            Customer Payments
          </h2>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm mb-1">Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="border rounded px-2 py-1 w-full"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Payment</label>
              <div className="relative">
                <select
                  value={selectedPaymentType}
                  onChange={(e) => setSelectedPaymentType(e.target.value)}
                  className="border rounded px-2 py-1 w-full appearance-none bg-white"
                >
                  <option value="Bank">Bank</option>
                  <option value="Cash">Cash</option>
                  <option value="Cheque">Cheque</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm mb-1">Account</label>
            <input
              type="text"
              name="account"
              value={formData.account}
              onChange={handleInputChange}
              className="border rounded px-2 py-1 w-full"
            />
          </div>

          <div className=" rounded overflow-hidden mb-4">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border-b p-2 w-12 text-left border-r border-zinc-300">#</th>
                  <th className="border-b p-2 text-left border-r border-zinc-300">Account No</th>
                  <th className="border-b p-2 text-left border-r border-zinc-300">
                   Receipt Description
                  </th>
                  <th className="border-b p-2 text-left w-32 border-r border-zinc-300">Amount</th>
                </tr>
              </thead>
              <tbody>
                {gridRows.map((row) => (
                  <tr key={row.id} className="border-b">
                    <td className="p-2 border-r border-zinc-300 bg-sky-100">{row.id}</td>
                    <td className="p-2 border-r border-zinc-300">
                      <input
                        type="text"
                        value={row.accountNo}
                        className="w-full border-none  focus:ring-0"
                        readOnly={row.id !== 1}
                      />
                    </td>
                    <td className="p-2 border-r border-zinc-300">
                      <input
                        type="text"
                        value={row.description}
                        className="w-full border-none focus:ring-0"
                        readOnly={row.id !== 1}
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="text"
                        value={row.amount}
                        className="w-full border-none focus:ring-0 text-right"
                        readOnly={row.id !== 1}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end mt-6">
            <button
              onClick={() => {
                onHandlePrint();
              }}
              type="button"
              className="text-black border border-blue-600 bg-white hover:bg-sky-400 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-2 py-1.5 text-center  inline-flex items-center dark:focus:ring-[#3b5998]/55 me-2 "
            >
              <img
                src="../../src/images/customersAndSuppliers/print.png"
                alt=""
                className="me-2 w-6 h-6"
              />
              Print
            </button>

            <button
              onClick={() => {
                onHandleModify();
              }}
              type="button"
              className="text-black border border-blue-600 hover:bg-sky-400 hover:text-white bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-2 py-1.5 text-center  inline-flex items-center dark:focus:ring-[#3b5998]/55 me-2 "
            >
              <img
                src="../../src/images/customersAndSuppliers/modify.png"
                alt=""
                className="me-2 w-6 h-6"
              />
              Save
            </button>

            <button
              onClick={() => {
                onHandleDelete();
              }}
              type="button"
              className="text-black border border-blue-600 hover:bg-sky-400 hover:text-white bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-2 py-1.5 text-center  inline-flex items-center dark:focus:ring-[#3b5998]/55 me-2 "
            >
              <img
                src="../../src/images/customersAndSuppliers/delete.png"
                alt=""
                className="me-2 w-6 h-6"
              />
              Cancel
            </button>
          </div>
        </div>
        </div>
    )
}