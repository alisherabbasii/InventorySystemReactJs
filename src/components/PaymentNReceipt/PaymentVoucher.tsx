import { useRef, useState } from "react";
import { OpenModal } from "../Generic/OpenModal";
import CustomersTable from "../CustomerNSuppliers/CustomersTables";
import { createPaymentVoucher, createReceiptVoucher, getPaymentReceiptWithAccount } from "../../api/auth";
import { toast, ToastContainer } from "react-toastify";
import { useReactToPrint } from "react-to-print";
import { DeleteIcon, ModifyIcon, PrintIcon } from "../Icons/AllButtonIcons";

export const PaymentVoucher = () => {
  const [selectedPaymentType, setSelectedPaymentType] = useState("bank");
  const [openPartyModal, setOpenPartyModal] = useState(false);
  const [partyId, setPartyId] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerNo, setCustomerNo] = useState("");
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });
  const [selectedRowIndex, setSelectedRowIndex] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    date: "",
    account: "",
    entries: [
      {
        id: 1,
        accountNo: "",
        receiptDescription: "",
        amount: "",
        partyId: null,
        customerName: "",
        customerNo: "",
      },
    ],
  });

  // const [formData, setFormData] = useState({
  //   date: "",
  //   account: "",
  //   entries: [
  //     {
  //       id: 1,
  //       accountNo: "",
  //       receiptDescription: "",
  //       amount: "",
  //     },
  //   ],
  // });

  const getRecords = async () => {
    try {
      const response = await getPaymentReceiptWithAccount();
      if(response.data){
        
      }
    } catch (error) {
      console.error("error in payment receipt:", error);
      toast.error("Error creating payment receipt");
    }
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // const onHandlePartySelect = (party: any) => {
  //   setPartyId(party.id);
  //   setCustomerNo(party.party_no);
  //   setCustomerName(party.name);
  //   setOpenPartyModal(false);
  // };
         
  const onHandlePartySelect = (party: any) => {
    if (selectedRowIndex !== null) {
      setFormData((prev) => {
        const updatedEntries = [...prev.entries];
        updatedEntries[selectedRowIndex] = {
          ...updatedEntries[selectedRowIndex],
          partyId: party.id,
          accountNo: party.party_no,
          customerName: party.name,
          customerNo: party.party_no,
        };
        return { ...prev, entries: updatedEntries };
      });
      setOpenPartyModal(false);
      setSelectedRowIndex(null);
    }
  };

  const handleInputChangeTable = (index: number, field: string, value: string) => {
    setFormData((prev) => {
      const updatedEntries = [...prev.entries];
      updatedEntries[index] = { ...updatedEntries[index], [field]: value };

      // Add a new row if entering data in the last row
      if (index === updatedEntries.length - 1 && field === "amount" && value) {
        updatedEntries.push({
          id: updatedEntries.length + 1,
          accountNo: "",
          receiptDescription: "",
          amount: "",
          partyId: null,
          customerName: "",
          customerNo: "",
        });
      }

      return { ...prev, entries: updatedEntries };
    });
  };

  const handleSave = async () => {
   if (!formData.account || !formData.date) return;

    const filteredEntries = formData.entries.filter(
      (entry) => entry.accountNo && entry.receiptDescription && entry.amount
    );
    let obj = {
      date: formData.date,
      account: formData.account,
      paymentMethod: selectedPaymentType,
      partyId,
      items: filteredEntries,
    };
    console.log("Saved Records:", obj);
    try {
      const response = await createPaymentVoucher(obj);
      if (response.data) {
        toast.success("Payment added successfully");
        clearFields();
      }
    } catch (error) {
      console.error("error in payment receipt:", error);
      toast.error("Error creating payment receipt");
    }
  };

  const clearFields = () => {
    setFormData({
      date: "",
      account: "",
      entries: [
        {
          id: 1,
          accountNo: "",
          receiptDescription: "",
          amount: "",
          partyId: null,
          customerName: "",
          customerNo: "",
        },
      ],
    })
  };

  function onHandleDelete() {
    clearFields();
  }

  function onHandleModify() {
    throw new Error("Function not implemented.");
  }

  function onHandlePrint() {
    reactToPrintFn();
  }
  return (
    <div>
      <ToastContainer />
      <div ref={contentRef} className="p-4">
        <h2 className="text-lg font-medium mb-4">Supplier Payments</h2>

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
        <div className="grid grid-cols-2 gap-4 ">
          <div className="mb-4">
            <label className="block text-sm mb-1">Account</label>
            <input
              type="text"
              name="account"
              value={formData.account}
              onChange={handleInputChange}
              className="border rounded px-2 py-1 w-full"
              placeholder="Please enter account no"
            />
          </div>
        </div>

        <div className=" rounded overflow-hidden mb-4">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="border-b p-2 w-12 text-left border-r border-zinc-300">
                  #
                </th>
                <th className="border-b p-2 text-left border-r border-zinc-300">
                  Account No
                </th>
                <th className="border-b p-2 text-left border-r border-zinc-300">
                  Receipt Description
                </th>
                <th className="border-b p-2 text-left w-32 border-r border-zinc-300">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
            {formData.entries.map((entry, index) => (
              <tr key={entry.id} className="border-b">
                <td className="p-2 border">{entry.id}</td>
                <td className="p-2 border">
                  <input
                    type="text"
                    value={entry.accountNo ? `${entry.accountNo} (${entry.customerName})` : ""}
                    onClick={() => {
                      setOpenPartyModal(true);
                      setSelectedRowIndex(index); // Set the current row index
                    }}
                    readOnly
                    className="w-full border-none p-1"
                    placeholder="Select customer"
                  />
                </td>
                <td className="p-2 border">
                  <input
                    type="text"
                    value={entry.receiptDescription}
                    onChange={(e) =>
                      handleInputChangeTable(index, "receiptDescription", e.target.value)
                    }
                    className="w-full border-none p-1"
                    placeholder="Enter description"
                  />
                </td>
                <td className="p-2 border">
                  <input
                    type="number"
                    value={entry.amount}
                    onChange={(e) =>
                      handleInputChangeTable(index, "amount", e.target.value)
                    }
                    className="w-full border-none p-1 text-right"
                    placeholder="Enter amount"
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
            <PrintIcon />
            Print
          </button>

          <button
            onClick={() => {
              handleSave();
            }}
            type="button"
            className="text-black border border-blue-600 hover:bg-sky-400 hover:text-white bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-2 py-1.5 text-center  inline-flex items-center dark:focus:ring-[#3b5998]/55 me-2 "
          >
            <ModifyIcon />
            Save
          </button>

          <button
            onClick={() => {
              onHandleDelete();
            }}
            type="button"
            className="text-black border border-blue-600 hover:bg-sky-400 hover:text-white bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-2 py-1.5 text-center  inline-flex items-center dark:focus:ring-[#3b5998]/55 me-2 "
          >
            <DeleteIcon />
            Cancel
          </button>
        </div>
      </div>
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
              setOpenPartyModal(false);
              onHandlePartySelect(item);
            }}
            otherComp={true}
            onlyShowSuppliers={true}
          />
        </OpenModal>
      )}
    </div>
  );
};
