import { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { toast, ToastContainer } from "react-toastify";
import { combineDescription, getArabicDescription, getBasicUnit, getEnglishDescription, getItemNo, getTotalPrice, getUnitPrice } from "./helperFunctions";
import { DeleteIcon } from "lucide-react";
import { OpenModal } from "../Generic/OpenModal";
import ItemList from "../StockControls/ItemList";
import CustomersTable from "../CustomerNSuppliers/CustomersTables";
import SalesNPurchaseTable from "./ViewTable";
import { formatDateForInput } from "../Generic/FormatDate";
import { createSalesInvoice, createSalesReturn, getLastSINo, getLastSRNo, updateSalesInvoice, updateSalesReturn } from "../../api/auth";


export const SalesReturn = (props:any) => {
  const { itemss } = props;
  const [invoiceNo, setInvoiceNo] = useState("");
  const [date, setDate] = useState("");
  const [customerNo, setCustomerNo] = useState("");
  const [paymentTerms, setPaymentTerms] = useState("cash");
  const [customerName, setCustomerName] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [openViewModal, setOpenViewModal] = useState(false);
  const [openViewSIModal, setOpenViewSIModal] = useState(false);
  const [openPartyModal, setOpenPartyModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [partyId, setPartyId] = useState("");
  const [items, setItems] = useState<any>([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [salesInvoiceId, setSalesInvoiceId] = useState("");
  const [description, setDescription] = useState("");
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
      const response = await getLastSRNo();
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

  const onHandleSISelect = (item: any) => {
    debugger;
    setSalesInvoiceId(item.id);
    setIsEditMode(true);
    setInvoiceNo(item.invoiceNo);
    setDate(formatDateForInput(item.date));
    setPartyId(item.Party?.id);
    setCustomerNo(item?.Party?.party_no);
    setCustomerName(item?.Party?.name);
    setCustomerAddress(item.Party?.address);
    setPaymentTerms(item.paymentTerms);
    setItems(item.SalesReturnItems);
    setOpenViewSIModal(false);
    setDescription(item?.description);
  };

  const onHandleSelect = (item: any) => {
    setSearchQuery("");
    debugger;
    setItems((prev: any) => [...prev, item]);
  };

  const onRemoveItem = (item: any) => {
    const filteredItems = items.filter((x: any) => x.id !== item.id);
    setItems(filteredItems);
  };

  const onHandleSave = async () => {
    if (items.length === 0) {
      toast.info("Please add items");
      return;
    }
    let obj = {
      date,
      partyId,
      paymentTerms,
      items,
      totalAmount: grandTotal,
      description
    };
    console.log(obj);
    if (isEditMode) {
      try {
        const response = await updateSalesReturn(obj, salesInvoiceId);
        if (response.data) {
          toast.success("Sales Return updated successfully");
          clearFields();
        }
      } catch (error) {
        console.error("error in fetching party:", error);
        toast.error("Error updating sales return");
      }
    } else {
      try {
        const response = await createSalesReturn(obj);
        if (response.data) {
          toast.success("Sales Return created successfully");
          clearFields();
        }
      } catch (error) {
        console.error("error in fetching party:", error);
        toast.error("Error creating Sales return");
      }
    }
  };
  const clearFields = () => {
    setInvoiceNo("");
    setDate("");
    setPartyId("");
    setCustomerNo("");
    setPaymentTerms("cash");
    setCustomerName("");
    setCustomerAddress("");
    setItems([]);
    setIsEditMode(false);
    setSalesInvoiceId("");
    fetchLatestInvoiceNo();
    setDescription("");
  };

  const handleQuantityChange = (index: number, value: string) => {
    setItems((prevItems: any) =>
      prevItems.map((item: any, i: any) =>
        i === index ? { ...item, quantity: parseInt(value) || 0 } : item
      )
    );
  };

  // Calculate the total for all items
  const grandTotal = items.reduce(
    (sum: any, item: any) =>
      sum +
      item.quantity * (item?.Item?.retailPrice || item?.retailPrice || 0),
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
                  if (!isEditMode) {
                    setOpenPartyModal(true);
                  }
                }}
                readOnly
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
              <label className="block font-bold mb-2">Description</label>
              <input
                type="text"
                className="w-full border rounded px-4 py-2"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
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
                <th className="border border-gray-300 px-4 py-2">
                  Description
                </th>
                {/* <th className="border border-gray-300 px-4 py-2">Store no</th> */}
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
                  {getItemNo(item)}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                  {combineDescription(
                      getEnglishDescription(item),
                      getArabicDescription(item)
                    )}
                  </td>
                  {/* <td className="border border-gray-300 px-4 py-2">
                  {item.store}
                </td> */}
                  <td className="border border-gray-300 px-4 py-2">
                  {getBasicUnit(item)}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <input
                      type="number"
                      min="1"
                      value={item.quantity || 0}
                      onChange={(e) =>
                        handleQuantityChange(index, e.target.value)
                      }
                      className="border border-gray-300 rounded px-2 py-1 w-full"
                    />
                  </td>
                  {/* Unit price(dont confuse with retailPrice it's same) */}
                  <td className="border border-gray-300 px-4 py-2">
                    {/* {isEditMode ? item?.Item?.retailPrice : item.retailPrice} */}
                    {getUnitPrice(item)}
                  </td>

                  <td className="border border-gray-300 px-4 py-2">
                  {getTotalPrice(item, isEditMode)}
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
            <div className="flex items-center gap-4">
              <p className="font-bold">Grand Total</p>
              <input
                type="text"
                value={grandTotal ? grandTotal.toFixed(2) : 0}
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
          {isEditMode ? "Update" : "Save"}
        </button>

        <button
          onClick={() => { clearFields();}}
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

        <button
          onClick={() => {
            setOpenViewSIModal(true);
            // setIsEditMode(false);
          }}
          type="button"
          className="text-black border border-blue-600 hover:bg-sky-400 hover:text-white bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-2 py-1.5 text-center  inline-flex items-center dark:focus:ring-[#3b5998]/55 me-2 "
        >
          <img
            src="../../src/images/customersAndSuppliers/view.png"
            alt=""
            className="me-2 w-6 h-6"
          />
          View
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
            onlyShowVendors={true}
          />
        </OpenModal>
      )}

      {openViewSIModal && (
        <OpenModal
          handleClose={() => {
            setOpenViewSIModal(false);
          }}
          title=""
          modalWithinModal={true}
        >
          <SalesNPurchaseTable
            onView={(item: any) => {
              setOpenViewSIModal(false);
              onHandleSISelect(item);
            }}
            otherComp={true}
            from="salesReturn"
          />
        </OpenModal>
      )}
    </div>
  );
}