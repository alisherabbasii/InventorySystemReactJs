import { useState } from "react";
import { OpenModal } from "../Generic/OpenModal";
import { ConfirmationDialog } from "../Generic/ConfirmationDialog";
import CustomersTable from "./CustomersTables";

export const CustomerNSuppliers = () => {
  // const [showModal, setShowModal] = useState(false);
  const [customerNo, setCustomerNo] = useState("");
  const [accountNo, setAccountNo] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [taxNo, setTaxNo] = useState("");
  const [commercialRecord, setCommercialRecord] = useState("");
  const [address, setAddress] = useState("");
  const [isSupplier, setIsSupplier] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);

  const onHandleSave = () => {};
  const onHandleModify = () => {};
  const onHandleDelete = () => {
    setOpenDeleteModal(true);
  };

  const onHandleView = () => {
    setOpenViewModal(true);
  };
  const onHandleExit = () => {};
  return (
    <div>
      {/* Open Modal */}

      <OpenModal handleClose={() => {}} title="Customers / Suppliers">
        <div className="flex-col flex gap-6">
          <div className="flex items-center justify-between gap-8">
            <div className="w-2/4">
              <label
                htmlFor="customerno"
                className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
              >
                Customer no
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
              />
            </div>

            {/* Account no */}
            <div className="w-2/4">
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
            </div>
          </div>
          {/* customeer name */}
          <div className="w-full">
            <label
              htmlFor="customerno"
              className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
            >
              Customer Name
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

          {/* Tax number*/}
          <div className="w-full">
            <label
              htmlFor="customerno"
              className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
            >
              Tax Number
            </label>
            <input
              type="text"
              name="taxNo"
              id="taxNo"
              value={taxNo}
              onChange={(e) => setTaxNo(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-black"
              placeholder="Enter tax number"
              required
            />
          </div>

          {/* Commercial Record*/}
          <div className="w-full">
            <label
              htmlFor="customerno"
              className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
            >
              Commercial Record
            </label>
            <input
              type="text"
              name="commercialRecord"
              id="commercialRecord"
              value={commercialRecord}
              onChange={(e) => setCommercialRecord(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-black"
              placeholder="Enter commercial record"
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
              <img
                src="../../src/images/customersAndSuppliers/save.png"
                alt=""
                className="me-2 w-6 h-6"
              />
              Save
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
              Modify
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
              <img
                src="../../src/images/customersAndSuppliers/view.png"
                alt=""
                className="me-2 w-6 h-6"
              />
              View
            </button>

            <button
              onClick={() => {
                onHandleExit();
              }}
              type="button"
              className="text-black border hover:bg-sky-400 hover:text-white border-blue-600 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-2 py-1.5 text-center  inline-flex items-center dark:focus:ring-[#3b5998]/55 me-2 "
            >
              <img
                src="../../src/images/customersAndSuppliers/exit.png"
                alt=""
                className="me-2 w-6 h-6"
              />
              Exit
            </button>
          </div>
        </div>
      </OpenModal>

      {openDeleteModal && (
        <ConfirmationDialog
          title={"Confirmation"}
          message={"Are you sure you want to delete?"}
          confirmText={"Yes"}
          closeDialog={() => {
            setOpenDeleteModal(false);
          }}
          handleConfirm={() => {}}
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
          <CustomersTable />
        </OpenModal>
      )}
    </div>
  );
};
