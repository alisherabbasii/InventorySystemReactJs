import { useState } from "react";


export const SalesReturn = (props:any) => {
    const {items} = props;
    const [invoiceNo, setInvoiceNo] = useState("1102534");
    const [date, setDate] = useState("20/11/2024");
    const [customerNo, setCustomerNo] = useState("11110789");
    const [paymentTerms, setPaymentTerms] = useState("Credit");
    const [customerName, setCustomerName] = useState("AL-FANAR");
    const [customerAddress, setCustomerAddress] = useState("1102534");
    return (
        <div>
             {/* Form */}
      <div className="flex justify-between items-center gap-6 mb-6">
        <div className="w-8/12 grid grid-cols-2 gap-6  p-6  ">
          <div>
            <label className="block font-bold mb-2">Invoice No</label>
            <input
              type="text"
              className="w-full border rounded px-4 py-2"
              value={invoiceNo}
              onChange={(e) => setInvoiceNo(e.target.value)}
            />
          </div>
          <div>
            <label className="block font-bold mb-2">Date</label>
            <input
              type="date"
              className="w-full border rounded px-4 py-2"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div>
            <label className="block font-bold mb-2">Customer No</label>
            <input
              type="text"
              className="w-full border rounded px-4 py-2"
              value={customerNo}
              onChange={(e) => setCustomerNo(e.target.value)}
            />
          </div>
          <div>
            <label className="block font-bold mb-2">Payment Terms</label>
            <select
              className="w-full border rounded px-4 py-2"
              value={paymentTerms}
              onChange={(e) => setPaymentTerms(e.target.value)}
            >
              <option value="Credit">Credit</option>
              <option value="Cash">Cash</option>
            </select>
          </div>
          <div>
            <label className="block font-bold mb-2">Customer Name</label>
            <input
              type="text"
              className="w-full border rounded px-4 py-2"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />
          </div>
          <div>
            <label className="block font-bold mb-2">Customer Address</label>
            <input
              type="text"
              className="w-full border rounded px-4 py-2"
              value={customerAddress}
              onChange={(e) => setCustomerAddress(e.target.value)}
            />
          </div>
        </div>
        <div>
          <img
            src="../../src/images/sales/return.png"
            alt="Image"
            className=""
          />
        </div>
      </div>

            <div className="bg-white p-6 rounded shadow-md">
        <table className="w-full border-collapse border border-gray-300 mb-6">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">#</th>
              <th className="border border-gray-300 px-4 py-2">Item no</th>
              <th className="border border-gray-300 px-4 py-2">Description</th>
              <th className="border border-gray-300 px-4 py-2">Store no</th>
              <th className="border border-gray-300 px-4 py-2">Unit</th>
              <th className="border border-gray-300 px-4 py-2">Qty</th>
              <th className="border border-gray-300 px-4 py-2">Unit Price</th>
              <th className="border border-gray-300 px-4 py-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item:any, index:any) => (
              <tr key={index}>
                <td className="border border-gray-300 px-4 py-2">{item.id}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.itemNo}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.desc}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.store}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.unit}
                </td>
                <td className="border border-gray-300 px-4 py-2">{item.qty}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.unitPrice}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.total}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Summary */}
        <div className="flex flex-col items-end space-y-4">
          <div className="flex items-center gap-4">
            <p>Total</p>
            <input
              type="text"
              value={items
                .reduce((acc:any, item:any) => acc + item.total, 0)
                .toFixed(2)}
              className="w-32 border rounded px-2 py-1"
              readOnly
            />
          </div>
          <div className="flex items-center gap-4">
            <p>Discount</p>
            <input
              type="text"
              value={"0.00"}
              className="w-32 border rounded px-2 py-1"
              readOnly
            />
          </div>
          <div className="flex items-center gap-4">
            <p className="font-bold">Final</p>
            <input
              type="text"
              value={items
                .reduce((acc:any, item:any) => acc + item.total, 0)
                .toFixed(2)}
              className="w-32 text-white rounded px-2 py-1 bg-sky-400"
              readOnly
            />
          </div>
        </div>
      </div>
        </div>
    )
}