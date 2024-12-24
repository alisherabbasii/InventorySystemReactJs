import { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { toast, ToastContainer } from "react-toastify";
import {
  combineDescription,
  getArabicDescription,
  getBasicUnit,
  getCostPrice,
  getEnglishDescription,
  getItemNo,
  getReservedQuantity,
  getTotalPrice,
  getUnitPrice,
} from "./helperFunctions";
import { DeleteIcon as DeleteLIcon } from "lucide-react";
import { OpenModal } from "../Generic/OpenModal";
import ItemList from "../StockControls/ItemList";
import CustomersTable from "../CustomerNSuppliers/CustomersTables";
import SalesNPurchaseTable from "./ViewTable";
import { formatDateForInput } from "../Generic/FormatDate";
import {
  createSalesInvoice,
  getLastSINo,
  updateSalesInvoice,
} from "../../api/auth";
import {
  DeleteIcon,
  ModifyIcon,
  PrintIcon,
  ViewIcon,
} from "../Icons/AllButtonIcons";
import { SalesInvoiceIcon } from "../Icons/AllSNPIcons";
import { getBasicUnitOptions } from "../Generic/GetBasicUnitOptions";
import { ConfirmationDialog } from "../Generic/ConfirmationDialog";

export const SalesInvoice = (props: any) => {
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
  const [showEngDesc, setShowEngDesc] = useState(true);
  const [printMode, setPrintMode] = useState(false);
  const [activeCostPrice, setActiveCostPrice] = useState(0);
  const [activeReservedQuantity, setActiveReservedQuantity] = useState(0);
  const [activeRowIndex, setActiveRowIndex] = useState(null);
  const [confirmationModal,setConfirmationModal] = useState(false);

  const [isCtrlPressed, setIsCtrlPressed] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Control') {
        setIsCtrlPressed((prev) => !prev); // Toggle state
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);


  // Handle focus on the quantity input
  const handleInputFocus = (index: any, item: any) => {
    setActiveRowIndex(index);
    setActiveReservedQuantity(getReservedQuantity(item));
    setActiveCostPrice(getCostPrice(item));
  };
  // Handle change in quantity input

  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({
    contentRef,
    pageStyle: `
    @media print {
      [data-printable="false"] {
        display: none !important;
      }
        table {
        border-collapse: collapse;
        width: 100%;
      }
      th, td {
        border: 1px solid black;
        padding: 4px;
        text-align: center;
      }
    }
  `,
    onAfterPrint: () => setPrintMode(false),
  });
//component specific
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
      const response = await getLastSINo();
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
    setItems(item.SalesInvoiceItems);
    setOpenViewSIModal(false);
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
    if(partyId === "" || partyId === null || partyId === undefined){
      toast.info("Please select a customer");
      return;
    }
    let obj = {
      date,
      partyId,
      paymentTerms,
      items,
      totalAmount: grandTotal,
    };
    console.log(obj);
    if (isEditMode) {
     
      try {
        const response = await updateSalesInvoice(obj, salesInvoiceId);
        if (response.data) {
          toast.success("Sales Invoice updated successfully");
          // clearFields();
          setConfirmationModal(true);
        }
      } catch (error) {
        console.error("error in fetching party:", error);
        toast.error("Error updating sales invoice");
      }
    } else {
      try {
        const response = await createSalesInvoice(obj);
        if (response.data) {
          toast.success("Sales Invoice created successfully");
          setConfirmationModal(true);
          // clearFields();
        }
      } catch (error) {
        console.error("error in fetching party:", error);
        toast.error("Error creating Sales invoice");
      }
    }
   
  };
  //end of component specific

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
    setActiveCostPrice(0);
    setActiveReservedQuantity(0);
    setActiveRowIndex(null);
    setConfirmationModal(false);
  };

  const handleQuantityChange = (index: any, value: any) => {
    const updatedValue = parseInt(value) || 0;
    const reservedQty = getReservedQuantity(items[index]);

    if (updatedValue > reservedQty) {
      const userConfirmed = window.confirm(
        `The entered quantity (${updatedValue}) exceeds the reserved quantity (${reservedQty}). Do you want to continue?`
      );
      if (!userConfirmed) return; // Stop further execution if user cancels
    }

    setItems((prevItems: any) =>
      prevItems.map((item: any, i: any) =>
        i === index ? { ...item, quantity: updatedValue } : item
      )
    );
  };

  // Calculate the total for all items
  const grandTotal = items.reduce(
    (sum: any, item: any) =>
      sum + item.quantity * (item?.retailPrice || item?.retailPrice || 0),
    0
  );

  // Calculate the total profit using cost price and price we entered for all items
  const totalProfit = items.reduce((sum: any, item: any) => {
    const unitPrice = getUnitPrice(item) || 0;
    const costPrice = getCostPrice(item) || 0;
    const profit = (unitPrice - costPrice) * item.quantity || 0; // Calculate profit for each row
    return sum + profit;
  }, 0);

  const handleBasicUnitChange = (index: number, value: string) => {
    setItems((prevItems: any) =>
      prevItems.map((item: any, i: any) =>
        i === index ? { ...item, basicUnit: value } : item
      )
    );
  };
  // Handle unit price change on input
  const handleUnitPriceChange = (index:any, value:any) => {
    const updatedValue = parseFloat(value) || 0;

    // Update the unit price immediately without checking cost price
    setItems((prevItems:any) =>
      prevItems.map((item:any, i:any) =>
        i === index ? { ...item, retailPrice: updatedValue } : item
      )
    );
  };

  // Handle blur (when user finishes typing and leaves input)
  const handleUnitPriceBlur = (index:any) => {
    const item = items[index];
    const updatedValue = item.retailPrice;
    const costPrice = getCostPrice(item);

    // Check if unit price is less than cost price
    if (updatedValue < costPrice) {
      const userConfirmed = window.confirm(
        `The entered unit price (${updatedValue}) is less than the cost price (${costPrice}). Do you want to continue?`
      );

      if (!userConfirmed) {
        // Revert price back to cost price if user cancels
        setItems((prevItems:any) =>
          prevItems.map((item:any, i:any) =>
            i === index ? { ...item, retailPrice: costPrice } : item
          )
        );
      }
    }
  };
  return (
    <div>
      <ToastContainer />
      {/* Form */}
      <div ref={contentRef}>
        {printMode && (
          <h2 className="text-2xl font-bold mb-6 text-center underline">
            Sales Invoice
          </h2>
        )}
        <div className="flex justify-between items-center  mb-6">
          <div
            className={
              printMode
                ? "min-w-96 grid grid-cols-4 gap-6  p-6"
                : "min-w-96 grid grid-cols-3 gap-6  p-6  "
            }
          >
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
            {/* <div>
              <label className="block font-bold mb-2">Customer No</label>
              <input
                type="text"
                className="w-full border rounded px-4 py-2"
                value={customerNo}
                onChange={(e) => setCustomerNo(e.target.value)}
                
                placeholder="select customer"
              />
            </div> */}

            <div>
              <label className="block font-bold mb-2">Customer Name</label>
              <input
                type="text"
                className="w-full border rounded px-4 py-2"
                value={customerName}
                onClick={() => {
                  if (!isEditMode) {
                    setOpenPartyModal(true);
                  }
                }}
                readOnly
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Customer Name"
              />
            </div>
            {/* <div>
              <label className="block font-bold mb-2">Customer Address</label>
              <input
                type="text"
                className="w-full border rounded px-4 py-2"
                value={customerAddress}
                onChange={(e) => setCustomerAddress(e.target.value)}
                disabled
                placeholder="Customer Address"
              />
            </div> */}

            <div>
              <label className="block font-bold mb-2">Payment Terms</label>
              <select
                className="w-full border rounded px-4 py-2"
                value={paymentTerms}
                onChange={(e) => setPaymentTerms(e.target.value)}
              >
                <option value="credit">Credit</option>
                <option value="cash">Cash</option>
                <option value="cheque">Cheque</option>
              </select>
            </div>
          </div>
          {!printMode && (
            <div>
              <SalesInvoiceIcon />
            </div>
          )}
        </div>

        {printMode ? (
          <div
            data-printable={printMode ? "true" : "false"}
            className="print-table-container"
          >
            <table className="print-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Item no</th>
                  <th>Description</th>
                  <th>Unit</th>
                  <th>Qty</th>
                  <th>Unit Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item: any, index: any) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{getItemNo(item)}</td>
                    <td>
                      {showEngDesc
                        ? getEnglishDescription(item)
                        : getArabicDescription(item)}
                    </td>
                    <td>{item.basicUnit}</td>
                    <td>{item.quantity}</td>
                    <td>{getUnitPrice(item).toFixed(2)}</td>
                    <td>{getTotalPrice(item, isEditMode).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Summary */}
            <div className="flex flex-col items-end space-y-4">
              <div className="flex items-center gap-4">
                <p className="font-bold">Grand Total</p>
                <input
                  type="text"
                  value={grandTotal ? grandTotal.toFixed(2) : 0}
                  className="w-32 text-black font-bold rounded px-2 py-1 bg-sky-400"
                  readOnly
                />
              </div>
            </div>
          </div>
        ) : (
          <div
            data-printable={printMode ? "true" : "false"}
            className="bg-white p-6 rounded shadow-md"
          >
            <table className="w-full border-collapse border border-gray-300 mb-6">
              <thead>
              {isCtrlPressed && 
                <tr data-printable="false">
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th style={{ background: "aqua" }} className={"px-4 py-2"}>
                    Qty On Hand:{" "}
                    <span className="font-bold">
                      {activeRowIndex !== null ? activeReservedQuantity : "0"}
                    </span>{" "}
                  </th>
                  <th style={{ background: "aqua" }} className={"px-4 py-2"}>
                    Cost Price:{" "}
                    <span className="font-bold">
                      {activeRowIndex !== null ? activeCostPrice : "0"}
                    </span>
                  </th>
                </tr>
                }
                <tr>
                  <th className={"border border-gray-300 px-4 py-2"}>#</th>
                  <th className={"border border-gray-300 px-4 py-2"}>
                    Item no
                  </th>
                  <th className={"border border-gray-300 px-4 py-2"}>
                    Description
                  </th>
                  {/* <th className={ "border border-gray-300 px-4 py-2"}>Store no</th> */}
                  <th className={"border border-gray-300 px-4 py-2"}>Unit</th>
                  <th className={"border border-gray-300 px-4 py-2"}>Qty</th>
                  <th className={"border border-gray-300 px-4 py-2"}>
                    Unit Price
                  </th>
                  <th className={"border border-gray-300 px-4 py-2"}>Total</th>
                </tr>
                
              </thead>
              <tbody>
                {items.map((item: any, index: any) => (
                  <tr key={index}>
                    <td className={"border border-gray-300 px-4 py-2"}>
                      {index + 1}
                    </td>
                    <td className={"border border-gray-300 px-4 py-2"}>
                      {getItemNo(item)}
                    </td>
                    <td
                      style={{ minWidth: "15rem" }}
                      className={"border border-gray-300 px-4 py-2 "}
                      onClick={() => {
                        setShowEngDesc(!showEngDesc);
                      }}
                    >
                      {showEngDesc
                        ? getEnglishDescription(item)
                        : getArabicDescription(item)}
                    </td>
                    {/* <td className="border border-gray-300 px-4 py-2">
                  {item.store}
                </td> */}
                    <td
                      className={
                        printMode ? "" : "border border-gray-300 px-4 py-2 "
                      }
                    >
                      {/* {getBasicUnit(item)} */}
                      <select
                        value={item?.basicUnit} // Ensure this returns the `value`, not `label`
                        onChange={(e) =>
                          handleBasicUnitChange(index, e.target.value)
                        }
                        className="appearance-none px-2 py-1 w-full"
                      >
                        {getBasicUnitOptions(item).map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className={"gap-4 border border-gray-300 px-4 py-2  "}>
                      <div className="flex">
                        <input
                          type="number"
                          min="1"
                          value={item.quantity > 0 ? item.quantity : ""}
                          onFocus={() => handleInputFocus(index, item)}
                          onChange={(e) =>
                            handleQuantityChange(index, e.target.value)
                          }
                          className="rounded px-2 py-1 w-full"
                        />
                        {/* <div data-printable="false" className="flex items-center">
                    {" / "}
                    <span className="font-bold">RQ:</span>
                    <span title="Cost Price">{getReservedQuantity(item)}</span>
                    </div> */}
                      </div>
                    </td>
                    {/* Unit price(dont confuse with retailPrice it's same) */}
                    <td
                      className={
                        "flex items-center gap-4 border border-gray-300 px-4 py-2 "
                      }
                    >
                      <input
                        type="number"
                        step="any"
                        min="1"
                        value={getUnitPrice(item)}
                        onFocus={() => handleInputFocus(index, item)}
                        onChange={(e) => handleUnitPriceChange(index, e.target.value)}
                        onBlur={() => handleUnitPriceBlur(index)} // Trigger check on blur
                        className=" rounded px-2 py-1 w-full"
                      />
                      {/* <div data-printable="false" className="flex items-center">
                        {" / "}
                        <span className="font-bold">CP:</span>
                        <span title="Cost Price">{getCostPrice(item)}</span>
                      </div> */}
                    </td>

                    <td className={"border border-gray-300 px-4 py-2 "}>
                      {getTotalPrice(item, isEditMode).toFixed(2)}
                    </td>
                    <td data-printable="false">
                      <button
                        onClick={() => {
                          onRemoveItem(item);
                        }}
                      >
                        <DeleteLIcon color="red" />
                      </button>
                    </td>
                  </tr>
                ))}

                <tr>
                  <td data-printable="false" colSpan={8}>
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

              <div data-printable="false" className="flex items-center gap-4">
                <p className="font-bold">Total Profit</p>
                <input
                  type="text"
                  value={totalProfit ? totalProfit.toFixed(2) : 0}
                  className="w-32 text-white rounded px-2 py-1 bg-sky-400"
                  readOnly
                />
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="flex justify-end mt-6">
        <button
          onClick={() => {
            // handlePrint();
            setPrintMode(true);
            setTimeout(() => {
              reactToPrintFn();
            }, 100);
          }}
          type="button"
          className="text-black border border-blue-600 bg-white hover:bg-sky-400 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-2 py-1.5 text-center  inline-flex items-center dark:focus:ring-[#3b5998]/55 me-2 "
        >
          <PrintIcon />
          Print
        </button>

        <button
          onClick={() => {
            onHandleSave();
          }}
          type="button"
          className="text-black border border-blue-600 hover:bg-sky-400 hover:text-white bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-2 py-1.5 text-center  inline-flex items-center dark:focus:ring-[#3b5998]/55 me-2 "
        >
          <ModifyIcon />
          {isEditMode ? "Update" : "Save"}
        </button>

        <button
          onClick={() => {
            clearFields();
          }}
          type="button"
          className="text-black border border-blue-600 hover:bg-sky-400 hover:text-white bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-2 py-1.5 text-center  inline-flex items-center dark:focus:ring-[#3b5998]/55 me-2 "
        >
          <DeleteIcon />
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
          <ViewIcon />
          View
        </button>
      </div>
        {confirmationModal && (
          <ConfirmationDialog 
            title="Do you also want to print that invoice?"
            message="This action will also print the invoice."
            handleConfirm={() => {
              setPrintMode(true);
              setTimeout(() => {
                reactToPrintFn();
                clearFields();
              }, 100);

            }}
            confirmText={"Print"}
            bgColor={'bg-green-400'}
            closeDialog={() => {
              setConfirmationModal(false);
              clearFields();
            }}
          />
        )}

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
            from="salesInvoice"
          />
        </OpenModal>
      )}
    </div>
  );
};
