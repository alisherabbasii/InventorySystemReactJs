import { useEffect, useState } from "react";
import { OpenModal } from "../Generic/OpenModal";
import { ConfirmationDialog } from "../Generic/ConfirmationDialog";
import CustomersTable from "./CustomersTables";
import { toast, ToastContainer } from "react-toastify";
import {
  createParty,
  deleteParty,
  getLatestPartyNo,
  updateParty,
} from "../../api/auth";
import Exit  from "../../src/images/customersAndSuppliers/exit.png";
import { DeleteIcon, ExitIcon, ModifyIcon, SaveIcon, ViewIcon } from "../Icons/AllButtonIcons";

export const CustomerNSuppliers = () => {
  // const [showModal, setShowModal] = useState(false);
  const [customerNo, setCustomerNo] = useState("");
  const [accountNo, setAccountNo] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [shopName, setShopName] = useState("");
  const [commercialRecord, setCommercialRecord] = useState("");
  const [address, setAddress] = useState("");
  const [isSupplier, setIsSupplier] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [errors, setErrors] = useState({ customerNo: "", customerName: "" });
  const [customerId, setCustomerId] = useState("");

  useEffect(() => {
    getLatestCustomerNo();
  }, [isSupplier]);

  const onHandleSave = async () => {
    if (!validateFields()) return;
    let obj = {
      party_no: customerNo,
      name: customerName,
      tax_number: shopName,
      commercial_record: commercialRecord,
      address,
      type: isSupplier ? "supplier" : "vendor",
    };
    console.log(obj);
    if (!isEditMode) {
      try {
        const response = await createParty(obj);
        if (response.data) {
          toast.success("party created successfully", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          clearFields();
        }
      } catch (error) {
        console.error("error in creating party:", error);
        toast.error("error in creating party", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } else {
      try {
        const response = await updateParty(obj, customerId);
        if (response.data) {
          toast.success("Data updated successfully", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          clearFields();
        }
      } catch (error) {
        console.error("error in updating party:", error);
        toast.error("error in updating party", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    }
  };

  const clearFields = () => {
    setCustomerNo("");
    setCustomerName("");
    setShopName("");
    setCommercialRecord("");
    setAddress("");
    setIsSupplier(false);
    setCustomerId("");
    setIsEditMode(false);
    getLatestCustomerNo();
  };
  const onHandleModify = () => {
    onHandleSave();
  };
  const onHandleDelete = () => {
    setOpenDeleteModal(true);
  };

  const onHandleView = () => {
    setOpenViewModal(true);
  };

  const onHandleEdit = (customer: any) => {
    setCustomerNo(customer.party_no);
    setCustomerName(customer.name);
    setShopName(customer.tax_number);
    setCommercialRecord(customer.commercial_record);
    setAddress(customer.address);
    setIsSupplier(customer.type === "supplier" ? true : false);
    setCustomerId(customer.id);
  };

  const validateFields = () => {
    let isValid = true;
    const errors = { customerNo: "", customerName: "" };

    if (!customerNo.trim()) {
      errors.customerNo = "Customer number is required.";
      isValid = false;
    }
    if (!customerName.trim()) {
      errors.customerName = "Customer name is required.";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const onDeleteRecord = async () => {
    try {
      const response = await deleteParty(customerId);
      if (response.status == 204) {
        toast.success("Data deleted successfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setOpenDeleteModal(false);
        clearFields();
      }
    } catch (error) {
      console.error("error in delete party:", error);
      toast.error("error in deleting party", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };
  const onHandleExit = () => {};

  const getLatestCustomerNo = async () => {
    try {
      const response: any = await getLatestPartyNo(isSupplier);

      if (response.data) {
        debugger;
        setCustomerNo(response.data.party_no);
      }
    } catch (error) {
      console.error("error in getting latest customer no:", error);
      toast.error("error in getting latest customer no", {});
    }
  };

  return (
    <div className="p-8 bg-white rounded-lg shadow-lg">
      <ToastContainer />
      {/* Open Modal */}
      <h1 className="text-2xl text-[#217AA6] font-bold mb-6">
        Customer and Supplier Managment
      </h1>

      {/* <OpenModal handleClose={() => {}} title="Customers / Suppliers"> */}
      <div className="flex-col flex gap-6">
        <div className="flex items-center justify-between gap-8">
          <div className="w-2/4">
            <label
              htmlFor="customerno"
              className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
            >
              {isSupplier ? "Supplier" : "Customer"} no
            </label>
            <input
              type="text"
              name="customerno"
              id="customerno"
              value={customerNo}
              onChange={(e) => setCustomerNo(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-black"
              placeholder="12324354651"
              required
              readOnly
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="customerno"
              className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
            >
              {isSupplier ? "Supplier" : "Customer"} Name
            </label>
            <input
              type="text"
              name="customerName"
              id="customerName"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-black"
              placeholder="Enter customer name"
              required
            />
          </div>
          {/* Account no */}
          {/* <div className="w-2/4">
              <label
                htmlFor="customerno"
                className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
              >
                Account no
              </label>
              <input
                type="text"
                name="accountNo"
                id="accountNo"
                value={accountNo}
                onChange={(e) => setAccountNo(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-black"
                placeholder="12324354651"
                required
              />
            </div> */}
        </div>
        {/* customeer name */}

        {/* Tax number*/}
        <div className="w-full">
          <label
            htmlFor="customerno"
            className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
          >
            Shop name
          </label>
          <input
            type="text"
            name="shopName"
            id="shopName"
            value={shopName}
            onChange={(e) => setShopName(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-black"
            placeholder="Enter shop name"
            required
          />
        </div>

        {/* Commercial Record*/}
        <div className="w-full">
          <label
            htmlFor="customerno"
            className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
          >
            Bank Account No.
          </label>
          <input
            type="text"
            name="commercialRecord"
            id="commercialRecord"
            value={commercialRecord}
            onChange={(e) => setCommercialRecord(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-black"
            placeholder="Enter bank account number"
            required
          />
        </div>

        {/* Address*/}
        <div className="w-full">
          <label
            htmlFor="customerno"
            className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
          >
            Address
          </label>
          <input
            type="text"
            name="address"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-black"
            placeholder="Enter address"
            required
          />
        </div>

        <div className="flex items-center mb-4">
          <input
            id="default-checkbox"
            checked={isSupplier}
            onChange={(e) => setIsSupplier(e.target.checked)}
            type="checkbox"
            value=""
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Supplier
          </label>
        </div>
      </div>
      {/* buttons */}
      <div className="flex items-center justify-between bg-[#F5F6F7] h-15 px-4 ">
        {/* first three */}
        <div>
          <button
            onClick={() => {
              onHandleSave();
            }}
            type="button"
            className="text-black border border-blue-600 bg-white hover:bg-sky-400 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-2 py-1.5 text-center  inline-flex items-center dark:focus:ring-[#3b5998]/55 me-2 "
          >
           <SaveIcon />
            Save
          </button>

          <button
            onClick={() => {
              onHandleModify();
            }}
            type="button"
            className={
              !isEditMode
                ? "text-black border border-blue-600 cursor-no-drop hover:bg-zinc-400 font-medium rounded-md text-sm px-2 py-1.5 text-center  inline-flex items-center  me-2"
                : "text-black border border-blue-600 hover:bg-sky-400 hover:text-white bg-white  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-2 py-1.5 text-center  inline-flex items-center dark:focus:ring-[#3b5998]/55 me-2 "
            }
            disabled={!isEditMode}
          >
           <ModifyIcon />
            Modify
          </button>

          <button
            onClick={() => {
              onHandleDelete();
            }}
            type="button"
            className={
              !isEditMode
                ? "text-black border border-blue-600 cursor-no-drop hover:bg-zinc-400 font-medium rounded-md text-sm px-2 py-1.5 text-center  inline-flex items-center  me-2"
                : "text-black border border-blue-600 hover:bg-sky-400 hover:text-white bg-white  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-2 py-1.5 text-center  inline-flex items-center dark:focus:ring-[#3b5998]/55 me-2 "
            }
            disabled={!isEditMode}
          >
          <DeleteIcon />
            Delete
          </button>
        </div>

        {/* last two */}
        <div>
          <button
            onClick={() => {
              onHandleView();
            }}
            type="button"
            className="text-black border border-blue-600 hover:bg-sky-400 hover:text-white bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-2 py-1.5 text-center  inline-flex items-center dark:focus:ring-[#3b5998]/55 me-2 "
          >
            <ViewIcon />
            View
          </button>

          <button
            onClick={() => {
              onHandleExit();
            }}
            type="button"
            className="text-black border hover:bg-sky-400 hover:text-white border-blue-600 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-2 py-1.5 text-center  inline-flex items-center dark:focus:ring-[#3b5998]/55 me-2 "
          >
           <ExitIcon />
            Exit
          </button>
        </div>
      </div>
      {/* </OpenModal> */}

      {openDeleteModal && (
        <ConfirmationDialog
          title={"Confirmation"}
          message={"Are you sure you want to delete?"}
          confirmText={"Yes"}
          closeDialog={() => {
            setOpenDeleteModal(false);
          }}
          handleConfirm={() => {
            onDeleteRecord();
          }}
        />
      )}
      {openViewModal && (
        <OpenModal
          handleClose={() => {
            setOpenViewModal(false);
          }}
          title="Customers"
          modalWithinModal={true}
        >
          <CustomersTable
            onEdit={(customer: any) => {
              onHandleEdit(customer);
              setIsEditMode(true);
              setOpenViewModal(false);
            }}
          />
        </OpenModal>
      )}
    </div>
  );
};
