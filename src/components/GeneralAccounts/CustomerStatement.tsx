import React, { useState } from 'react';
import axios from 'axios';
import { OpenModal } from '../Generic/OpenModal';
import AccountTable from './AccountTable';
import { getAllCustomersStatement } from '../../api/auth';
import CustomersTable from '../CustomerNSuppliers/CustomersTables';

const CustomerStatement: React.FC = () => {
  const [accountNo, setAccountNo] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [data, setData] = useState([]);
  const [englishName, setEnglishName] = useState('');
  const [finalBalance, setFinalBalance] = useState(0);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [openPartyModal, setOpenPartyModal] = useState(false);
  const [partyId, setPartyId] = useState("");

  const handleSearch = async () => {
    try {
      const response = await getAllCustomersStatement(partyId,fromDate,toDate);
      debugger;
      setData(response.data?.statement);
      setFinalBalance(response.data?.finalBalance);
    } catch (error) {
      console.error('Error fetching account statement:', error);
      alert('Failed to fetch account statement. Please try again.');
    }
  };

  const onHandlePartySelect = (party: any) => {
    setPartyId(party.id);
    setAccountNo(party.party_no);
    setEnglishName(party.name);
    setOpenPartyModal(false);
  };

  return (
    <div className="flex">
      
      {/* Main Content */}
      <div className="w-3/4 p-8">

        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Customer Statement</h2>
          <form className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Date From</label>
              <input
                type="date"
                className="border border-gray-300 rounded-md p-2 w-full"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Date To</label>
              <input
                type="date"
                className="border border-gray-300 rounded-md p-2 w-full"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Account No</label>
              <input
                type="text"
                className="border border-gray-300 rounded-md p-2 w-full"
                value={accountNo}
                onChange={(e) => setAccountNo(e.target.value)}
                onClick={() => {
                      setOpenPartyModal(true);
                  }}
                  readOnly
              />
            </div>

            {/* <div>
              <label className="block text-sm font-medium">Arabic Name</label>
              <input
                type="text"
                className="border border-gray-300 rounded-md p-2 w-full"
                value={arabicName}
                onChange={(e) => setArabicName(e.target.value)}
              />
            </div> */}

            <div>
              <label className="block text-sm font-medium">English Name</label>
              <input
                type="text"
                className="border border-gray-300 rounded-md p-2 w-full"
                value={englishName}
                onChange={(e) => setEnglishName(e.target.value)}
              />
            </div>

            <div className="col-span-2">
              <button
                type="button"
                className="bg-blue-600 text-white rounded-md px-4 py-2 w-full"
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
          </form>
        </div>

        {data.length > 0 && (
        <div className="mt-6 bg-white shadow-md rounded p-4">
          <table className="table-auto w-full border-collapse border border-gray-200 text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-200 px-4 py-2">Date</th>
                <th className="border border-gray-200 px-4 py-2">Description</th>
                <th className="border border-gray-200 px-4 py-2">Debit</th>
                <th className="border border-gray-200 px-4 py-2">Credit</th>
                <th className="border border-gray-200 px-4 py-2">Balance</th>
              </tr>
            </thead>
            <tbody>
              {data.map((transaction: any, index: number) => (
                <tr key={index}>
                  <td className="border border-gray-200 px-4 py-2">
                    {transaction.date}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {transaction.description}
                  </td>
                  <td className="border border-gray-200 px-4 py-2 text-red-500">
                    {transaction.debit || "-"}
                  </td>
                  <td className="border border-gray-200 px-4 py-2 text-green-500">
                    {transaction.credit || "-"}
                  </td>
                  <td className="border border-gray-200 px-4 py-2 font-bold">
                    {transaction.balance}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-between mt-4">
            <div>Total Items: {data.length}</div>
            <div>
              <span className="font-semibold">Final Balance: </span>
              {finalBalance < 0 ? (
                <span className="text-red-500">{finalBalance} (Payable)</span>
              ) : (
                <span className="text-green-500">{finalBalance} (Receivable)</span>
              )}
            </div>
          </div>
        </div>
      )}
      </div>
      {openViewModal && (
        <OpenModal
          handleClose={() => {
            setOpenViewModal(false);
          }}
          title="Customers"
          modalWithinModal={true}
        >
          <AccountTable
            onEdit={(customer: any) => {
            //   onHandleEdit(customer);
            //   setIsEditMode(true);
              setOpenViewModal(false);
            }}
          />
        </OpenModal>
      )}

         {/* open customer & suppliers modal */}
         {openPartyModal && (
        <OpenModal
          handleClose={() => {
            setOpenPartyModal(false);
          }}
          title=""
          modalWithinModal={true}
        >
          <CustomersTable
            onEdit={(item: any) => {
              setOpenViewModal(false);
              onHandlePartySelect(item);
            }}
            otherComp={true}
            onlyShowVendors={true}
          />
        </OpenModal>
      )}
    </div>
  );
};

export default CustomerStatement;
