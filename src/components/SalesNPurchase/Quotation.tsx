import { useEffect, useRef, useState } from "react";
import { OpenModal } from "../Generic/OpenModal";
import ItemList from "../StockControls/ItemList";
import { DeleteIcon } from "lucide-react";
import CustomersTable from "../CustomerNSuppliers/CustomersTables";
import { createQuotation, getLastInvoiceNo } from "../../api/auth";
import { toast, ToastContainer } from "react-toastify";
import { useReactToPrint } from "react-to-print";

export const Quotation = (props: any) => {
  const { itemss } = props;
  const [invoiceNo, setInvoiceNo] = useState("");
  const [date, setDate] = useState("");
  const [customerNo, setCustomerNo] = useState("");
  const [paymentTerms, setPaymentTerms] = useState("cash");
  const [customerName, setCustomerName] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [openViewModal, setOpenViewModal] = useState(false);
  const [openPartyModal, setOpenPartyModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [partyId, setPartyId] = useState("");
  const [items, setItems] = useState<any>([]);
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });
  
  const handleSearchProduct = (e: any) => {
    if (e.target.value) {
      setOpenViewModal(true);
    }
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    fetchLatestInvoiceNo();
  }, []);
  const fetchLatestInvoiceNo = async () => {
    try {
      const response = await getLastInvoiceNo();
      if (response.data.success) {
        setInvoiceNo(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching the latest invoice number:", error);
    }
  };
  const onHandlePartySelect = (party: any) => {
    setPartyId(party.id);
    setCustomerNo(party.party_no);
    setCustomerName(party.name);
    setCustomerAddress(party.address);
    setOpenPartyModal(false);
  };

  const onHandleSelect = (item: any) => {
    setSearchQuery("");
    setItems((prev: any) => [item, ...prev]);
  };

  const onRemoveItem = (item: any) => {
    const filteredItems = items.filter((x: any) => x.id !== item.id);
    setItems(filteredItems);
  };

  const handlePrint = () => {
    window.print();
  };
  const onHandleSave = async() => {
    if(items.length === 0){
      toast.info("Please add items");
      return;
    }
    let obj = {
      date,
      partyId,
      paymentTerms,
      items,
      totalAmount:grandTotal
    };
    console.log(obj);
    try {
      const response = await createQuotation(obj);
      if (response.data) {
        toast.success("Quotation created successfully");
        clearFields();
        fetchLatestInvoiceNo();
      }
    } catch (error) {
      console.error("error in fetching party:", error);
    }
  };
const clearFields = () => {
    setInvoiceNo("");
    setDate("");
    setPartyId('');
    setCustomerNo("");
    setPaymentTerms("cash");
    setCustomerName("");
    setCustomerAddress("");
    setItems([]);
  };

  const handleQuantityChange = (index: number, value: string) => {
    setItems((prevItems:any) =>
      prevItems.map((item:any, i:any) =>
        i === index ? { ...item, quantity: parseInt(value) || 0 } : item
      )
    );
  };

    // Calculate the total for all items
    const grandTotal = items.reduce(
      (sum:any, item:any) => sum + item.quantity * item.retailPrice,
      0
    );

    
  return (
    <div>
      <ToastContainer />
      {/* Form */}
      <div ref={contentRef}>
      <div className="flex justify-between items-center gap-6 mb-6">
        <div className="w-8/12 grid grid-cols-2 gap-6  p-6  ">
          <div>
            <label className="block font-bold mb-2">Invoice No</label>
            <input
              type="text"
              className="w-full border rounded px-4 py-2"
              value={invoiceNo}
              readOnly
              onChange={(e) => setInvoiceNo(e.target.value)}
              placeholder="Invoice No"
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
              onClick={() => {
                setOpenPartyModal(true);
              }}
              placeholder="select customer"
            />
          </div>
          <div>
            <label className="block font-bold mb-2">Payment Terms</label>
            <select
              className="w-full border rounded px-4 py-2"
              value={paymentTerms}
              onChange={(e) => setPaymentTerms(e.target.value)}
            >
              <option value="credit">Credit</option>
              <option value="cash">Cash</option>
            </select>
          </div>
          <div>
            <label className="block font-bold mb-2">Customer Name</label>
            <input
              type="text"
              className="w-full border rounded px-4 py-2"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              disabled
              placeholder="Customer Name"
            />
          </div>
          <div>
            <label className="block font-bold mb-2">Customer Address</label>
            <input
              type="text"
              className="w-full border rounded px-4 py-2"
              value={customerAddress}
              onChange={(e) => setCustomerAddress(e.target.value)}
              disabled
              placeholder="Customer Address"
            />
          </div>
        </div>
        <div>
          <img
            src="../../src/images/sales/quotation.png"
            alt="Image"
            className=""
          />
        </div>
      </div>

      <div  className="bg-white p-6 rounded shadow-md">
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
            {items.map((item: any, index: any) => (
              <tr key={index}>
                <td className="border border-gray-300 px-4 py-2">
                  {index + 1}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.itemNo}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item?.englishDescription} {"("} {item?.arabicDescription}{" "}
                  {")"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.store}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.basicUnit}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                <input
                type="number"
                min="0"
                value={item.quantity || ""}
                onChange={(e) => handleQuantityChange(index, e.target.value)}
                className="border border-gray-300 rounded px-2 py-1 w-full"
              />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.retailPrice}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                {item.quantity * item.retailPrice || 0}
                </td>
                <td>
                  <button
                    onClick={() => {
                      onRemoveItem(item);
                    }}
                  >
                    <DeleteIcon color="red" />
                  </button>
                </td>
              </tr>
            ))}

            <tr>
              <td colSpan={8}>
                <input
                  className="w-full border border-gray-300 px-4 py-2 "
                  type="text"
                  value={searchQuery}
                  placeholder="Search Product"
                  onChange={(e) => {
                    handleSearchProduct(e);
                  }}
                />
              </td>
            </tr>
          </tbody>
        </table>

        {/* Summary */}
        <div className="flex flex-col items-end space-y-4">
          {/* <div className="flex items-center gap-4">
            <p>Total</p>
            <input
              type="text"
              value={items
                .reduce((acc: any, item: any) => acc + item.total, 0)
                .toFixed(2)}
              className="w-32 border rounded px-2 py-1"
              readOnly
            />
          </div> */}
          {/* <div className="flex items-center gap-4">
            <p>Discount</p>
            <input
              type="text"
              value={"0.00"}
              className="w-32 border rounded px-2 py-1"
              readOnly
            />
          </div> */}
          <div className="flex items-center gap-4">
            <p className="font-bold">Grand Total</p>
            <input
              type="text"
              value={grandTotal.toFixed(2)}
              className="w-32 text-white rounded px-2 py-1 bg-sky-400"
              readOnly
            />
          </div>
        </div>

        
      </div>
      </div>
      <div className="flex justify-end mt-6">
          <button
            onClick={() => {
              // handlePrint();
              reactToPrintFn();
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
              onHandleSave();
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
            onClick={() => {}}
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
      {openViewModal && (
        <OpenModal
          handleClose={() => {
            setOpenViewModal(false);
          }}
          title=""
          modalWithinModal={true}
        >
          <ItemList
            onEdit={(item: any) => {
              setOpenViewModal(false);
              onHandleSelect(item);
            }}
            searchQuerry={searchQuery}
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
          />
        </OpenModal>
      )}
    </div>
  );
};
